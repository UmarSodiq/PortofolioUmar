import { useEffect } from 'react';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { setLenis, prefersReducedMotion, scrollToTarget } from '../lib/smoothScroll';

gsap.registerPlugin(ScrollTrigger);

/**
 * Global smooth scrolling (Lenis) synced with GSAP's ticker so ScrollTrigger
 * and motion's useScroll stay perfectly in step. Also hijacks in-page anchor
 * links (href="#...") so they glide instead of jumping.
 */
export function SmoothScroll() {
  useEffect(() => {
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });
    setLenis(lenis);

    lenis.on('scroll', ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    const onClick = (e: MouseEvent) => {
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;
      e.preventDefault();
      if (href === '#') scrollToTarget(0);
      else scrollToTarget(href);
    };
    document.addEventListener('click', onClick);

    // Content loads async (Firebase, lazy sections, images) and shifts layout,
    // so re-measure ScrollTrigger pins whenever the page height really changes.
    let lastHeight = document.body.scrollHeight;
    let refreshTimer: ReturnType<typeof setTimeout> | undefined;
    const resizeObserver = new ResizeObserver(() => {
      const h = document.body.scrollHeight;
      if (Math.abs(h - lastHeight) < 2) return;
      lastHeight = h;
      clearTimeout(refreshTimer);
      refreshTimer = setTimeout(() => {
        ScrollTrigger.refresh();
        lastHeight = document.body.scrollHeight;
      }, 200);
    });
    resizeObserver.observe(document.body);

    return () => {
      resizeObserver.disconnect();
      clearTimeout(refreshTimer);
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(tick);
      lenis.destroy();
      setLenis(null);
    };
  }, []);

  return null;
}
