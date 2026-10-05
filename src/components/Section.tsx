import { motion } from 'motion/react';
import React from 'react';
import { RevealText } from './RevealText';
import { EASE_OUT_EXPO } from '../lib/smoothScroll';

interface SectionProps {
  id: string;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Section({ id, title, children, className = '' }: SectionProps) {
  return (
    <section id={id} className={`py-24 ${className}`}>
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Accent line that draws itself in */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
          className="h-px w-16 bg-red-500 origin-left mb-6"
        />
        <RevealText
          as="h2"
          text={title}
          by="word"
          stagger={0.08}
          className="block text-4xl md:text-5xl font-display font-semibold tracking-tight text-zinc-900 dark:text-white transition-colors duration-300 mb-12"
        />
        <motion.div
          initial={{ opacity: 0, y: 30, filter: 'blur(6px)' }}
          whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.9, delay: 0.15, ease: EASE_OUT_EXPO }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
