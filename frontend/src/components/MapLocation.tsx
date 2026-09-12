import { useState } from "react";
import { siteConfig } from "../siteConfig";

export default function MapLocation() {
  const [active, setActive] = useState(0);
  const location = siteConfig.locations[active];
  const mapSrc = `https://www.google.com/maps?q=${location.lat},${location.lng}&z=16&output=embed`;
  const directionsHref = `https://www.google.com/maps/dir/?api=1&destination=${location.lat},${location.lng}`;

  return (
    <section id="visit" className="grid gap-0 bg-[#151515] text-white md:grid-cols-2">
      <div className="px-[5vw] py-16 md:pr-10">
        <div className="text-[11px] font-extrabold uppercase tracking-[3px] text-accent">
          Visit our showrooms
        </div>
        <h2 className="font-serif-heading mt-3 text-3xl font-bold md:text-4xl">
          See it before you buy it.
        </h2>
        <p className="mt-4 max-w-md text-sm leading-relaxed text-neutral-300">
          Walk in to compare finishes, sizes and features in person. We have three locations across
          Vijayawada — pick one to see it on the map.
        </p>

        <div className="mt-7 flex flex-wrap gap-2">
          {siteConfig.locations.map((loc, i) => (
            <button
              key={loc.label}
              onClick={() => setActive(i)}
              className={`border px-3.5 py-2 text-xs font-bold uppercase tracking-wide transition-colors ${
                i === active
                  ? "border-accent bg-accent text-white"
                  : "border-neutral-600 text-neutral-300 hover:border-accent hover:text-accent"
              }`}
            >
              {loc.label}
            </button>
          ))}
        </div>

        <div className="mt-6 space-y-4 text-sm">
          <div className="border-t border-neutral-700 pt-4">
            <b className="mb-1 block text-[11px] uppercase tracking-[2px] text-accent">Address</b>
            {location.lines.map((line) => (
              <span key={line} className="block">{line}</span>
            ))}
            <a
              href={directionsHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-xs font-bold text-accent hover:underline"
            >
              Get directions →
            </a>
          </div>
          <div className="border-t border-neutral-700 pt-4">
            <b className="mb-1 block text-[11px] uppercase tracking-[2px] text-accent">Hours</b>
            {siteConfig.hours}
          </div>
          <div className="border-t border-neutral-700 pt-4">
            <b className="mb-1 block text-[11px] uppercase tracking-[2px] text-accent">Phone</b>
            <div className="flex flex-col gap-1">
              {siteConfig.phones.map((p) => (
                <a key={p.link} href={`tel:${p.link}`} className="hover:text-accent">{p.display}</a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <iframe
        key={location.label}
        title={`Map: ${location.label}`}
        src={mapSrc}
        className="h-[320px] w-full border-0 md:h-full"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  );
}
