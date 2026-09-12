import type { Product, ProductInput, Testimonial, Inquiry, Meta } from "../types";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
  }
}

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem("admin_token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

async function request<T>(path: string, options: RequestInit = {}): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...authHeaders(),
      ...(options.headers || {}),
    },
  });

  if (!res.ok) {
    let detail = res.statusText;
    try {
      const body = await res.json();
      detail = body.detail || detail;
    } catch {
      /* ignore */
    }
    throw new ApiError(detail, res.status);
  }

  if (res.status === 204) return undefined as T;
  return res.json();
}

// ---- Products ----
export interface ProductFilters {
  q?: string;
  category?: string;
  brand?: string;
  min_price?: number;
  max_price?: number;
  sort?: string;
}

export function fetchProducts(filters: ProductFilters = {}): Promise<Product[]> {
  const params = new URLSearchParams();
  Object.entries(filters).forEach(([k, v]) => {
    if (v !== undefined && v !== "" && v !== null) params.set(k, String(v));
  });
  const qs = params.toString();
  return request<Product[]>(`/api/products${qs ? `?${qs}` : ""}`);
}

export function fetchProduct(id: number | string): Promise<Product> {
  return request<Product>(`/api/products/${id}`);
}

export function createProduct(data: ProductInput): Promise<Product> {
  return request<Product>("/api/products", { method: "POST", body: JSON.stringify(data) });
}

export function updateProduct(id: number, data: Partial<ProductInput>): Promise<Product> {
  return request<Product>(`/api/products/${id}`, { method: "PUT", body: JSON.stringify(data) });
}

export function deleteProduct(id: number): Promise<void> {
  return request<void>(`/api/products/${id}`, { method: "DELETE" });
}

// ---- Meta ----
export function fetchMeta(): Promise<Meta> {
  return request<Meta>("/api/meta");
}

// ---- Testimonials ----
export function fetchTestimonials(approvedOnly = true): Promise<Testimonial[]> {
  return request<Testimonial[]>(`/api/testimonials?approved_only=${approvedOnly}`);
}

export function submitTestimonial(data: { name: string; rating: number; message: string }): Promise<Testimonial> {
  return request<Testimonial>("/api/testimonials", { method: "POST", body: JSON.stringify(data) });
}

export function approveTestimonial(id: number): Promise<Testimonial> {
  return request<Testimonial>(`/api/testimonials/${id}/approve`, { method: "PATCH" });
}

export function deleteTestimonial(id: number): Promise<void> {
  return request<void>(`/api/testimonials/${id}`, { method: "DELETE" });
}

// ---- Inquiries ----
export function submitInquiry(data: Omit<Inquiry, "id" | "created_at">): Promise<Inquiry> {
  return request<Inquiry>("/api/inquiries", { method: "POST", body: JSON.stringify(data) });
}

export function fetchInquiries(): Promise<Inquiry[]> {
  return request<Inquiry[]>("/api/inquiries");
}

export function deleteInquiry(id: number): Promise<void> {
  return request<void>(`/api/inquiries/${id}`, { method: "DELETE" });
}

// ---- Auth ----
export async function login(username: string, password: string): Promise<string> {
  const res = await request<{ access_token: string }>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ username, password }),
  });
  localStorage.setItem("admin_token", res.access_token);
  return res.access_token;
}

export function logout(): void {
  localStorage.removeItem("admin_token");
}

export function isLoggedIn(): boolean {
  return !!localStorage.getItem("admin_token");
}

export { ApiError };
