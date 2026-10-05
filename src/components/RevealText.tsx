import { motion } from 'motion/react';
import React from 'react';
import { EASE_OUT_EXPO } from '../lib/smoothScroll';

interface RevealTextProps {
  text: string;
  /** Split into characters or words. */
  by?: 'char' | 'word';
  className?: string;
  /** Seconds before the first piece animates. */
  delay?: number;
  stagger?: number;
  duration?: number;
  /** Animate on mount (true) or when scrolled into view (false). */
  immediate?: boolean;
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p' | 'div';
}

/**
 * Masked text reveal: each char/word slides up from behind an overflow mask
 * with a slight rotation — the classic award-site headline entrance.
 */
export function RevealText({
  text,
  by = 'word',
  className = '',
  delay = 0,
  stagger,
  duration = 0.9,
  immediate = false,
  as = 'span',
}: RevealTextProps) {
  const Tag = motion[as] as typeof motion.span;
  const words = text.split(' ');
  const step = stagger ?? (by === 'char' ? 0.035 : 0.06);
  let index = 0;

  const container = {
    hidden: {},
    visible: { transition: { staggerChildren: step, delayChildren: delay } },
  };
  const piece = {
    hidden: { y: '100%', opacity: 0, filter: 'blur(5px)' },
    visible: { y: '0%', opacity: 1, filter: 'blur(0px)', transition: { duration, ease: EASE_OUT_EXPO } },
  };

  const trigger = immediate
    ? { initial: 'hidden', animate: 'visible' }
    : { initial: 'hidden', whileInView: 'visible', viewport: { once: true, margin: '-80px' } };

  return (
    <Tag className={className} aria-label={text} variants={container} {...(trigger as any)}>
      {words.map((word, wi) => (
        <React.Fragment key={wi}>
          <span aria-hidden className="inline-flex overflow-hidden pb-[0.12em] -mb-[0.12em] align-bottom">
            {by === 'char' ? (
              word.split('').map((ch) => (
                <motion.span key={index++} variants={piece} className="inline-block will-change-transform origin-bottom-left">
                  {ch}
                </motion.span>
              ))
            ) : (
              <motion.span variants={piece} className="inline-block will-change-transform origin-bottom-left">
                {word}
              </motion.span>
            )}
          </span>
          {wi < words.length - 1 && <span aria-hidden>{' '}</span>}
        </React.Fragment>
      ))}
    </Tag>
  );
}
