import { Instagram } from "lucide-react";

export default function Footer() {
  const year = new Date().getFullYear();
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="pt-16 pb-8"
      style={{
        background: "linear-gradient(180deg, #070413 0%, #050210 100%)",
        borderTop: "1px solid rgba(214,180,110,0.15)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-full border-2 border-[#D6B46E] flex items-center justify-center text-[#D6B46E] text-sm font-bold bg-[#D6B46E]/10">
                ✦
              </div>
              <span className="font-cinzel text-xl font-semibold text-[#F2E7D2]">
                Vrish Tarot
              </span>
            </div>
            <p className="text-[#C9C1B3] text-sm leading-relaxed font-poppins">
              Illuminating paths through the ancient wisdom of tarot. Your
              journey to clarity begins here.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-cinzel text-sm font-bold text-[#D6B46E] uppercase tracking-widest mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                ["Home", "#home"],
                ["Services", "#services"],
                ["About", "#about"],
                ["Testimonials", "#testimonials"],
                ["Book a Session", "#booking"],
              ].map(([label, href]) => (
                <li key={label}>
                  <a
                    href={href}
                    data-ocid="footer.link"
                    onClick={(e) => {
                      e.preventDefault();
                      scrollTo(href);
                    }}
                    className="text-[#C9C1B3] text-sm hover:text-[#D6B46E] transition-colors font-poppins"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect */}
          <div>
            <h4 className="font-cinzel text-sm font-bold text-[#D6B46E] uppercase tracking-widest mb-5">
              Connect with Vrish
            </h4>
            <div className="space-y-3">
              <a
                href="https://www.instagram.com/vaira_gan"
                target="_blank"
                rel="noopener noreferrer"
                data-ocid="footer.link"
                className="flex items-center gap-3 text-[#C9C1B3] hover:text-[#D6B46E] transition-colors font-poppins text-sm"
              >
                <Instagram size={16} /> @vaira_gan
              </a>
              <a
                href="tel:8882123244"
                data-ocid="footer.link"
                className="flex items-center gap-3 text-[#C9C1B3] hover:text-[#D6B46E] transition-colors font-poppins text-sm"
              >
                📞 8882123244
              </a>
              <p className="text-[#C9C1B3] text-xs font-poppins mt-1">
                Available 10am – 8pm IST
              </p>
            </div>
          </div>

          {/* Subscribe */}
          <div>
            <h4 className="font-cinzel text-sm font-bold text-[#D6B46E] uppercase tracking-widest mb-5">
              Subscribe
            </h4>
            <p className="text-[#C9C1B3] text-xs font-poppins mb-4">
              Get cosmic insights & reading offers in your inbox.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                data-ocid="footer.input"
                type="email"
                placeholder="your@email.com"
                className="flex-1 bg-[#0E2A45]/60 border border-[#D6B46E]/20 rounded-xl px-3 py-2.5 text-[#F2E7D2] placeholder-[#C9C1B3]/40 focus:outline-none focus:border-[#D6B46E]/50 text-xs font-poppins"
              />
              <button
                type="submit"
                data-ocid="footer.submit_button"
                className="gold-btn px-4 py-2.5 rounded-xl text-xs font-semibold font-poppins"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-[#D6B46E]/20 to-transparent mb-8" />

        {/* Bottom */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-[#C9C1B3]/60 text-xs font-poppins">
            © {year} Vrish Tarot. All rights reserved.
          </p>
          <p className="text-[#C9C1B3]/40 text-xs font-poppins">
            Built with ♥ using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#D6B46E]/60 hover:text-[#D6B46E] transition-colors"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
