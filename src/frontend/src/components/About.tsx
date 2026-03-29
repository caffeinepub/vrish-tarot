import { motion } from "motion/react";

export default function About() {
  return (
    <section
      id="about"
      className="py-24"
      style={{
        background:
          "linear-gradient(180deg, #0B0720 0%, #110828 50%, #0B0720 100%)",
      }}
    >
      <div className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D6B46E]/20 to-transparent" />
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div
              className="absolute inset-0 rounded-3xl blur-2xl opacity-20"
              style={{
                background:
                  "radial-gradient(ellipse, #D6B46E, #8B2FBE, transparent)",
              }}
            />
            <img
              src="/assets/generated/tarot-about.dim_500x400.jpg"
              alt="Vrish Tarot reading session"
              className="relative z-10 w-full rounded-3xl object-cover shadow-2xl border border-[#D6B46E]/20"
              style={{ boxShadow: "0 20px 60px rgba(214, 180, 110, 0.15)" }}
            />
            <div className="absolute -bottom-6 -right-6 bg-[#1A1026] border border-[#D6B46E]/40 rounded-2xl p-5 shadow-gold z-20">
              <p className="font-cinzel text-3xl font-bold text-[#D6B46E]">
                5+
              </p>
              <p className="text-[#C9C1B3] text-xs font-poppins mt-1">
                Years Experience
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="text-[#D6B46E] text-sm uppercase tracking-[0.3em] mb-4 font-poppins">
              ✦ About Vrish Tarot
            </p>
            <h2 className="font-cinzel text-4xl lg:text-5xl font-bold text-[#F2E7D2] mb-6 leading-tight">
              Your Guide to the
              <span className="gold-gradient-text"> Mystical Arts</span>
            </h2>
            <p className="text-[#C9C1B3] leading-relaxed mb-6 font-poppins">
              Welcome to Vrish Tarot — where ancient wisdom meets modern
              insight. With over 5 years of devoted practice, I offer profound
              tarot readings that help you navigate life's complexities with
              clarity and confidence.
            </p>
            <p className="text-[#C9C1B3] leading-relaxed mb-8 font-poppins">
              Each reading is a sacred, personalized experience crafted to
              reveal hidden truths and illuminate your highest path. Whether you
              seek guidance on love, career, or spiritual growth, the cards hold
              messages meant just for you.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {[
                { icon: "🌙", text: "Intuitive Readings" },
                { icon: "⭐", text: "Cosmic Guidance" },
                { icon: "💜", text: "Compassionate Approach" },
                { icon: "✦", text: "Sacred Wisdom" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-3 p-3 rounded-xl bg-[#D6B46E]/5 border border-[#D6B46E]/15"
                >
                  <span className="text-xl">{item.icon}</span>
                  <span className="text-[#C9C1B3] text-sm font-poppins">
                    {item.text}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
