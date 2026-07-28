import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ExternalLink, BookOpen, ChevronDown } from 'lucide-react';
import { Publication } from '../types';
import { SpotlightCard } from './SpotlightCard';
import { useLanguage } from '../context/LanguageContext';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
  },
};

function PublicationItem({ pub, t }: { pub: Publication, t: any }) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div variants={itemVariants} className="group h-full">
      <SpotlightCard className="h-full p-6 sm:p-8 hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-300 hover:shadow-xl dark:hover:shadow-2xl/10 rounded-[2rem] flex flex-col">
        <div className="flex-grow flex flex-col">
          <div className="mb-4">
            <div className="w-12 h-12 rounded-full bg-zinc-100 dark:bg-zinc-800/50 border border-zinc-200 dark:border-white/5 flex items-center justify-center text-zinc-500 dark:text-zinc-400 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 transition-colors mb-5">
              <BookOpen className="w-6 h-6" />
            </div>
            <button 
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-left w-full focus:outline-none flex justify-between items-start gap-4 group/btn"
            >
              <h4 className="text-xl font-bold text-zinc-900 dark:text-white group-hover/btn:text-emerald-600 dark:group-hover/btn:text-emerald-400 transition-colors mb-2">
                {pub.title}
              </h4>
              {pub.description && (
                <div className="mt-1 shrink-0 p-1 rounded-full bg-zinc-100 dark:bg-zinc-800 group-hover/btn:bg-zinc-200 dark:group-hover/btn:bg-zinc-700 transition-colors">
                  <ChevronDown className={`w-4 h-4 text-zinc-500 dark:text-zinc-400 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              )}
            </button>
            <div className="flex items-center gap-2 text-sm text-zinc-600 dark:text-zinc-400 font-medium mb-3 mt-1">
              <span>{pub.publisher}</span>
              <span className="text-zinc-300 dark:text-zinc-700">•</span>
              <span>{pub.year}</span>
            </div>
          </div>
          
          <AnimatePresence initial={false}>
            {isExpanded && pub.description && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeInOut" }}
                className="overflow-hidden"
              >
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6 pt-2 border-t border-black/[0.04] dark:border-white/5">
                  {pub.description}
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {pub.url && (
          <div className="mt-auto pt-4 border-t border-black/[0.04] dark:border-white/5">
            <a
              href={pub.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-900 dark:text-white hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors"
            >
              {t('viewProject') || 'Lihat'} <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}
      </SpotlightCard>
    </motion.div>
  );
}

export function PublicationList({ publications }: { publications: Publication[] }) {
  const { t, language } = useLanguage();

  if (!publications || publications.length === 0) {
    return (
      <div className="text-zinc-500 dark:text-zinc-400 italic py-10 text-center border-2 border-dashed border-zinc-200 dark:border-white/10 rounded-[2rem] transition-colors">
        {t('noPublications')}
      </div>
    );
  }

  return (
    <motion.div 
      key={language}
      className="grid gap-6 md:grid-cols-2"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {publications.map((pub) => (
        <PublicationItem key={pub.id} pub={pub} t={t} />
      ))}
    </motion.div>
  );
}
