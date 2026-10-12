import { motion, useScroll, useTransform } from 'motion/react';

/**
 * Global ambient atmosphere: two brand-tinted glows drifting with scroll plus a
 * fine film-grain texture. Intentionally NOT cursor-reactive — the hero's
 * contour waves and the custom cursor already own pointer feedback.
 */
export function DynamicBackground() {
  const { scrollYProgress } = useScroll();

  // Gentle vertical drift linked with scroll progress (transform-only = cheap)
  const blob1Y = useTransform(scrollYProgress, [0, 1], ['0%', '70%']);
  const blob2Y = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  return (
    <>
      {/* Subtle fine-art matte film grain (static texture) */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-30 opacity-[0.03] dark:opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Ambient brand glows — slow horizontal drift (transform only, no scale/opacity loops) */}
      <div aria-hidden="true" className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div style={{ y: blob1Y }} className="absolute -top-[15%] -left-[10%] w-[55%] h-[55%]">
          <motion.div
            animate={{ x: [0, 60, 0, -60, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full h-full rounded-full bg-gradient-to-br from-red-500/10 to-rose-500/5 dark:from-red-500/10 dark:to-transparent blur-[140px] will-change-transform"
          />
        </motion.div>
        <motion.div style={{ y: blob2Y }} className="absolute top-[35%] -right-[10%] w-[50%] h-[65%]">
          <motion.div
            animate={{ x: [0, -80, 0, 60, 0] }}
            transition={{ duration: 32, repeat: Infinity, ease: 'easeInOut' }}
            className="w-full h-full rounded-full bg-gradient-to-bl from-rose-500/8 to-amber-400/6 dark:from-red-600/8 dark:to-amber-500/4 blur-[140px] will-change-transform"
          />
        </motion.div>
      </div>
    </>
  );
}
