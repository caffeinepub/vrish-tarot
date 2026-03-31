import { motion } from "motion/react";
import { useState } from "react";

const INSTAGRAM_USERNAME = "vaira_gan";
const INSTAGRAM_DM_URL = `https://ig.me/m/${INSTAGRAM_USERNAME}`;

const personalReadingOptions = [
  { duration: "10 min", price: 499 },
  { duration: "20 min", price: 799 },
  { duration: "30 min", price: 999 },
  { duration: "60 min", price: 1699 },
];

const services = [
  {
    icon: "\u2726",
    title: "Personal Reading",
    desc: "A deep dive into your personal journey, uncovering hidden energies, upcoming opportunities, and challenges in your life path.",
    options: personalReadingOptions,
    color: "from-[#1A1026] to-[#231436]",
    featured: true,
    bookByEmail: false,
  },
  {
    icon: "\u263d",
    title: "Relationship Clarity",
    desc: "Gain insight into your relationships — romantic, family, or friendships. Understand energies and find harmony with loved ones.",
    color: "from-[#0E2A45] to-[#10243C]",
    featured: false,
    bookByEmail: true,
  },
  {
    icon: "\u2727",
    title: "Spell",
    desc: "A comprehensive soul-level reading covering career, spiritual growth, and life purpose. Deep guidance for crossroads moments.",
    color: "from-[#1A1026] to-[#231436]",
    featured: false,
    bookByEmail: true,
  },
];

export default function Services() {
  const [toast, setToast] = useState<string | null>(null);

  const handleServiceClick = (title: string, details?: string) => {
    const msg = details
      ? `Hello Vrish Tarot! 🌙\n\nI am interested in booking a ${title} session.\n\n${details}\n\nPlease let me know how to proceed. Thank you!`
      : `Hello Vrish Tarot! 🌙\n\nI am interested in booking a ${title} session.\n\nPlease let me know the details and how to proceed. Thank you!`;

    // Auto-copy message then open Instagram DM
    if (navigator.clipboard) {
      navigator.clipboard
        .writeText(msg)
        .then(() => {
          setToast("Message copied! Opening Instagram DM…");
          setTimeout(() => setToast(null), 3000);
          window.open(INSTAGRAM_DM_URL, "_blank");
        })
        .catch(() => {
          // Fallback: just open Instagram
          window.open(INSTAGRAM_DM_URL, "_blank");
        });
    } else {
      window.open(INSTAGRAM_DM_URL, "_blank");
    }
  };

  return (
    <>
      <section
        id="services"
        className="py-24 relative"
        style={{
          background: "linear-gradient(180deg, #070413 0%, #0B0720 100%)",
        }}
      >
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D6B46E]/30 to-transparent" />

        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="text-[#D6B46E] text-sm uppercase tracking-[0.3em] mb-4 font-poppins">
              What I Offer
            </p>
            <h2 className="font-cinzel text-4xl lg:text-5xl font-bold text-[#F2E7D2] mb-4">
              Services
            </h2>
            <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D6B46E] to-transparent mx-auto" />
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={service.title}
                data-ocid={`services.card.${i + 1}`}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className={`service-card relative bg-gradient-to-b ${service.color} rounded-2xl p-8 border ${
                  service.featured
                    ? "border-[#D6B46E]/50 shadow-gold"
                    : "border-[#D6B46E]/15"
                }`}
              >
                {service.featured && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="gold-btn px-4 py-1 rounded-full text-xs font-semibold font-poppins">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-5xl mb-6 text-[#D6B46E]">
                  {service.icon}
                </div>
                <h3 className="font-cinzel text-xl font-bold text-[#F2E7D2] mb-3">
                  {service.title}
                </h3>
                <p className="text-[#C9C1B3] text-sm leading-relaxed mb-6 font-poppins">
                  {service.desc}
                </p>

                {"options" in service && service.options ? (
                  <div className="space-y-2 mb-6">
                    {service.options.map((opt) => (
                      <button
                        key={opt.duration}
                        type="button"
                        onClick={() =>
                          handleServiceClick(
                            service.title,
                            `Session: ${opt.duration} — ₹${opt.price}\nsend your QR or UPI Payment sourse for paying your session fees`,
                          )
                        }
                        className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-[#D6B46E]/5 border border-[#D6B46E]/15 hover:border-[#D6B46E]/40 hover:bg-[#D6B46E]/10 transition-colors cursor-pointer"
                      >
                        <span className="text-[#C9C1B3] text-xs font-poppins">
                          ⏱ {opt.duration}
                        </span>
                        <span className="font-cinzel text-sm font-bold text-[#D6B46E]">
                          ₹{opt.price}
                        </span>
                      </button>
                    ))}
                  </div>
                ) : null}

                {service.bookByEmail ? (
                  <button
                    type="button"
                    data-ocid={`services.card.${i + 1}.primary_button`}
                    onClick={() => handleServiceClick(service.title)}
                    className="block w-full gold-btn py-3 rounded-xl text-sm font-semibold font-poppins text-center"
                  >
                    Book Now
                  </button>
                ) : (
                  <button
                    type="button"
                    data-ocid={`services.card.${i + 1}.primary_button`}
                    onClick={() =>
                      handleServiceClick(
                        service.title,
                        "Please share available session durations and prices.",
                      )
                    }
                    className="w-full gold-btn py-3 rounded-xl text-sm font-semibold font-poppins"
                  >
                    Book Now
                  </button>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Toast notification */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#1A1026] border border-[#D6B46E]/40 text-[#F2E7D2] text-sm font-poppins px-5 py-3 rounded-xl shadow-xl flex items-center gap-2 animate-fade-in">
          <span className="text-[#D6B46E]">📩</span> {toast}
        </div>
      )}
    </>
  );
}
