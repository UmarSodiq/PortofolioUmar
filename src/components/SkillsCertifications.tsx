import { CheckCircle2, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Certification, SkillCategory } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { DraggableCardDeck } from './DraggableCardDeck';

export function SkillsCertifications({ certifications, skillCategories }: { certifications: Certification[], skillCategories: SkillCategory[] }) {
  const { t } = useLanguage();

  return (
    <div className="grid lg:grid-cols-2 gap-16 lg:gap-20">
      {/* Kemampuan */}
      <div className="min-w-0">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-black/[0.04] dark:border-white/[0.04]">
          <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/5">
            <Star className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
          </div>
          <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-white">
            {t('skillsTab')}
          </h3>
        </div>
        
        <div className="space-y-8">
          {skillCategories.map((category, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <h4 className="text-sm font-bold text-zinc-900 dark:text-zinc-100 uppercase tracking-widest mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-red-500" />
                {category.title}
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {category.skills.map((skill, skillIdx) => (
                  <span 
                    key={skillIdx} 
                    className="inline-flex items-center px-4 py-2 bg-white/40 dark:bg-zinc-900/40 backdrop-blur-md border border-white/50 dark:border-white/10 text-zinc-700 dark:text-zinc-300 text-sm font-medium rounded-xl hover:border-white/80 dark:hover:border-white/30 transition-colors shadow-sm"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Sertifikasi (Draggable Physics Deck / Switchable to List) */}
      <div className="min-w-0">
        <DraggableCardDeck certifications={certifications} />
      </div>
    </div>
  );
}
