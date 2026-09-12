const FACTS: [string, string][] = [
  ["09", "Leading brands"],
  ["08+", "Appliance categories"],
  ["100%", "Verified customer reviews"],
  ["01", "Dedicated local showroom"],
];

export default function AboutFacts() {
  return (
    <section className="grid gap-14 bg-[#151515] px-[5vw] py-16 text-white md:grid-cols-2">
      <div>
        <div className="text-[11px] font-extrabold uppercase tracking-[3px] text-accent">
          About us
        </div>
        <h2 className="font-serif-heading mt-3 text-3xl font-bold md:text-4xl">
          A showroom built around choice, trust and service.
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-300">
          We bring together a curated range of kitchen and home appliances from established brands,
          helping customers compare products and connect with our team before making a purchase.
        </p>
        <a
          href="#contact"
          className="mt-6 inline-block rounded-sm bg-accent px-5 py-3 text-xs font-bold text-white hover:bg-accent-dark"
        >
          Visit / enquire
        </a>
      </div>
      <div className="grid grid-cols-2 gap-6">
        {FACTS.map(([num, label]) => (
          <div key={label} className="border-t border-neutral-600 pt-4">
            <strong className="font-serif-heading block text-3xl">{num}</strong>
            <span className="text-sm text-neutral-300">{label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
