import { motion } from 'motion/react';

export function DynamicBackground() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
      <motion.div
        animate={{
          x: [0, 100, 0, -100, 0],
          y: [0, -100, 100, 50, 0],
          scale: [1, 1.1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute -top-[20%] -left-[10%] w-[60%] h-[60%] rounded-full bg-emerald-500/10 dark:bg-emerald-500/5 blur-[120px]"
      />
      <motion.div
        animate={{
          x: [0, -150, 0, 100, 0],
          y: [0, 100, -50, 100, 0],
          scale: [1, 1.2, 0.8, 1.1, 1],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "linear"
        }}
        className="absolute top-[40%] -right-[10%] w-[50%] h-[70%] rounded-full bg-blue-500/5 dark:bg-blue-500/5 blur-[120px]"
      />
    </div>
  );
}
