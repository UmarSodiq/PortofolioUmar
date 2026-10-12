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
      // Let the browser handle modified / non-primary clicks (new tab, etc.).
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const anchor = (e.target as HTMLElement).closest('a[href^="#"]') as HTMLAnchorElement | null;
      if (!anchor) return;
      const href = anchor.getAttribute('href');
      if (!href) return;

      if (href === '#') {
        e.preventDefault();
        scrollToTarget(0);
        history.pushState(null, '', window.location.pathname + window.location.search);
        return;
      }

      let target: Element | null = null;
      try {
        target = document.querySelector(href);
      } catch {
        return; // invalid selector — fall back to native behaviour
      }
      if (!target) return;

      e.preventDefault();
      scrollToTarget(href);
      if (window.location.hash !== href) history.pushState(null, '', href);
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
