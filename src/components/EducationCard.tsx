import { BookOpen, Trophy, GraduationCap } from 'lucide-react';
import { motion } from 'motion/react';
import { useLanguage } from '../context/LanguageContext';
import { SpotlightCard } from './SpotlightCard';
import { Education } from '../types';

export function EducationCard({ data }: { data?: Education }) {
  const { t } = useLanguage();

  if (!data) return null;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <SpotlightCard className="rounded-[2.5rem] p-8 sm:p-12 transition-all duration-500 relative overflow-hidden group hover:border-zinc-300 dark:hover:border-white/20 hover:shadow-2xl dark:hover:shadow-2xl/20 border border-black/[0.06] dark:border-white/10">
        {/* Background Image: UIN Sunan Kalijaga with 35-40% opacity & dynamic gradient overlay */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-[2.5rem] z-0">
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-40 dark:opacity-35 scale-100 group-hover:scale-105 transition-transform duration-1000 ease-out"
            style={{ 
              backgroundImage: `url('/uin-suka.jpg')`,
              filter: 'saturate(1.2) contrast(1.05)'
            }}
          />
          {/* Soft directional gradient mask ensuring text is sharp while campus architecture is clearly visible */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/60 to-white/30 dark:from-zinc-950/95 dark:via-zinc-950/70 dark:to-zinc-950/30" />
          <div className="absolute inset-0 bg-gradient-to-r from-white/85 via-white/50 to-transparent dark:from-zinc-950/90 dark:via-zinc-950/50 dark:to-transparent" />
        </div>

        <div className="absolute top-0 right-0 p-8 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition-opacity duration-500 pointer-events-none z-10">
          <GraduationCap className="w-48 h-48 -mr-10 -mt-10 dark:text-zinc-50" />
        </div>

        <div className="flex flex-col md:flex-row md:items-start justify-between gap-6 mb-10 relative z-10">
          <div>
            <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-white mb-2">{data.institution}</h3>
            <p className="text-xl text-zinc-600 dark:text-zinc-400 font-medium">{data.degree}</p>
          </div>
          <div className="text-left md:text-right flex flex-col md:items-end">
            <span className="inline-block px-4 py-1.5 bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-sm font-semibold rounded-full mb-3 transition-colors">
              {data.period}
            </span>
            <p className="text-zinc-900 dark:text-zinc-100 font-bold bg-zinc-50 dark:bg-zinc-800/50 px-3 py-1 rounded-lg border border-black/5 dark:border-white/5 inline-flex transition-colors">{t('gpa')}: {data.gpa}</p>
          </div>
        </div>

        <div className="space-y-8 relative z-10">
          <div className="bg-zinc-50/50 dark:bg-zinc-800/20 p-6 rounded-2xl border border-black/[0.03] dark:border-white/[0.02] transition-colors">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest mb-3 flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-white dark:bg-zinc-800 flex items-center justify-center shadow-sm border border-black/5 dark:border-white/5 transition-colors">
                <BookOpen className="w-4 h-4 text-zinc-600 dark:text-zinc-400" />
              </div>
              {t('thesis')}
            </h4>
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed text-sm ml-10">
              {data.thesis}
            </p>
          </div>

          <div className="pl-2">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest mb-3">
              {t('relevantCourses')}
            </h4>
            <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed text-sm">
              {data.relevantCourses}
            </p>
          </div>

          <div className="pl-2">
            <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest mb-4 flex items-center gap-2">
              <Trophy className="w-4 h-4 text-zinc-400 dark:text-zinc-500" />
              {t('achievements')}
            </h4>
            <ul className="space-y-3">
              {data.achievements.map((achievement, idx) => (
                <li key={idx} className="flex items-start gap-3 text-sm text-zinc-700 dark:text-zinc-300">
                  <span className="text-zinc-300 dark:text-zinc-700 mt-0.5 font-bold">―</span>
                  <span className="leading-relaxed">{achievement}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </SpotlightCard>
    </motion.div>
  );
}

