import { motion } from 'motion/react';
import { EASE_OUT_EXPO } from '../lib/smoothScroll';

interface HeroNameProps {
  text?: string;
  delay?: number;
}

/**
 * Editorial Hero Name:
 * - Smooth entrance slide-up mask
 * - Continuous 60fps liquid crimson & metallic silver shimmer gliding through the letters
 * - Speedup on hover
 * - Clean red accent dot
 */
export function HeroName({ text = 'Umar Sodiq', delay = 0 }: HeroNameProps) {
  return (
    <span className="relative inline-flex items-baseline overflow-hidden pb-1 select-none">
      <motion.span
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration: 1.1, delay, ease: EASE_OUT_EXPO }}
        className="inline-flex items-baseline"
      >
        <span className="shimmer-title font-display font-semibold tracking-tighter cursor-pointer">
          {text}
        </span>
        <span className="text-red-500 font-display ml-1 select-none">.</span>
      </motion.span>
    </span>
  );
}
