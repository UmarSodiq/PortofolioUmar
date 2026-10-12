import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';
import { Eye, MoveHorizontal } from 'lucide-react';
import { prefersReducedMotion } from '../lib/smoothScroll';
import { useLanguage } from '../context/LanguageContext';

type CursorType = 'default' | 'pointer' | 'view' | 'drag';

const CLICKABLE = 'a, button, [role="button"], input, select, textarea, label, summary';

function resolveCursorType(target: HTMLElement | null): CursorType {
  if (!target) return 'default';
  const special = target.closest('[data-cursor]') as HTMLElement | null;
  if (special) {
    const val = special.getAttribute('data-cursor');
    if (val === 'view') return 'view';
    if (val === 'drag' || val === 'scroll') return 'drag';
  }
  return target.closest(CLICKABLE) ? 'pointer' : 'default';
}

export function CustomCursor() {
  const { language } = useLanguage();
  const [enabled, setEnabled] = useState(false);
  const [cursorType, setCursorType] = useState<CursorType>('default');
  const [isVisible, setIsVisible] = useState(false);

  // Mirrors of state so the mousemove handler can skip redundant setState calls
  // (avoids re-rendering on every pointer move).
  const typeRef = useRef<CursorType>('default');
  const visibleRef = useRef(false);

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

    // Hide the native cursor so only the custom one shows (see index.css).
    const root = document.documentElement;
    root.classList.add('has-custom-cursor');

    const setVisible = (v: boolean) => {
      if (visibleRef.current === v) return;
      visibleRef.current = v;
      setIsVisible(v);
    };

    const setType = (t: CursorType) => {
      if (typeRef.current === t) return;
      typeRef.current = t;
      setCursorType(t);
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      setVisible(true);
    };

    // Element under the cursor only changes on mouseover — far cheaper than mousemove.
    const onMouseOver = (e: MouseEvent) => setType(resolveCursorType(e.target as HTMLElement | null));

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseover', onMouseOver, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);
    document.documentElement.addEventListener('mouseenter', onMouseEnter);

    return () => {
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
      document.documentElement.removeEventListener('mouseenter', onMouseEnter);
    };
  }, [mouseX, mouseY]);

  if (!enabled) return null;

  const viewText = language === 'id' ? 'Lihat' : 'View';
  const dragText = language === 'id' ? 'Geser' : 'Scroll';
  const showDot = cursorType === 'default' || cursorType === 'pointer';

  return (
    <aside
      aria-hidden="true"
      className={`fixed inset-0 pointer-events-none z-[10000] overflow-hidden transition-opacity duration-200 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* 1. Sharp pinpoint dot (tracks exact mouse position instantly) */}
      {showDot && (
        <motion.div
          className="fixed top-0 left-0 w-2 h-2 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ x: mouseX, y: mouseY }}
        />
      )}

      {/* 2. Fluid spring-trailing ring or contextual pill */}
      <motion.div
        className="fixed top-0 left-0 -translate-x-1/2 -translate-y-1/2 flex items-center justify-center pointer-events-none will-change-transform"
        style={{ x: springX, y: springY }}
      >
        {cursorType === 'default' && (
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-8 h-8 rounded-full border border-red-500/40 dark:border-red-400/50"
          />
        )}

        {cursorType === 'pointer' && (
          <motion.div
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1.4, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
            className="w-8 h-8 rounded-full bg-red-500/10 border border-red-500/50 dark:border-red-400/60"
          />
        )}

        {cursorType === 'view' && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 24 }}
            className="px-3.5 py-1.5 rounded-full bg-zinc-950/90 dark:bg-white/95 text-white dark:text-zinc-950 shadow-2xl border border-white/20 dark:border-black/10 flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-red-500 dark:text-red-600" />
            <span className="text-xs font-semibold tracking-wide uppercase">{viewText}</span>
          </motion.div>
        )}

        {cursorType === 'drag' && (
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 350, damping: 24 }}
            className="px-3.5 py-1.5 rounded-full bg-red-600/95 text-white shadow-2xl border border-red-400/40 flex items-center gap-1.5"
          >
            <MoveHorizontal className="w-3.5 h-3.5" />
            <span className="text-xs font-semibold tracking-wide uppercase">{dragText}</span>
          </motion.div>
        )}
      </motion.div>
    </aside>
  );
}
