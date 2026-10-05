import { motion, AnimatePresence, animate } from 'motion/react';
import { useState, useEffect } from 'react';
import { EASE_OUT_EXPO } from '../lib/smoothScroll';

/**
 * Intro sequence: name letters rise in, a 0→100 counter + progress line runs,
 * then the whole curtain lifts away with a curved bottom edge, handing off
 * to the hero's own entrance (see INTRO_DELAY).
 */
export function PageLoader() {
  const [isLoading, setIsLoading] = useState(true);
  const [count, setCount] = useState(0);

  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    const controls = animate(0, 100, {
      duration: 1.4,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: (v) => setCount(Math.round(v)),
      onComplete: () => {
        setTimeout(() => {
          setIsLoading(false);
          document.documentElement.style.overflow = '';
        }, 150);
      },
    });
    return () => {
      controls.stop();
      document.documentElement.style.overflow = '';
    };
  }, []);

  const letters = 'Umar Sodiq'.split('');

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          key="loader"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 z-[9999] bg-zinc-950 text-white flex flex-col justify-between p-6 sm:p-10"
        >
          {/* curved bottom edge that trails the curtain as it lifts */}
          <motion.div
            aria-hidden
            className="absolute left-0 right-0 top-full h-[12vh] bg-zinc-950"
            style={{ borderRadius: '0 0 50% 50%' }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
          />

          <div className="flex justify-between text-xs sm:text-sm uppercase tracking-[0.25em] text-zinc-500 font-medium">
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
              Portfolio
            </motion.span>
            <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
              Data &amp; AI
            </motion.span>
          </div>

          <div className="flex items-center justify-center">
            <h2 className="flex overflow-hidden text-5xl sm:text-7xl md:text-8xl font-display font-semibold tracking-tighter">
              {letters.map((ch, i) => (
                <motion.span
                  key={i}
                  initial={{ y: '110%' }}
                  animate={{ y: '0%' }}
                  exit={{ y: '-110%' }}
                  transition={{ duration: 0.8, delay: 0.1 + i * 0.04, ease: EASE_OUT_EXPO }}
                  className="inline-block"
                >
                  {ch === ' ' ? '\u00A0' : ch}
                </motion.span>
              ))}
              <motion.span
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.8, delay: 0.6, ease: EASE_OUT_EXPO }}
                className="inline-block text-red-500"
              >
                .
              </motion.span>
            </h2>
          </div>

          <div>
            <div className="flex items-end justify-between mb-4">
              <span className="text-xs sm:text-sm uppercase tracking-[0.25em] text-zinc-500">Loading</span>
              <span className="font-display text-6xl sm:text-8xl font-light tabular-nums leading-none">
                {count}
                <span className="text-zinc-600">%</span>
              </span>
            </div>
            <div className="h-px w-full bg-zinc-800 overflow-hidden">
              <div className="h-full bg-red-500 origin-left" style={{ transform: `scaleX(${count / 100})` }} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
