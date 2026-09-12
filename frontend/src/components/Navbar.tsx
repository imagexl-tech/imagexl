import { Link, useNavigate } from "react-router-dom";
import { siteConfig } from "../siteConfig";
import ThemeToggle from "./ThemeToggle";
import Logo from "./Logo";

export default function Navbar() {
  const navigate = useNavigate();

  return (
    <>
      <div className="hidden items-center justify-between gap-4 bg-dark px-[5vw] py-2 text-[12px] text-white md:flex">
        <span className="text-neutral-300">
          {siteConfig.tagline} • Enquire for latest price &amp; availability
        </span>
        <div className="flex items-center gap-5">
          {siteConfig.phones.map((p) => (
            <a key={p.link} href={`tel:${p.link}`} className="flex items-center gap-1.5 hover:text-accent">
              <PhoneIcon />
              {p.display}
            </a>
          ))}
          <a href={`mailto:${siteConfig.email}`} className="flex items-center gap-1.5 hover:text-accent">
            <MailIcon />
            {siteConfig.email}
          </a>
        </div>
      </div>
      <nav className="sticky top-0 z-20 flex items-center justify-between border-b border-line bg-paper/95 px-[5vw] py-4 backdrop-blur">
        <Link to="/" aria-label={siteConfig.businessName}>
          <Logo />
        </Link>
        <div className="hidden gap-7 text-sm md:flex">
          <a href="/#brands" className="hover:text-accent">Brands</a>
          <Link to="/products" className="hover:text-accent">Products</Link>
          <a href="/#testimonials" className="hover:text-accent">Reviews</a>
          <a href="/#visit" className="hover:text-accent">Visit Us</a>
          <a href="/#contact" className="hover:text-accent">Contact</a>
        </div>
        <div className="flex items-center gap-2.5">
          <ThemeToggle />
          <button
            onClick={() => navigate("/products")}
            className="rounded-sm border border-line bg-transparent px-4 py-2.5 text-xs font-bold text-ink hover:border-ink"
          >
            Browse
          </button>
          <a
            href="/#contact"
            className="rounded-sm border border-dark bg-dark px-4 py-2.5 text-xs font-bold text-white hover:bg-black"
          >
            Enquire
          </a>
        </div>
      </nav>
    </>
  );
}

function PhoneIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.4.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.4 0 .8-.2 1L6.6 10.8Z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M3 5h18c.6 0 1 .4 1 1v12c0 .6-.4 1-1 1H3c-.6 0-1-.4-1-1V6c0-.6.4-1 1-1Zm1.4 2 7.1 5.6c.3.2.7.2 1 0L19.6 7H4.4ZM4 8.4V17h16V8.4l-6.9 5.4c-1 .8-2.3.8-3.2 0L4 8.4Z" />
    </svg>
  );
}
