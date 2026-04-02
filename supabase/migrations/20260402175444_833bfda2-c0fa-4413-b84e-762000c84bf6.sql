
-- Developers table
CREATE TABLE public.developers (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  github_username TEXT,
  skills TEXT[],
  experience_level TEXT DEFAULT 'junior',
  hourly_rate NUMERIC DEFAULT 0,
  availability_status TEXT DEFAULT 'available',
  total_tasks_completed INTEGER DEFAULT 0,
  rating NUMERIC DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Franchise accounts
CREATE TABLE public.franchise_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  franchise_name TEXT NOT NULL,
  territory TEXT,
  country TEXT,
  city TEXT,
  status TEXT DEFAULT 'pending',
  commission_rate NUMERIC DEFAULT 15,
  total_revenue NUMERIC DEFAULT 0,
  total_clients INTEGER DEFAULT 0,
  license_key TEXT,
  activated_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Reseller accounts
CREATE TABLE public.reseller_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  company_name TEXT,
  reseller_type TEXT DEFAULT 'standard',
  commission_rate NUMERIC DEFAULT 20,
  total_sales NUMERIC DEFAULT 0,
  active_licenses INTEGER DEFAULT 0,
  status TEXT DEFAULT 'pending',
  parent_reseller_id UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Influencer accounts
CREATE TABLE public.influencer_accounts (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  platform TEXT,
  followers_count INTEGER DEFAULT 0,
  referral_code TEXT UNIQUE,
  total_referrals INTEGER DEFAULT 0,
  total_earnings NUMERIC DEFAULT 0,
  commission_rate NUMERIC DEFAULT 10,
  status TEXT DEFAULT 'active',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Audit logs
CREATE TABLE public.audit_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID,
  module TEXT,
  action TEXT NOT NULL,
  role TEXT,
  meta_json JSONB DEFAULT '{}'::jsonb,
  ip_address TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Software catalog (marketplace)
CREATE TABLE public.software_catalog (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  category TEXT,
  price NUMERIC DEFAULT 0,
  license_type TEXT DEFAULT 'subscription',
  status TEXT DEFAULT 'draft',
  version TEXT DEFAULT '1.0.0',
  downloads INTEGER DEFAULT 0,
  rating NUMERIC DEFAULT 0,
  thumbnail_url TEXT,
  demo_url TEXT,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Licenses
CREATE TABLE public.licenses (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  software_id UUID REFERENCES public.software_catalog(id),
  user_id UUID,
  license_key TEXT UNIQUE NOT NULL,
  license_type TEXT DEFAULT 'standard',
  status TEXT DEFAULT 'active',
  device_id TEXT,
  activated_at TIMESTAMPTZ,
  expires_at TIMESTAMPTZ,
  max_devices INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Support tickets
CREATE TABLE public.support_tickets (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL,
  assigned_to UUID,
  subject TEXT NOT NULL,
  description TEXT,
  priority TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'open',
  category TEXT,
  resolved_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Tasks
CREATE TABLE public.tasks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  assigned_to UUID,
  created_by UUID,
  project TEXT,
  priority TEXT DEFAULT 'medium',
  status TEXT DEFAULT 'todo',
  due_date TIMESTAMPTZ,
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.developers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.franchise_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.reseller_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.influencer_accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.software_catalog ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.licenses ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;

-- RLS: Users can view own records
CREATE POLICY "Users can view own developer profile" ON public.developers FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own developer profile" ON public.developers FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own developer profile" ON public.developers FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own franchise" ON public.franchise_accounts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own franchise" ON public.franchise_accounts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own franchise" ON public.franchise_accounts FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own reseller account" ON public.reseller_accounts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own reseller account" ON public.reseller_accounts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own reseller account" ON public.reseller_accounts FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can view own influencer account" ON public.influencer_accounts FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own influencer account" ON public.influencer_accounts FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own influencer account" ON public.influencer_accounts FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Audit logs: users can view own, admins can view all
CREATE POLICY "Users can view own audit logs" ON public.audit_logs FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can view all audit logs" ON public.audit_logs FOR SELECT USING (has_role(auth.uid(), 'boss_owner'::app_role));
CREATE POLICY "System can insert audit logs" ON public.audit_logs FOR INSERT WITH CHECK (true);

-- Software catalog: public read, admin write
CREATE POLICY "Anyone can view published software" ON public.software_catalog FOR SELECT USING (status = 'published' OR auth.uid() = created_by);
CREATE POLICY "Admins can manage software" ON public.software_catalog FOR ALL USING (has_role(auth.uid(), 'boss_owner'::app_role));

-- Licenses: users view own
CREATE POLICY "Users can view own licenses" ON public.licenses FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage licenses" ON public.licenses FOR ALL USING (has_role(auth.uid(), 'boss_owner'::app_role));

-- Support tickets: users view own, support staff view all
CREATE POLICY "Users can view own tickets" ON public.support_tickets FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can create tickets" ON public.support_tickets FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Support can view all tickets" ON public.support_tickets FOR SELECT USING (has_role(auth.uid(), 'support'::app_role));
CREATE POLICY "Admins can manage tickets" ON public.support_tickets FOR ALL USING (has_role(auth.uid(), 'boss_owner'::app_role));

-- Tasks: assigned user and creator can view
CREATE POLICY "Users can view assigned tasks" ON public.tasks FOR SELECT USING (auth.uid() = assigned_to OR auth.uid() = created_by);
CREATE POLICY "Users can create tasks" ON public.tasks FOR INSERT WITH CHECK (auth.uid() = created_by);
CREATE POLICY "Users can update own tasks" ON public.tasks FOR UPDATE USING (auth.uid() = assigned_to OR auth.uid() = created_by);
CREATE POLICY "Admins can manage all tasks" ON public.tasks FOR ALL USING (has_role(auth.uid(), 'boss_owner'::app_role));

-- Admin policies for role-specific tables
CREATE POLICY "Admins can manage developers" ON public.developers FOR ALL USING (has_role(auth.uid(), 'boss_owner'::app_role));
CREATE POLICY "Admins can manage franchises" ON public.franchise_accounts FOR ALL USING (has_role(auth.uid(), 'boss_owner'::app_role));
CREATE POLICY "Admins can manage resellers" ON public.reseller_accounts FOR ALL USING (has_role(auth.uid(), 'boss_owner'::app_role));
CREATE POLICY "Admins can manage influencers" ON public.influencer_accounts FOR ALL USING (has_role(auth.uid(), 'boss_owner'::app_role));
