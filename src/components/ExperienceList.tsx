import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { Experience } from '../types';
import { SpotlightCard } from './SpotlightCard';
import { EASE_OUT_EXPO } from '../lib/smoothScroll';

interface ExperienceListProps {
  experiences: Experience[];
  title: string;
}

/**
 * Scroll-driven timeline: a red line "draws" down the rail as you scroll,
 * and each node ignites when the line reaches its card.
 */
export function ExperienceList({ experiences, title }: ExperienceListProps) {
  const listRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: listRef, offset: ['start 75%', 'end 55%'] });
  const lineScale = useSpring(scrollYProgress, { stiffness: 120, damping: 30, restDelta: 0.001 });

  return (
    <div className="mb-12 last:mb-0">
      <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-white mb-10 pb-5 border-b border-black/[0.04] dark:border-white/[0.04] transition-colors">
        {title}
      </h3>

      <div ref={listRef} className="relative pl-9 sm:pl-14">
        {/* Rail + scroll-drawn fill */}
        <div aria-hidden className="absolute left-[11px] sm:left-[19px] top-2 bottom-2 w-px bg-zinc-200 dark:bg-white/10" />
        <motion.div
          aria-hidden
          style={{ scaleY: lineScale }}
          className="absolute left-[11px] sm:left-[19px] top-2 bottom-2 w-px origin-top bg-gradient-to-b from-red-500 via-rose-500 to-red-400 shadow-[0_0_12px_rgba(239,68,68,0.6)]"
        />

        <div className="space-y-10 sm:space-y-12">
          {experiences.map((exp, idx) => (
            <motion.div
              key={idx}
              className="group relative"
              initial={{ opacity: 0, x: 40, filter: 'blur(6px)' }}
              whileInView={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
              viewport={{ once: true, margin: '0px 0px -15% 0px' }}
              transition={{ duration: 0.8, ease: EASE_OUT_EXPO }}
            >
              {/* Timeline node — lights up while the card is in the reading zone */}
              <motion.span
                aria-hidden
                className="absolute -left-9 sm:-left-14 top-8 w-[23px] sm:w-[39px] flex justify-center"
                initial="off"
                whileInView="on"
                viewport={{ once: false, margin: '0px 0px -45% 0px' }}
              >
                <motion.span
                  variants={{
                    off: { scale: 0.7, backgroundColor: 'rgba(161,161,170,0.6)', boxShadow: '0 0 0 0 rgba(239,68,68,0)' },
                    on: { scale: 1, backgroundColor: 'rgb(239,68,68)', boxShadow: '0 0 0 6px rgba(239,68,68,0.15)' },
                  }}
                  transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
                  className="block w-3 h-3 rounded-full ring-4 ring-white dark:ring-zinc-900"
                />
              </motion.span>

              <SpotlightCard className="p-5 sm:p-8 transition-all duration-300 rounded-[2rem] hover:border-zinc-300 dark:hover:border-white/20 hover:shadow-xl dark:hover:shadow-2xl/10 relative">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
                  <div>
                    <h4 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-red-600 dark:group-hover:text-red-400 transition-colors">
                      {exp.role}
                    </h4>
                    <p className="text-zinc-600 dark:text-zinc-400 font-medium mt-1">
                      {exp.organization} {exp.type && <span className="text-zinc-400 dark:text-zinc-500 font-normal ml-1 border-l border-zinc-300 dark:border-zinc-700 pl-2">{exp.type}</span>}
                    </p>
                  </div>
                  <div className="md:text-right shrink-0">
                    <span className="inline-block px-4 py-1.5 bg-zinc-50 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 text-sm font-semibold rounded-full border border-black/5 dark:border-white/5 transition-colors">
                      {exp.start_period} – {exp.end_period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 mt-4 pl-5 border-l-2 border-zinc-100 dark:border-zinc-800 group-hover:border-red-200 dark:group-hover:border-red-800 transition-colors duration-500">
                  {exp.description.map((desc, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                      transition={{ duration: 0.6, delay: 0.15 + i * 0.07, ease: EASE_OUT_EXPO }}
                      className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed relative"
                    >
                      <span className="absolute -left-[27px] top-2 w-2 h-2 rounded-full bg-zinc-200 dark:bg-zinc-700 group-hover:bg-red-400 dark:group-hover:bg-red-500 transition-colors duration-500 ring-4 ring-[#FAFAFA] dark:ring-zinc-950 group-hover:ring-white dark:group-hover:ring-zinc-900"></span>
                      {desc}
                    </motion.li>
                  ))}
                </ul>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
