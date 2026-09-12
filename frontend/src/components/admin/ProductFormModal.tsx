import { useState, type FormEvent } from "react";
import type { Product, ProductInput, ProductVariant } from "../../types";

interface Props {
  product: Product | null;
  onClose: () => void;
  onSave: (data: ProductInput) => Promise<void>;
}

const EMPTY: ProductInput = {
  name: "",
  category: "",
  brand: "",
  price: 0,
  description: "",
  warranty: "",
  image_url: "",
  images: [],
  features: [],
  variants: [],
  in_stock: true,
};

export default function ProductFormModal({ product, onClose, onSave }: Props) {
  const [form, setForm] = useState<ProductInput>(
    product
      ? {
          name: product.name,
          category: product.category,
          brand: product.brand,
          price: product.price,
          description: product.description,
          warranty: product.warranty,
          image_url: product.image_url,
          images: product.images || [],
          features: product.features || [],
          variants: product.variants || [],
          in_stock: product.in_stock,
        }
      : EMPTY
  );
  const [imagesText, setImagesText] = useState((product?.images || []).join("\n"));
  const [featuresText, setFeaturesText] = useState((product?.features || []).join("\n"));
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setSaving(true);
    try {
      await onSave({
        ...form,
        images: imagesText.split("\n").map((s) => s.trim()).filter(Boolean),
        features: featuresText.split("\n").map((s) => s.trim()).filter(Boolean),
      });
    } catch {
      setError("Could not save product. Please check the fields and try again.");
    } finally {
      setSaving(false);
    }
  }

  function set<K extends keyof ProductInput>(key: K, value: ProductInput[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function updateVariant(index: number, patch: Partial<ProductVariant>) {
    setForm((f) => ({
      ...f,
      variants: f.variants.map((v, i) => (i === index ? { ...v, ...patch } : v)),
    }));
  }

  function addVariant() {
    setForm((f) => ({ ...f, variants: [...f.variants, { label: "", price: f.price }] }));
  }

  function removeVariant(index: number) {
    setForm((f) => ({ ...f, variants: f.variants.filter((_, i) => i !== index) }));
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto bg-card p-6">
        <h2 className="font-serif-heading text-xl font-bold">
          {product ? "Edit product" : "Add product"}
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 grid gap-3">
          <input
            required
            value={form.name}
            onChange={(e) => set("name", e.target.value)}
            placeholder="Product name"
            className="border border-line px-3.5 py-2.5 text-sm outline-none focus:border-accent"
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              required
              value={form.category}
              onChange={(e) => set("category", e.target.value)}
              placeholder="Category (e.g. Chimneys)"
              className="border border-line px-3.5 py-2.5 text-sm outline-none focus:border-accent"
            />
            <input
              required
              value={form.brand}
              onChange={(e) => set("brand", e.target.value)}
              placeholder="Brand"
              className="border border-line px-3.5 py-2.5 text-sm outline-none focus:border-accent"
            />
          </div>
          <input
            required
            type="number"
            min={0}
            step="1"
            value={form.price}
            onChange={(e) => set("price", Number(e.target.value))}
            placeholder="Base price (INR) — used when there are no size options below"
            className="border border-line px-3.5 py-2.5 text-sm outline-none focus:border-accent"
          />
          <input
            value={form.image_url}
            onChange={(e) => set("image_url", e.target.value)}
            placeholder="Primary image URL (used as fallback if no gallery images below)"
            className="border border-line px-3.5 py-2.5 text-sm outline-none focus:border-accent"
          />
          <textarea
            value={imagesText}
            onChange={(e) => setImagesText(e.target.value)}
            placeholder={"Gallery image URLs — one per line\nhttps://example.com/photo1.jpg\nhttps://example.com/photo2.jpg"}
            className="min-h-[80px] resize-y border border-line px-3.5 py-2.5 text-sm outline-none focus:border-accent"
          />
          <input
            value={form.warranty}
            onChange={(e) => set("warranty", e.target.value)}
            placeholder="Warranty (optional)"
            className="border border-line px-3.5 py-2.5 text-sm outline-none focus:border-accent"
          />
          <textarea
            value={form.description}
            onChange={(e) => set("description", e.target.value)}
            placeholder="Description"
            className="min-h-[90px] resize-y border border-line px-3.5 py-2.5 text-sm outline-none focus:border-accent"
          />
          <textarea
            value={featuresText}
            onChange={(e) => setFeaturesText(e.target.value)}
            placeholder={"Features — one per line\nAuto-clean technology\nBLDC motor"}
            className="min-h-[80px] resize-y border border-line px-3.5 py-2.5 text-sm outline-none focus:border-accent"
          />

          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wide text-muted">
                Size options (optional — price changes with size on the site)
              </span>
              <button
                type="button"
                onClick={addVariant}
                className="text-xs font-bold text-accent hover:underline"
              >
                + Add size
              </button>
            </div>
            {form.variants.length === 0 ? (
              <p className="text-xs text-muted">
                No size options — the base price above will be shown as-is.
              </p>
            ) : (
              <div className="grid gap-2">
                {form.variants.map((v, i) => (
                  <div key={i} className="grid grid-cols-[1fr_1fr_1fr_auto] gap-2">
                    <input
                      required
                      value={v.label}
                      onChange={(e) => updateVariant(i, { label: e.target.value })}
                      placeholder="Size (e.g. 90cm)"
                      className="border border-line px-2.5 py-2 text-sm outline-none focus:border-accent"
                    />
                    <input
                      required
                      type="number"
                      min={0}
                      value={v.price}
                      onChange={(e) => updateVariant(i, { price: Number(e.target.value) })}
                      placeholder="Price"
                      className="border border-line px-2.5 py-2 text-sm outline-none focus:border-accent"
                    />
                    <input
                      type="number"
                      min={0}
                      value={v.compare_at_price ?? ""}
                      onChange={(e) =>
                        updateVariant(i, {
                          compare_at_price: e.target.value ? Number(e.target.value) : null,
                        })
                      }
                      placeholder="Was (optional)"
                      className="border border-line px-2.5 py-2 text-sm outline-none focus:border-accent"
                    />
                    <button
                      type="button"
                      onClick={() => removeVariant(i)}
                      className="text-xs font-bold text-red-600 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <label className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={form.in_stock}
              onChange={(e) => set("in_stock", e.target.checked)}
            />
            In stock
          </label>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <div className="mt-2 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-muted hover:text-ink"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="rounded-sm border border-dark bg-dark px-5 py-2.5 text-xs font-bold text-white hover:bg-black disabled:opacity-60"
            >
              {saving ? "Saving…" : "Save product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
