import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

interface SpotlightCardProps {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
}

export const SpotlightCard = ({ children, className = '', tilt = true }: SpotlightCardProps) => {
  const divRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [opacity, setOpacity] = useState(0);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 220, damping: 22 });
  const mouseYSpring = useSpring(y, { stiffness: 220, damping: 22 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["5deg", "-5deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-5deg", "5deg"]);
  const glareX = useTransform(mouseXSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glareY = useTransform(mouseYSpring, [-0.5, 0.5], ["0%", "100%"]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!divRef.current) return;

    const div = divRef.current;
    const rect = div.getBoundingClientRect();
    
    // For Spotlight
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    
    // For Tilt
    if (tilt) {
      const width = rect.width;
      const height = rect.height;
      
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const xPct = mouseX / width - 0.5;
      const yPct = mouseY / height - 0.5;
      
      x.set(xPct);
      y.set(yPct);
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
    setOpacity(1);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setOpacity(0);
    if (tilt) {
      x.set(0);
      y.set(0);
    }
  };

  return (
    <div style={{ perspective: 1200 }} className="h-full w-full">
      <motion.div
        ref={divRef}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: tilt ? rotateX : 0,
          rotateY: tilt ? rotateY : 0,
          transformStyle: "preserve-3d",
        }}
        whileHover={{
          y: -4,
          scale: 1.01,
          transition: { duration: 0.35, ease: [0.16, 1, 0.3, 1] }
        }}
        className={`relative overflow-hidden rounded-[2rem] border border-black/[0.04] dark:border-white/10 bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl shadow-[0_4px_24px_rgba(0,0,0,0.03)] dark:shadow-[0_8px_32px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-shadow duration-500 ${className}`}
      >
        {/* Dynamic mouse spotlight & specular reflection */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-[2rem] opacity-0 transition-opacity duration-300 z-10"
          animate={{ opacity }}
          style={{
            background: `radial-gradient(500px circle at ${position.x}px ${position.y}px, rgba(239,68,68,0.08), transparent 45%)`,
          }}
        />

        {/* Silky glass glare sheen */}
        <motion.div
          className="pointer-events-none absolute -inset-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-10"
          animate={{ opacity: isHovered ? 0.35 : 0 }}
          style={{
            background: 'linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.15) 50%, transparent 60%)',
            transform: `translate(${glareX}, ${glareY})`,
          }}
        />

        {/* Container for children preserving 3D depth */}
        <div style={{ transform: tilt ? "translateZ(18px)" : "none", height: "100%" }}>
          {children}
        </div>
      </motion.div>
    </div>
  );
};
