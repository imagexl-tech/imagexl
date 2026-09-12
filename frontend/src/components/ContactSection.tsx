import { useState, type FormEvent } from "react";
import { submitInquiry } from "../api/client";
import { siteConfig } from "../siteConfig";
import { useToast } from "../context/ToastContext";

const INTERESTS = ["Chimneys", "Stoves", "Hobs", "Ovens", "Sinks", "Dishwashers", "Refrigerators", "AC"];

export default function ContactSection() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("");
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  const waHref = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    siteConfig.whatsappDefaultMessage
  )}`;

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    try {
      await submitInquiry({ name, phone, email, interest, message });
      showToast("Thank you — your enquiry has been sent. We'll be in touch shortly.");
      setName("");
      setPhone("");
      setEmail("");
      setInterest("");
      setMessage("");
    } catch {
      showToast("Something went wrong sending your enquiry. Please try WhatsApp instead.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="contact" className="grid gap-12 bg-card px-[5vw] py-16 md:grid-cols-2">
      <div>
        <div className="text-[11px] font-extrabold uppercase tracking-[3px] text-accent">
          Visit &amp; connect
        </div>
        <h2 className="font-serif-heading mt-3 text-3xl font-bold md:text-4xl">
          Let&apos;s find the right appliance for your home.
        </h2>
        <p className="mt-3 text-sm text-muted">
          For the latest price, stock, installation and model availability, contact our team directly.
        </p>

        <a
          href={waHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-6 flex w-fit items-center gap-2 rounded-sm bg-[#25D366] px-5 py-3 text-sm font-bold text-white hover:opacity-90"
        >
          Chat with us on WhatsApp
        </a>

        <div className="mt-6 bg-cream p-6">
          <div className="border-b border-line py-4 first:pt-0">
            <b className="mb-2 block text-[11px] uppercase tracking-[2px] text-accent">Our Showrooms</b>
            <div className="grid gap-3">
              {siteConfig.locations.map((loc) => (
                <div key={loc.label}>
                  <span className="block text-xs font-bold text-ink">{loc.label}</span>
                  {loc.lines.map((line) => (
                    <span key={line} className="block text-muted">{line}</span>
                  ))}
                </div>
              ))}
            </div>
          </div>
          <div className="border-b border-line py-4">
            <b className="mb-1 block text-[11px] uppercase tracking-[2px] text-accent">Phone</b>
            <div className="flex flex-col gap-1">
              {siteConfig.phones.map((p) => (
                <a key={p.link} href={`tel:${p.link}`} className="hover:text-accent">{p.display}</a>
              ))}
            </div>
          </div>
          <div className="border-b border-line py-4">
            <b className="mb-1 block text-[11px] uppercase tracking-[2px] text-accent">Email</b>
            <a href={`mailto:${siteConfig.email}`}>{siteConfig.email}</a>
          </div>
          <div className="py-4 last:pb-0">
            <b className="mb-1 block text-[11px] uppercase tracking-[2px] text-accent">Hours</b>
            {siteConfig.hours}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid gap-3">
        <input
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="border border-line px-3.5 py-3 text-sm outline-none focus:border-accent"
        />
        <input
          required
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Phone number"
          className="border border-line px-3.5 py-3 text-sm outline-none focus:border-accent"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email (optional)"
          className="border border-line px-3.5 py-3 text-sm outline-none focus:border-accent"
        />
        <select
          value={interest}
          onChange={(e) => setInterest(e.target.value)}
          className="border border-line px-3.5 py-3 text-sm outline-none focus:border-accent"
        >
          <option value="">I&apos;m interested in...</option>
          {INTERESTS.map((i) => (
            <option key={i} value={i}>{i}</option>
          ))}
        </select>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Tell us the brand/model or what you are looking for"
          className="min-h-[130px] resize-y border border-line px-3.5 py-3 text-sm outline-none focus:border-accent"
        />
        <button
          type="submit"
          disabled={submitting}
          className="w-fit rounded-sm border border-dark bg-dark px-5 py-3 text-xs font-bold text-white hover:bg-black disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Send inquiry"}
        </button>
      </form>
    </section>
  );
}
