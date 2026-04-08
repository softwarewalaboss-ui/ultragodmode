import { supabase } from '@/integrations/supabase/client';

interface EdgeRouteOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  body?: unknown;
  query?: Record<string, string | number | boolean | undefined | null>;
  headers?: Record<string, string>;
  module?: string;
  cacheTtlMs?: number;
}

interface EdgeRouteResponse<T> {
  success: boolean;
  data: T;
  error?: string;
  status: number;
}

const DEFAULT_TIMEOUT_MS = 12000;
const DEFAULT_RETRY_COUNT = 3;
const DEFAULT_CACHE_TTL_MS = 5000;

const responseCache = new Map<string, { expiresAt: number; value: EdgeRouteResponse<unknown> }>();

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getBackoffDelay(attempt: number) {
  return Math.min(400 * 2 ** attempt, 2000);
}

function createRequestId() {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }
  return `req_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

function inferModule(functionName: string) {
  if (functionName.includes('finance')) return 'finance';
  if (functionName.includes('marketplace')) return 'marketplace';
  if (functionName.includes('chat')) return 'chat';
  if (functionName.includes('promise')) return 'promise';
  if (functionName.includes('security') || functionName.includes('auth')) return 'security';
  return 'platform';
}

function getFallbackBaseUrls() {
  const raw = import.meta.env.VITE_EDGE_FALLBACK_URLS;
  if (!raw) return [] as string[];

  return String(raw)
    .split(',')
    .map((value) => value.trim())
    .filter(Boolean);
}

async function getDeviceId() {
  let deviceId = localStorage.getItem('device_fingerprint');
  if (!deviceId) {
    const fingerprint = `${navigator.userAgent}-${navigator.language}-${screen.width}x${screen.height}`;
    deviceId = btoa(fingerprint).slice(0, 32);
    localStorage.setItem('device_fingerprint', deviceId);
  }

  return deviceId;
}

// Log to audit_logs (the only log table that exists)
async function logToAudit(action: string, meta: Record<string, unknown>) {
  try {
    const { data: { session } } = await supabase.auth.getSession();
    await supabase.from('audit_logs').insert({
      action,
      module: (meta.module as string) || 'platform',
      user_id: session?.user?.id || null,
      meta_json: meta,
    });
  } catch {
    // Logging failures must not break the request path.
  }
}

async function fetchWithTimeout(url: string, init: RequestInit, timeoutMs: number) {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(() => controller.abort(), timeoutMs);

  try {
    return await fetch(url, { ...init, signal: controller.signal });
  } finally {
    window.clearTimeout(timeoutId);
  }
}

function buildEdgeUrl(baseUrl: string, functionName: string, path = '', query?: EdgeRouteOptions['query']) {
  const normalizedPath = path.replace(/^\/+/, '');
  const url = new URL(`${baseUrl}/functions/v1/${functionName}${normalizedPath ? `/${normalizedPath}` : ''}`);

  if (query) {
    Object.entries(query).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        url.searchParams.set(key, String(value));
      }
    });
  }

  return url.toString();
}

export async function callEdgeRoute<T>(
  functionName: string,
  path = '',
  options: EdgeRouteOptions = {},
): Promise<EdgeRouteResponse<T>> {
  const method = options.method || 'GET';
  const cacheKey = `${functionName}:${path}:${JSON.stringify(options.query || {})}`;

  if (method === 'GET') {
    const cached = responseCache.get(cacheKey);
    if (cached && cached.expiresAt > Date.now()) {
      return cached.value as EdgeRouteResponse<T>;
    }
  }

  const {
    data: { session },
  } = await supabase.auth.getSession();

  const requestId = createRequestId();
  const deviceId = await getDeviceId();
  const requestStartedAt = performance.now();
  const baseUrls = [import.meta.env.VITE_SUPABASE_URL, ...getFallbackBaseUrls()].filter(Boolean);
  const failures: string[] = [];

  for (let baseIndex = 0; baseIndex < baseUrls.length; baseIndex += 1) {
    const baseUrl = baseUrls[baseIndex];

    for (let attempt = 0; attempt < DEFAULT_RETRY_COUNT; attempt += 1) {
      try {
        const response = await fetchWithTimeout(
          buildEdgeUrl(baseUrl, functionName, path, options.query),
          {
            method,
            headers: {
              'Content-Type': 'application/json',
              apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
              'x-device-id': deviceId,
              'x-request-id': requestId,
              ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
              ...(options.headers || {}),
            },
            body: options.body === undefined || method === 'GET' ? undefined : JSON.stringify(options.body),
          },
          DEFAULT_TIMEOUT_MS,
        );

        const payload = await response.json().catch(() => null);
        if (!response.ok || !payload?.success) {
          throw new Error(payload?.error || payload?.message || `Edge route failed with status ${response.status}`);
        }

        const result: EdgeRouteResponse<T> = {
          success: true,
          data: payload.data as T,
          status: response.status,
        };

        if (method === 'GET') {
          responseCache.set(cacheKey, {
            expiresAt: Date.now() + (options.cacheTtlMs ?? DEFAULT_CACHE_TTL_MS),
            value: result as EdgeRouteResponse<unknown>,
          });
        }

        return result;
      } catch (error) {
        const message = error instanceof Error ? error.message : 'Unknown edge transport failure';
        failures.push(`${baseUrl} [attempt ${attempt + 1}]: ${message}`);

        if (attempt < DEFAULT_RETRY_COUNT - 1) {
          await sleep(getBackoffDelay(attempt));
        }
      }
    }
  }

  const finalMessage = failures[failures.length - 1] || 'Unknown edge route failure';

  // Log failure to audit_logs (silent, won't 404)
  void logToAudit(`edge_route_failed:${functionName}/${path}`, {
    module: inferModule(functionName),
    failures,
    request_id: requestId,
  });

  throw new Error(finalMessage);
}