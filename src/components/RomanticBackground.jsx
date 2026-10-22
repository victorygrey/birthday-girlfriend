import { motion } from 'framer-motion';

export default function RomanticBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {/* Soft Luxury Cream & Rose Silk Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#fffbf8] via-[#fff3f6] to-[#ffedf2]" />

      {/* Warm Ambient Glowing Orbs */}
      <div className="ambient-orb-1 absolute -top-24 -left-16 w-[30rem] h-[30rem] rounded-full bg-gradient-to-br from-[#ffdbe4]/60 via-[#ffccd7]/40 to-transparent blur-3xl" />
      <div className="ambient-orb-2 absolute top-1/3 -right-20 w-[34rem] h-[34rem] rounded-full bg-gradient-to-bl from-[#f7e5b8]/50 via-[#ffe4eb]/40 to-transparent blur-3xl" />
      <div className="ambient-orb-3 absolute -bottom-24 left-1/4 w-[38rem] h-[38rem] rounded-full bg-gradient-to-t from-[#ffd3df]/50 via-[#fde2e8]/30 to-transparent blur-3xl" />

      {/* Subtle Golden Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,_rgba(212,175,55,0.08),_transparent_70%)]" />

      {/* Floating Gentle Sparkles / Petals */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={`sparkle-${i}`}
          className="absolute rounded-full"
          style={{
            top: `${(i * 37) % 95}%`,
            left: `${(i * 53) % 95}%`,
            width: `${(i % 3) + 3}px`,
            height: `${(i % 3) + 3}px`,
            backgroundColor: i % 2 === 0 ? '#d4af37' : '#e8899e',
            boxShadow:
              i % 2 === 0
                ? '0 0 10px rgba(212, 175, 55, 0.7)'
                : '0 0 10px rgba(232, 137, 158, 0.7)',
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [0.8, 1.3, 0.8],
            y: [0, -15, 0],
          }}
          transition={{
            duration: 3.5 + (i % 4) * 1.5,
            repeat: Infinity,
            delay: (i % 5) * 0.6,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
