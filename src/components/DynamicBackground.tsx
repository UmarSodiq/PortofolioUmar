import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';

export function DynamicBackground() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  const springX = useSpring(mouseX, { damping: 32, stiffness: 220 });
  const springY = useSpring(mouseY, { damping: 32, stiffness: 220 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [mouseX, mouseY]);

  const torchBackground = useMotionTemplate`radial-gradient(750px circle at ${springX}px ${springY}px, rgba(239, 68, 68, 0.045), transparent 75%)`;

  return (
    <>
      {/* Global Ambient Cursor Torch (Desktop atmospheric lighting) */}
      <motion.div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-10 hidden sm:block"
        style={{
          background: torchBackground,
        }}
      />

      {/* Subtle Fine-art Matte Film Grain (Awwwards/Stripe luxury texture) */}
      <div 
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-30 opacity-[0.03] dark:opacity-[0.045] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
        }}
      />

      {/* Floating Ambient Mesh Blobs */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <motion.div
          animate={{
            x: [0, 80, 0, -80, 0],
            y: [0, -80, 80, 40, 0],
            scale: [1, 1.08, 0.95, 1.08, 1],
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute -top-[15%] -left-[10%] w-[55%] h-[55%] rounded-full bg-gradient-to-br from-red-500/12 to-rose-600/5 dark:from-red-500/8 dark:to-transparent blur-[140px]"
        />
        <motion.div
          animate={{
            x: [0, -120, 0, 80, 0],
            y: [0, 80, -40, 80, 0],
            scale: [1, 1.15, 0.9, 1.1, 1],
          }}
          transition={{
            duration: 26,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[35%] -right-[10%] w-[50%] h-[65%] rounded-full bg-gradient-to-bl from-rose-500/8 to-blue-500/5 dark:from-red-600/5 dark:to-transparent blur-[140px]"
        />
      </div>
    </>
  );
}

