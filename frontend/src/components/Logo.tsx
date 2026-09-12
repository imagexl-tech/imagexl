interface Props {
  className?: string;
  wordmarkSize?: string;
  taglineSize?: string;
  onDark?: boolean;
}

export default function Logo({
  className = "",
  wordmarkSize = "text-3xl",
  taglineSize = "text-xs",
  onDark = false,
}: Props) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span
        className={`${wordmarkSize} font-bold tracking-tight`}
        style={{
          fontFamily: "var(--font-brand)",
          background: "linear-gradient(180deg, #f5a340 0%, #e8622c 45%, #cc2f27 100%)",
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
        }}
      >
        image
      </span>
      <span
        className={`self-end ${taglineSize} font-semibold tracking-wide`}
        style={{
          fontFamily: "var(--font-sans)",
          color: onDark ? "#b9cddb" : "#1c3547",
          marginTop: "-0.15em",
        }}
      >
        Marketing Agencies
      </span>
    </span>
  );
}
