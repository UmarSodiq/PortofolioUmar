import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Eye, MoveHorizontal } from 'lucide-react';
import { prefersReducedMotion } from '../lib/smoothScroll';
import { useLanguage } from '../context/LanguageContext';

export function CustomCursor() {
  const { language } = useLanguage();
  const [enabled, setEnabled] = useState(false);
  const [cursorType, setCursorType] = useState<'default' | 'pointer' | 'view' | 'drag'>('default');
  const [isVisible, setIsVisible] = useState(false);

  // Exact mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth trailing spring for the outer cursor badge/ring
  const springX = useSpring(mouseX, { stiffness: 450, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 450, damping: 30 });

  useEffect(() => {
    // Only enable on desktop devices with fine pointer (mouse) and no reduced motion
    const hasFinePointer = window.matchMedia('(pointer: fine)').matches;
    if (!hasFinePointer || prefersReducedMotion()) {
      setEnabled(false);
      return;
    }
    setEnabled(true);

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);

      // Check element under cursor for special cursor actions
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const cursorTarget = target.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const val = cursorTarget.getAttribute('data-cursor');
        if (val === 'view') {
          setCursorType('view');
          return;
        }
        if (val === 'drag' || val === 'scroll') {
          setCursorType('drag');
          return;
        }
      }

      // Check for clickable elements
      const isClickable = target.closest('a, button, [role="button"], input, select, textarea');
      if (isClickable) {
        setCursorType('pointer');
      } else {
        setCursorType('default');
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    const onMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);
    document.addEventListener('mouseenter', onMouseEnter);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
      document.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [mouseX, mouseY, isVisible]);

  if (!enabled || !isVisible) return null;

  const viewText = language === 'id' ? 'Lihat' : 'View';
  const dragText = language === 'id' ? 'Geser' : 'Scroll';

  return (
    <aside aria-hidden="true" className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* 1. Sharp pinpoint dot (tracks exact mouse position instantly) */}
      {cursorType === 'default' && (
        <motion.div
          className="fixed top-0 left-0 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{
            x: mouseX,
            y: mouseY,
          }}
        />
      )}

      {/* 2. Fluid spring-trailing ring or contextual pill */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none will-change-transform"
        style={{
          x: springX,
          y: springY,
        }}
      >
        {cursorType === 'default' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-8 h-8 rounded-full border border-red-500/40 dark:border-red-400/50 bg-red-500/5 backdrop-blur-[1px]"
          />
        )}

        {cursorType === 'pointer' && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1.4, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="w-8 h-8 rounded-full bg-zinc-900/15 dark:bg-white/20 border border-zinc-900/30 dark:border-white/40 backdrop-blur-sm"
          />
        )}

        {cursorType === 'view' && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 24 }}
            className="px-3.5 py-1.5 rounded-full bg-zinc-950/90 dark:bg-white/95 text-white dark:text-zinc-950 shadow-2xl border border-white/20 dark:border-black/10 flex items-center gap-1.5 backdrop-blur-md"
          >
            <Eye className="w-3.5 h-3.5 text-red-500 dark:text-red-600 animate-pulse" />
            <span className="text-xs font-semibold tracking-wide uppercase">{viewText}</span>
          </motion.div>
        )}

        {cursorType === 'drag' && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 24 }}
            className="px-3.5 py-1.5 rounded-full bg-red-600/95 text-white shadow-2xl border border-red-400/40 flex items-center gap-1.5 backdrop-blur-md"
          >
            <MoveHorizontal className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold tracking-wide uppercase">{dragText}</span>
          </motion.div>
        )}
      </motion.div>
    </aside>
  );
}
