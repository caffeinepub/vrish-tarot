import { motion } from "motion/react";

const tiles = [
  {
    id: "tile-moon",
    type: "gradient",
    bg: "from-[#833AB4] to-[#C13584]",
    text: "🌙 Trust the universe\nto guide your path",
  },
  {
    id: "tile-star",
    type: "quote",
    bg: "from-[#1A1026] to-[#231436]",
    icon: "✦",
    text: "The cards don't predict your future — they reveal your present truth.",
  },
  {
    id: "tile-new-moon",
    type: "gradient",
    bg: "from-[#E1306C] to-[#F77737]",
    text: "☽ New moon energy\nis perfect for readings",
  },
  {
    id: "tile-mirror",
    type: "quote",
    bg: "from-[#0E2A45] to-[#10243C]",
    icon: "☽",
    text: "Every card drawn is a mirror reflecting the wisdom you already hold within.",
  },
  {
    id: "tile-destiny",
    type: "gradient",
    bg: "from-[#405DE6] to-[#833AB4]",
    text: "✧ Your destiny is\nnot written in stone",
  },
  {
    id: "tile-soul",
    type: "quote",
    bg: "from-[#1A1026] to-[#2D1B4A]",
    icon: "✧",
    text: "Tarot is the language of the soul. Come, let's translate what yours is saying.",
  },
];

export default function Instagram() {
  return (
    <section
      id="instagram"
      className="py-24"
      style={{
        background: "linear-gradient(180deg, #0B0720 0%, #070413 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6"
        >
          <div>
            <p className="text-[#D6B46E] text-sm uppercase tracking-[0.3em] mb-3 font-poppins">
              ✦ Social
            </p>
            <h2 className="font-cinzel text-4xl lg:text-5xl font-bold text-[#F2E7D2]">
              Follow on Instagram
            </h2>
            <p className="text-[#C9C1B3] mt-2 font-poppins">@vaira_gan</p>
          </div>
          <a
            href="https://www.instagram.com/vaira_gan"
            target="_blank"
            rel="noopener noreferrer"
            data-ocid="instagram.primary_button"
            className="gold-btn px-8 py-3 rounded-full text-sm font-semibold font-poppins whitespace-nowrap flex items-center gap-2"
          >
            <span>📸</span> Follow
          </a>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {tiles.map((tile, i) => (
            <motion.a
              key={tile.id}
              href="https://www.instagram.com/vaira_gan"
              target="_blank"
              rel="noopener noreferrer"
              data-ocid={`instagram.item.${i + 1}`}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.5 }}
              className={`instagram-tile aspect-square rounded-2xl bg-gradient-to-br ${tile.bg} flex items-center justify-center p-4 cursor-pointer border border-white/10`}
            >
              {tile.type === "gradient" ? (
                <p className="text-white text-xs text-center font-poppins whitespace-pre-line leading-relaxed">
                  {tile.text}
                </p>
              ) : (
                <div className="text-center">
                  <p className="text-[#D6B46E] text-2xl mb-2">{tile.icon}</p>
                  <p className="text-[#C9C1B3] text-xs italic font-poppins leading-relaxed">
                    {tile.text}
                  </p>
                </div>
              )}
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
