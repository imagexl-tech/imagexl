import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchProducts } from "../api/client";
import type { Product } from "../types";
import ProductCard from "./ProductCard";

export default function FeaturedProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts({ sort: "newest" })
      .then((data) => setProducts(data.slice(0, 4)))
      .catch(() => setProducts([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <section id="catalog" className="px-[5vw] py-16">
      <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-[3px] text-accent">
            Featured catalogue
          </div>
          <h2 className="font-serif-heading mt-2 text-3xl font-bold md:text-4xl">
            Popular right now.
          </h2>
        </div>
        <Link to="/products" className="text-sm font-bold text-ink underline underline-offset-4 hover:text-accent">
          View full catalogue &amp; filters →
        </Link>
      </div>
      {loading ? (
        <p className="text-sm text-muted">Loading products…</p>
      ) : products.length === 0 ? (
        <p className="text-sm text-muted">
          No products yet. Add some from the admin dashboard.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
          {products.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}
