import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  fetchProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  fetchTestimonials,
  approveTestimonial,
  deleteTestimonial,
  fetchInquiries,
  deleteInquiry,
  logout,
  ApiError,
} from "../api/client";
import type { Product, ProductInput, Testimonial, Inquiry } from "../types";
import ProductFormModal from "../components/admin/ProductFormModal";
import StarRating from "../components/StarRating";
import ThemeToggle from "../components/ThemeToggle";
import Logo from "../components/Logo";

type Tab = "products" | "reviews" | "inquiries";

const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function AdminDashboard() {
  const [tab, setTab] = useState<Tab>("products");
  const navigate = useNavigate();

  function handleAuthError(err: unknown) {
    if (err instanceof ApiError && err.status === 401) {
      logout();
      navigate("/admin/login");
      return true;
    }
    return false;
  }

  return (
    <div className="min-h-screen bg-paper">
      <header className="flex items-center justify-between border-b border-line bg-card px-6 py-4">
        <div className="flex items-center gap-4">
          <Logo wordmarkSize="text-2xl" taglineSize="text-[9px]" />
          <h1 className="font-serif-heading text-xl font-bold border-l border-line pl-4">Admin dashboard</h1>
        </div>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <button
            onClick={() => {
              logout();
              navigate("/admin/login");
            }}
            className="border border-line px-4 py-2 text-xs font-bold uppercase tracking-wide hover:border-ink"
          >
            Log out
          </button>
        </div>
      </header>

      <nav className="flex gap-2 border-b border-line bg-card px-6">
        {(["products", "reviews", "inquiries"] as Tab[]).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`border-b-2 px-4 py-3 text-sm font-semibold capitalize ${
              tab === t ? "border-accent text-ink" : "border-transparent text-muted hover:text-ink"
            }`}
          >
            {t}
          </button>
        ))}
      </nav>

      <main className="p-6">
        {tab === "products" && <ProductsTab onAuthError={handleAuthError} />}
        {tab === "reviews" && <ReviewsTab onAuthError={handleAuthError} />}
        {tab === "inquiries" && <InquiriesTab onAuthError={handleAuthError} />}
      </main>
    </div>
  );
}

function ProductsTab({ onAuthError }: { onAuthError: (e: unknown) => boolean }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Product | null | "new">(null);

  function load() {
    setLoading(true);
    fetchProducts()
      .then(setProducts)
      .catch((e) => !onAuthError(e) && setProducts([]))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleSave(data: ProductInput) {
    if (editing === "new") {
      await createProduct(data);
    } else if (editing) {
      await updateProduct(editing.id, data);
    }
    setEditing(null);
    load();
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    try {
      await deleteProduct(id);
      load();
    } catch (e) {
      onAuthError(e);
    }
  }

  return (
    <div>
      <div className="mb-4 flex items-center justify-between">
        <h2 className="font-semibold">{products.length} product(s)</h2>
        <button
          onClick={() => setEditing("new")}
          className="rounded-sm border border-dark bg-dark px-4 py-2.5 text-xs font-bold text-white hover:bg-black"
        >
          + Add product
        </button>
      </div>

      {loading ? (
        <p className="text-sm text-muted">Loading…</p>
      ) : (
        <div className="overflow-x-auto border border-line bg-card">
          <table className="w-full text-left text-sm">
            <thead className="bg-cream text-xs uppercase tracking-wide text-muted">
              <tr>
                <th className="p-3">Name</th>
                <th className="p-3">Category</th>
                <th className="p-3">Brand</th>
                <th className="p-3">Price</th>
                <th className="p-3">Stock</th>
                <th className="p-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-t border-line">
                  <td className="p-3 font-medium">{p.name}</td>
                  <td className="p-3">{p.category}</td>
                  <td className="p-3">{p.brand}</td>
                  <td className="p-3">{formatter.format(p.price)}</td>
                  <td className="p-3">{p.in_stock ? "In stock" : "Out of stock"}</td>
                  <td className="p-3 text-right">
                    <button
                      onClick={() => setEditing(p)}
                      className="mr-3 text-xs font-bold text-accent hover:underline"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(p.id)}
                      className="text-xs font-bold text-red-600 hover:underline"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <ProductFormModal
          product={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
          onSave={handleSave}
        />
      )}
    </div>
  );
}

function ReviewsTab({ onAuthError }: { onAuthError: (e: unknown) => boolean }) {
  const [pending, setPending] = useState<Testimonial[]>([]);
  const [approved, setApproved] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    Promise.all([fetchTestimonials(false), fetchTestimonials(true)])
      .then(([all, appr]) => {
        setPending(all.filter((t) => !t.approved));
        setApproved(appr);
      })
      .catch((e) => onAuthError(e))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleApprove(id: number) {
    try {
      await approveTestimonial(id);
      load();
    } catch (e) {
      onAuthError(e);
    }
  }

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this review?")) return;
    try {
      await deleteTestimonial(id);
      load();
    } catch (e) {
      onAuthError(e);
    }
  }

  if (loading) return <p className="text-sm text-muted">Loading…</p>;

  return (
    <div className="grid gap-8">
      <div>
        <h2 className="mb-3 font-semibold">Pending approval ({pending.length})</h2>
        {pending.length === 0 ? (
          <p className="text-sm text-muted">Nothing waiting for approval.</p>
        ) : (
          <div className="grid gap-3">
            {pending.map((t) => (
              <div key={t.id} className="flex items-start justify-between gap-4 border border-line bg-card p-4">
                <div>
                  <StarRating rating={t.rating} />
                  <p className="mt-2 text-sm">{t.message}</p>
                  <p className="mt-1 text-xs font-bold text-muted">— {t.name}</p>
                </div>
                <div className="flex shrink-0 gap-3">
                  <button
                    onClick={() => handleApprove(t.id)}
                    className="text-xs font-bold text-green-700 hover:underline"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleDelete(t.id)}
                    className="text-xs font-bold text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <h2 className="mb-3 font-semibold">Published reviews ({approved.length})</h2>
        <div className="grid gap-3">
          {approved.map((t) => (
            <div key={t.id} className="flex items-start justify-between gap-4 border border-line bg-card p-4">
              <div>
                <StarRating rating={t.rating} />
                <p className="mt-2 text-sm">{t.message}</p>
                <p className="mt-1 text-xs font-bold text-muted">— {t.name}</p>
              </div>
              <button
                onClick={() => handleDelete(t.id)}
                className="shrink-0 text-xs font-bold text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InquiriesTab({ onAuthError }: { onAuthError: (e: unknown) => boolean }) {
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loading, setLoading] = useState(true);

  function load() {
    setLoading(true);
    fetchInquiries()
      .then(setInquiries)
      .catch((e) => onAuthError(e))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function handleDelete(id: number) {
    if (!window.confirm("Delete this enquiry?")) return;
    try {
      await deleteInquiry(id);
      load();
    } catch (e) {
      onAuthError(e);
    }
  }

  if (loading) return <p className="text-sm text-muted">Loading…</p>;

  return (
    <div>
      <h2 className="mb-3 font-semibold">{inquiries.length} enquir{inquiries.length === 1 ? "y" : "ies"}</h2>
      {inquiries.length === 0 ? (
        <p className="text-sm text-muted">No enquiries yet.</p>
      ) : (
        <div className="grid gap-3">
          {inquiries.map((i) => (
            <div key={i.id} className="flex items-start justify-between gap-4 border border-line bg-card p-4">
              <div>
                <p className="text-sm font-bold">{i.name} — {i.phone}</p>
                {i.email && <p className="text-xs text-muted">{i.email}</p>}
                {i.interest && <p className="mt-1 text-xs text-accent">Interested in: {i.interest}</p>}
                {i.message && <p className="mt-2 text-sm">{i.message}</p>}
                <p className="mt-1 text-xs text-muted">
                  {new Date(i.created_at).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => handleDelete(i.id)}
                className="shrink-0 text-xs font-bold text-red-600 hover:underline"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
