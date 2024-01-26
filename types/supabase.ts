export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      brand: {
        Row: {
          brandCode: string
          brandName: string
          created_at: string
          id: number
        }
        Insert: {
          brandCode: string
          brandName: string
          created_at?: string
          id?: number
        }
        Update: {
          brandCode?: string
          brandName?: string
          created_at?: string
          id?: number
        }
        Relationships: []
      }
      notes: {
        Row: {
          id: number
          title: string | null
        }
        Insert: {
          id?: number
          title?: string | null
        }
        Update: {
          id?: number
          title?: string | null
        }
        Relationships: []
      }
      products: {
        Row: {
          barcode: number
          brandCode: string
          brandName: string
          certificationNumber: string | null
          color: string | null
          configuration: string | null
          countryOfManufacture: string | null
          countryOfOrigin: string | null
          created_at: string
          deliveryPrice: number
          englishName: string | null
          isSelling: boolean | null
          koreaName: string | null
          managerName: string
          managerNumber: number
          manufacturingComponents: string | null
          minimumAge: string | null
          quantity: number
          releaseDate: string | null
          size: string | null
          supplyPrice: number
          weight: string | null
        }
        Insert: {
          barcode: number
          brandCode: string
          brandName: string
          certificationNumber?: string | null
          color?: string | null
          configuration?: string | null
          countryOfManufacture?: string | null
          countryOfOrigin?: string | null
          created_at?: string
          deliveryPrice?: number
          englishName?: string | null
          isSelling?: boolean | null
          koreaName?: string | null
          managerName: string
          managerNumber: number
          manufacturingComponents?: string | null
          minimumAge?: string | null
          quantity?: number
          releaseDate?: string | null
          size?: string | null
          supplyPrice?: number
          weight?: string | null
        }
        Update: {
          barcode?: number
          brandCode?: string
          brandName?: string
          certificationNumber?: string | null
          color?: string | null
          configuration?: string | null
          countryOfManufacture?: string | null
          countryOfOrigin?: string | null
          created_at?: string
          deliveryPrice?: number
          englishName?: string | null
          isSelling?: boolean | null
          koreaName?: string | null
          managerName?: string
          managerNumber?: number
          manufacturingComponents?: string | null
          minimumAge?: string | null
          quantity?: number
          releaseDate?: string | null
          size?: string | null
          supplyPrice?: number
          weight?: string | null
        }
        Relationships: []
      }
      receiving: {
        Row: {
          barcode: number
          created_at: string
          id: number
          pastQuantity: number
          quantity: number
          receiving_date: string
        }
        Insert: {
          barcode: number
          created_at?: string
          id?: number
          pastQuantity: number
          quantity: number
          receiving_date: string
        }
        Update: {
          barcode?: number
          created_at?: string
          id?: number
          pastQuantity?: number
          quantity?: number
          receiving_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "receiving_barcode_fkey"
            columns: ["barcode"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["barcode"]
          }
        ]
      }
      releasing: {
        Row: {
          barcode: number
          created_at: string
          id: number
          pastQuantity: number
          quantity: number
          releasing_date: string
        }
        Insert: {
          barcode: number
          created_at?: string
          id?: number
          pastQuantity: number
          quantity: number
          releasing_date: string
        }
        Update: {
          barcode?: number
          created_at?: string
          id?: number
          pastQuantity?: number
          quantity?: number
          releasing_date?: string
        }
        Relationships: [
          {
            foreignKeyName: "releasing_barcode_fkey"
            columns: ["barcode"]
            isOneToOne: false
            referencedRelation: "products"
            referencedColumns: ["barcode"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (Database["public"]["Tables"] & Database["public"]["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (Database["public"]["Tables"] &
      Database["public"]["Views"])
  ? (Database["public"]["Tables"] &
      Database["public"]["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R
    }
    ? R
    : never
  : never

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I
    }
    ? I
    : never
  : never

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof Database["public"]["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof Database["public"]["Tables"]
  ? Database["public"]["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U
    }
    ? U
    : never
  : never

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof Database["public"]["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof Database["public"]["Enums"]
  ? Database["public"]["Enums"][PublicEnumNameOrOptions]
  : never
