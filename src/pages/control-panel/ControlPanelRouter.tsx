// @ts-nocheck
import { Navigate, useParams } from "react-router-dom";

/**
 * MODULE SLUG → ROLE SWITCH MAPPING
 * Maps /control-panel/:module to /super-admin-system/role-switch?role=<activeRole>
 * 
 * This is the SINGLE canonical routing layer for all 42 modules.
 * No duplicate routes. No new UI. Just clean mapping.
 */
const MODULE_TO_ROLE: Record<string, string> = {
  // Priority 1: Boss Panel
  'boss-panel': 'boss_owner',
  'boss': 'boss_owner',
  
  // Priority 2: CEO
  'ceo': 'ceo',
  'ceo-dashboard': 'ceo',
  
  // Priority 3: Core Management
  'vala-ai': 'vala_ai_management',
  'server-manager': 'server_manager',
  'ai-api-manager': 'api_ai_manager',
  'api-manager': 'api_ai_manager',
  
  // Development
  'development-manager': 'developer_management',
  'dev-manager': 'developer_management',
  'developer-dashboard': 'developer_dashboard',
  'developer': 'developer_dashboard',
  
  // Product & Demo
  'product-manager': 'product_manager',
  'demo-manager': 'demo_manager',
  
  // Task & Promise
  'task-manager': 'task_management',
  'promise-tracker': 'promise_tracker_manager',
  'assist-manager': 'assist_manager',
  
  // Marketing & SEO
  'seo-manager': 'seo_manager',
  'marketing-manager': 'marketing_management',
  'marketing': 'marketing_management',
  
  // Lead & Sales
  'lead-manager': 'lead_manager',
  'leads': 'lead_manager',
  
  // Franchise & Reseller & Influencer
  'franchise': 'franchise_manager',
  'franchise-manager': 'franchise_manager',
  'reseller': 'reseller_manager',
  'reseller-manager': 'reseller_manager',
  'influencer': 'influencer_manager',
  'influencer-manager': 'influencer_manager',
  
  // Support & Finance & Legal
  'support': 'customer_support_management',
  'customer-support': 'customer_support_management',
  'finance': 'finance_manager',
  'finance-manager': 'finance_manager',
  'legal': 'legal_manager',
  'legal-manager': 'legal_manager',
  
  // User & Security & Settings
  'user': 'basic_user_dashboard',
  'user-dashboard': 'basic_user_dashboard',
  'security': 'security',
  'security-manager': 'security',
  'settings': 'settings',
  'home': 'home',
  
  // Role Manager & HR
  'role-manager': 'role_manager',
  'hr-manager': 'hr_manager',
  'hr': 'hr_manager',
  
  // Pro Manager
  'pro-manager': 'pro_manager',
  
  // Marketplace Manager
  'marketplace': 'marketplace_manager',
  'marketplace-manager': 'marketplace_manager',
  
  // Continent & Country
  'continent': 'continent_super_admin',
  'country-head': 'country_head',
  
  // Internal Chatbot
  'internal-chatbot': 'internal_chatbot',
  'chatbot': 'internal_chatbot',
  
  // Influencer Dashboard (user-facing)
  'influencer-dashboard': 'influencer_dashboard',
  
  // Pro User Dashboard
  'pro-user': 'pro_user_dashboard',
};

/**
 * ControlPanelRouter
 * 
 * Reads :module from URL and redirects to the unified RoleSwitchDashboard
 * with the correct ?role= parameter.
 * 
 * /control-panel → Control Panel grid (boss_owner default)
 * /control-panel/vala-ai → Vala AI module
 * /control-panel/finance → Finance Manager
 */
const ControlPanelRouter = () => {
  const { module } = useParams<{ module: string }>();
  
  // No module = Control Panel grid
  if (!module) {
    return <Navigate to="/super-admin-system/role-switch?role=boss_owner" replace />;
  }
  
  const role = MODULE_TO_ROLE[module];
  
  if (!role) {
    // Unknown module - go to control panel
    return <Navigate to="/super-admin-system/role-switch?role=boss_owner" replace />;
  }
  
  return <Navigate to={`/super-admin-system/role-switch?role=${role}`} replace />;
};

export default ControlPanelRouter;

// Export the mapping for use in other components
export { MODULE_TO_ROLE };

// Reverse mapping: role → module slug (for generating links)
export const ROLE_TO_MODULE: Record<string, string> = Object.entries(MODULE_TO_ROLE).reduce(
  (acc, [slug, role]) => {
    // Keep first mapping (canonical slug)
    if (!acc[role]) acc[role] = slug;
    return acc;
  },
  {} as Record<string, string>
);
