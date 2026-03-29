import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";

const navLinks = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Testimonials", href: "#testimonials" },
  { label: "Book a Session", href: "#booking" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#2D0A5E]/95 backdrop-blur-md border-b border-[#D6B46E]/20 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <button
          type="button"
          data-ocid="nav.link"
          onClick={() => scrollTo("#home")}
          className="flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-full border-2 border-[#D6B46E] flex items-center justify-center text-[#D6B46E] text-sm font-bold bg-[#D6B46E]/10">
            ✦
          </div>
          <span className="font-cinzel text-xl font-semibold text-[#F2E7D2] tracking-wide">
            Vrishu Tarot
          </span>
        </button>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <button
              type="button"
              key={link.label}
              data-ocid="nav.link"
              onClick={() => scrollTo(link.href)}
              className="text-[#C9C1B3] hover:text-[#D6B46E] transition-colors text-sm font-medium tracking-wide font-poppins"
            >
              {link.label}
            </button>
          ))}
        </nav>

        {/* CTA */}
        <div className="hidden md:block">
          <button
            type="button"
            data-ocid="nav.primary_button"
            onClick={() => scrollTo("#booking")}
            className="gold-btn px-6 py-2.5 rounded-full text-sm font-semibold font-poppins"
          >
            Book Now
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          className="md:hidden text-[#D6B46E] p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#2D0A5E]/98 border-t border-[#D6B46E]/20 px-6 pb-6"
          >
            <nav className="flex flex-col gap-4 pt-4">
              {navLinks.map((link) => (
                <button
                  type="button"
                  key={link.label}
                  data-ocid="nav.link"
                  onClick={() => scrollTo(link.href)}
                  className="text-[#C9C1B3] hover:text-[#D6B46E] transition-colors font-medium py-2 border-b border-[#D6B46E]/10 font-poppins text-left"
                >
                  {link.label}
                </button>
              ))}
              <button
                type="button"
                data-ocid="nav.primary_button"
                onClick={() => scrollTo("#booking")}
                className="gold-btn px-6 py-3 rounded-full text-sm font-semibold mt-2 font-poppins"
              >
                Book Now
              </button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
