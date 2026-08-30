export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          email: string | null;
          avatar_url: string | null;
          onboarding_completed_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          email?: string | null;
          avatar_url?: string | null;
          onboarding_completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          full_name?: string | null;
          email?: string | null;
          avatar_url?: string | null;
          onboarding_completed_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      wardrobe_items: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          brand: string | null;
          category: string;
          color: string | null;
          color_hex: string | null;
          image_url: string | null;
          fabric: string | null;
          season: string[];
          occasions: string[];
          price: number | null;
          purchase_date: string | null;
          fit_notes: string | null;
          times_worn: number;
          last_worn_at: string | null;
          is_favorite: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          brand?: string | null;
          category: string;
          color?: string | null;
          color_hex?: string | null;
          image_url?: string | null;
          fabric?: string | null;
          season?: string[];
          occasions?: string[];
          price?: number | null;
          purchase_date?: string | null;
          fit_notes?: string | null;
          times_worn?: number;
          last_worn_at?: string | null;
          is_favorite?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          brand?: string | null;
          category?: string;
          color?: string | null;
          color_hex?: string | null;
          image_url?: string | null;
          fabric?: string | null;
          season?: string[];
          occasions?: string[];
          price?: number | null;
          purchase_date?: string | null;
          fit_notes?: string | null;
          times_worn?: number;
          last_worn_at?: string | null;
          is_favorite?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}

export type Profile = Database["public"]["Tables"]["profiles"]["Row"];
