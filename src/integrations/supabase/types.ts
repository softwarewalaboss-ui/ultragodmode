export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      audit_logs: {
        Row: {
          action: string
          created_at: string
          id: string
          ip_address: string | null
          meta_json: Json | null
          module: string | null
          role: string | null
          user_id: string | null
        }
        Insert: {
          action: string
          created_at?: string
          id?: string
          ip_address?: string | null
          meta_json?: Json | null
          module?: string | null
          role?: string | null
          user_id?: string | null
        }
        Update: {
          action?: string
          created_at?: string
          id?: string
          ip_address?: string | null
          meta_json?: Json | null
          module?: string | null
          role?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      business_categories: {
        Row: {
          created_at: string
          description: string | null
          display_order: number | null
          id: string
          is_active: boolean | null
          name: string
          slug: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          slug?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      business_subcategories: {
        Row: {
          category_id: string | null
          created_at: string
          display_order: number | null
          id: string
          is_active: boolean | null
          name: string
          slug: string | null
        }
        Insert: {
          category_id?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name: string
          slug?: string | null
        }
        Update: {
          category_id?: string | null
          created_at?: string
          display_order?: number | null
          id?: string
          is_active?: boolean | null
          name?: string
          slug?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "business_subcategories_category_id_fkey"
            columns: ["category_id"]
            isOneToOne: false
            referencedRelation: "business_categories"
            referencedColumns: ["id"]
          },
        ]
      }
      demos: {
        Row: {
          category: string | null
          created_at: string
          created_by: string | null
          description: string | null
          id: string
          status: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          url: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          status?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          url?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          id?: string
          status?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          url?: string | null
        }
        Relationships: []
      }
      developers: {
        Row: {
          availability_status: string | null
          created_at: string
          experience_level: string | null
          github_username: string | null
          hourly_rate: number | null
          id: string
          rating: number | null
          skills: string[] | null
          total_tasks_completed: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          availability_status?: string | null
          created_at?: string
          experience_level?: string | null
          github_username?: string | null
          hourly_rate?: number | null
          id?: string
          rating?: number | null
          skills?: string[] | null
          total_tasks_completed?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          availability_status?: string | null
          created_at?: string
          experience_level?: string | null
          github_username?: string | null
          hourly_rate?: number | null
          id?: string
          rating?: number | null
          skills?: string[] | null
          total_tasks_completed?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      franchise_accounts: {
        Row: {
          activated_at: string | null
          city: string | null
          commission_rate: number | null
          country: string | null
          created_at: string
          franchise_name: string
          id: string
          license_key: string | null
          status: string | null
          territory: string | null
          total_clients: number | null
          total_revenue: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          activated_at?: string | null
          city?: string | null
          commission_rate?: number | null
          country?: string | null
          created_at?: string
          franchise_name: string
          id?: string
          license_key?: string | null
          status?: string | null
          territory?: string | null
          total_clients?: number | null
          total_revenue?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          activated_at?: string | null
          city?: string | null
          commission_rate?: number | null
          country?: string | null
          created_at?: string
          franchise_name?: string
          id?: string
          license_key?: string | null
          status?: string | null
          territory?: string | null
          total_clients?: number | null
          total_revenue?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      influencer_accounts: {
        Row: {
          commission_rate: number | null
          created_at: string
          followers_count: number | null
          id: string
          platform: string | null
          referral_code: string | null
          status: string | null
          total_earnings: number | null
          total_referrals: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          commission_rate?: number | null
          created_at?: string
          followers_count?: number | null
          id?: string
          platform?: string | null
          referral_code?: string | null
          status?: string | null
          total_earnings?: number | null
          total_referrals?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          commission_rate?: number | null
          created_at?: string
          followers_count?: number | null
          id?: string
          platform?: string | null
          referral_code?: string | null
          status?: string | null
          total_earnings?: number | null
          total_referrals?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      licenses: {
        Row: {
          activated_at: string | null
          created_at: string
          device_id: string | null
          expires_at: string | null
          id: string
          license_key: string
          license_type: string | null
          max_devices: number | null
          software_id: string | null
          status: string | null
          user_id: string | null
        }
        Insert: {
          activated_at?: string | null
          created_at?: string
          device_id?: string | null
          expires_at?: string | null
          id?: string
          license_key: string
          license_type?: string | null
          max_devices?: number | null
          software_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Update: {
          activated_at?: string | null
          created_at?: string
          device_id?: string | null
          expires_at?: string | null
          id?: string
          license_key?: string
          license_type?: string | null
          max_devices?: number | null
          software_id?: string | null
          status?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "licenses_software_id_fkey"
            columns: ["software_id"]
            isOneToOne: false
            referencedRelation: "software_catalog"
            referencedColumns: ["id"]
          },
        ]
      }
      product_action_logs: {
        Row: {
          action: string
          action_details: Json | null
          created_at: string
          id: string
          performed_by: string | null
          product_id: string | null
          product_name: string | null
        }
        Insert: {
          action: string
          action_details?: Json | null
          created_at?: string
          id?: string
          performed_by?: string | null
          product_id?: string | null
          product_name?: string | null
        }
        Update: {
          action?: string
          action_details?: Json | null
          created_at?: string
          id?: string
          performed_by?: string | null
          product_id?: string | null
          product_name?: string | null
        }
        Relationships: []
      }
      product_demo_mappings: {
        Row: {
          created_at: string
          demo_id: string
          id: string
          product_id: string
        }
        Insert: {
          created_at?: string
          demo_id: string
          id?: string
          product_id: string
        }
        Update: {
          created_at?: string
          demo_id?: string
          id?: string
          product_id?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          business_category_id: string | null
          category: string | null
          created_at: string
          created_by: string | null
          description: string | null
          features_json: Json | null
          is_active: boolean | null
          lifetime_price: number | null
          monthly_price: number | null
          pricing_model: string | null
          product_id: string
          product_name: string
          product_type: string | null
          status: string | null
          subcategory_id: string | null
          thumbnail_url: string | null
          updated_at: string
          visibility: string | null
        }
        Insert: {
          business_category_id?: string | null
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          features_json?: Json | null
          is_active?: boolean | null
          lifetime_price?: number | null
          monthly_price?: number | null
          pricing_model?: string | null
          product_id?: string
          product_name: string
          product_type?: string | null
          status?: string | null
          subcategory_id?: string | null
          thumbnail_url?: string | null
          updated_at?: string
          visibility?: string | null
        }
        Update: {
          business_category_id?: string | null
          category?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          features_json?: Json | null
          is_active?: boolean | null
          lifetime_price?: number | null
          monthly_price?: number | null
          pricing_model?: string | null
          product_id?: string
          product_name?: string
          product_type?: string | null
          status?: string | null
          subcategory_id?: string | null
          thumbnail_url?: string | null
          updated_at?: string
          visibility?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          email: string | null
          full_name: string | null
          id: string
          updated_at: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id: string
          updated_at?: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          email?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
        }
        Relationships: []
      }
      reseller_accounts: {
        Row: {
          active_licenses: number | null
          commission_rate: number | null
          company_name: string | null
          created_at: string
          id: string
          parent_reseller_id: string | null
          reseller_type: string | null
          status: string | null
          total_sales: number | null
          updated_at: string
          user_id: string
        }
        Insert: {
          active_licenses?: number | null
          commission_rate?: number | null
          company_name?: string | null
          created_at?: string
          id?: string
          parent_reseller_id?: string | null
          reseller_type?: string | null
          status?: string | null
          total_sales?: number | null
          updated_at?: string
          user_id: string
        }
        Update: {
          active_licenses?: number | null
          commission_rate?: number | null
          company_name?: string | null
          created_at?: string
          id?: string
          parent_reseller_id?: string | null
          reseller_type?: string | null
          status?: string | null
          total_sales?: number | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      software_catalog: {
        Row: {
          category: string | null
          created_at: string
          created_by: string | null
          demo_url: string | null
          description: string | null
          downloads: number | null
          id: string
          license_type: string | null
          price: number | null
          rating: number | null
          slug: string | null
          status: string | null
          thumbnail_url: string | null
          title: string
          updated_at: string
          version: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          created_by?: string | null
          demo_url?: string | null
          description?: string | null
          downloads?: number | null
          id?: string
          license_type?: string | null
          price?: number | null
          rating?: number | null
          slug?: string | null
          status?: string | null
          thumbnail_url?: string | null
          title: string
          updated_at?: string
          version?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string
          created_by?: string | null
          demo_url?: string | null
          description?: string | null
          downloads?: number | null
          id?: string
          license_type?: string | null
          price?: number | null
          rating?: number | null
          slug?: string | null
          status?: string | null
          thumbnail_url?: string | null
          title?: string
          updated_at?: string
          version?: string | null
        }
        Relationships: []
      }
      support_tickets: {
        Row: {
          assigned_to: string | null
          category: string | null
          created_at: string
          description: string | null
          id: string
          priority: string | null
          resolved_at: string | null
          status: string | null
          subject: string
          updated_at: string
          user_id: string
        }
        Insert: {
          assigned_to?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          priority?: string | null
          resolved_at?: string | null
          status?: string | null
          subject: string
          updated_at?: string
          user_id: string
        }
        Update: {
          assigned_to?: string | null
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          priority?: string | null
          resolved_at?: string | null
          status?: string | null
          subject?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      tasks: {
        Row: {
          assigned_to: string | null
          completed_at: string | null
          created_at: string
          created_by: string | null
          description: string | null
          due_date: string | null
          id: string
          priority: string | null
          project: string | null
          status: string | null
          title: string
          updated_at: string
        }
        Insert: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          project?: string | null
          status?: string | null
          title: string
          updated_at?: string
        }
        Update: {
          assigned_to?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          description?: string | null
          due_date?: string | null
          id?: string
          priority?: string | null
          project?: string | null
          status?: string | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          approval_status: string
          created_at: string
          force_logged_out_at: string | null
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          approval_status?: string
          created_at?: string
          force_logged_out_at?: string | null
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          approval_status?: string
          created_at?: string
          force_logged_out_at?: string | null
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      user_sessions: {
        Row: {
          auth_strength: string | null
          browser: string | null
          created_at: string
          device_fingerprint: string | null
          device_info: string | null
          expires_at: string | null
          forced_reauth: boolean | null
          id: string
          ip_address: string | null
          is_active: boolean | null
          last_activity_at: string | null
          login_at: string | null
          logout_at: string | null
          os: string | null
          revoked_reason: string | null
          risk_score: number | null
          session_token_hash: string | null
          user_id: string
        }
        Insert: {
          auth_strength?: string | null
          browser?: string | null
          created_at?: string
          device_fingerprint?: string | null
          device_info?: string | null
          expires_at?: string | null
          forced_reauth?: boolean | null
          id?: string
          ip_address?: string | null
          is_active?: boolean | null
          last_activity_at?: string | null
          login_at?: string | null
          logout_at?: string | null
          os?: string | null
          revoked_reason?: string | null
          risk_score?: number | null
          session_token_hash?: string | null
          user_id: string
        }
        Update: {
          auth_strength?: string | null
          browser?: string | null
          created_at?: string
          device_fingerprint?: string | null
          device_info?: string | null
          expires_at?: string | null
          forced_reauth?: boolean | null
          id?: string
          ip_address?: string | null
          is_active?: boolean | null
          last_activity_at?: string | null
          login_at?: string | null
          logout_at?: string | null
          os?: string | null
          revoked_reason?: string | null
          risk_score?: number | null
          session_token_hash?: string | null
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role:
        | "boss_owner"
        | "master"
        | "super_admin"
        | "ceo"
        | "admin"
        | "continent_super_admin"
        | "country_head"
        | "area_manager"
        | "server_manager"
        | "ai_manager"
        | "api_security"
        | "r_and_d"
        | "rnd_manager"
        | "finance_manager"
        | "lead_manager"
        | "marketing_manager"
        | "seo_manager"
        | "client_success"
        | "performance_manager"
        | "support"
        | "safe_assist"
        | "assist_manager"
        | "promise_tracker"
        | "promise_management"
        | "demo_manager"
        | "product_demo_manager"
        | "task_manager"
        | "hr_manager"
        | "legal_compliance"
        | "franchise"
        | "reseller"
        | "reseller_manager"
        | "influencer"
        | "developer"
        | "prime"
        | "user"
        | "client"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: [
        "boss_owner",
        "master",
        "super_admin",
        "ceo",
        "admin",
        "continent_super_admin",
        "country_head",
        "area_manager",
        "server_manager",
        "ai_manager",
        "api_security",
        "r_and_d",
        "rnd_manager",
        "finance_manager",
        "lead_manager",
        "marketing_manager",
        "seo_manager",
        "client_success",
        "performance_manager",
        "support",
        "safe_assist",
        "assist_manager",
        "promise_tracker",
        "promise_management",
        "demo_manager",
        "product_demo_manager",
        "task_manager",
        "hr_manager",
        "legal_compliance",
        "franchise",
        "reseller",
        "reseller_manager",
        "influencer",
        "developer",
        "prime",
        "user",
        "client",
      ],
    },
  },
} as const
