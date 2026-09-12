import { useTheme } from "../context/ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      title={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
      className="flex h-9 w-9 items-center justify-center rounded-sm border border-line text-ink transition-colors hover:border-accent hover:text-accent"
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.7 14.9a8.5 8.5 0 0 1-10.6-10.6 1 1 0 0 0-1.3-1.2A10.5 10.5 0 1 0 21.9 16.2a1 1 0 0 0-1.2-1.3Z" />
    </svg>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 4a1 1 0 0 1-1-1V1a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1Zm0 19a1 1 0 0 1-1-1v-2a1 1 0 1 1 2 0v2a1 1 0 0 1-1 1ZM4 13H2a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2Zm19 0h-2a1 1 0 1 1 0-2h2a1 1 0 1 1 0 2ZM5.6 6.9a1 1 0 0 1-.7-.3L3.5 5.2a1 1 0 1 1 1.4-1.4L6.3 5.2a1 1 0 0 1-.7 1.7Zm12.8 12.8a1 1 0 0 1-.7-.3l-1.4-1.4a1 1 0 1 1 1.4-1.4l1.4 1.4a1 1 0 0 1-.7 1.7ZM4.9 19.7a1 1 0 0 1-.7-1.7l1.4-1.4a1 1 0 1 1 1.4 1.4l-1.4 1.4a1 1 0 0 1-.7.3Zm12.8-12.8a1 1 0 0 1-.7-1.7l1.4-1.4a1 1 0 1 1 1.4 1.4l-1.4 1.4a1 1 0 0 1-.7.3ZM12 18a6 6 0 1 1 0-12 6 6 0 0 1 0 12Z" />
    </svg>
  );
}
