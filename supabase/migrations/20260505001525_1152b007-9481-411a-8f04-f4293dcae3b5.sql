
-- Helper function for timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER LANGUAGE plpgsql SET search_path = public AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END;
$$;

-- CATEGORIES
CREATE TABLE IF NOT EXISTS public.business_categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  slug TEXT UNIQUE,
  description TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.business_subcategories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category_id UUID REFERENCES public.business_categories(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  slug TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.business_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.business_subcategories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active categories" ON public.business_categories FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage categories" ON public.business_categories FOR ALL USING (has_role(auth.uid(), 'boss_owner'::app_role));
CREATE POLICY "Anyone can view active subcategories" ON public.business_subcategories FOR SELECT USING (is_active = true);
CREATE POLICY "Admins manage subcategories" ON public.business_subcategories FOR ALL USING (has_role(auth.uid(), 'boss_owner'::app_role));

-- PRODUCTS
CREATE TABLE IF NOT EXISTS public.products (
  product_id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_name TEXT NOT NULL,
  product_type TEXT DEFAULT 'software',
  description TEXT,
  category TEXT,
  business_category_id UUID,
  subcategory_id UUID,
  pricing_model TEXT DEFAULT 'one_time',
  lifetime_price NUMERIC DEFAULT 0,
  monthly_price NUMERIC DEFAULT 0,
  status TEXT DEFAULT 'draft',
  is_active BOOLEAN DEFAULT true,
  visibility TEXT DEFAULT 'global',
  thumbnail_url TEXT,
  features_json JSONB DEFAULT '[]'::jsonb,
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active products" ON public.products FOR SELECT USING (is_active = true OR auth.uid() = created_by);
CREATE POLICY "Authenticated can create products" ON public.products FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Owner or admin can update products" ON public.products FOR UPDATE USING (auth.uid() = created_by OR has_role(auth.uid(), 'boss_owner'::app_role));
CREATE POLICY "Admin can delete products" ON public.products FOR DELETE USING (has_role(auth.uid(), 'boss_owner'::app_role));

-- DEMOS
CREATE TABLE IF NOT EXISTS public.demos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT,
  url TEXT,
  category TEXT,
  thumbnail_url TEXT,
  status TEXT DEFAULT 'active',
  created_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

ALTER TABLE public.demos ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view active demos" ON public.demos FOR SELECT USING (status = 'active' OR auth.uid() = created_by);
CREATE POLICY "Authenticated can create demos" ON public.demos FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Owner or admin can update demos" ON public.demos FOR UPDATE USING (auth.uid() = created_by OR has_role(auth.uid(), 'boss_owner'::app_role));
CREATE POLICY "Admin can delete demos" ON public.demos FOR DELETE USING (has_role(auth.uid(), 'boss_owner'::app_role));

-- MAPPINGS
CREATE TABLE IF NOT EXISTS public.product_demo_mappings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID NOT NULL,
  demo_id UUID NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE(product_id, demo_id)
);
ALTER TABLE public.product_demo_mappings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can view mappings" ON public.product_demo_mappings FOR SELECT USING (true);
CREATE POLICY "Authenticated manage mappings" ON public.product_demo_mappings FOR ALL TO authenticated USING (true) WITH CHECK (true);

-- ACTION LOGS
CREATE TABLE IF NOT EXISTS public.product_action_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID,
  product_name TEXT,
  action TEXT NOT NULL,
  action_details JSONB DEFAULT '{}'::jsonb,
  performed_by UUID,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.product_action_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Authenticated can insert logs" ON public.product_action_logs FOR INSERT TO authenticated WITH CHECK (true);
CREATE POLICY "Admin can view logs" ON public.product_action_logs FOR SELECT USING (has_role(auth.uid(), 'boss_owner'::app_role) OR auth.uid() = performed_by);

-- TRIGGERS
CREATE TRIGGER trg_business_categories_updated BEFORE UPDATE ON public.business_categories FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_products_updated BEFORE UPDATE ON public.products FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER trg_demos_updated BEFORE UPDATE ON public.demos FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- SEED CATEGORIES
INSERT INTO public.business_categories (name, slug, display_order) VALUES
  ('Retail & POS', 'retail-pos', 1),
  ('Restaurant', 'restaurant', 2),
  ('Hospitality', 'hospitality', 3),
  ('Healthcare', 'healthcare', 4),
  ('Education', 'education', 5),
  ('HR & Payroll', 'hr-payroll', 6),
  ('Accounting & Finance', 'accounting', 7),
  ('CRM & Sales', 'crm-sales', 8),
  ('Inventory', 'inventory', 9),
  ('Other', 'other', 10)
ON CONFLICT (slug) DO NOTHING;
