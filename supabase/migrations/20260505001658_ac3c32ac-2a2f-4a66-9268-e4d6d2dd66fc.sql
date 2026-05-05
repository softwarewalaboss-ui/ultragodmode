
-- Expand products table
ALTER TABLE public.products
  ADD COLUMN IF NOT EXISTS slug TEXT UNIQUE,
  ADD COLUMN IF NOT EXISTS short_description TEXT,
  ADD COLUMN IF NOT EXISTS tags TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS discount_price NUMERIC DEFAULT 0,
  ADD COLUMN IF NOT EXISTS gallery_urls TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS preview_urls TEXT[] DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS main_file_url TEXT,
  ADD COLUMN IF NOT EXISTS additional_files JSONB DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS version TEXT DEFAULT 'v1.0',
  ADD COLUMN IF NOT EXISTS changelog TEXT,
  ADD COLUMN IF NOT EXISTS demo_type TEXT,
  ADD COLUMN IF NOT EXISTS demo_url TEXT,
  ADD COLUMN IF NOT EXISTS demo_embed TEXT,
  ADD COLUMN IF NOT EXISTS demo_video_url TEXT,
  ADD COLUMN IF NOT EXISTS demo_credentials JSONB DEFAULT '{}'::jsonb,
  ADD COLUMN IF NOT EXISTS documentation_url TEXT,
  ADD COLUMN IF NOT EXISTS support_url TEXT,
  ADD COLUMN IF NOT EXISTS meta_title TEXT,
  ADD COLUMN IF NOT EXISTS meta_description TEXT,
  ADD COLUMN IF NOT EXISTS meta_keywords TEXT,
  ADD COLUMN IF NOT EXISTS is_featured BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS is_free BOOLEAN DEFAULT false,
  ADD COLUMN IF NOT EXISTS license_type TEXT DEFAULT 'standard',
  ADD COLUMN IF NOT EXISTS compatibility TEXT;

-- Storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES ('product-media', 'product-media', true)
  ON CONFLICT (id) DO NOTHING;
INSERT INTO storage.buckets (id, name, public) VALUES ('product-files', 'product-files', false)
  ON CONFLICT (id) DO NOTHING;

-- Storage policies: product-media (public read, auth write to own folder)
CREATE POLICY "Public can view product media" ON storage.objects
  FOR SELECT USING (bucket_id = 'product-media');
CREATE POLICY "Auth can upload product media" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'product-media' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Auth can update own product media" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'product-media' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Auth can delete own product media" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'product-media' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Storage policies: product-files (private, owner-only read/write)
CREATE POLICY "Auth can view own product files" ON storage.objects
  FOR SELECT TO authenticated USING (bucket_id = 'product-files' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Auth can upload product files" ON storage.objects
  FOR INSERT TO authenticated WITH CHECK (bucket_id = 'product-files' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Auth can update own product files" ON storage.objects
  FOR UPDATE TO authenticated USING (bucket_id = 'product-files' AND auth.uid()::text = (storage.foldername(name))[1]);
CREATE POLICY "Auth can delete own product files" ON storage.objects
  FOR DELETE TO authenticated USING (bucket_id = 'product-files' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Seed subcategories (3 per category)
INSERT INTO public.business_subcategories (category_id, name, slug, display_order)
SELECT c.id, s.name, s.slug, s.ord
FROM public.business_categories c
CROSS JOIN LATERAL (
  VALUES
    ('Standard', c.slug || '-standard', 1),
    ('Premium', c.slug || '-premium', 2),
    ('Enterprise', c.slug || '-enterprise', 3)
) AS s(name, slug, ord)
WHERE NOT EXISTS (
  SELECT 1 FROM public.business_subcategories bs WHERE bs.category_id = c.id
);
