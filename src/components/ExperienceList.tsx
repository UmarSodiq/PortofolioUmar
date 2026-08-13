import { motion } from 'motion/react';
import { Experience } from '../types';
import { SpotlightCard } from './SpotlightCard';

interface ExperienceListProps {
  experiences: Experience[];
  title: string;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function ExperienceList({ experiences, title }: ExperienceListProps) {
  return (
    <div className="mb-12 last:mb-0">
      <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-white mb-10 pb-5 border-b border-black/[0.04] dark:border-white/[0.04] transition-colors">
        {title}
      </h3>
      <motion.div 
        className="space-y-12"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
      >
        {experiences.map((exp, idx) => (
          <motion.div 
            key={idx} 
            variants={itemVariants}
            className="group"
          >
            <SpotlightCard className="p-5 sm:p-8 transition-all duration-300 rounded-[2rem] hover:border-zinc-300 dark:hover:border-white/20 hover:shadow-xl dark:hover:shadow-2xl/10">
              <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-5">
                <div>
                  <h4 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
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
              
              <ul className="space-y-3 mt-4 pl-5 border-l-2 border-zinc-100 dark:border-zinc-800 group-hover:border-emerald-200 dark:group-hover:border-emerald-800 transition-colors duration-500">
                {exp.description.map((desc, i) => (
                  <li key={i} className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed relative">
                    <span className="absolute -left-[27px] top-2 w-2 h-2 rounded-full bg-zinc-200 dark:bg-zinc-700 group-hover:bg-emerald-400 dark:group-hover:bg-emerald-500 transition-colors duration-500 ring-4 ring-[#FAFAFA] dark:ring-zinc-950 group-hover:ring-white dark:group-hover:ring-zinc-900"></span>
                    {desc}
                  </li>
                ))}
              </ul>
            </SpotlightCard>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
