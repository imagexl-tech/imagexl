import type { Meta } from "../types";

interface Props {
  meta: Meta | null;
  search: string;
  category: string;
  brand: string;
  sort: string;
  onSearchChange: (v: string) => void;
  onCategoryChange: (v: string) => void;
  onBrandChange: (v: string) => void;
  onSortChange: (v: string) => void;
  onReset: () => void;
}

export default function SearchFilterBar({
  meta,
  search,
  category,
  brand,
  sort,
  onSearchChange,
  onCategoryChange,
  onBrandChange,
  onSortChange,
  onReset,
}: Props) {
  return (
    <div className="mb-8 grid gap-3 border border-line bg-card p-4 md:grid-cols-[2fr_1fr_1fr_1fr_auto]">
      <input
        type="search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search products, e.g. chimney, oven..."
        className="border border-line px-3.5 py-2.5 text-sm outline-none focus:border-accent"
      />
      <select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        className="border border-line px-3.5 py-2.5 text-sm outline-none focus:border-accent"
      >
        <option value="">All categories</option>
        {meta?.categories.map((c) => (
          <option key={c} value={c}>{c}</option>
        ))}
      </select>
      <select
        value={brand}
        onChange={(e) => onBrandChange(e.target.value)}
        className="border border-line px-3.5 py-2.5 text-sm outline-none focus:border-accent"
      >
        <option value="">All brands</option>
        {meta?.brands.map((b) => (
          <option key={b} value={b}>{b}</option>
        ))}
      </select>
      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="border border-line px-3.5 py-2.5 text-sm outline-none focus:border-accent"
      >
        <option value="">Sort: Featured</option>
        <option value="price_asc">Price: Low to High</option>
        <option value="price_desc">Price: High to Low</option>
        <option value="newest">Newest first</option>
      </select>
      <button
        onClick={onReset}
        className="border border-line px-4 py-2.5 text-xs font-bold uppercase tracking-wide text-muted hover:border-ink hover:text-ink"
      >
        Reset
      </button>
    </div>
  );
}
