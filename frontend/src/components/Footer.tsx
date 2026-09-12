import { Link } from "react-router-dom";
import { siteConfig } from "../siteConfig";
import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="flex flex-col gap-4 bg-dark px-[5vw] py-10 text-[12px] text-neutral-400 md:flex-row md:items-center md:justify-between">
      <div>
        <Logo wordmarkSize="text-2xl" taglineSize="text-[10px]" onDark />
        <div className="mt-1.5">{siteConfig.tagline}</div>
        <div className="mt-2 flex flex-col gap-1">
          {siteConfig.phones.map((p) => (
            <a key={p.link} href={`tel:${p.link}`} className="hover:text-white">{p.display}</a>
          ))}
          <a href={`mailto:${siteConfig.email}`} className="hover:text-white">{siteConfig.email}</a>
        </div>
      </div>
      <div className="flex gap-5">
        <Link to="/products" className="hover:text-white">Products</Link>
        <a href="/#testimonials" className="hover:text-white">Reviews</a>
        <a href="/#visit" className="hover:text-white">Location</a>
        <Link to="/admin/login" className="hover:text-white">Admin</Link>
      </div>
      <div>© {new Date().getFullYear()} {siteConfig.businessName}. All rights reserved.</div>
    </footer>
  );
}
