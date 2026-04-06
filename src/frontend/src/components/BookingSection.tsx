import {
  CheckCircle,
  Clock,
  IndianRupee,
  Loader2,
  Lock,
  MessageCircle,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { CreateBookingRequestArgs } from "../backend.d";
import { useCreateBooking } from "../hooks/useQueries";

const TAROT_EMAIL = "vrish.tarot@gmail.com";

const serviceOptions = [
  {
    value: 1n,
    label: "Personal Reading – 10 min",
    price: 499,
    duration: "10 min",
    minutes: 10,
  },
  {
    value: 2n,
    label: "Personal Reading – 20 min",
    price: 799,
    duration: "20 min",
    minutes: 20,
  },
  {
    value: 3n,
    label: "Personal Reading – 30 min",
    price: 999,
    duration: "30 min",
    minutes: 30,
  },
  {
    value: 4n,
    label: "Personal Reading – 60 min",
    price: 1699,
    duration: "60 min",
    minutes: 60,
  },
  {
    value: 5n,
    label: "Relationship Clarity",
    price: 800,
    duration: "45 min",
    minutes: 45,
  },
  { value: 6n, label: "Spell", price: 1200, duration: "60 min", minutes: 60 },
];

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

export default function BookingSection() {
  const createBooking = useCreateBooking();
  const [form, setForm] = useState({
    name: "",
    email: "",
    sessionID: 1n,
    date: "",
    time: "anytime",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [payStep, setPayStep] = useState<null | number>(null);
  const [paid, setPaid] = useState(false);
  const [sessionDuration, setSessionDuration] = useState<number | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<number | null>(null);
  const [sessionEnded, setSessionEnded] = useState(false);

  // Countdown effect
  useEffect(() => {
    if (timerSeconds === null) return;
    if (timerSeconds <= 0) {
      setSessionEnded(true);
      setTimerSeconds(null);
      return;
    }
    const id = setInterval(() => {
      setTimerSeconds((prev) => (prev !== null ? prev - 1 : null));
    }, 1000);
    return () => clearInterval(id);
  }, [timerSeconds]);

  const resetAll = () => {
    setPayStep(null);
    setPaid(false);
    setSessionDuration(null);
    setTimerSeconds(null);
    setSessionEnded(false);
  };

  const startTimer = () => {
    if (sessionDuration !== null) {
      setTimerSeconds(sessionDuration * 60);
    }
  };

  const isWarning = timerSeconds !== null && timerSeconds <= 120;

  const update = (field: string, value: string | bigint) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const args: CreateBookingRequestArgs = {
      name: form.name,
      email: form.email,
      phone: "",
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

  const _selectedService =
    serviceOptions.find((s) => s.value === form.sessionID) ?? serviceOptions[0];

  const personalReadingOptions = serviceOptions.filter((s) =>
    s.label.startsWith("Personal Reading"),
  );
  const emailBookOptions = serviceOptions.filter(
    (s) => s.label === "Relationship Clarity" || s.label === "Spell",
  );

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
                    data-ocid="booking.input"
                  />
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
                        {opt.label} – ₹{opt.price} ({opt.duration})
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
                      <option value="anytime" style={{ background: "#1A1026" }}>
                        Any Time (24hrs)
                      </option>
                      {[
                        "00:00",
                        "01:00",
                        "02:00",
                        "03:00",
                        "04:00",
                        "05:00",
                        "06:00",
                        "07:00",
                        "08:00",
                        "09:00",
                        "10:00",
                        "11:00",
                        "12:00",
                        "13:00",
                        "14:00",
                        "15:00",
                        "16:00",
                        "17:00",
                        "18:00",
                        "19:00",
                        "20:00",
                        "21:00",
                        "22:00",
                        "23:00",
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
                  data-ocid="booking.submit_button"
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

          {/* Instant Call – Pay to Connect */}
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
                  <MessageCircle className="text-[#D6B46E]" size={28} />
                </div>
                <div>
                  <h3 className="font-serif text-xl font-bold text-[#F2E7D2]">
                    Instant Call Session
                  </h3>
                  <p className="text-[#C9C1B3] text-sm">
                    Pay session fee to connect with Vrish
                  </p>
                </div>
              </div>

              {/* Availability badge */}
              <div className="bg-[#D6B46E]/5 border border-[#D6B46E]/15 rounded-xl p-4 mb-6">
                <div className="flex items-center gap-2 text-[#C9C1B3] text-sm">
                  <Clock size={14} className="text-[#D6B46E]" />
                  <span>
                    Available:{" "}
                    <strong className="text-[#D6B46E]">
                      24 Hours / 7 Days
                    </strong>
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[#C9C1B3] text-sm mt-2">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                  <span>Always available for your guidance</span>
                </div>
              </div>

              {/* Personal Reading options */}
              <p className="text-[#D6B46E] text-xs uppercase tracking-widest mb-2 font-poppins">
                Personal Reading
              </p>
              <div className="space-y-2 mb-6">
                {personalReadingOptions.map((s) => (
                  <button
                    key={s.value.toString()}
                    type="button"
                    onClick={() => {
                      setPayStep(s.price);
                      setSessionDuration(s.minutes);
                      setPaid(false);
                    }}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-[#D6B46E]/20 bg-[#1A1026]/60 text-left hover:border-[#D6B46E]/50 hover:bg-[#D6B46E]/5 transition-all group"
                  >
                    <div>
                      <p className="text-[#F2E7D2] text-sm font-medium">
                        Personal Reading
                      </p>
                      <p className="text-[#C9C1B3] text-xs">{s.duration}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-[#D6B46E] font-semibold text-sm">
                        ₹{s.price}
                      </span>
                      <Lock
                        size={12}
                        className="text-[#D6B46E]/50 group-hover:text-[#D6B46E]"
                      />
                    </div>
                  </button>
                ))}
              </div>

              {/* Email Book options – Relationship Clarity & Spell */}
              <p className="text-[#D6B46E] text-xs uppercase tracking-widest mb-2 font-poppins">
                Other Sessions
              </p>
              <div className="space-y-2 mb-5">
                {emailBookOptions.map((s) => (
                  <a
                    key={s.value.toString()}
                    href={`mailto:${TAROT_EMAIL}?subject=Booking Request – ${s.label}&body=Hello Vrish,%0D%0A%0D%0AI would like to book a ${s.label} session.%0D%0A%0D%0AName: %0D%0APreferred Date/Time: %0D%0AMessage: `}
                    className="w-full flex items-center justify-between px-4 py-3 rounded-xl border border-[#D6B46E]/20 bg-[#1A1026]/60 text-left hover:border-[#D6B46E]/50 hover:bg-[#D6B46E]/5 transition-all group"
                  >
                    <p className="text-[#F2E7D2] text-sm font-medium">
                      {s.label}
                    </p>
                    <span className="text-[#D6B46E] font-semibold text-sm px-3 py-1 rounded-lg border border-[#D6B46E]/30 group-hover:bg-[#D6B46E]/10 transition-all">
                      Book Now
                    </span>
                  </a>
                ))}
              </div>

              <p className="text-[#C9C1B3]/50 text-xs text-center">
                🔒 Contact details revealed after payment confirmation
              </p>
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

      {/* Floating Session Timer */}
      <AnimatePresence>
        {timerSeconds !== null && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <div
              className="rounded-2xl px-5 py-4 shadow-2xl border flex flex-col items-center min-w-[120px]"
              style={{
                background: "#1A1026",
                borderColor: isWarning
                  ? "rgba(239,68,68,0.5)"
                  : "rgba(214,180,110,0.4)",
                boxShadow: isWarning
                  ? "0 0 24px rgba(239,68,68,0.3)"
                  : "0 0 24px rgba(214,180,110,0.2)",
              }}
            >
              <p
                className="text-[10px] uppercase tracking-widest mb-1"
                style={{ color: isWarning ? "#f87171" : "#D6B46E" }}
              >
                {isWarning ? "⚠ Ending Soon" : "🌙 Session"}
              </p>
              <p
                className="font-mono font-bold text-2xl tabular-nums"
                style={{ color: isWarning ? "#f87171" : "#D6B46E" }}
              >
                {formatTime(timerSeconds)}
              </p>
              <p className="text-[10px] mt-1" style={{ color: "#C9C1B3" }}>
                remaining
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Payment Modal */}
      <AnimatePresence>
        {payStep !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm px-4"
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setPayStep(null);
                setPaid(false);
              }
            }}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gradient-to-b from-[#1A1026] to-[#231436] border border-[#D6B46E]/30 rounded-2xl p-8 max-w-md w-full shadow-2xl"
            >
              {!paid ? (
                <>
                  <div className="text-center mb-6">
                    <div className="w-16 h-16 rounded-full bg-[#D6B46E]/10 border border-[#D6B46E]/30 flex items-center justify-center mx-auto mb-4">
                      <IndianRupee className="text-[#D6B46E]" size={28} />
                    </div>
                    <h3 className="font-serif text-2xl font-bold text-[#F2E7D2] mb-1">
                      Complete Payment
                    </h3>
                    <p className="text-[#C9C1B3] text-sm">
                      Pay to get Vrish's contact details
                    </p>
                  </div>

                  <div className="bg-[#D6B46E]/5 border border-[#D6B46E]/20 rounded-xl p-5 mb-6">
                    <div className="flex justify-between items-center mb-3">
                      <span className="text-[#C9C1B3] text-sm">
                        Session Fee
                      </span>
                      <span className="text-[#D6B46E] font-bold text-xl">
                        ₹{payStep}
                      </span>
                    </div>
                    <div className="border-t border-[#D6B46E]/10 pt-3">
                      <p className="text-[#C9C1B3] text-xs mb-1">
                        Pay via UPI to:
                      </p>
                      <p className="text-[#F2E7D2] font-semibold text-base tracking-wide">
                        nehanegi03@ybl
                      </p>
                      <p className="text-[#C9C1B3] text-xs mt-2">
                        Or scan the QR code on Instagram: @vaira_gan
                      </p>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <button
                      type="button"
                      onClick={() => setPaid(true)}
                      className="w-full bg-gradient-to-r from-[#D6B46E] to-[#C9A55A] text-[#0B0720] py-4 rounded-xl text-sm font-bold hover:from-[#E2C37D] hover:to-[#D6B46E] transition-all"
                    >
                      ✦ I've Paid – Show Contact
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setPayStep(null);
                        setPaid(false);
                      }}
                      className="w-full py-3 rounded-xl text-sm text-[#C9C1B3] border border-[#D6B46E]/10 hover:bg-[#D6B46E]/5 transition-all"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center"
                >
                  <CheckCircle
                    className="text-[#D6B46E] mx-auto mb-4"
                    size={56}
                  />
                  <h3 className="font-serif text-2xl font-bold text-[#F2E7D2] mb-2">
                    Payment Confirmed!
                  </h3>
                  <p className="text-[#C9C1B3] text-sm mb-2">
                    Connect with Vrish on Instagram to begin your session
                  </p>
                  {sessionDuration && (
                    <p className="text-[#D6B46E] text-xs mb-6">
                      🌙 {sessionDuration} min session · Timer starts when you
                      connect
                    </p>
                  )}

                  <a
                    href="https://www.instagram.com/vaira_gan"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={startTimer}
                    className="block w-full bg-gradient-to-r from-[#D6B46E] to-[#C9A55A] text-[#0B0720] py-4 rounded-xl text-base font-bold mb-3 hover:from-[#E2C37D] hover:to-[#D6B46E] transition-all"
                  >
                    Connect on Instagram →
                  </a>

                  <p className="text-[#C9C1B3] text-xs">
                    Available 24 hours · 7 days a week
                  </p>

                  <button
                    type="button"
                    onClick={() => {
                      setPayStep(null);
                      setPaid(false);
                    }}
                    className="mt-4 text-[#C9C1B3]/50 text-xs hover:text-[#C9C1B3] transition-all"
                  >
                    Close
                  </button>
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Session Ended Modal */}
      <AnimatePresence>
        {sessionEnded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
          >
            <motion.div
              initial={{ scale: 0.85, opacity: 0, y: 30 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.85, opacity: 0 }}
              className="bg-gradient-to-b from-[#1A1026] to-[#231436] border border-[#D6B46E]/40 rounded-2xl p-8 max-w-sm w-full shadow-2xl text-center"
              style={{ boxShadow: "0 0 60px rgba(214,180,110,0.15)" }}
            >
              <div className="text-5xl mb-4">🌙</div>
              <h3 className="font-serif text-2xl font-bold text-[#F2E7D2] mb-3">
                Session Time Complete 🌙
              </h3>
              <p className="text-[#C9C1B3] text-sm mb-8 leading-relaxed">
                Your{" "}
                <span className="text-[#D6B46E] font-semibold">
                  {sessionDuration} min
                </span>{" "}
                reading session has ended. Book another session to continue your
                spiritual journey with Vrish.
              </p>
              <div className="space-y-3">
                <button
                  type="button"
                  onClick={resetAll}
                  className="w-full bg-gradient-to-r from-[#D6B46E] to-[#C9A55A] text-[#0B0720] py-4 rounded-xl text-sm font-bold hover:from-[#E2C37D] hover:to-[#D6B46E] transition-all"
                >
                  Book Again ✦
                </button>
                <button
                  type="button"
                  onClick={resetAll}
                  className="w-full py-3 rounded-xl text-sm text-[#C9C1B3] border border-[#D6B46E]/20 hover:bg-[#D6B46E]/5 transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
