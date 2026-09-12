import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import SearchFilterBar from "../components/SearchFilterBar";
import ProductCard from "../components/ProductCard";
import { fetchMeta, fetchProducts } from "../api/client";
import type { Meta, Product } from "../types";

export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [meta, setMeta] = useState<Meta | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const search = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const brand = searchParams.get("brand") || "";
  const sort = searchParams.get("sort") || "";

  useEffect(() => {
    fetchMeta().then(setMeta).catch(() => setMeta(null));
  }, []);

  useEffect(() => {
    setLoading(true);
    const handle = window.setTimeout(() => {
      fetchProducts({ q: search, category, brand, sort })
        .then(setProducts)
        .catch(() => setProducts([]))
        .finally(() => setLoading(false));
    }, 250);
    return () => window.clearTimeout(handle);
  }, [search, category, brand, sort]);

  const filters = useMemo(
    () => ({
      search,
      category,
      brand,
      sort,
      onSearchChange: (v: string) => setSearchParams((p) => setParam(p, "q", v)),
      onCategoryChange: (v: string) => setSearchParams((p) => setParam(p, "category", v)),
      onBrandChange: (v: string) => setSearchParams((p) => setParam(p, "brand", v)),
      onSortChange: (v: string) => setSearchParams((p) => setParam(p, "sort", v)),
      onReset: () => setSearchParams({}),
    }),
    [search, category, brand, sort, setSearchParams]
  );

  return (
    <div>
      <Navbar />
      <section className="px-[5vw] py-12">
        <div className="mb-2 text-[11px] font-extrabold uppercase tracking-[3px] text-accent">
          Full catalogue
        </div>
        <h1 className="font-serif-heading mb-6 text-3xl font-bold md:text-4xl">
          {brand ? `${brand} products` : "All products"}
        </h1>

        <SearchFilterBar meta={meta} {...filters} />

        {loading ? (
          <p className="text-sm text-muted">Loading products…</p>
        ) : products.length === 0 ? (
          <p className="text-sm text-muted">
            No products match your search. Try clearing a filter.
          </p>
        ) : (
          <>
            <p className="mb-4 text-xs text-muted">{products.length} product(s) found</p>
            <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </>
        )}
      </section>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function setParam(params: URLSearchParams, key: string, value: string) {
  const next = new URLSearchParams(params);
  if (value) next.set(key, value);
  else next.delete(key);
  return next;
}
