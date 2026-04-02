import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const DEMO_PASSWORD = "demo123456";

const DEMO_ROLES = [
  { role: "boss_owner", email: "boss@softwarewala.net", name: "Boss Owner" },
  { role: "master", email: "master@softwarewala.net", name: "Master Admin" },
  { role: "super_admin", email: "superadmin@softwarewala.net", name: "Super Admin" },
  { role: "ceo", email: "ceo@softwarewala.net", name: "CEO" },
  { role: "admin", email: "admin@softwarewala.net", name: "Admin" },
  { role: "server_manager", email: "server@softwarewala.net", name: "Server Manager" },
  { role: "ai_manager", email: "ai@softwarewala.net", name: "AI Manager" },
  { role: "api_security", email: "api@softwarewala.net", name: "API Security" },
  { role: "finance_manager", email: "finance@softwarewala.net", name: "Finance Manager" },
  { role: "lead_manager", email: "leads@softwarewala.net", name: "Lead Manager" },
  { role: "marketing_manager", email: "marketing@softwarewala.net", name: "Marketing Manager" },
  { role: "seo_manager", email: "seo@softwarewala.net", name: "SEO Manager" },
  { role: "support", email: "support@softwarewala.net", name: "Support Agent" },
  { role: "client_success", email: "cs@softwarewala.net", name: "Client Success" },
  { role: "performance_manager", email: "performance@softwarewala.net", name: "Performance Manager" },
  { role: "task_manager", email: "tasks@softwarewala.net", name: "Task Manager" },
  { role: "franchise", email: "franchise@softwarewala.net", name: "Franchise Owner" },
  { role: "reseller", email: "reseller@softwarewala.net", name: "Reseller" },
  { role: "reseller_manager", email: "resellermgr@softwarewala.net", name: "Reseller Manager" },
  { role: "influencer", email: "influencer@softwarewala.net", name: "Influencer" },
  { role: "developer", email: "dev@softwarewala.net", name: "Developer" },
  { role: "legal_compliance", email: "legal@softwarewala.net", name: "Legal Manager" },
  { role: "hr_manager", email: "hr@softwarewala.net", name: "HR Manager" },
  { role: "demo_manager", email: "demo@softwarewala.net", name: "Demo Manager" },
  { role: "product_demo_manager", email: "product@softwarewala.net", name: "Product Manager" },
  { role: "prime", email: "prime@softwarewala.net", name: "Prime User" },
  { role: "user", email: "user@softwarewala.net", name: "User" },
  { role: "client", email: "client@softwarewala.net", name: "Client" },
  { role: "continent_super_admin", email: "continent@softwarewala.net", name: "Continent Admin" },
  { role: "country_head", email: "country@softwarewala.net", name: "Country Head" },
  { role: "area_manager", email: "area@softwarewala.net", name: "Area Manager" },
  { role: "r_and_d", email: "rnd@softwarewala.net", name: "R&D Manager" },
  { role: "safe_assist", email: "assist@softwarewala.net", name: "Safe Assist" },
  { role: "promise_tracker", email: "promise@softwarewala.net", name: "Promise Tracker" },
];

Deno.serve(async (req) => {
  const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
  };

  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!,
      { auth: { autoRefreshToken: false, persistSession: false } }
    );

    const results = [];

    for (const demo of DEMO_ROLES) {
      // Check if user exists
      const { data: existingUsers } = await supabaseAdmin.auth.admin.listUsers();
      const existing = existingUsers?.users?.find((u: any) => u.email === demo.email);

      let userId: string;

      if (existing) {
        userId = existing.id;
        results.push({ email: demo.email, status: "exists" });
      } else {
        const { data, error } = await supabaseAdmin.auth.admin.createUser({
          email: demo.email,
          password: DEMO_PASSWORD,
          email_confirm: true,
          user_metadata: { full_name: demo.name, role: demo.role },
        });

        if (error) {
          results.push({ email: demo.email, status: "error", error: error.message });
          continue;
        }
        userId = data.user.id;
        results.push({ email: demo.email, status: "created" });
      }

      // Upsert role
      await supabaseAdmin.from("user_roles").upsert(
        { user_id: userId, role: demo.role, approval_status: "approved" },
        { onConflict: "user_id,role" }
      );
    }

    return new Response(JSON.stringify({ success: true, results }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
