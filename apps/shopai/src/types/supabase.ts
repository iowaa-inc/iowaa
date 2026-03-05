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
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      business_members: {
        Row: {
          business_id: string
          created_at: string | null
          invited_by: string | null
          role: string
          updated_at: string | null
          user_id: string
        }
        Insert: {
          business_id: string
          created_at?: string | null
          invited_by?: string | null
          role?: string
          updated_at?: string | null
          user_id: string
        }
        Update: {
          business_id?: string
          created_at?: string | null
          invited_by?: string | null
          role?: string
          updated_at?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_members_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      business_operations: {
        Row: {
          business_id: string
          registration_country_iso: string | null
          timezone: string | null
          updated_at: string | null
          weekly_schedule: Json | null
        }
        Insert: {
          business_id: string
          registration_country_iso?: string | null
          timezone?: string | null
          updated_at?: string | null
          weekly_schedule?: Json | null
        }
        Update: {
          business_id?: string
          registration_country_iso?: string | null
          timezone?: string | null
          updated_at?: string | null
          weekly_schedule?: Json | null
        }
        Relationships: [
          {
            foreignKeyName: "business_operations_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: true
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      business_profiles: {
        Row: {
          business_id: string
          category: string
          display_name: string
          is_whatsapp_verified: boolean | null
          logo_url: string | null
          short_description: string | null
          support_email: string
          updated_at: string | null
          whatsapp_number: string
        }
        Insert: {
          business_id: string
          category: string
          display_name: string
          is_whatsapp_verified?: boolean | null
          logo_url?: string | null
          short_description?: string | null
          support_email: string
          updated_at?: string | null
          whatsapp_number: string
        }
        Update: {
          business_id?: string
          category?: string
          display_name?: string
          is_whatsapp_verified?: boolean | null
          logo_url?: string | null
          short_description?: string | null
          support_email?: string
          updated_at?: string | null
          whatsapp_number?: string
        }
        Relationships: [
          {
            foreignKeyName: "business_profiles_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: true
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      businesses: {
        Row: {
          created_at: string | null
          id: string
          is_onboarding_completed: boolean | null
          is_verified: boolean | null
          onboarding_step: number | null
          owner_id: string
          updated_at: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          is_onboarding_completed?: boolean | null
          is_verified?: boolean | null
          onboarding_step?: number | null
          owner_id: string
          updated_at?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          is_onboarding_completed?: boolean | null
          is_verified?: boolean | null
          onboarding_step?: number | null
          owner_id?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      compliance_documents: {
        Row: {
          business_id: string
          doc_type: string
          file_size_bytes: number | null
          file_url: string
          id: string
          mime_type: string | null
          rejection_reason: string | null
          uploaded_at: string | null
          verification_status: string | null
        }
        Insert: {
          business_id: string
          doc_type: string
          file_size_bytes?: number | null
          file_url: string
          id?: string
          mime_type?: string | null
          rejection_reason?: string | null
          uploaded_at?: string | null
          verification_status?: string | null
        }
        Update: {
          business_id?: string
          doc_type?: string
          file_size_bytes?: number | null
          file_url?: string
          id?: string
          mime_type?: string | null
          rejection_reason?: string | null
          uploaded_at?: string | null
          verification_status?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "compliance_documents_business_id_fkey"
            columns: ["business_id"]
            isOneToOne: false
            referencedRelation: "businesses"
            referencedColumns: ["id"]
          },
        ]
      }
      temp_uploads: {
        Row: {
          bucket_id: string
          created_at: string | null
          id: string
          owner_id: string | null
          storage_path: string
        }
        Insert: {
          bucket_id: string
          created_at?: string | null
          id?: string
          owner_id?: string | null
          storage_path: string
        }
        Update: {
          bucket_id?: string
          created_at?: string | null
          id?: string
          owner_id?: string | null
          storage_path?: string
        }
        Relationships: []
      }
      whatsapp_verifications: {
        Row: {
          attempt_count: number | null
          created_at: string | null
          expires_at: string
          id: string
          is_verified: boolean | null
          otp_code: string
          user_id: string
          whatsapp_number: string
        }
        Insert: {
          attempt_count?: number | null
          created_at?: string | null
          expires_at: string
          id?: string
          is_verified?: boolean | null
          otp_code: string
          user_id: string
          whatsapp_number: string
        }
        Update: {
          attempt_count?: number | null
          created_at?: string | null
          expires_at?: string
          id?: string
          is_verified?: boolean | null
          otp_code?: string
          user_id?: string
          whatsapp_number?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      create_business_entity: {
        Args: {
          p_category: string
          p_description: string
          p_display_name: string
          p_logo_url: string
          p_owner_id?: string
          p_support_email: string
          p_weekly_schedule: Json
          p_whatsapp_number: string
        }
        Returns: Json
      }
      get_business_id_from_path: { Args: { name: string }; Returns: string }
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const
