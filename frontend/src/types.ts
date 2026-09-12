export interface ProductVariant {
  label: string;
  price: number;
  compare_at_price?: number | null;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  brand: string;
  price: number;
  description: string;
  warranty: string;
  image_url: string;
  images: string[];
  features: string[];
  variants: ProductVariant[];
  in_stock: boolean;
  created_at: string;
}

export type ProductInput = Omit<Product, "id" | "created_at">;

export interface Testimonial {
  id: number;
  name: string;
  rating: number;
  message: string;
  approved: boolean;
  created_at: string;
}

export interface Inquiry {
  id: number;
  name: string;
  phone: string;
  email: string;
  interest: string;
  message: string;
  created_at: string;
}

export interface Meta {
  categories: string[];
  brands: string[];
  price_min: number;
  price_max: number;
}
