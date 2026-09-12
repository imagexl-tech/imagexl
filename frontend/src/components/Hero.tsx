import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      id="home"
      className="grid min-h-[560px] items-center gap-12 px-[5vw] py-16 md:grid-cols-2 md:py-20"
      style={{
        background:
          "linear-gradient(90deg, var(--color-hero-a) 0%, var(--color-hero-a) 55%, var(--color-hero-b) 55%)",
      }}
    >
      <div>
        <div className="text-[11px] font-extrabold uppercase tracking-[3px] text-accent">
          Curated appliance collection
        </div>
        <h1 className="font-serif-heading mt-4 text-[44px] font-extrabold leading-[1.02] tracking-tight sm:text-[58px] md:text-[72px]">
          Designed for the modern kitchen.
        </h1>
        <p className="mt-5 max-w-lg text-[17px] leading-relaxed text-muted">
          Discover premium chimneys, hobs, ovens, stoves, sinks, dishwashers, refrigerators and air
          conditioners from nine leading brands — all through Image Marketing Agencies.
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            to="/products"
            className="rounded-sm border border-dark bg-dark px-5 py-3 text-xs font-bold text-white hover:bg-black"
          >
            Explore products
          </Link>
          <a
            href="#contact"
            className="rounded-sm border border-line px-5 py-3 text-xs font-bold text-ink hover:border-ink"
          >
            Talk to our team
          </a>
        </div>
      </div>
      <div
        className="relative h-[320px] overflow-hidden rounded-sm md:h-[460px]"
        style={{ background: "linear-gradient(135deg, #d9d2c7, #f4f0e8 45%, #b7aa99)" }}
        aria-label="Showroom image placeholder"
      >
        <span className="absolute bottom-6 left-6 text-[11px] font-extrabold tracking-[4px] text-white">
          PREMIUM SHOWROOM
        </span>
      </div>
    </section>
  );
}
