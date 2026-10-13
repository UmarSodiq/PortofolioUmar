import { motion } from 'motion/react';
import React from 'react';
import { RevealText } from './RevealText';
import { EASE_OUT_EXPO } from '../lib/smoothScroll';

interface SectionProps {
  id: string;
  title: string;
  index?: string;
  children: React.ReactNode;
  className?: string;
  containerClassName?: string;
  hideHeader?: boolean;
}

export function Section({ 
  id, 
  title, 
  index,
  children, 
  className = '', 
  containerClassName = 'max-w-5xl',
  hideHeader = false 
}: SectionProps) {
  return (
    <section id={id} className={`py-24 sm:py-32 relative border-t border-zinc-200/70 dark:border-white/[0.06] transition-colors duration-300 ${className}`}>
      <div className={`w-full ${containerClassName} mx-auto px-4 sm:px-6 lg:px-8`}>
        {!hideHeader && (
          <div className="mb-12">
            {index ? (
              <div className="inline-flex items-center gap-2 mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400 dark:text-zinc-500 select-none">
                <span className="text-red-500 font-semibold">//</span>
                <span>{index}</span>
                <span className="w-8 h-px bg-zinc-200 dark:bg-white/10 ml-1" />
              </div>
            ) : (
              <motion.div
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
                className="h-px w-16 bg-red-500 origin-left mb-6"
              />
            )}
            <RevealText
              as="h2"
              text={title}
              by="word"
              stagger={0.08}
              className="block text-4xl md:text-5xl font-display font-semibold tracking-tight text-zinc-900 dark:text-white transition-colors duration-300"
            />
          </div>
        )}
        {/* Light container reveal — child components stagger their own items */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.7, delay: 0.1, ease: EASE_OUT_EXPO }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
