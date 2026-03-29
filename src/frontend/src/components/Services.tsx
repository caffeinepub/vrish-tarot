import { motion } from "motion/react";

const services = [
  {
    icon: "✦",
    title: "Personal Reading",
    desc: "A deep dive into your personal journey, uncovering hidden energies, upcoming opportunities, and challenges in your life path.",
    price: "₹500",
    duration: "30 min",
    color: "from-[#1A1026] to-[#231436]",
    featured: false,
  },
  {
    icon: "☽",
    title: "Relationship Clarity",
    desc: "Gain insight into your relationships — romantic, family, or friendships. Understand energies and find harmony with loved ones.",
    price: "₹800",
    duration: "45 min",
    color: "from-[#0E2A45] to-[#10243C]",
    featured: true,
  },
  {
    icon: "✧",
    title: "Guidance & Insight",
    desc: "A comprehensive soul-level reading covering career, spiritual growth, and life purpose. Deep guidance for crossroads moments.",
    price: "₹1200",
    duration: "60 min",
    color: "from-[#1A1026] to-[#231436]",
    featured: false,
  },
];

export default function Services() {
  const scrollToBooking = () => {
    document.querySelector("#booking")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
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

              <div className="text-5xl mb-6 text-[#D6B46E]">{service.icon}</div>
              <h3 className="font-cinzel text-xl font-bold text-[#F2E7D2] mb-3">
                {service.title}
              </h3>
              <p className="text-[#C9C1B3] text-sm leading-relaxed mb-6 font-poppins">
                {service.desc}
              </p>

              <div className="flex items-center justify-between mb-6 p-3 rounded-xl bg-[#D6B46E]/5 border border-[#D6B46E]/15">
                <span className="font-cinzel text-2xl font-bold text-[#D6B46E]">
                  {service.price}
                </span>
                <span className="text-[#C9C1B3] text-sm font-poppins">
                  ⏱ {service.duration}
                </span>
              </div>

              <button
                type="button"
                data-ocid={`services.card.${i + 1}.primary_button`}
                onClick={scrollToBooking}
                className="w-full gold-btn py-3 rounded-xl text-sm font-semibold font-poppins"
              >
                Book Now
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
