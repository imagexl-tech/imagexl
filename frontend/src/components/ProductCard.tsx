import { useState } from "react";
import { Link } from "react-router-dom";
import type { Product } from "../types";
import { siteConfig } from "../siteConfig";

interface Props {
  product: Product;
}

const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function ProductCard({ product }: Props) {
  const hasVariants = product.variants && product.variants.length > 0;
  const [selectedVariant, setSelectedVariant] = useState(0);
  const variant = hasVariants ? product.variants[selectedVariant] : null;

  const displayPrice = variant ? variant.price : product.price;
  const compareAt = variant?.compare_at_price;

  const images = product.images && product.images.length > 0
    ? product.images
    : product.image_url
      ? [product.image_url]
      : [];

  const waHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    `Hi, I'm interested in the ${product.name}${variant ? ` (${variant.label})` : ""} (${product.brand}). Could you share more details?`
  )}`;

  return (
    <article className="group flex flex-col overflow-hidden border border-line bg-card transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_15px_35px_rgba(0,0,0,0.06)]">
      <Link to={`/products/${product.id}`}>
        {images.length > 0 ? (
          <div className="flex h-[220px] snap-x snap-mandatory gap-0 overflow-x-auto scroll-smooth [scrollbar-width:thin]">
            {images.map((src, i) => (
              <img
                key={i}
                src={src}
                alt={`${product.name} — photo ${i + 1} of ${images.length}`}
                className="h-full w-full flex-none snap-center object-cover"
                loading="lazy"
              />
            ))}
          </div>
        ) : (
          <div className="flex h-[220px] items-center justify-center bg-gradient-to-br from-[#f1eee8] to-[#d9d5ce] text-[12px] tracking-wide text-muted">
            PRODUCT IMAGE
          </div>
        )}
      </Link>

      <div className="flex flex-1 flex-col p-4.5">
        <div className="text-[10px] font-extrabold uppercase tracking-[1.5px] text-accent">
          {product.brand} • {product.category}
        </div>
        <Link to={`/products/${product.id}`}>
          <h3 className="font-serif-heading mt-2 text-xl font-bold hover:text-accent">{product.name}</h3>
        </Link>

        {hasVariants && product.variants.length > 1 && (
          <div className="mt-2.5 flex flex-wrap gap-1.5">
            {product.variants.map((v, i) => (
              <button
                key={v.label}
                onClick={() => setSelectedVariant(i)}
                className={`border px-2.5 py-1 text-[11px] font-bold ${
                  i === selectedVariant
                    ? "border-accent bg-accent text-white"
                    : "border-line text-muted hover:border-accent hover:text-accent"
                }`}
              >
                {v.label}
              </button>
            ))}
          </div>
        )}

        <div className="mt-2.5 flex items-baseline gap-2">
          <span className="text-[17px] font-extrabold">{formatter.format(displayPrice)}</span>
          {compareAt && compareAt > displayPrice && (
            <span className="text-[13px] text-muted line-through">{formatter.format(compareAt)}</span>
          )}
        </div>

        <p className="text-[12px] leading-relaxed text-muted">
          {product.description || "Model, specifications, warranty and availability on request."}
        </p>

        {product.features && product.features.length > 0 && (
          <ul className="mt-2 grid gap-0.5 text-[11px] leading-relaxed text-muted">
            {product.features.slice(0, 4).map((f) => (
              <li key={f} className="flex gap-1.5">
                <span className="text-accent">•</span>
                {f}
              </li>
            ))}
          </ul>
        )}

        {product.warranty && (
          <p className="mt-1 text-[11px] text-muted">Warranty: {product.warranty}</p>
        )}
        {!product.in_stock && (
          <span className="mt-2 inline-block w-fit rounded-sm bg-cream px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-muted">
            Out of stock
          </span>
        )}

        <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
          <Link
            to={`/products/${product.id}`}
            className="rounded-sm border border-line px-4 py-2.5 text-center text-xs font-bold text-ink hover:border-ink"
          >
            View details
          </Link>
          <a href={waHref} target="_blank" rel="noopener noreferrer">
            <span className="block w-full rounded-sm border border-dark bg-dark px-4 py-2.5 text-center text-xs font-bold text-white hover:bg-black">
              Enquire now
            </span>
          </a>
        </div>
      </div>
    </article>
  );
}
