import { CheckCircle, Clock, Loader2, Phone } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import type { CreateBookingRequestArgs } from "../backend.d";
import { useCreateBooking } from "../hooks/useQueries";

const serviceOptions = [
  { value: 1n, label: "Personal Reading – ₹500 (30 min)" },
  { value: 2n, label: "Relationship Clarity – ₹800 (45 min)" },
  { value: 3n, label: "Guidance & Insight – ₹1200 (60 min)" },
];

export default function BookingSection() {
  const createBooking = useCreateBooking();
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    sessionID: 1n,
    date: "",
    time: "10:00",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: string, value: string | bigint) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const args: CreateBookingRequestArgs = {
      name: form.name,
      email: form.email,
      phone: form.phone,
      sessionID: form.sessionID,
      date: form.date,
      time: form.time,
      message: form.message,
    };
    try {
      await createBooking.mutateAsync(args);
      setSubmitted(true);
      toast.success("Booking confirmed! Vrish will reach out soon. 🌙");
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };

  const inputClass =
    "w-full bg-[#1A1026]/60 border border-[#D6B46E]/20 rounded-xl px-4 py-3 text-[#F2E7D2] placeholder-[#C9C1B3]/50 focus:outline-none focus:border-[#D6B46E]/60 focus:ring-1 focus:ring-[#D6B46E]/30 transition-all text-sm";

  return (
    <section
      id="booking"
      className="py-24 relative"
      style={{
        background: "linear-gradient(180deg, #0B0720 0%, #070413 100%)",
      }}
    >
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#D6B46E]/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-[#D6B46E] text-sm uppercase tracking-[0.3em] mb-4">
            ✦ Begin Your Journey
          </p>
          <h2 className="font-serif text-4xl lg:text-5xl font-bold text-[#F2E7D2] mb-4">
            Book Your Session
          </h2>
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-[#D6B46E] to-transparent mx-auto" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10">
          {/* Booking Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="bg-gradient-to-b from-[#1A1026]/80 to-[#231436]/80 rounded-2xl p-8 border border-[#D6B46E]/20"
          >
            <h3 className="font-serif text-2xl font-bold text-[#F2E7D2] mb-6">
              Book a Virtual Reading
            </h3>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center py-12 text-center"
              >
                <CheckCircle className="text-[#D6B46E] mb-4" size={56} />
                <h4 className="font-serif text-xl text-[#F2E7D2] mb-2">
                  Booking Confirmed!
                </h4>
                <p className="text-[#C9C1B3] text-sm">
                  Thank you! Vrish will reach out within 24 hours to confirm
                  your session.
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="mt-6 text-[#D6B46E] text-sm underline hover:text-[#E2C37D]"
                >
                  Book another session
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="booking-name"
                      className="block text-[#C9C1B3] text-xs mb-1.5 tracking-wide"
                    >
                      Full Name *
                    </label>
                    <input
                      id="booking-name"
                      required
                      value={form.name}
                      onChange={(e) => update("name", e.target.value)}
                      placeholder="Your name"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="booking-phone"
                      className="block text-[#C9C1B3] text-xs mb-1.5 tracking-wide"
                    >
                      Phone *
                    </label>
                    <input
                      id="booking-phone"
                      required
                      value={form.phone}
                      onChange={(e) => update("phone", e.target.value)}
                      placeholder="+91 XXXXX XXXXX"
                      className={inputClass}
                    />
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="booking-email"
                    className="block text-[#C9C1B3] text-xs mb-1.5 tracking-wide"
                  >
                    Email *
                  </label>
                  <input
                    id="booking-email"
                    required
                    type="email"
                    value={form.email}
                    onChange={(e) => update("email", e.target.value)}
                    placeholder="your@email.com"
                    className={inputClass}
                  />
                </div>
                <div>
                  <label
                    htmlFor="booking-service"
                    className="block text-[#C9C1B3] text-xs mb-1.5 tracking-wide"
                  >
                    Service *
                  </label>
                  <select
                    id="booking-service"
                    required
                    value={form.sessionID.toString()}
                    onChange={(e) =>
                      update("sessionID", BigInt(e.target.value))
                    }
                    className={inputClass}
                  >
                    {serviceOptions.map((opt) => (
                      <option
                        key={opt.value.toString()}
                        value={opt.value.toString()}
                        style={{ background: "#1A1026" }}
                      >
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="booking-date"
                      className="block text-[#C9C1B3] text-xs mb-1.5 tracking-wide"
                    >
                      Preferred Date *
                    </label>
                    <input
                      id="booking-date"
                      required
                      type="date"
                      value={form.date}
                      onChange={(e) => update("date", e.target.value)}
                      min={new Date().toISOString().split("T")[0]}
                      className={`${inputClass} [color-scheme:dark]`}
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="booking-time"
                      className="block text-[#C9C1B3] text-xs mb-1.5 tracking-wide"
                    >
                      Preferred Time
                    </label>
                    <select
                      id="booking-time"
                      value={form.time}
                      onChange={(e) => update("time", e.target.value)}
                      className={inputClass}
                    >
                      {[
                        "10:00",
                        "11:00",
                        "12:00",
                        "14:00",
                        "15:00",
                        "16:00",
                        "17:00",
                        "18:00",
                        "19:00",
                        "20:00",
                      ].map((t) => (
                        <option
                          key={t}
                          value={t}
                          style={{ background: "#1A1026" }}
                        >
                          {t} IST
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                <div>
                  <label
                    htmlFor="booking-message"
                    className="block text-[#C9C1B3] text-xs mb-1.5 tracking-wide"
                  >
                    Message (optional)
                  </label>
                  <textarea
                    id="booking-message"
                    value={form.message}
                    onChange={(e) => update("message", e.target.value)}
                    placeholder="Share what you'd like guidance on..."
                    rows={3}
                    className={`${inputClass} resize-none`}
                  />
                </div>
                <button
                  type="submit"
                  disabled={createBooking.isPending}
                  className="w-full bg-gradient-to-r from-[#D6B46E] to-[#C9A55A] text-[#0B0720] py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed hover:from-[#E2C37D] hover:to-[#D6B46E] transition-all"
                >
                  {createBooking.isPending ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Booking...
                    </>
                  ) : (
                    "Schedule Session ✦"
                  )}
                </button>
              </form>
            )}
          </motion.div>

          {/* Instant Call */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="flex-1 bg-gradient-to-b from-[#1A1026] to-[#231436] rounded-2xl p-8 border border-[#D6B46E]/20 flex flex-col justify-center">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-[#D6B46E]/10 border border-[#D6B46E]/30 flex items-center justify-center">
                  <Phone className="text-[#D6B46E]" size={28} />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#F2E7D2]">
                    Instant Audio Call
                  </h3>
                  <p className="text-[#C9C1B3] text-sm">
                    Connect directly with Vrish
                  </p>
                </div>
              </div>
              <div className="bg-[#D6B46E]/5 border border-[#D6B46E]/15 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 text-[#C9C1B3] text-sm">
                  <Clock size={14} className="text-[#D6B46E]" />
                  <span>
                    Available:{" "}
                    <strong className="text-[#D6B46E]">
                      10:00 AM – 8:00 PM IST
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#C9C1B3] text-sm mt-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span>Usually responds within minutes</span>
                </div>
              </div>
              <a
                href="tel:8882123244"
                className="bg-gradient-to-r from-[#D6B46E] to-[#C9A55A] text-[#0B0720] py-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 text-center hover:from-[#E2C37D] hover:to-[#D6B46E] transition-all"
              >
                <Phone size={16} /> Call Now
              </a>
            </div>

            {/* Instagram CTA */}
            <div className="bg-gradient-to-r from-[#833AB4]/20 to-[#E1306C]/20 rounded-2xl p-6 border border-[#833AB4]/30">
              <div className="flex items-center gap-3 mb-3">
                <span className="text-2xl">📸</span>
                <div>
                  <p className="font-serif text-base font-bold text-[#F2E7D2]">
                    Follow on Instagram
                  </p>
                  <p className="text-[#C9C1B3] text-xs">@vaira_gan</p>
                </div>
              </div>
              <a
                href="https://www.instagram.com/vaira_gan"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-center py-2.5 rounded-xl text-sm font-semibold border border-[#833AB4]/50 text-[#C9C1B3] hover:bg-[#833AB4]/20 transition-all"
              >
                Visit Instagram →
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
