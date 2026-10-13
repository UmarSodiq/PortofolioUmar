import { useEffect, useRef } from 'react';
import type { MotionValue } from 'motion/react';
import { prefersReducedMotion } from '../lib/smoothScroll';

interface HeroDataConstellationProps {
  progress?: MotionValue<number>;
}

interface DataNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  isCentroid: boolean;
  baseX: number;
  baseY: number;
}

/**
 * Kinetic Minimalist Data Constellation (2D Canvas)
 * 
 * Represents Topological Data Analysis & K-Means/KNN Graph Clustering:
 * - 30 elegant data points gently drifting in space.
 * - Hairline connectivity when Euclidean distance < threshold.
 * - Centroid nodes highlighted with a whisper of brand red.
 * - Interactive: smooth magnetic deflection and cursor connection.
 * - High performance: pure 2D Canvas, clamped DPR, auto-pause on scroll/tab hide.
 */
export function HeroDataConstellation({ progress }: HeroDataConstellationProps) {
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

    // Mouse tracking
    const mouse = {
      x: -1000,
      y: -1000,
      targetX: -1000,
      targetY: -1000,
      isActive: false,
    };

    // Responsive Canvas Resize
    const resize = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = parent.clientWidth;
      height = parent.clientHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement || canvas);

    // Initialize 28 data nodes
    const nodeCount = 28;
    const nodes: DataNode[] = [];

    const initNodes = () => {
      nodes.length = 0;
      const w = width || window.innerWidth;
      const h = height || window.innerHeight;
      for (let i = 0; i < nodeCount; i++) {
        const x = Math.random() * w;
        const y = Math.random() * h;
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.25 + Math.random() * 0.35;
        nodes.push({
          x,
          y,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          radius: i % 7 === 0 ? 3.0 : 1.8,
          isCentroid: i % 9 === 0,
          baseX: x,
          baseY: y,
        });
      }
    };

    initNodes();

    // Mouse movement
    const onPointerMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.targetX = e.clientX - rect.left;
      mouse.targetY = e.clientY - rect.top;
      mouse.isActive = true;
    };

    const onPointerLeave = () => {
      mouse.isActive = false;
      mouse.targetX = -1000;
      mouse.targetY = -1000;
    };

    window.addEventListener('mousemove', onPointerMove, { passive: true });
    document.addEventListener('mouseleave', onPointerLeave);

    // Animation Loop with Auto-Pause
    let running = false;
    let isVisible = true;
    const maxConnectionDistance = 140;
    const mouseRadius = 160;

    const render = () => {
      if (!running || !isVisible) return;

      if (width === 0 || height === 0) {
        animId = requestAnimationFrame(render);
        return;
      }

      // Smooth mouse lerp
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      const isDark = document.documentElement.classList.contains('dark');
      const scrollVal = progress ? progress.get() : 0;
      const scrollOffsetY = scrollVal * 80;

      ctx.clearRect(0, 0, width, height);

      // Colors
      const edgeBase = isDark ? '255, 255, 255' : '24, 24, 27';
      const nodeFill = isDark ? 'rgba(255, 255, 255, 0.45)' : 'rgba(24, 24, 27, 0.35)';
      const centroidFill = isDark ? 'rgba(248, 113, 113, 0.75)' : 'rgba(220, 38, 38, 0.65)';
      const centroidHalo = isDark ? 'rgba(248, 113, 113, 0.15)' : 'rgba(220, 38, 38, 0.10)';

      // 1. Update positions
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        if (!reduced) {
          node.x += node.vx;
          node.y += node.vy;

          // Gentle bounds bounce
          if (node.x < 10) { node.x = 10; node.vx *= -1; }
          if (node.x > width - 10) { node.x = width - 10; node.vx *= -1; }
          if (node.y < 10) { node.y = 10; node.vy *= -1; }
          if (node.y > height - 10) { node.y = height - 10; node.vy *= -1; }
        }

        // Mouse gentle repulsion
        if (mouse.isActive) {
          const dx = node.x - mouse.x;
          const dy = (node.y - scrollOffsetY) - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius && dist > 0) {
            const force = (1 - dist / mouseRadius) * 1.8;
            node.x += (dx / dist) * force;
            node.y += (dy / dist) * force;
          }
        }
      }

      // 2. Draw connections (Pairwise Graph Edges)
      ctx.lineWidth = 0.75;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        const ay = a.y - scrollOffsetY;

        for (let j = i + 1; j < nodes.length; j++) {
          const b = nodes[j];
          const by = b.y - scrollOffsetY;

          const dx = a.x - b.x;
          const dy = ay - by;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxConnectionDistance) {
            const alpha = (1 - dist / maxConnectionDistance) * (isDark ? 0.14 : 0.10);
            ctx.strokeStyle = `rgba(${edgeBase}, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, ay);
            ctx.lineTo(b.x, by);
            ctx.stroke();
          }
        }

        // Connection to mouse cursor
        if (mouse.isActive) {
          const dx = a.x - mouse.x;
          const dy = ay - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < mouseRadius) {
            const alpha = (1 - dist / mouseRadius) * (isDark ? 0.22 : 0.16);
            ctx.strokeStyle = `rgba(${edgeBase}, ${alpha.toFixed(3)})`;
            ctx.beginPath();
            ctx.moveTo(a.x, ay);
            ctx.lineTo(mouse.x, mouse.y);
            ctx.stroke();
          }
        }
      }

      // 3. Draw Nodes (Vertices)
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        const ny = node.y - scrollOffsetY;

        if (node.isCentroid) {
          // Centroid node halo
          ctx.beginPath();
          ctx.arc(node.x, ny, node.radius * 2.6, 0, Math.PI * 2);
          ctx.fillStyle = centroidHalo;
          ctx.fill();

          // Centroid core
          ctx.beginPath();
          ctx.arc(node.x, ny, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = centroidFill;
          ctx.fill();
        } else {
          // Regular node
          ctx.beginPath();
          ctx.arc(node.x, ny, node.radius, 0, Math.PI * 2);
          ctx.fillStyle = nodeFill;
          ctx.fill();
        }
      }

      animId = requestAnimationFrame(render);
    };

    const start = () => {
      if (running || !isVisible || document.hidden) return;
      running = true;
      animId = requestAnimationFrame(render);
    };

    const stop = () => {
      running = false;
      cancelAnimationFrame(animId);
    };

    // Auto-pause when scrolled off screen
    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) start();
      else stop();
    }, { threshold: 0 });
    io.observe(canvas);

    // Auto-pause when tab is hidden
    const onVisibility = () => {
      if (document.hidden) stop();
      else start();
    };
    document.addEventListener('visibilitychange', onVisibility);

    start();

    return () => {
      stop();
      io.disconnect();
      ro.disconnect();
      document.removeEventListener('visibilitychange', onVisibility);
      window.removeEventListener('mousemove', onPointerMove);
      document.removeEventListener('mouseleave', onPointerLeave);
    };
  }, [progress]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none select-none z-0"
    />
  );
}
