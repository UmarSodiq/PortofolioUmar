import type Lenis from 'lenis';

/** Shared easing curve (expo-out) used across all motion. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** Delay (seconds) before hero intro starts — matches the PageLoader exit. */
export const INTRO_DELAY = 1.85;

let lenisInstance: Lenis | null = null;

export function setLenis(instance: Lenis | null) {
  lenisInstance = instance;
}

export function getLenis() {
  return lenisInstance;
}

export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/** Smoothly scroll to a selector (e.g. "#proyek") or a pixel position. */
export function scrollToTarget(target: string | number, offset = -80) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target as any, { offset: typeof target === 'number' ? 0 : offset, duration: 1.4 });
    return;
  }
  if (typeof target === 'number') {
    window.scrollTo({ top: target, behavior: 'smooth' });
  } else {
    const el = document.querySelector(target);
    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY + offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  }
}
