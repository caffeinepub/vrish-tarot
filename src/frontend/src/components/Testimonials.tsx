import { motion } from "motion/react";
import { useTestimonials } from "../hooks/useQueries";

const fallbackTestimonials = [
  {
    customerName: "Priya Sharma",
    testimonialText:
      "Vrishu's reading was incredibly accurate! She helped me see clarity in my career path and gave me the confidence to make a big change. Truly magical.",
    starRating: BigInt(5),
    avatarInitials: "PS",
  },
  {
    customerName: "Rahul Mehta",
    testimonialText:
      "I was skeptical at first, but the reading blew me away. Vrishu connected with energies I hadn't shared and gave profound insights about my relationship.",
    starRating: BigInt(5),
    avatarInitials: "RM",
  },
  {
    customerName: "Ananya Gupta",
    testimonialText:
      "Such a calming and enlightening experience. The Guidance & Insight session helped me understand my life purpose more clearly than years of therapy!",
    starRating: BigInt(5),
    avatarInitials: "AG",
  },
  {
    customerName: "Deepak Nair",
    testimonialText:
      "Vrishu has a unique gift. Her reading about my business ventures was spot on — within weeks, everything she foresaw started unfolding beautifully.",
    starRating: BigInt(5),
    avatarInitials: "DN",
  },
  {
    customerName: "Meera Patel",
    testimonialText:
      "The relationship reading helped me understand patterns I kept repeating. Vrishu was gentle, insightful, and absolutely non-judgmental throughout.",
    starRating: BigInt(5),
    avatarInitials: "MP",
  },
  {
    customerName: "Arjun Krishnan",
    testimonialText:
      "I've had readings before, but nothing compares to Vrishu Tarot. The depth and accuracy left me speechless. I book a session every few months now!",
    starRating: BigInt(5),
    avatarInitials: "AK",
  },
];

export default function Testimonials() {
  const { data: testimonials, isLoading } = useTestimonials();
  const items =
    testimonials && testimonials.length > 0
      ? testimonials
      : fallbackTestimonials;

  return (
    <section
      id="testimonials"
      className="py-24"
      style={{
        background: "linear-gradient(180deg, #070413 0%, #0B0720 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#D6B46E] text-sm uppercase tracking-[0.3em] mb-4 font-poppins">
            ✦ What Clients Say
          </p>
          <h2 className="font-cinzel text-4xl lg:text-5xl font-bold text-[#F2E7D2] mb-4">
            Testimonials
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D6B46E] to-transparent mx-auto" />
        </motion.div>

        {isLoading ? (
          <div
            data-ocid="testimonials.loading_state"
            className="flex justify-center py-12"
          >
            <div className="w-8 h-8 border-2 border-[#D6B46E] border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.slice(0, 6).map((t, i) => (
              <motion.div
                key={t.customerName}
                data-ocid={`testimonials.item.${i + 1}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="testimonial-card bg-gradient-to-b from-[#1A1026] to-[#231436] rounded-2xl p-6 border border-[#D6B46E]/15"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-[#D6B46E]/30 to-[#8B2FBE]/30 border border-[#D6B46E]/40 flex items-center justify-center">
                    <span className="font-cinzel text-sm font-bold text-[#D6B46E]">
                      {t.avatarInitials}
                    </span>
                  </div>
                  <div>
                    <p className="font-cinzel text-sm font-bold text-[#F2E7D2]">
                      {t.customerName}
                    </p>
                    <div className="flex gap-0.5 mt-1">
                      {Array.from({ length: Number(t.starRating) }).map(
                        (_, si) => (
                          <span
                            key={`star-${t.customerName}-${si}`}
                            className="text-[#D6B46E] text-xs"
                          >
                            ★
                          </span>
                        ),
                      )}
                    </div>
                  </div>
                </div>
                <p className="text-[#C9C1B3] text-sm leading-relaxed font-poppins italic">
                  "{t.testimonialText}"
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
