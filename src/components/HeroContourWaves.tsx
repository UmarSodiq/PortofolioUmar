import { useEffect, useRef } from 'react';
import type { MotionValue } from 'motion/react';
import { prefersReducedMotion } from '../lib/smoothScroll';

interface HeroContourWavesProps {
  progress?: MotionValue<number>;
}

/**
 * Topographic / Fourier Waveform Contour Lines
 *
 * Smooth continuous vector lines representing mathematical functions (sine/Fourier series).
 * Completely devoid of dots or particle clusters.
 * Reacts to mouse pointer with a gentle magnetic displacement and responds to scroll.
 */
export default function HeroContourWaves({ progress }: HeroContourWavesProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const reduced = prefersReducedMotion();
    let animId = 0;
    let width = 0;
    let height = 0;

    // Mouse tracking with smooth spring-like lerp
    const mouse = { x: -1000, y: -1000, targetX: -1000, targetY: -1000, strength: 0 };

    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement || canvas);

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.strength = 1;
    };

    const onPointerLeave = () => {
      mouse.strength = 0;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    document.addEventListener('pointerleave', onPointerLeave);

    // Wave parameters: 9 continuous contour ribbons
    const waveCount = 9;
    let time = 0;

    const render = () => {
      if (!ctx) return;
      if (width === 0 || height === 0) {
        if (running) animId = requestAnimationFrame(render);
        return;
      }

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const isDark = document.documentElement.classList.contains('dark');
      const scrollVal = progress ? progress.get() : 0;

      ctx.clearRect(0, 0, width, height);

      const baseCenterY = height * 0.58 + scrollVal * 120;
      const stepX = Math.max(6, Math.floor(width / 140));

      for (let i = 0; i < waveCount; i++) {
        const lineFraction = i / (waveCount - 1); // 0 to 1
        const lineOffset = (i - (waveCount - 1) / 2) * 28;

        ctx.beginPath();

        // Color calculation: subtle gradient from slate to crimson
        if (isDark) {
          if (i % 2 === 0) {
            ctx.strokeStyle = `rgba(248, 113, 113, ${0.18 + lineFraction * 0.22})`; // soft red
          } else {
            ctx.strokeStyle = `rgba(255, 255, 255, ${0.08 + lineFraction * 0.12})`; // subtle white line
          }
        } else {
          if (i % 2 === 0) {
            ctx.strokeStyle = `rgba(220, 38, 38, ${0.20 + lineFraction * 0.20})`; // red-600
          } else {
            ctx.strokeStyle = `rgba(39, 39, 42, ${0.10 + lineFraction * 0.14})`; // zinc-800 line
          }
        }

        ctx.lineWidth = i === 4 ? 2 : 1.3;

        let started = false;

        for (let x = -50; x <= width + 50; x += stepX) {
          // Layered Fourier sine waves
          const freq1 = 0.0022 + i * 0.0003;
          const freq2 = 0.0045 - i * 0.0002;
          const t1 = time * (0.45 + i * 0.06);

          let y = baseCenterY + lineOffset;

          // Natural undulating terrain
          y += Math.sin(x * freq1 + t1) * (35 + i * 4);
          y += Math.sin(x * freq2 - t1 * 0.8) * (20 + i * 2);
          y += Math.cos((x + lineOffset) * 0.0018 + t1 * 0.5) * 15;

          // Mouse deflection (smooth topographic bulge / contour deflection)
          const dx = x - mouse.x;
          const dy = y - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const maxDist = 240;

          if (dist < maxDist && mouse.strength > 0.01) {
            const force = (1 - dist / maxDist) * 38 * mouse.strength;
            // Push wave gently away from cursor
            y += (dy / (dist || 1)) * force;
          }

          if (!started) {
            ctx.moveTo(x, y);
            started = true;
          } else {
            ctx.lineTo(x, y);
          }
        }

        ctx.stroke();
      }

      if (!reduced && running) {
        time += 0.018;
        animId = requestAnimationFrame(render);
      }
    };

    // Only animate while the hero is on screen and the tab is visible.
    let running = false;
    let inView = true;
    const start = () => {
      if (running || reduced || !inView || document.hidden) return;
      running = true;
      animId = requestAnimationFrame(render);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(animId);
    };

    const io = new IntersectionObserver(
      ([entry]) => {
        inView = entry.isIntersecting;
        if (inView) start();
        else stop();
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    const onVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', onVisibility);

    if (reduced) {
      time = 1.5;
      render();
    } else {
      start();
    }

    return () => {
      stop();
      io.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      ro.disconnect();
      window.removeEventListener('pointermove', onPointerMove);
      document.removeEventListener('pointerleave', onPointerLeave);
    };
  }, [progress]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
    />
  );
}
