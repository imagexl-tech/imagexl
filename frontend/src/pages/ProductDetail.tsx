import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";
import ImageLightbox from "../components/ImageLightbox";
import { fetchProduct } from "../api/client";
import { siteConfig } from "../siteConfig";
import type { Product } from "../types";

const formatter = new Intl.NumberFormat("en-IN", {
  style: "currency",
  currency: "INR",
  maximumFractionDigits: 0,
});

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState(0);
  const [activeImage, setActiveImage] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setNotFound(false);
    fetchProduct(id)
      .then((p) => {
        setProduct(p);
        setSelectedVariant(0);
        setActiveImage(0);
      })
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div>
        <Navbar />
        <div className="px-[5vw] py-20 text-center text-sm text-muted">Loading product…</div>
        <Footer />
      </div>
    );
  }

  if (notFound || !product) {
    return (
      <div>
        <Navbar />
        <div className="px-[5vw] py-20 text-center">
          <p className="text-sm text-muted">We couldn't find that product.</p>
          <Link to="/products" className="mt-3 inline-block text-sm font-bold text-accent hover:underline">
            ← Back to all products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const hasVariants = product.variants && product.variants.length > 0;
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
    <div>
      <Navbar />

      <div className="px-[5vw] pt-6 text-xs text-muted">
        <Link to="/products" className="hover:text-accent">All products</Link>
        {" / "}
        <Link to={`/products?brand=${encodeURIComponent(product.brand)}`} className="hover:text-accent">
          {product.brand}
        </Link>
        {" / "}
        <span className="text-ink">{product.name}</span>
      </div>

      <section className="grid gap-10 px-[5vw] py-8 md:grid-cols-2">
        {/* Gallery */}
        <div>
          {images.length > 0 ? (
            <>
              <button
                onClick={() => setLightboxOpen(true)}
                className="block h-[380px] w-full cursor-zoom-in overflow-hidden border border-line bg-cream md:h-[460px]"
                aria-label="Open full-screen zoom"
              >
                <img
                  src={images[activeImage]}
                  alt={`${product.name} — photo ${activeImage + 1} of ${images.length}`}
                  className="h-full w-full object-contain"
                />
              </button>
              {images.length > 1 && (
                <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
                  {images.map((src, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveImage(i)}
                      className={`h-16 w-16 flex-none overflow-hidden border-2 ${
                        i === activeImage ? "border-accent" : "border-line opacity-70 hover:opacity-100"
                      }`}
                    >
                      <img src={src} alt="" className="h-full w-full object-cover" />
                    </button>
                  ))}
                </div>
              )}
              <p className="mt-2 text-[11px] text-muted">Click the photo to zoom in and scroll through all images.</p>
            </>
          ) : (
            <div className="flex h-[380px] items-center justify-center border border-line bg-gradient-to-br from-[#f1eee8] to-[#d9d5ce] text-sm text-muted md:h-[460px]">
              PRODUCT IMAGE
            </div>
          )}
        </div>

        {/* Details */}
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-[2px] text-accent">
            {product.brand} • {product.category}
          </div>
          <h1 className="font-serif-heading mt-2 text-3xl font-bold">{product.name}</h1>

          {hasVariants && product.variants.length > 1 && (
            <div className="mt-5">
              <div className="mb-1.5 text-xs font-bold uppercase tracking-wide text-muted">
                Size: <span className="text-ink">{variant?.label}</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.variants.map((v, i) => (
                  <button
                    key={v.label}
                    onClick={() => setSelectedVariant(i)}
                    className={`border px-4 py-2 text-sm font-bold ${
                      i === selectedVariant
                        ? "border-accent bg-accent text-white"
                        : "border-line text-muted hover:border-accent hover:text-accent"
                    }`}
                  >
                    {v.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5 flex items-baseline gap-3">
            <span className="text-[28px] font-extrabold">{formatter.format(displayPrice)}</span>
            {compareAt && compareAt > displayPrice && (
              <span className="text-base text-muted line-through">{formatter.format(compareAt)}</span>
            )}
          </div>

          {product.description && (
            <p className="mt-4 text-sm leading-relaxed text-muted">{product.description}</p>
          )}

          {product.features && product.features.length > 0 && (
            <div className="mt-5">
              <div className="mb-1.5 text-xs font-bold uppercase tracking-wide text-muted">Features</div>
              <ul className="grid gap-1.5 text-sm text-ink">
                {product.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <span className="text-accent">•</span>
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {product.warranty && (
            <p className="mt-4 text-xs text-muted">Warranty: {product.warranty}</p>
          )}
          {!product.in_stock && (
            <span className="mt-3 inline-block w-fit rounded-sm bg-cream px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-muted">
              Out of stock
            </span>
          )}

          <a href={waHref} target="_blank" rel="noopener noreferrer" className="mt-7 block">
            <span className="block w-full rounded-sm border border-dark bg-dark px-5 py-3.5 text-center text-sm font-bold text-white hover:bg-black">
              Enquire now
            </span>
          </a>
        </div>
      </section>

      <Footer />
      <WhatsAppButton />

      {lightboxOpen && (
        <ImageLightbox
          images={images}
          startIndex={activeImage}
          alt={product.name}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </div>
  );
}
