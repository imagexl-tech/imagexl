import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BrandStrip from "../components/BrandStrip";
import FeaturedProducts from "../components/FeaturedProducts";
import Testimonials from "../components/Testimonials";
import AboutFacts from "../components/AboutFacts";
import MapLocation from "../components/MapLocation";
import ContactSection from "../components/ContactSection";
import Footer from "../components/Footer";
import WhatsAppButton from "../components/WhatsAppButton";

export default function Home() {
  return (
    <div>
      <Navbar />
      <Hero />
      <BrandStrip />
      <FeaturedProducts />
      <Testimonials />
      <AboutFacts />
      <MapLocation />
      <ContactSection />
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
