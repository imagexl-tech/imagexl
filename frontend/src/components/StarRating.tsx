interface Props {
  rating: number;
  onChange?: (value: number) => void;
  size?: number;
}

export default function StarRating({ rating, onChange, size = 16 }: Props) {
  const stars = [1, 2, 3, 4, 5];
  return (
    <div className="flex gap-0.5" role={onChange ? "radiogroup" : undefined}>
      {stars.map((s) => (
        <button
          key={s}
          type="button"
          disabled={!onChange}
          onClick={() => onChange?.(s)}
          aria-label={`${s} star${s > 1 ? "s" : ""}`}
          className={onChange ? "cursor-pointer" : "cursor-default"}
          style={{ color: s <= rating ? "var(--color-accent)" : "var(--color-line)", lineHeight: 0 }}
        >
          <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2.5l2.9 6.3 6.9.7-5.2 4.6 1.5 6.8-6.1-3.6-6.1 3.6 1.5-6.8-5.2-4.6 6.9-.7L12 2.5z" />
          </svg>
        </button>
      ))}
    </div>
  );
}
