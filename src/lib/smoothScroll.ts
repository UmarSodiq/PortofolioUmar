import type Lenis from 'lenis';

/** Shared easing curve (expo-out) used across all motion. */
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

/** sessionStorage key marking that the intro loader already played this session. */
export const LOADER_SEEN_KEY = 'umar:intro-seen';

/** Loader timings (seconds) — kept here so the hero can sync to them. */
export const LOADER_COUNT_DURATION = 1.0;
export const LOADER_HOLD = 0.1;

function computeShowLoader() {
  if (typeof window === 'undefined') return false;
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return false;
  try {
    return sessionStorage.getItem(LOADER_SEEN_KEY) !== '1';
  } catch {
    return true;
  }
}

/** Evaluated once per page load: play the intro curtain only on the first visit in a session. */
export const SHOW_LOADER = computeShowLoader();

/** Delay (seconds) before hero intro starts — matches the PageLoader exit (or ~0 when skipped). */
export const INTRO_DELAY = SHOW_LOADER ? LOADER_COUNT_DURATION + LOADER_HOLD + 0.3 : 0.15;

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
