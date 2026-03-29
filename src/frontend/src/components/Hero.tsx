import { motion } from "motion/react";
import type React from "react";

const STARS = Array.from({ length: 120 }, (_, i) => ({
  id: i,
  top: Math.random() * 100,
  left: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  duration: Math.random() * 3 + 2,
  delay: Math.random() * 4,
}));

export default function Hero() {
  const scrollToBooking = () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          "radial-gradient(ellipse at 30% 20%, #6b21a8 0%, #3b0d8a 40%, #1e0550 100%)",
      }}
    >
      {/* Starfield */}
      {STARS.map((star) => (
        <span
          key={star.id}
          className="star"
          style={
            {
              top: `${star.top}%`,
              left: `${star.left}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              "--duration": `${star.duration}s`,
              "--delay": `${star.delay}s`,
            } as React.CSSProperties
          }
        />
      ))}

      {/* Nebula glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 70% 50%, rgba(180, 80, 255, 0.22) 0%, transparent 60%), radial-gradient(ellipse at 20% 80%, rgba(120, 40, 200, 0.18) 0%, transparent 50%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, ease: "easeOut" }}
          >
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="text-[#D6B46E] text-sm uppercase tracking-[0.3em] mb-5 font-poppins flex items-center gap-2"
            >
              <span className="text-base">✦</span> Divine Guidance Awaits
            </motion.p>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="font-cinzel text-5xl lg:text-7xl font-bold leading-tight mb-6"
            >
              <span className="text-[#F2E7D2]">Unveil</span>
              <br />
              <span className="gold-gradient-text">Your Destiny</span>
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-[#C9C1B3] text-lg leading-relaxed mb-10 max-w-lg font-poppins"
            >
              Let the ancient wisdom of tarot illuminate your path. Gain clarity
              on love, career, and spiritual growth through deeply personal
              readings with Vrishu Tarot.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="flex flex-wrap gap-4"
            >
              <button
                type="button"
                data-ocid="hero.primary_button"
                onClick={scrollToBooking}
                className="gold-btn px-8 py-4 rounded-full text-base font-semibold font-poppins"
              >
                Explore Readings
              </button>
              <button
                type="button"
                data-ocid="hero.secondary_button"
                onClick={() =>
                  document
                    .querySelector("#services")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="px-8 py-4 rounded-full text-sm font-semibold border border-[#D6B46E]/50 text-[#D6B46E] hover:bg-[#D6B46E]/10 transition-all font-poppins"
              >
                View Services
              </button>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9 }}
              className="flex gap-10 mt-12 pt-10 border-t border-[#D6B46E]/20"
            >
              {[
                { num: "500+", label: "Readings Done" },
                { num: "98%", label: "Satisfied Clients" },
                { num: "5★", label: "Average Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p className="font-cinzel text-2xl font-bold text-[#D6B46E]">
                    {stat.num}
                  </p>
                  <p className="text-[#C9C1B3] text-xs mt-1 font-poppins">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
            className="flex justify-center lg:justify-end"
          >
            <div className="relative">
              <div
                className="absolute inset-0 rounded-2xl blur-3xl opacity-30"
                style={{
                  background:
                    "radial-gradient(ellipse, #D6B46E 0%, #8B2FBE 50%, transparent 70%)",
                }}
              />
              <div className="floating relative">
                <img
                  src="/assets/generated/tarot-hero.dim_600x700.png"
                  alt="Tarot Cards"
                  className="relative z-10 rounded-2xl max-h-[560px] object-cover shadow-2xl border border-[#D6B46E]/20"
                  style={{ boxShadow: "0 20px 80px rgba(214, 180, 110, 0.2)" }}
                />
                <div
                  className="absolute -top-4 -right-4 text-[#D6B46E] text-3xl animate-spin"
                  style={{ animationDuration: "8s" }}
                >
                  ✦
                </div>
                <div
                  className="absolute -bottom-4 -left-4 text-[#D6B46E]/60 text-xl animate-spin"
                  style={{ animationDuration: "12s" }}
                >
                  ☽
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator dots */}
        <div className="flex justify-center gap-2 mt-16">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className={`rounded-full transition-all ${
                i === 0 ? "w-8 h-2 bg-[#D6B46E]" : "w-2 h-2 bg-[#D6B46E]/30"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
