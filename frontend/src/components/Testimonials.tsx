import { useEffect, useState, type FormEvent } from "react";
import { fetchTestimonials, submitTestimonial } from "../api/client";
import type { Testimonial } from "../types";
import StarRating from "./StarRating";
import { useToast } from "../context/ToastContext";

export default function Testimonials() {
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const { showToast } = useToast();

  function load() {
    fetchTestimonials(true).then(setTestimonials).catch(() => setTestimonials([]));
  }

  useEffect(load, []);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setSubmitting(true);
    try {
      await submitTestimonial({ name, rating, message });
      setName("");
      setMessage("");
      setRating(5);
      setShowForm(false);
      showToast("Thank you! Your review will appear after a quick approval.");
    } catch {
      showToast("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section id="testimonials" className="bg-card px-[5vw] py-16">
      <div className="mb-8 flex flex-col justify-between gap-3 md:flex-row md:items-end">
        <div>
          <div className="text-[11px] font-extrabold uppercase tracking-[3px] text-accent">
            Customer reviews
          </div>
          <h2 className="font-serif-heading mt-2 text-3xl font-bold md:text-4xl">
            What our customers say.
          </h2>
        </div>
        <button
          onClick={() => setShowForm((v) => !v)}
          className="w-fit rounded-sm border border-ink px-4 py-2.5 text-xs font-bold text-ink hover:bg-dark hover:text-white"
        >
          {showForm ? "Cancel" : "Write a review"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className="mb-10 grid max-w-lg gap-3 border border-line bg-cream p-5">
          <input
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="border border-line px-3.5 py-2.5 text-sm outline-none focus:border-accent"
          />
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted">Your rating:</span>
            <StarRating rating={rating} onChange={setRating} size={20} />
          </div>
          <textarea
            required
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Tell us about your experience"
            className="min-h-[100px] resize-y border border-line px-3.5 py-2.5 text-sm outline-none focus:border-accent"
          />
          <button
            type="submit"
            disabled={submitting}
            className="w-fit rounded-sm border border-dark bg-dark px-5 py-2.5 text-xs font-bold text-white hover:bg-black disabled:opacity-60"
          >
            {submitting ? "Submitting…" : "Submit review"}
          </button>
        </form>
      )}

      {testimonials.length === 0 ? (
        <p className="text-sm text-muted">No reviews yet — be the first to share your experience!</p>
      ) : (
        <div className="grid grid-cols-1 gap-4.5 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <div key={t.id} className="border border-line bg-paper p-5">
              <StarRating rating={t.rating} />
              <p className="mt-3 text-sm leading-relaxed text-ink">&ldquo;{t.message}&rdquo;</p>
              <p className="mt-4 text-xs font-bold uppercase tracking-wide text-muted">— {t.name}</p>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
