// @ts-nocheck
import { Database } from '@/integrations/supabase/types';

type AppRole = Database['public']['Enums']['app_role'];

export const ROLE_DASHBOARD_MAP: Partial<Record<AppRole, string>> = {
  boss_owner: '/control-panel/boss-panel',
  master: '/control-panel/boss-panel',
  super_admin: '/control-panel/boss-panel',
  admin: '/control-panel/boss-panel',
  ceo: '/control-panel/ceo',
  country_head: '/control-panel/country-head',
  area_manager: '/control-panel/country-head',
  continent_super_admin: '/control-panel/continent',
  franchise: '/control-panel/franchise',
  reseller: '/control-panel/reseller',
  reseller_manager: '/control-panel/reseller-manager',
  influencer: '/control-panel/influencer',
  developer: '/control-panel/developer',
  server_manager: '/control-panel/server-manager',
  api_security: '/control-panel/ai-api-manager',
  ai_manager: '/control-panel/ai-api-manager',
  r_and_d: '/control-panel/dev-manager',
  rnd_manager: '/control-panel/dev-manager',
  lead_manager: '/control-panel/lead-manager',
  marketing_manager: '/control-panel/marketing-manager',
  seo_manager: '/control-panel/seo-manager',
  client_success: '/control-panel/support',
  performance_manager: '/control-panel/boss-panel',
  support: '/control-panel/support',
  safe_assist: '/control-panel/assist-manager',
  assist_manager: '/control-panel/assist-manager',
  promise_tracker: '/control-panel/promise-tracker',
  promise_management: '/control-panel/promise-tracker',
  demo_manager: '/control-panel/demo-manager',
  product_demo_manager: '/control-panel/demo-manager',
  task_manager: '/control-panel/task-manager',
  finance_manager: '/control-panel/finance',
  hr_manager: '/control-panel/hr',
  legal_compliance: '/control-panel/legal',
  prime: '/control-panel/pro-user',
  user: '/control-panel/user',
  client: '/control-panel/user',
};

const ROLE_PRIORITY: AppRole[] = [
  'boss_owner',
  'master',
  'super_admin',
  'ceo',
  'admin',
  'continent_super_admin',
  'country_head',
  'area_manager',
  'server_manager',
  'ai_manager',
  'finance_manager',
  'lead_manager',
  'marketing_manager',
  'support',
  'franchise',
  'reseller',
  'developer',
  'prime',
  'influencer',
  'user',
  'client',
];

export const selectBestRole = (roles: AppRole[]): AppRole | null => {
  if (roles.length === 0) {
    return null;
  }

  for (const role of ROLE_PRIORITY) {
    if (roles.includes(role)) {
      return role;
    }
  }

  return roles[0];
};

export const getDashboardRouteForRole = (role: AppRole | null) => {
  if (!role) {
    return '/app/user';
  }

  return ROLE_DASHBOARD_MAP[role] || '/app/user';
};