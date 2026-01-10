// TypeScript types for the Dance Class Learning Log app

export type UserRole = 'student' | 'admin';

export interface Profile {
  id: string;
  name: string;
  role: UserRole;
  created_at: string;
}

export interface ClassEntry {
  id: string;
  student_id: string;
  content: string;
  entry_date: string;
  created_at: string;
}

export interface ClassEntryWithStudent extends ClassEntry {
  profiles: Pick<Profile, 'name'> | null;
}

// Database types for Supabase - properly formatted for @supabase/supabase-js
export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          name: string;
          role: string;
          created_at: string;
        };
        Insert: {
          id: string;
          name: string;
          role?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          name?: string;
          role?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      class_entries: {
        Row: {
          id: string;
          student_id: string;
          content: string;
          entry_date: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          student_id: string;
          content: string;
          entry_date?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          student_id?: string;
          content?: string;
          entry_date?: string;
          created_at?: string;
        };
        Relationships: [
          {
            foreignKeyName: "class_entries_student_id_fkey";
            columns: ["student_id"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

// Helper types for easier usage
export type Tables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Row'];
export type InsertTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Insert'];
export type UpdateTables<T extends keyof Database['public']['Tables']> = Database['public']['Tables'][T]['Update'];
