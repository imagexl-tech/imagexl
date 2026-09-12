import { useNavigate } from "react-router-dom";

const BRANDS: { name: string; logo: string }[] = [
  { name: "Crompton", logo: "/brands/crompton.svg" },
  { name: "Bosch", logo: "/brands/bosch.svg" },
  { name: "Hafele", logo: "/brands/hafele.svg" },
  { name: "Electrolux", logo: "/brands/electrolux.svg" },
  { name: "Faber", logo: "/brands/faber.png" },
  { name: "Sujatha", logo: "/brands/sujatha.png" },
  { name: "Glen", logo: "/brands/glen.png" },
  { name: "Kaff", logo: "/brands/kaff.png" },
  { name: "Hindware", logo: "/brands/hindware.png" },
];

export default function BrandStrip() {
  const navigate = useNavigate();

  return (
    <section id="brands" className="bg-card px-[5vw] py-16">
      <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-[3px] text-accent">
            Our collection
          </div>
          <h2 className="font-serif-heading mt-2 text-3xl font-bold md:text-4xl">
            {BRANDS.length} trusted brands.
          </h2>
        </div>
        <p className="max-w-md text-sm leading-relaxed text-muted">
          Choose a brand to explore its appliance collection, or browse the full catalogue with
          search and filters.
        </p>
      </div>
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        {BRANDS.map((b) => (
          <button
            key={b.name}
            onClick={() => navigate(`/products?brand=${encodeURIComponent(b.name)}`)}
            aria-label={`Browse ${b.name} products`}
            className="flex h-[190px] flex-col items-center justify-center gap-4 border border-line bg-card p-6 transition-all hover:-translate-y-1 hover:border-[#d2c1a8] hover:shadow-[0_12px_30px_rgba(0,0,0,0.06)]"
          >
            <div className="flex h-20 w-full items-center justify-center rounded-sm bg-white p-3">
              <img
                src={b.logo}
                alt={b.name}
                className="max-h-full max-w-full object-contain"
                loading="lazy"
              />
            </div>
            <span className="text-xs font-bold uppercase tracking-[2px] text-muted">
              {b.name}
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
