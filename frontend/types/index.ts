export interface Product {
  id: number
  name: string
  description: string
  price_per_sqm: number
  category: string
  image_url: string
  video_url?: string
  specifications?: string
  is_available: boolean
  created_at: string
  updated_at?: string
}

export interface Order {
  id?: number
  customer_name: string
  customer_email: string
  customer_phone: string
  product_id: number
  quantity_sqm: number
  total_price?: number
  message?: string
  status?: string
  source: string
  created_at?: string
}

export interface OrderCreate {
  customer_name: string
  customer_email: string
  customer_phone: string
  product_id: number
  quantity_sqm: number
  message?: string
  source: string
}