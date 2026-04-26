import { describe, it, expect } from "vitest";
import { readFileSync, readdirSync, statSync, existsSync } from "node:fs";
import { join, resolve } from "node:path";

/**
 * Legacy redirect & preview-UI guard tests.
 *
 * These tests run statically over the source tree (no browser needed) so they are
 * fast, deterministic, and catch regressions at the source-of-truth level.
 *
 * They guarantee:
 *   1. The deleted "DashboardPreview" components never come back.
 *   2. Legacy routes (/dashboard, /franchise/dashboard, /owner, /master-admin, …)
 *      always redirect into /control-panel/*.
 *   3. No file in src/ contains the forbidden preview UI strings.
 */

const SRC = resolve(__dirname, "..");
const APP_TSX = resolve(SRC, "App.tsx");

// Files/components that were permanently deleted and must never reappear.
const FORBIDDEN_FILES = [
  "components/franchise-landing/DashboardPreview.tsx",
  "components/reseller-landing/ResellerDashboardPreview.tsx",
];

// UI strings from the deleted preview screens — must not appear in any source file.
const FORBIDDEN_STRINGS = [
  "Your Dashboard Preview",
  "Franchise Dashboard Preview",
  "Reseller Dashboard Preview",
];

// Legacy routes that MUST exist in App.tsx and MUST redirect into /control-panel/*.
const LEGACY_REDIRECTS: Array<{ path: string; target: string }> = [
  { path: "/dashboard", target: "/control-panel/boss-panel" },
  { path: "/owner", target: "/control-panel/boss-panel" },
  { path: "/master-admin", target: "/control-panel/boss-panel" },
  { path: "/franchise", target: "/control-panel/franchise" },
  { path: "/franchise/dashboard", target: "/control-panel/franchise" },
  { path: "/franchise/wallet", target: "/control-panel/franchise" },
  { path: "/franchise/profile", target: "/control-panel/franchise" },
];

function walk(dir: string, out: string[] = []): string[] {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) {
      if (entry === "node_modules" || entry === "dist" || entry === "test") continue;
      walk(full, out);
    } else if (/\.(tsx?|jsx?)$/.test(entry)) {
      out.push(full);
    }
  }
  return out;
}

describe("Deleted DashboardPreview components stay deleted", () => {
  for (const rel of FORBIDDEN_FILES) {
    it(`file does not exist: src/${rel}`, () => {
      expect(existsSync(resolve(SRC, rel))).toBe(false);
    });
  }
});

describe("Forbidden preview UI strings appear nowhere in src/", () => {
  const allFiles = walk(SRC);

  for (const forbidden of FORBIDDEN_STRINGS) {
    it(`no source file contains "${forbidden}"`, () => {
      const offenders = allFiles.filter((f) =>
        readFileSync(f, "utf8").includes(forbidden),
      );
      expect(
        offenders,
        `Forbidden string "${forbidden}" found in:\n${offenders.join("\n")}`,
      ).toEqual([]);
    });
  }
});

describe("Legacy routes redirect into /control-panel/*", () => {
  const appSource = readFileSync(APP_TSX, "utf8");

  for (const { path, target } of LEGACY_REDIRECTS) {
    it(`route "${path}" redirects to "${target}"`, () => {
      // Match: <Route path="/dashboard" element={<Navigate to="/control-panel/boss-panel" replace />} />
      const escapedPath = path.replace(/[/\-]/g, (m) => `\\${m}`);
      const re = new RegExp(
        `path=["']${escapedPath}["'][^>]*Navigate\\s+to=["']${target.replace(/[/\-]/g, (m) => `\\${m}`)}["']`,
      );
      expect(
        re.test(appSource),
        `Expected App.tsx to declare a redirect from ${path} to ${target}`,
      ).toBe(true);
    });
  }

  it("App.tsx contains zero direct references to old preview pages", () => {
    expect(appSource).not.toMatch(/DashboardPreview/);
    expect(appSource).not.toMatch(/ResellerDashboardPreview/);
  });
});

describe("Control panel module map covers every required role", () => {
  it("exports the expected module slugs", async () => {
    const mod = await import("../pages/control-panel/ControlPanelRouter");
    const map = (mod as any).MODULE_TO_ROLE as Record<string, string>;
    const required = [
      "boss-panel",
      "ceo",
      "vala-ai",
      "server-manager",
      "franchise",
      "reseller",
      "finance",
      "legal",
      "hr",
      "marketing-manager",
      "seo-manager",
      "lead-manager",
    ];
    for (const slug of required) {
      expect(map[slug], `Missing module slug: ${slug}`).toBeTruthy();
    }
  });
});
