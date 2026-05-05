// @ts-nocheck
import { useState, useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Package,
  Plus,
  Loader2,
  Upload,
  X,
  Image as ImageIcon,
  FileArchive,
  PlayCircle,
  Search,
  Link as LinkIcon,
} from "lucide-react";
import { useQuery } from "@tanstack/react-query";

const productSchema = z.object({
  product_name: z.string().min(3, "Product name must be at least 3 characters").max(200),
  slug: z.string().min(3, "Slug required").max(200).regex(/^[a-z0-9-]+$/, "Lowercase letters, numbers and dashes only"),
  business_category_id: z.string().min(1, "Category is required"),
  subcategory_id: z.string().optional(),
  short_description: z.string().max(280).optional(),
  description: z.string().optional(),
  pricing_model: z.string().min(1, "Pricing plan is required"),
  lifetime_price: z.number().min(0).optional(),
  monthly_price: z.number().min(0).optional(),
  discount_price: z.number().min(0).optional(),
  status: z.string().default("draft"),
  visibility: z.string().default("global"),
  version: z.string().optional(),
  changelog: z.string().optional(),
  demo_type: z.string().optional(),
  demo_url: z.string().url().optional().or(z.literal("")),
  demo_embed: z.string().optional(),
  demo_video_url: z.string().url().optional().or(z.literal("")),
  demo_username: z.string().optional(),
  demo_password: z.string().optional(),
  documentation_url: z.string().url().optional().or(z.literal("")),
  support_url: z.string().url().optional().or(z.literal("")),
  meta_title: z.string().max(60).optional(),
  meta_description: z.string().max(160).optional(),
  meta_keywords: z.string().optional(),
  is_featured: z.boolean().default(false),
  is_free: z.boolean().default(false),
  license_type: z.string().default("standard"),
  compatibility: z.string().optional(),
});

type ProductFormData = z.infer<typeof productSchema>;

const featureOptions = [
  "Multi-user Support", "API Access", "Custom Branding", "Analytics Dashboard",
  "Export Reports", "Priority Support", "Mobile App", "Integrations",
];

const slugify = (s: string) =>
  s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80);

interface AddProductProps {
  onSuccess: () => void;
  onCancel?: () => void;
}

const AddProduct = ({ onSuccess, onCancel }: AddProductProps) => {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [tags, setTags] = useState<string[]>([]);
  const [tagInput, setTagInput] = useState("");
  const [thumbnail, setThumbnail] = useState<{ file?: File; url?: string }>({});
  const [gallery, setGallery] = useState<{ file?: File; url?: string }[]>([]);
  const [mainFile, setMainFile] = useState<{ file?: File; url?: string; name?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [slugChecking, setSlugChecking] = useState(false);
  const [slugAvailable, setSlugAvailable] = useState<boolean | null>(null);

  const { data: categories = [] } = useQuery({
    queryKey: ["business-categories"],
    queryFn: async () => {
      const { data } = await supabase
        .from("business_categories")
        .select("id, name")
        .eq("is_active", true)
        .order("display_order");
      return data || [];
    },
  });

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      visibility: "global",
      status: "draft",
      license_type: "standard",
      is_featured: false,
      is_free: false,
      version: "v1.0",
    },
  });

  const watchedName = watch("product_name");
  const watchedSlug = watch("slug");
  const watchedCategory = watch("business_category_id");
  const watchedDemoType = watch("demo_type");
  const watchedIsFree = watch("is_free");

  // Auto-generate slug from name
  useEffect(() => {
    if (watchedName && !watchedSlug) {
      setValue("slug", slugify(watchedName));
    }
  }, [watchedName]);

  // Slug uniqueness check
  useEffect(() => {
    if (!watchedSlug || watchedSlug.length < 3) {
      setSlugAvailable(null);
      return;
    }
    const t = setTimeout(async () => {
      setSlugChecking(true);
      const { data } = await supabase.from("products").select("product_id").eq("slug", watchedSlug).maybeSingle();
      setSlugAvailable(!data);
      setSlugChecking(false);
    }, 400);
    return () => clearTimeout(t);
  }, [watchedSlug]);

  // Subcategories cascade
  const { data: subcategories = [] } = useQuery({
    queryKey: ["business-subcategories", watchedCategory],
    enabled: !!watchedCategory,
    queryFn: async () => {
      const { data } = await supabase
        .from("business_subcategories")
        .select("id, name")
        .eq("category_id", watchedCategory)
        .eq("is_active", true)
        .order("display_order");
      return data || [];
    },
  });

  const addTag = () => {
    const t = tagInput.trim();
    if (t && !tags.includes(t) && tags.length < 20) setTags([...tags, t]);
    setTagInput("");
  };

  const uploadToBucket = async (bucket: string, file: File, userId: string) => {
    const ext = file.name.split(".").pop();
    const path = `${userId}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { error } = await supabase.storage.from(bucket).upload(path, file, { upsert: false });
    if (error) throw new Error(`Upload failed: ${error.message}`);
    if (bucket === "product-media") {
      return supabase.storage.from(bucket).getPublicUrl(path).data.publicUrl;
    }
    return path; // private bucket: store path
  };

  const onSubmit = async (data: ProductFormData) => {
    if (slugAvailable === false) {
      toast.error("Slug is already taken");
      return;
    }
    setIsSubmitting(true);
    try {
      const { data: userRes } = await supabase.auth.getUser();
      const userId = userRes?.user?.id;
      if (!userId) {
        toast.error("Please sign in to add a product");
        setIsSubmitting(false);
        return;
      }

      // Uploads
      let thumbnailUrl = thumbnail.url;
      let galleryUrls: string[] = [];
      let mainFileUrl: string | undefined;

      if (thumbnail.file) {
        setUploadProgress("Uploading thumbnail...");
        thumbnailUrl = await uploadToBucket("product-media", thumbnail.file, userId);
      }
      if (gallery.length) {
        setUploadProgress("Uploading gallery images...");
        for (const g of gallery) {
          if (g.file) galleryUrls.push(await uploadToBucket("product-media", g.file, userId));
          else if (g.url) galleryUrls.push(g.url);
        }
      }
      if (mainFile.file) {
        setUploadProgress("Uploading product file...");
        mainFileUrl = await uploadToBucket("product-files", mainFile.file, userId);
      }

      setUploadProgress("Saving product...");

      // Resolve category name for legacy `category` column
      const catName = categories.find((c: any) => c.id === data.business_category_id)?.name || null;

      const payload: any = {
        product_name: data.product_name,
        slug: data.slug,
        category: catName,
        business_category_id: data.business_category_id,
        subcategory_id: data.subcategory_id || null,
        short_description: data.short_description || null,
        description: data.description || null,
        tags,
        pricing_model: data.pricing_model,
        lifetime_price: data.is_free ? 0 : (data.lifetime_price || 0),
        monthly_price: data.is_free ? 0 : (data.monthly_price || 0),
        discount_price: data.discount_price || 0,
        status: data.status,
        visibility: data.visibility,
        is_active: data.status === "publish" || data.status === "draft",
        features_json: selectedFeatures,
        thumbnail_url: thumbnailUrl || null,
        gallery_urls: galleryUrls,
        main_file_url: mainFileUrl || null,
        version: data.version || "v1.0",
        changelog: data.changelog || null,
        demo_type: data.demo_type || null,
        demo_url: data.demo_url || null,
        demo_embed: data.demo_embed || null,
        demo_video_url: data.demo_video_url || null,
        demo_credentials: (data.demo_username || data.demo_password)
          ? { username: data.demo_username, password: data.demo_password }
          : {},
        documentation_url: data.documentation_url || null,
        support_url: data.support_url || null,
        meta_title: data.meta_title || null,
        meta_description: data.meta_description || null,
        meta_keywords: data.meta_keywords || null,
        is_featured: data.is_featured,
        is_free: data.is_free,
        license_type: data.license_type,
        compatibility: data.compatibility || null,
        created_by: userId,
      };

      const { data: inserted, error } = await supabase
        .from("products")
        .insert(payload)
        .select()
        .single();

      if (error) throw error;

      // Auto-create linked demo if URL provided
      if (data.demo_url) {
        const { data: demoRow } = await supabase.from("demos").insert({
          title: data.product_name,
          description: data.short_description || data.description || null,
          url: data.demo_url,
          category: catName,
          thumbnail_url: thumbnailUrl || null,
          status: "active",
          created_by: userId,
        }).select().single();
        if (demoRow && inserted) {
          await supabase.from("product_demo_mappings").insert({
            product_id: inserted.product_id,
            demo_id: demoRow.id,
          });
        }
      }

      // Audit
      await supabase.from("product_action_logs").insert({
        product_id: inserted?.product_id,
        product_name: data.product_name,
        action: "product_created",
        action_details: { fields: Object.keys(payload).length },
        performed_by: userId,
      });

      toast.success("Product created successfully", {
        description: data.status === "publish"
          ? "Live on the Marketplace now."
          : "Saved as draft.",
      });
      window.dispatchEvent(new CustomEvent("marketplace:catalog-changed"));
      onSuccess();
    } catch (e: any) {
      toast.error("Failed to create product", { description: e.message });
    } finally {
      setIsSubmitting(false);
      setUploadProgress("");
    }
  };

  const toggleFeature = (f: string) =>
    setSelectedFeatures((p) => (p.includes(f) ? p.filter((x) => x !== f) : [...p, f]));

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Plus className="w-6 h-6 text-violet-400" />
            Add New Product
          </h1>
          <p className="text-slate-400 text-sm">Complete all required fields and publish to marketplace</p>
        </div>
        {onCancel && (
          <Button variant="ghost" onClick={onCancel} className="text-slate-400">
            <X className="w-4 h-4 mr-1" /> Cancel
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* CORE */}
        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Package className="w-5 h-5 text-violet-400" /> Product Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Product Title *</Label>
                <Input {...register("product_name")} placeholder="My awesome product"
                  className="bg-slate-800 border-slate-600 text-white" />
                {errors.product_name && <p className="text-xs text-red-400">{errors.product_name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Slug *</Label>
                <div className="relative">
                  <Input {...register("slug")} placeholder="auto-generated"
                    className="bg-slate-800 border-slate-600 text-white pr-9" />
                  <div className="absolute right-2 top-1/2 -translate-y-1/2 text-xs">
                    {slugChecking ? <Loader2 className="w-3 h-3 animate-spin text-slate-400" /> :
                     slugAvailable === true ? <span className="text-emerald-400">✓</span> :
                     slugAvailable === false ? <span className="text-red-400">✗</span> : null}
                  </div>
                </div>
                {errors.slug && <p className="text-xs text-red-400">{errors.slug.message}</p>}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Main Category *</Label>
                <Select onValueChange={(v) => { setValue("business_category_id", v); setValue("subcategory_id", ""); }}>
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue placeholder={categories.length ? "Select category" : "Loading..."} />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((c: any) => (
                      <SelectItem key={c.id} value={c.id}>{c.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.business_category_id && <p className="text-xs text-red-400">{errors.business_category_id.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Sub Category</Label>
                <Select disabled={!watchedCategory} onValueChange={(v) => setValue("subcategory_id", v)}>
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white">
                    <SelectValue placeholder={!watchedCategory ? "Select category first" : "Select subcategory"} />
                  </SelectTrigger>
                  <SelectContent>
                    {subcategories.map((s: any) => (
                      <SelectItem key={s.id} value={s.id}>{s.name}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Short Description</Label>
              <Input {...register("short_description")} placeholder="One-line summary (max 280 chars)"
                className="bg-slate-800 border-slate-600 text-white" />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Description</Label>
              <Textarea {...register("description")} placeholder="Full product description..."
                className="bg-slate-800 border-slate-600 text-white min-h-[120px]" />
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Tags</Label>
              <div className="flex gap-2">
                <Input value={tagInput} onChange={(e) => setTagInput(e.target.value)}
                  onKeyDown={(e) => { if (e.key === "Enter") { e.preventDefault(); addTag(); } }}
                  placeholder="Type and press Enter"
                  className="bg-slate-800 border-slate-600 text-white" />
                <Button type="button" variant="outline" onClick={addTag}>Add</Button>
              </div>
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {tags.map((t) => (
                    <Badge key={t} variant="secondary" className="gap-1">
                      {t}
                      <button type="button" onClick={() => setTags(tags.filter((x) => x !== t))}>
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="text-slate-300">Features</Label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {featureOptions.map((f) => (
                  <label key={f} className="flex items-center gap-2 p-2 rounded-lg bg-slate-800/50 cursor-pointer hover:bg-slate-800">
                    <Checkbox checked={selectedFeatures.includes(f)} onCheckedChange={() => toggleFeature(f)} />
                    <span className="text-xs text-slate-300">{f}</span>
                  </label>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* PRICING */}
        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardHeader><CardTitle className="text-white">Pricing & License</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2">
                <Switch checked={watchedIsFree} onCheckedChange={(v) => setValue("is_free", v)} />
                <Label className="text-slate-300">Free Product</Label>
              </div>
              <div className="flex items-center gap-2">
                <Switch checked={watch("is_featured")} onCheckedChange={(v) => setValue("is_featured", v)} />
                <Label className="text-slate-300">Featured</Label>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Pricing Model *</Label>
                <Select onValueChange={(v) => setValue("pricing_model", v)}>
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="lifetime">Lifetime</SelectItem>
                    <SelectItem value="subscription">Subscription</SelectItem>
                    <SelectItem value="freemium">Freemium</SelectItem>
                    <SelectItem value="one_time">One-time</SelectItem>
                  </SelectContent>
                </Select>
                {errors.pricing_model && <p className="text-xs text-red-400">{errors.pricing_model.message}</p>}
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Lifetime Price (₹)</Label>
                <Input type="number" disabled={watchedIsFree} {...register("lifetime_price", { valueAsNumber: true })}
                  className="bg-slate-800 border-slate-600 text-white" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Monthly Price (₹)</Label>
                <Input type="number" disabled={watchedIsFree} {...register("monthly_price", { valueAsNumber: true })}
                  className="bg-slate-800 border-slate-600 text-white" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Discount Price (₹)</Label>
                <Input type="number" disabled={watchedIsFree} {...register("discount_price", { valueAsNumber: true })}
                  className="bg-slate-800 border-slate-600 text-white" />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">License Type</Label>
                <Select defaultValue="standard" onValueChange={(v) => setValue("license_type", v)}>
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="standard">Standard</SelectItem>
                    <SelectItem value="extended">Extended</SelectItem>
                    <SelectItem value="commercial">Commercial</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Compatibility</Label>
                <Input {...register("compatibility")} placeholder="e.g., Web, iOS, Android"
                  className="bg-slate-800 border-slate-600 text-white" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Visibility</Label>
                <Select defaultValue="global" onValueChange={(v) => setValue("visibility", v)}>
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white"><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="global">Global</SelectItem>
                    <SelectItem value="country">Country Specific</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* MEDIA */}
        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardHeader><CardTitle className="text-white flex items-center gap-2"><ImageIcon className="w-5 h-5 text-violet-400" /> Media</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Thumbnail Image</Label>
              <Input type="file" accept="image/*"
                onChange={(e) => e.target.files?.[0] && setThumbnail({ file: e.target.files[0] })}
                className="bg-slate-800 border-slate-600 text-white" />
              {thumbnail.file && <p className="text-xs text-emerald-400">✓ {thumbnail.file.name}</p>}
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Gallery Images (multi)</Label>
              <Input type="file" accept="image/*" multiple
                onChange={(e) => e.target.files && setGallery(Array.from(e.target.files).map((f) => ({ file: f })))}
                className="bg-slate-800 border-slate-600 text-white" />
              {gallery.length > 0 && <p className="text-xs text-emerald-400">✓ {gallery.length} image(s)</p>}
            </div>
          </CardContent>
        </Card>

        {/* FILES */}
        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardHeader><CardTitle className="text-white flex items-center gap-2"><FileArchive className="w-5 h-5 text-violet-400" /> Files & Version</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Main Product File (zip, pdf, etc.)</Label>
              <Input type="file"
                onChange={(e) => e.target.files?.[0] && setMainFile({ file: e.target.files[0], name: e.target.files[0].name })}
                className="bg-slate-800 border-slate-600 text-white" />
              {mainFile.name && <p className="text-xs text-emerald-400">✓ {mainFile.name}</p>}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Version</Label>
                <Input {...register("version")} placeholder="v1.0" className="bg-slate-800 border-slate-600 text-white" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Changelog</Label>
                <Input {...register("changelog")} placeholder="Initial release" className="bg-slate-800 border-slate-600 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DEMO */}
        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardHeader><CardTitle className="text-white flex items-center gap-2"><PlayCircle className="w-5 h-5 text-violet-400" /> Demo</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Demo Type</Label>
                <Select onValueChange={(v) => setValue("demo_type", v)}>
                  <SelectTrigger className="bg-slate-800 border-slate-600 text-white"><SelectValue placeholder="Select" /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="live">Live URL</SelectItem>
                    <SelectItem value="iframe">Iframe Embed</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Demo URL</Label>
                <Input {...register("demo_url")} placeholder="https://demo.example.com" className="bg-slate-800 border-slate-600 text-white" />
                {errors.demo_url && <p className="text-xs text-red-400">{errors.demo_url.message}</p>}
              </div>
            </div>
            {watchedDemoType === "iframe" && (
              <div className="space-y-2">
                <Label className="text-slate-300">Iframe Embed Code</Label>
                <Textarea {...register("demo_embed")} placeholder='<iframe src="..." />' className="bg-slate-800 border-slate-600 text-white" />
              </div>
            )}
            {watchedDemoType === "video" && (
              <div className="space-y-2">
                <Label className="text-slate-300">Video URL</Label>
                <Input {...register("demo_video_url")} placeholder="https://youtube.com/..." className="bg-slate-800 border-slate-600 text-white" />
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label className="text-slate-300">Demo Username</Label>
                <Input {...register("demo_username")} className="bg-slate-800 border-slate-600 text-white" />
              </div>
              <div className="space-y-2">
                <Label className="text-slate-300">Demo Password</Label>
                <Input {...register("demo_password")} className="bg-slate-800 border-slate-600 text-white" />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* LINKS */}
        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardHeader><CardTitle className="text-white flex items-center gap-2"><LinkIcon className="w-5 h-5 text-violet-400" /> Links</CardTitle></CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Documentation URL</Label>
              <Input {...register("documentation_url")} placeholder="https://docs.example.com" className="bg-slate-800 border-slate-600 text-white" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Support URL</Label>
              <Input {...register("support_url")} placeholder="https://support.example.com" className="bg-slate-800 border-slate-600 text-white" />
            </div>
          </CardContent>
        </Card>

        {/* SEO */}
        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardHeader><CardTitle className="text-white flex items-center gap-2"><Search className="w-5 h-5 text-violet-400" /> SEO</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-slate-300">Meta Title (max 60)</Label>
              <Input {...register("meta_title")} className="bg-slate-800 border-slate-600 text-white" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Meta Description (max 160)</Label>
              <Textarea {...register("meta_description")} className="bg-slate-800 border-slate-600 text-white" />
            </div>
            <div className="space-y-2">
              <Label className="text-slate-300">Keywords (comma separated)</Label>
              <Input {...register("meta_keywords")} placeholder="pos, retail, software" className="bg-slate-800 border-slate-600 text-white" />
            </div>
          </CardContent>
        </Card>

        {/* STATUS + SUBMIT */}
        <Card className="bg-slate-900/50 border-slate-700/50">
          <CardContent className="pt-6 space-y-4">
            <div className="space-y-2 max-w-xs">
              <Label className="text-slate-300">Status</Label>
              <Select defaultValue="draft" onValueChange={(v) => setValue("status", v)}>
                <SelectTrigger className="bg-slate-800 border-slate-600 text-white"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="pending">Pending Review</SelectItem>
                  <SelectItem value="publish">Publish</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-3 pt-2">
              <Button type="submit" disabled={isSubmitting}
                className="flex-1 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700">
                {isSubmitting ? (
                  <><Loader2 className="w-4 h-4 mr-2 animate-spin" />{uploadProgress || "Saving..."}</>
                ) : (
                  <><Upload className="w-4 h-4 mr-2" /> Add Product</>
                )}
              </Button>
              {onCancel && (
                <Button type="button" variant="outline" onClick={onCancel} disabled={isSubmitting}>
                  Cancel
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};

export default AddProduct;
