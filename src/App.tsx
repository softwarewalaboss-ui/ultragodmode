// @ts-nocheck
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import AccessDenied from "@/components/error/ErrorUI";
import AccountSuspension from "@/pages/auth/AccountSuspension";
import AdminQuickAccess from "@/components/admin/AdminQuickAccess";
import { AnimationProvider } from "@/contexts/AnimationContext";
import Auth from "@/pages/Auth";
import { AuthProvider } from "@/hooks/useAuth";
import AutoDevEngine from "@/pages/auto-dev/AutoDevEngine";
import AutomotiveDemo from "@/pages/demos/AutomotiveDemo";
import BootstrapAdmins from "@/pages/admin/BootstrapAdmins";
import BulkActionsReference from "@/pages/admin/BulkActionsReference";
import BulkUserCreation from "@/pages/admin/BulkUserCreation";
import ButtonAuditOverlay from "@/components/shared/ButtonAuditOverlay";
import CRMDemo from "@/pages/demos/CRMDemo";
import CareerPortal from "@/pages/CareerPortal";
import CategoryOnboarding from "@/pages/CategoryOnboarding";
import ChangePassword from "@/pages/auth/ChangePassword";
import ChildcareDemo from "@/pages/demos/ChildcareDemo";
import ClientPortal from "@/pages/ClientPortal";
import Dashboard from "@/components/franchise-landing/DashboardPreview";
import DemoDirectory from "@/pages/DemoDirectory";
import DemoLogin from "@/pages/DemoLogin";
import { DemoTestModeProvider } from "@/contexts/DemoTestModeContext";
import DeveloperRegistration from "@/pages/developer/DeveloperRegistration";
import DeviceVerify from "@/pages/auth/DeviceVerify";
import EasyAuth from "@/pages/auth/EasyAuth";
import EcommerceStoreDemo from "@/pages/demos/EcommerceStoreDemo";
import EducationDemoHub from "@/pages/demos/education/EducationDemoHub";
import EventDemo from "@/pages/demos/EventDemo";
import FinanceDemo from "@/pages/demos/FinanceDemo";
import FloatingAIChatbotWrapper from "@/components/shared/FloatingAIChatbotWrapper";
import ForgotPassword from "@/pages/auth/ForgotPassword";
import FranchiseLanding from "@/components/franchise-landing/FranchiseLandingFooter";
import GlobalOfferPopup from "@/components/offers/GlobalOfferPopup";
import GlobalRealtimeProvider from "@/providers/GlobalRealtimeProvider";
import GymDemo from "@/pages/demos/GymDemo";
import Homepage from "@/components/homepage/HomepageFooter";
import HospitalHMSDemo from "@/pages/demos/HospitalHMSDemo";
import HotelBookingDemo from "@/pages/demos/HotelBookingDemo";
import IPVerify from "@/pages/auth/IPVerify";
import Index from "@/pages/Index";
import InfluencerCommandCenter from "@/pages/InfluencerCommandCenter";
import InternalChat from "@/pages/InternalChat";
import LeaderSecurityAssessment from "@/pages/leader-security/LeaderSecurityAssessment";
import LegalDemo from "@/pages/demos/LegalDemo";
import LogisticsDemo from "@/pages/demos/LogisticsDemo";
import Logout from "@/pages/auth/Logout";
import ManufacturingDemo from "@/pages/demos/ManufacturingDemo";
import NotFound from "@/pages/NotFound";
import { NotificationProvider } from "@/contexts/NotificationContext";
import OTPVerify from "@/pages/auth/OTPVerify";
import PendingApproval from "@/pages/auth/PendingApproval";
import PersonalChat from "@/components/chat/PersonalChatSystem";
import PetCareDemo from "@/pages/demos/PetCareDemo";
import PremiumDemoShowcase from "@/pages/PremiumDemoShowcase";
import PublicDemos from "@/pages/demos/PublicDemos";
import QuickSupport from "@/components/support/QuickSupport";
import RealEstateDemo from "@/pages/demos/RealEstateDemo";
import RequireAuth from "@/components/auth/RequireAuth";
import RequireRole from "@/components/auth/RequireRole";
import ResellerLanding from "@/pages/ResellerLanding";
import ResetPassword from "@/pages/auth/ResetPassword";
import RestaurantLargeDemo from "@/pages/demos/restaurant/RestaurantLargeDemo";
import RestaurantMediumDemo from "@/pages/demos/restaurant/RestaurantMediumDemo";
import RestaurantPOSDemo from "@/pages/demos/RestaurantPOSDemo";
import RestaurantSmallDemo from "@/pages/demos/restaurant/RestaurantSmallDemo";
import RetailPOSDemo from "@/pages/retail-pos/RetailPOSDemo";
import RoleBasedLogin from "@/pages/auth/RoleBasedLogin";
import RoleManager from "@/components/role-manager/RoleManagerComplete";
import RoleManagerPage from "@/pages/admin/RoleManagerPage";
import RoleSwitchDashboard from "@/pages/super-admin-system/RoleSwitch/RoleSwitchDashboard";
import SalesCRMAuthPage from "@/pages/sales-crm/SalesCRMAuthPage";
import SalesCRMDemo from "@/pages/sales-crm/SalesCRMDemo";
import SalonDemo from "@/pages/demos/SalonDemo";
import SchoolERPDemo from "@/pages/demos/SchoolERPDemo";
import SchoolLargeDemo from "@/pages/demos/school/SchoolLargeDemo";
import SchoolMediumDemo from "@/pages/demos/school/SchoolMediumDemo";
import SchoolSmallDemo from "@/pages/demos/school/SchoolSmallDemo";
import SchoolSoftwareDashboard from "@/pages/school-software/SchoolSoftwareDashboard";
import SchoolSoftwareHomepage from "@/pages/school-software/SchoolSoftwareHomepage";
import SectorsBrowse from "@/pages/SectorsBrowse";
import SecurityDemo from "@/pages/demos/SecurityDemo";
import { SecurityProvider } from "@/contexts/SecurityContext";
import ServerManagementPortal from "@/pages/server/ServerManagementPortal";
import SessionExpiredPage from "@/pages/error/SessionExpiredPage";
import SimpleCheckout from "@/pages/SimpleCheckout";
import SimpleDemoList from "@/pages/SimpleDemoList";
import SimpleDemoView from "@/pages/SimpleDemoView";
import SimpleUserDashboard from "@/pages/SimpleUserDashboard";
import SourceCodeProtection from "@/components/security/SourceCodeProtection";
import SubCategoryDemos from "@/pages/SubCategoryDemos";
import SuperAdminLogin from "@/pages/super-admin-system/Login";
import SupportDashboard from "@/pages/SupportDashboard";
import SystemNotificationsInitializer from "@/components/notifications/SystemNotificationsInitializer";
import TelecomDemo from "@/pages/demos/TelecomDemo";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TranslationProvider } from "@/contexts/TranslationContext";
import TravelDemo from "@/pages/demos/TravelDemo";
import UserDashboard from "@/pages/user/UserDashboard";
import { WireframeRoutes } from "@/components/wireframe/WireframeRoutes";
import ControlPanelRouter from "@/pages/control-panel/ControlPanelRouter";
import { TooltipProvider } from "@/components/ui/tooltip";

const queryClient = new QueryClient();

// Stubs for missing components
const BlockingClassCleanup = () => null;
const InteractivityGuard = () => null;
const FranchiseCRM = () => <div>Franchise CRM</div>;
const FranchiseHRM = () => <div>Franchise HRM</div>;
const FranchiseInternalChatPage = () => <div>Franchise Chat</div>;
const FranchiseLeadActivity = () => <div>Franchise Lead Activity</div>;
const FranchiseSEOServices = () => <div>Franchise SEO</div>;
const FranchiseTeamManagement = () => <div>Franchise Team</div>;
const PremiumDemoShowcaseNew = () => <div>Premium Showcase</div>;
const SettingsPage = () => <div>Settings</div>;
// Removed: SuperAdminSystemDashboard stub (redirected to control-panel)

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <DemoTestModeProvider>
        <AnimationProvider>
          <TooltipProvider>
              {/* Disabled to prevent global interaction blocking (login/buttons must always work) */}
              <SourceCodeProtection enabled={false}>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                  <SecurityProvider>
                    <NotificationProvider>
                      <TranslationProvider>
                        <GlobalRealtimeProvider>
                          <InteractivityGuard />
                          <BlockingClassCleanup />
                          <SystemNotificationsInitializer />
                          <GlobalOfferPopup />
                          <FloatingAIChatbotWrapper />
                          <Routes>
                          {/* Public Routes - No login required */}
              <Route path="/" element={<Index />} />
              <Route path="/demos" element={<Index />} />
              <Route path="/explore" element={<Navigate to="/demos" replace />} />
              <Route path="/products" element={<Index />} />
              <Route path="/pricing" element={<SimpleDemoList />} />
              <Route path="/demos/public" element={<PublicDemos />} />
              <Route path="/showcase" element={<PremiumDemoShowcaseNew />} />
              <Route path="/server-portal" element={<RequireAuth><ServerManagementPortal /></RequireAuth>} />
              <Route path="/auth" element={<Auth />} />
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Basic profile route to satisfy header navigation */}
              <Route path="/profile" element={<RequireAuth><SettingsPage /></RequireAuth>} />
              <Route path="/pending-approval" element={<PendingApproval />} />
              <Route path="/settings" element={<RequireAuth><SettingsPage /></RequireAuth>} />
              <Route path="/change-password" element={<RequireAuth><ChangePassword /></RequireAuth>} />
              <Route path="/onboard" element={<Homepage />} />
              <Route path="/onboard/:category" element={<CategoryOnboarding />} />
              <Route path="/apply" element={<SimpleDemoList />} />
              <Route path="/careers" element={<CareerPortal />} />
              <Route path="/join-developer" element={<CareerPortal />} />
              <Route path="/join-influencer" element={<CareerPortal />} />
              <Route path="/jobs" element={<CareerPortal />} />
              {/* Bootstrap is Master-only after initial setup */}
              <Route path="/bootstrap-admins" element={<RequireRole allowed={["master"]} masterOnly><BootstrapAdmins /></RequireRole>} />
              <Route path="/sectors" element={<SectorsBrowse />} />
              <Route path="/sectors/:sectorId/:subCategoryId" element={<SubCategoryDemos />} />
              
              {/* Auto Development Engine */}
              <Route path="/auto-dev" element={<AutoDevEngine />} />
              
              {/* Product Demo Pages - MUST come BEFORE dynamic routes */}
<Route path="/demo/restaurant-pos" element={<RestaurantPOSDemo />} />
              <Route path="/demo/restaurant-small" element={<RestaurantSmallDemo />} />
              <Route path="/demo/restaurant-medium" element={<RestaurantMediumDemo />} />
              <Route path="/demo/restaurant-large" element={<RestaurantLargeDemo />} />
              <Route path="/demo/school-erp" element={<SchoolERPDemo />} />
              <Route path="/demo/school-small" element={<SchoolSmallDemo />} />
              <Route path="/demo/school-medium" element={<SchoolMediumDemo />} />
              <Route path="/demo/school-large" element={<SchoolLargeDemo />} />
              <Route path="/demo/education" element={<EducationDemoHub />} />
              <Route path="/demos/education" element={<EducationDemoHub />} />
              
              {/* School Management Software - LIVE SYSTEM (NOT DEMO) */}
              <Route path="/school-software" element={<SchoolSoftwareHomepage />} />
              <Route path="/school-software/dashboard" element={<SchoolSoftwareDashboard />} />
              <Route path="/demo/hospital-hms" element={<HospitalHMSDemo />} />
              <Route path="/demo/ecommerce-store" element={<EcommerceStoreDemo />} />
              <Route path="/demo/hotel-booking" element={<HotelBookingDemo />} />
              <Route path="/demo/real-estate" element={<RealEstateDemo />} />
              <Route path="/demo/automotive" element={<AutomotiveDemo />} />
              <Route path="/demo/travel" element={<TravelDemo />} />
              <Route path="/demo/finance" element={<FinanceDemo />} />
              <Route path="/demo/manufacturing" element={<ManufacturingDemo />} />
              <Route path="/demo/gym" element={<GymDemo />} />
              <Route path="/demo/salon" element={<SalonDemo />} />
              <Route path="/demo/legal" element={<LegalDemo />} />
              <Route path="/demo/security" element={<SecurityDemo />} />
              <Route path="/demo/telecom" element={<TelecomDemo />} />
              <Route path="/demo/childcare" element={<ChildcareDemo />} />
              <Route path="/demo/petcare" element={<PetCareDemo />} />
              <Route path="/demo/event" element={<EventDemo />} />
              <Route path="/demo/crm" element={<CRMDemo />} />
              <Route path="/demo/logistics" element={<LogisticsDemo />} />
              
              {/* Sales CRM Demo */}
              <Route path="/sales-crm" element={<SalesCRMDemo />} />
              <Route path="/sales-crm/auth" element={<SalesCRMAuthPage />} />
              <Route path="/retail-pos" element={<RetailPOSDemo />} />
              {/* Dynamic Demo Routes - MUST come AFTER specific routes */}
              <Route path="/demo-directory" element={<DemoDirectory />} />
              <Route path="/demo/:demoId" element={<SimpleDemoView />} />
              <Route path="/checkout/:demoId" element={<SimpleCheckout />} />
              <Route path="/user-dashboard" element={<SimpleUserDashboard />} />
              <Route path="/user/dashboard" element={<RequireAuth><UserDashboard /></RequireAuth>} />
              <Route path="/demo-login" element={<DemoLogin />} />
              <Route path="/premium-demos" element={<PremiumDemoShowcase />} />
              
              {/* Client Portal - Public Route */}
              <Route path="/client-portal" element={<ClientPortal />} />
              <Route path="/get-started" element={<ClientPortal />} />

              {/* Global Auth Routes */}
              <Route path="/login" element={<Auth />} />
              <Route path="/role-login" element={<RoleBasedLogin />} />
              <Route path="/register" element={<Navigate to="/auth" replace />} />
              <Route path="/easy-login" element={<EasyAuth />} />
              <Route path="/quick-signup" element={<EasyAuth />} />
              <Route path="/logout" element={<Logout />} />
              <Route path="/otp-verify" element={<OTPVerify />} />
              <Route path="/device-verify" element={<DeviceVerify />} />
              <Route path="/ip-verify" element={<IPVerify />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/reset-password" element={<ResetPassword />} />
              <Route path="/account-suspension" element={<AccountSuspension />} />
              {/* @ts-ignore */}
              <Route path="/access-denied" element={<AccessDenied />} />
              <Route path="/session-expired" element={<SessionExpiredPage />} />

              {/* Old boss/admin routes → redirect to unified control panel */}
              <Route path="/boss-fortress" element={<Navigate to="/login" replace />} />
              <Route path="/boss-register" element={<Navigate to="/login" replace />} />
              <Route path="/boss/login" element={<Navigate to="/login" replace />} />
              <Route path="/owner" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/owner/*" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/softwarewala" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/master-admin" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/master-admin/*" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/master-admin-supreme" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/admin/bulk-users" element={<RequireRole allowed={["boss_owner"]}><BulkUserCreation /></RequireRole>} />
              <Route path="/admin/role-manager" element={<RequireRole allowed={["boss_owner"]}><RoleManagerPage /></RequireRole>} />


              {/* All old direct routes → redirect to /control-panel */}
              <Route path="/area-manager" element={<Navigate to="/control-panel/country-head" replace />} />
              <Route path="/area-manager/*" element={<Navigate to="/control-panel/country-head" replace />} />
              <Route path="/server-manager" element={<Navigate to="/control-panel/server-manager" replace />} />
              <Route path="/server-manager/*" element={<Navigate to="/control-panel/server-manager" replace />} />
              <Route path="/security-command" element={<Navigate to="/control-panel/security" replace />} />
              <Route path="/security-command/*" element={<Navigate to="/control-panel/security" replace />} />
              <Route path="/api-manager" element={<Navigate to="/control-panel/ai-api-manager" replace />} />
              <Route path="/api-manager/*" element={<Navigate to="/control-panel/ai-api-manager" replace />} />
              <Route path="/marketing-manager" element={<Navigate to="/control-panel/marketing-manager" replace />} />
              <Route path="/marketing-manager/*" element={<Navigate to="/control-panel/marketing-manager" replace />} />
              <Route path="/seo-manager" element={<Navigate to="/control-panel/seo-manager" replace />} />
              <Route path="/seo-manager/*" element={<Navigate to="/control-panel/seo-manager" replace />} />
              <Route path="/legal-manager" element={<Navigate to="/control-panel/legal" replace />} />
              <Route path="/legal-manager/*" element={<Navigate to="/control-panel/legal" replace />} />
              <Route path="/ai-ceo" element={<Navigate to="/control-panel/ceo" replace />} />
              <Route path="/ai-ceo/*" element={<Navigate to="/control-panel/ceo" replace />} />
              <Route path="/continent-super-admin" element={<Navigate to="/control-panel/continent" replace />} />
              <Route path="/continent-super-admin/*" element={<Navigate to="/control-panel/continent" replace />} />

              {/* Super Admin Routes → redirect to control panel */}
              <Route path="/admin" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/super-admin" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/super-admin/dashboard" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/super-admin/command-center" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/super-admin/live-tracking" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/super-admin/role-manager" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/super-admin/user-manager" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/super-admin/permission-matrix" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/super-admin/security-center" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/super-admin/demo-manager" element={<Navigate to="/control-panel/demo-manager" replace />} />
              <Route path="/super-admin/product-manager" element={<Navigate to="/control-panel/product-manager" replace />} />
              <Route path="/super-admin/system-settings" element={<Navigate to="/control-panel/settings" replace />} />
              <Route path="/super-admin/system-audit" element={<Navigate to="/control-panel/audit" replace />} />
              <Route path="/super-admin/prime-manager" element={<Navigate to="/control-panel/pro-manager" replace />} />
              <Route path="/super-admin/influencer-manager" element={<Navigate to="/control-panel/influencer-manager" replace />} />
              <Route path="/super-admin/finance-center" element={<Navigate to="/control-panel/finance" replace />} />
              <Route path="/super-admin/support-center" element={<Navigate to="/control-panel/customer-support" replace />} />
              <Route path="/super-admin/ai-billing" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/super-admin/franchise-manager" element={<Navigate to="/control-panel/franchise-manager" replace />} />
              <Route path="/super-admin/compliance-center" element={<Navigate to="/control-panel/legal" replace />} />
              <Route path="/super-admin/performance" element={<Navigate to="/control-panel/boss-panel" replace />} />

              {/* Franchise Routes */}
              <Route path="/franchise" element={<RequireRole allowed={["franchise", "super_admin"]}><FranchiseLayout><FranchiseDashboardPage /></FranchiseLayout></RequireRole>} />
              <Route path="/franchise/dashboard" element={<RequireRole allowed={["franchise", "super_admin"]}><FranchiseLayout><FranchiseDashboardPage /></FranchiseLayout></RequireRole>} />
              <Route path="/franchise/profile" element={<RequireRole allowed={["franchise", "super_admin"]}><FranchiseLayout><FranchiseProfile /></FranchiseLayout></RequireRole>} />
              <Route path="/franchise/wallet" element={<RequireRole allowed={["franchise", "super_admin"]}><FranchiseLayout><FranchiseWalletPage /></FranchiseLayout></RequireRole>} />
              <Route path="/franchise/lead-board" element={<RequireRole allowed={["franchise", "super_admin"]}><FranchiseLayout><FranchiseLeadBoardPage /></FranchiseLayout></RequireRole>} />
              <Route path="/franchise/assign-lead" element={<RequireRole allowed={["franchise", "super_admin"]}><FranchiseLayout><FranchiseAssignLead /></FranchiseLayout></RequireRole>} />
              <Route path="/franchise/demo-request" element={<RequireRole allowed={["franchise", "super_admin"]}><FranchiseLayout><FranchiseDemoRequest /></FranchiseLayout></RequireRole>} />
              <Route path="/franchise/demo-library" element={<RequireRole allowed={["franchise", "super_admin"]}><FranchiseLayout><FranchiseDemoLibraryPage /></FranchiseLayout></RequireRole>} />
              <Route path="/franchise/sales-center" element={<RequireRole allowed={["franchise", "super_admin"]}><FranchiseLayout><FranchiseSalesCenter /></FranchiseLayout></RequireRole>} />
              <Route path="/franchise/performance" element={<RequireRole allowed={["franchise", "super_admin"]}><FranchiseLayout><FranchisePerformancePage /></FranchiseLayout></RequireRole>} />
              <Route path="/franchise/support-ticket" element={<RequireRole allowed={["franchise", "super_admin"]}><FranchiseLayout><FranchiseSupportTicket /></FranchiseLayout></RequireRole>} />
              <Route path="/franchise/internal-chat" element={<RequireRole allowed={["franchise", "super_admin"]}><FranchiseLayout><FranchiseInternalChatPage /></FranchiseLayout></RequireRole>} />
              <Route path="/franchise/training-center" element={<RequireRole allowed={["franchise", "super_admin"]}><FranchiseLayout><FranchiseTrainingCenter /></FranchiseLayout></RequireRole>} />
              <Route path="/franchise/security-panel" element={<RequireRole allowed={["franchise", "super_admin"]}><FranchiseLayout><FranchiseSecurityPanel /></FranchiseLayout></RequireRole>} />
              <Route path="/franchise/seo-services" element={<RequireRole allowed={["franchise", "super_admin"]}><FranchiseLayout><FranchiseSEOServices /></FranchiseLayout></RequireRole>} />
              <Route path="/franchise/team-management" element={<RequireRole allowed={["franchise", "super_admin"]}><FranchiseLayout><FranchiseTeamManagement /></FranchiseLayout></RequireRole>} />
              <Route path="/franchise/crm" element={<RequireRole allowed={["franchise", "super_admin"]}><FranchiseLayout><FranchiseCRM /></FranchiseLayout></RequireRole>} />
              <Route path="/franchise/hrm" element={<RequireRole allowed={["franchise", "super_admin"]}><FranchiseLayout><FranchiseHRM /></FranchiseLayout></RequireRole>} />
              <Route path="/franchise/lead-activity" element={<RequireRole allowed={["franchise", "super_admin"]}><FranchiseLayout><FranchiseLeadActivity /></FranchiseLayout></RequireRole>} />
              <Route path="/franchise-program" element={<FranchiseLanding />} />
              <Route path="/franchise-landing" element={<FranchiseLanding />} />
              <Route path="/franchise-dashboard" element={<Navigate to="/control-panel/franchise" replace />} />

              {/* Reseller Routes - keep main, redirect duplicates */}
              <Route path="/reseller" element={<Navigate to="/control-panel/reseller" replace />} />
              <Route path="/reseller/dashboard" element={<Navigate to="/control-panel/reseller" replace />} />
              <Route path="/reseller/portal" element={<Navigate to="/control-panel/reseller" replace />} />
              <Route path="/reseller-portal" element={<Navigate to="/control-panel/reseller" replace />} />
              <Route path="/reseller-program" element={<ResellerLanding />} />
              <Route path="/reseller-landing" element={<ResellerLanding />} />
              <Route path="/reseller-dashboard" element={<Navigate to="/control-panel/reseller" replace />} />

              {/* Developer Routes - keep register, redirect duplicates */}
              <Route path="/developer/register" element={<RequireAuth><DeveloperRegistration /></RequireAuth>} />
              <Route path="/developer/registration" element={<RequireAuth><DeveloperRegistration /></RequireAuth>} />
              <Route path="/developer" element={<Navigate to="/control-panel/developer" replace />} />
              <Route path="/developer/dashboard" element={<Navigate to="/control-panel/developer" replace />} />
              <Route path="/developer-dashboard" element={<Navigate to="/control-panel/developer" replace />} />
              <Route path="/dev-command-center" element={<Navigate to="/control-panel/developer" replace />} />

              {/* Influencer Routes → redirects */}
              <Route path="/influencer" element={<Navigate to="/control-panel/influencer" replace />} />
              <Route path="/influencer/dashboard" element={<Navigate to="/control-panel/influencer" replace />} />
              <Route path="/influencer/command-center" element={<Navigate to="/control-panel/influencer" replace />} />
              <Route path="/influencer-command-center" element={<Navigate to="/control-panel/influencer" replace />} />
              <Route path="/influencer-dashboard" element={<Navigate to="/control-panel/influencer" replace />} />
              <Route path="/influencer-manager" element={<Navigate to="/control-panel/influencer-manager" replace />} />
              <Route path="/influencer-manager-secure" element={<Navigate to="/control-panel/influencer-manager" replace />} />
              
              {/* Product Demo Manager → redirect */}
              <Route path="/product-demo-manager" element={<Navigate to="/control-panel/demo-manager" replace />} />
              <Route path="/product-demo-manager/*" element={<Navigate to="/control-panel/demo-manager" replace />} />

              {/* Reseller Manager → redirect */}
              <Route path="/reseller-manager" element={<Navigate to="/control-panel/reseller-manager" replace />} />
              <Route path="/reseller-manager-secure" element={<Navigate to="/control-panel/reseller-manager" replace />} />
              
              {/* Sales Support → redirect */}
              <Route path="/sales-support-manager" element={<Navigate to="/control-panel/sales-manager" replace />} />
              <Route path="/sales-support-manager-secure" element={<Navigate to="/control-panel/sales-manager" replace />} />
              
              {/* Public demo route for Influencer Command Center */}
              <Route path="/demo/influencer-command-center" element={<InfluencerCommandCenter />} />
              {/* Prime User → redirect */}
              <Route path="/prime" element={<Navigate to="/control-panel/pro-manager" replace />} />
              <Route path="/prime/dashboard" element={<Navigate to="/control-panel/pro-manager" replace />} />
              <Route path="/prime-user" element={<Navigate to="/control-panel/pro-manager" replace />} />

              {/* All manager routes → redirect to /control-panel */}
              <Route path="/lead-manager" element={<Navigate to="/control-panel/lead-manager" replace />} />
              <Route path="/leads/*" element={<Navigate to="/control-panel/lead-manager" replace />} />
              <Route path="/task-manager" element={<Navigate to="/control-panel/task-manager" replace />} />
              <Route path="/tasks/*" element={<Navigate to="/control-panel/task-manager" replace />} />
              <Route path="/task-manager-secure" element={<Navigate to="/control-panel/task-manager" replace />} />
              <Route path="/demo-manager" element={<Navigate to="/control-panel/demo-manager" replace />} />
              <Route path="/demo-manager/*" element={<Navigate to="/control-panel/demo-manager" replace />} />
              <Route path="/demo" element={<Navigate to="/control-panel/demo-manager" replace />} />
              <Route path="/finance" element={<Navigate to="/control-panel/finance" replace />} />
              <Route path="/finance/*" element={<Navigate to="/control-panel/finance" replace />} />
              <Route path="/legal" element={<Navigate to="/control-panel/legal" replace />} />
              <Route path="/legal-manager-secure" element={<Navigate to="/control-panel/legal" replace />} />
              <Route path="/marketing" element={<Navigate to="/control-panel/marketing-manager" replace />} />
              <Route path="/marketing/*" element={<Navigate to="/control-panel/marketing-manager" replace />} />
              <Route path="/enterprise/marketing" element={<Navigate to="/control-panel/marketing-manager" replace />} />
              <Route path="/enterprise/marketing/*" element={<Navigate to="/control-panel/marketing-manager" replace />} />
              <Route path="/performance" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/performance/*" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/rnd-dashboard" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/rnd/*" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/hr" element={<Navigate to="/control-panel/hr" replace />} />
              <Route path="/hr/*" element={<Navigate to="/control-panel/hr" replace />} />
              <Route path="/hr-dashboard" element={<Navigate to="/control-panel/hr" replace />} />
              <Route path="/seo" element={<Navigate to="/control-panel/seo-manager" replace />} />
              <Route path="/seo/*" element={<Navigate to="/control-panel/seo-manager" replace />} />
              <Route path="/seo-dashboard" element={<Navigate to="/control-panel/seo-manager" replace />} />
              <Route path="/seo-manager" element={<Navigate to="/control-panel/seo-manager" replace />} />
              <Route path="/support" element={<Navigate to="/control-panel/customer-support" replace />} />
              <Route path="/support/*" element={<Navigate to="/control-panel/customer-support" replace />} />
              <Route path="/support-dashboard" element={<Navigate to="/control-panel/customer-support" replace />} />
              <Route path="/sales-support" element={<Navigate to="/control-panel/sales-manager" replace />} />
              <Route path="/sales" element={<Navigate to="/control-panel/sales-manager" replace />} />
              <Route path="/sales/*" element={<Navigate to="/control-panel/sales-manager" replace />} />
              <Route path="/client-success" element={<Navigate to="/control-panel/customer-support" replace />} />
              <Route path="/clients/*" element={<Navigate to="/control-panel/customer-support" replace />} />
              <Route path="/incident-crisis" element={<Navigate to="/control-panel/security" replace />} />
              <Route path="/crisis/*" element={<Navigate to="/control-panel/security" replace />} />
              <Route path="/ai/*" element={<Navigate to="/control-panel/ai-api-manager" replace />} />

              {/* Roles 25-28 → redirect */}
              <Route path="/safe-assist" element={<Navigate to="/control-panel/assist-manager" replace />} />
              <Route path="/safe-assist/*" element={<Navigate to="/control-panel/assist-manager" replace />} />
              <Route path="/assist-manager" element={<Navigate to="/control-panel/assist-manager" replace />} />
              <Route path="/assist-manager/*" element={<Navigate to="/control-panel/assist-manager" replace />} />
              <Route path="/promise-tracker" element={<Navigate to="/control-panel/promise-tracker" replace />} />
              <Route path="/promise-tracker/*" element={<Navigate to="/control-panel/promise-tracker" replace />} />
              <Route path="/promise-management" element={<Navigate to="/control-panel/promise-tracker" replace />} />
              <Route path="/promise-management/*" element={<Navigate to="/control-panel/promise-tracker" replace />} />

              {/* System Routes → redirect */}
              <Route path="/system-settings" element={<Navigate to="/control-panel/settings" replace />} />
              <Route path="/buzzer-console" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/api-integrations" element={<Navigate to="/control-panel/ai-api-manager" replace />} />
              <Route path="/internal-chat" element={<RequireAuth><InternalChat /></RequireAuth>} />
              <Route path="/personal-chat" element={<RequireAuth><PersonalChat /></RequireAuth>} />
              <Route path="/ai-console" element={<Navigate to="/control-panel/ai-api-manager" replace />} />
              <Route path="/demo-credentials" element={<Navigate to="/control-panel/demo-manager" replace />} />
              <Route path="/demo-order-system" element={<Navigate to="/control-panel/demo-manager" replace />} />

              {/* Vala → redirect */}
              <Route path="/vala-control" element={<Navigate to="/control-panel/vala-ai" replace />} />
              <Route path="/vala-control/*" element={<Navigate to="/control-panel/vala-ai" replace />} />
              <Route path="/enterprise-control" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/vala" element={<Navigate to="/control-panel/vala-ai" replace />} />
              <Route path="/vala/*" element={<Navigate to="/control-panel/vala-ai" replace />} />

              {/* Dev/HR Manager → redirect */}
              <Route path="/dev-manager" element={<Navigate to="/control-panel/development-manager" replace />} />
              <Route path="/hr-manager" element={<Navigate to="/control-panel/hr" replace />} />

              {/* Wireframe Routes - Design Sandbox */}
              <Route path="/wireframe/*" element={<WireframeRoutes />} />

              {/* Dashboard aliases → control panel redirects */}
              <Route path="/boss/dashboard" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/ceo/dashboard" element={<Navigate to="/control-panel/ceo" replace />} />
              <Route path="/admin/dashboard" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/continent/dashboard" element={<Navigate to="/control-panel/continent" replace />} />
              <Route path="/country/dashboard" element={<Navigate to="/control-panel/country-head" replace />} />

              <Route path="/super-admin-system" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/super-admin-system/rc" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/super-admin-system/role-center" element={<Navigate to="/control-panel/boss-panel" replace />} />

              <Route path="/super-admin-system/login" element={<SuperAdminLogin />} />
              {/* Role switcher - needed by ControlPanelRouter */}
              <Route path="/super-admin-system/role-switch" element={<RequireRole allowed={['boss_owner', 'ceo', 'admin', 'super_admin', 'master', 'continent_super_admin', 'country_head']}><RoleSwitchDashboard /></RequireRole>} />
              <Route path="/super-admin-system/role-switch/*" element={<RequireRole allowed={['boss_owner', 'ceo', 'admin', 'super_admin', 'master', 'continent_super_admin', 'country_head']}><RoleSwitchDashboard /></RequireRole>} />
              <Route path="/super-admin-system/dashboard" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/super-admin-system/users" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/super-admin-system/admins" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/super-admin-system/roles" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/super-admin-system/geography" element={<Navigate to="/control-panel/country-head" replace />} />
              <Route path="/super-admin-system/modules" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/super-admin-system/rentals" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/super-admin-system/rules" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/super-admin-system/approvals" element={<Navigate to="/control-panel/boss-panel" replace />} />
              <Route path="/super-admin-system/security" element={<Navigate to="/control-panel/security" replace />} />
              <Route path="/super-admin-system/locks" element={<Navigate to="/control-panel/security" replace />} />
              <Route path="/super-admin-system/activity-log" element={<Navigate to="/control-panel/audit" replace />} />
              <Route path="/super-admin-system/audit" element={<Navigate to="/control-panel/audit" replace />} />

              {/* Leader Security Assessment */}
              <Route path="/leader-security" element={<LeaderSecurityAssessment />} />

              {/* Bulk Actions Reference */}
              <Route path="/bulk-actions" element={<BulkActionsReference />} />

              {/* UNIFIED CONTROL PANEL ROUTES - All modules via /control-panel/:module */}
              <Route path="/control-panel" element={<RequireAuth><ControlPanelRouter /></RequireAuth>} />
              <Route path="/control-panel/:module" element={<RequireAuth><ControlPanelRouter /></RequireAuth>} />

              {/* Catch-all */}
                          <Route path="*" element={<NotFound />} />
                        </Routes>
                        <AdminQuickAccess />
                        <QuickSupport />
                        {/* Button Audit Overlay - DEV MODE ONLY */}
                        <ButtonAuditOverlay enabled={import.meta.env.DEV} />
                        </GlobalRealtimeProvider>
                      </TranslationProvider>
                    </NotificationProvider>
                  </SecurityProvider>
                </BrowserRouter>
              </SourceCodeProtection>
          </TooltipProvider>
        </AnimationProvider>
      </DemoTestModeProvider>
    </AuthProvider>
  </QueryClientProvider>
);


export default App;
