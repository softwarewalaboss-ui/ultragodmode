// @ts-nocheck
import { Navigate, useParams } from "react-router-dom";

/**
 * MODULE SLUG → ROLE SWITCH MAPPING
 * Maps /control-panel/:module to /super-admin-system/role-switch?role=<activeRole>
 * 
 * ALL 42 MODULES — connected to existing March 9-14 dashboards.
 * No new UI. Only routing.
 */
const MODULE_TO_ROLE: Record<string, string> = {
  // 1. Boss Panel (Control Panel)
  'boss-panel': 'boss_owner',
  'boss': 'boss_owner',
  'control-panel': 'boss_owner',
  
  // 2. CEO Dashboard
  'ceo': 'ceo',
  'ceo-dashboard': 'ceo',
  
  // 3. Vala AI
  'vala-ai': 'vala_ai_management',
  'vala': 'vala_ai_management',
  
  // 4. Server Manager
  'server-manager': 'server_manager',
  'server': 'server_manager',
  
  // 5. AI API Manager
  'ai-api-manager': 'api_ai_manager',
  'api-manager': 'api_ai_manager',
  
  // 6. Development Manager
  'development-manager': 'developer_management',
  'dev-manager': 'developer_management',
  
  // 7. Developer Dashboard
  'developer-dashboard': 'developer_dashboard',
  'developer': 'developer_dashboard',
  
  // 8. Product Manager
  'product-manager': 'product_manager',
  
  // 9. Demo Manager
  'demo-manager': 'demo_manager',
  
  // 10. Demo System Manager (same as demo-manager)
  'demo-system': 'demo_manager',
  
  // 11. Task Manager
  'task-manager': 'task_management',
  'tasks': 'task_management',
  
  // 12. Promise Tracker
  'promise-tracker': 'promise_tracker_manager',
  
  // 13. Assist Manager
  'assist-manager': 'assist_manager',
  
  // 14. Asset Manager (mapped to Pro Manager which handles assets)
  'asset-manager': 'pro_manager',
  
  // 15. Marketing Manager
  'marketing-manager': 'marketing_management',
  'marketing': 'marketing_management',
  
  // 16. SEO Manager
  'seo-manager': 'seo_manager',
  'seo': 'seo_manager',
  
  // 17. Lead Manager
  'lead-manager': 'lead_manager',
  'leads': 'lead_manager',
  
  // 18. Sales Manager (Sales Support)
  'sales-manager': 'sales_support_manager',
  'sales-support': 'sales_support_manager',
  
  // 19. Customer Support
  'customer-support': 'customer_support_management',
  'support': 'customer_support_management',
  
  // 20. Franchise Manager
  'franchise-manager': 'franchise_manager',
  
  // 21. Franchise Dashboard
  'franchise': 'franchise_manager',
  'franchise-dashboard': 'franchise_manager',
  
  // 22. Reseller Manager
  'reseller-manager': 'reseller_manager',
  
  // 23. Reseller Dashboard
  'reseller': 'reseller_manager',
  'reseller-dashboard': 'reseller_manager',
  
  // 24. Influencer Manager
  'influencer-manager': 'influencer_manager',
  
  // 25. Influencer Dashboard
  'influencer': 'influencer_dashboard',
  'influencer-dashboard': 'influencer_dashboard',
  
  // 26. Continent Admin
  'continent': 'continent_super_admin',
  'continent-admin': 'continent_super_admin',
  
  // 27. Country Admin
  'country-head': 'country_head',
  'country-admin': 'country_head',
  
  // 28. Finance Manager
  'finance': 'finance_manager',
  'finance-manager': 'finance_manager',
  
  // 29. Legal Manager
  'legal': 'legal_manager',
  'legal-manager': 'legal_manager',
  
  // 30. Security Manager
  'security': 'security',
  'security-manager': 'security',
  
  // 31. System Settings
  'settings': 'settings',
  'system-settings': 'settings',
  
  // 32. Marketplace Manager
  'marketplace': 'marketplace_manager',
  'marketplace-manager': 'marketplace_manager',
  
  // 33. License Manager (under Legal)
  'license-manager': 'legal_manager',
  'licenses': 'legal_manager',
  
  // 34. Deployment Manager (under Server Manager)
  'deployment-manager': 'server_manager',
  'deployment': 'server_manager',
  
  // 35. Analytics Manager (Performance)
  'analytics': 'boss_owner',
  'analytics-manager': 'boss_owner',
  
  // 36. Notification Manager (under Settings)
  'notification-manager': 'settings',
  'notifications': 'settings',
  
  // 37. Integration Manager (API/AI Manager)
  'integration-manager': 'api_ai_manager',
  'integrations': 'api_ai_manager',
  
  // 38. Audit Logs Manager (under Boss)
  'audit-logs': 'boss_owner',
  'audit': 'boss_owner',
  
  // 39. User Dashboard
  'user': 'basic_user_dashboard',
  'user-dashboard': 'basic_user_dashboard',
  
  // 40. Pro Manager
  'pro-manager': 'pro_manager',
  'pro': 'pro_manager',
  
  // 41. Wallet / Ledger System (Finance Manager handles wallet)
  'wallet': 'finance_manager',
  'ledger': 'finance_manager',
  
  // 42. Order / Payment System (under Boss Panel)
  'orders': 'boss_owner',
  'payments': 'boss_owner',
  'order-system': 'boss_owner',
  
  // Extra: Home, Role Manager, HR, Internal Chatbot
  'home': 'home',
  'role-manager': 'role_manager',
  'hr': 'hr_manager',
  'hr-manager': 'hr_manager',
  'internal-chatbot': 'internal_chatbot',
  'chatbot': 'internal_chatbot',
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
