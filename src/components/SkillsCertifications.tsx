import { Award, CheckCircle2, Zap, Brain, Wrench, Languages, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Certification, SkillCategory } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { SpotlightCard } from './SpotlightCard';

export function SkillsCertifications({ certifications, skillCategories }: { certifications: Certification[], skillCategories: SkillCategory[] }) {
  const { t, language } = useLanguage();
  
  const skillIcons = [
    <Brain className="w-5 h-5 text-purple-500" />,
    <Zap className="w-5 h-5 text-amber-500" />,
    <Wrench className="w-5 h-5 text-blue-500" />,
    <Languages className="w-5 h-5 text-emerald-500" />
  ];

  const bentoSpans = [
    "md:col-span-2", // 0: Softskills
    "md:col-span-1", // 1: Teknis
    "md:col-span-2", // 2: Software
    "md:col-span-1", // 3: Bahasa
  ];

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
                <CheckCircle2 className="w-4 h-4 text-emerald-500" />
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

      {/* Sertifikasi */}
      <div className="min-w-0">
        <div className="flex items-center gap-3 mb-8 pb-4 border-b border-black/[0.04] dark:border-white/[0.04]">
          <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/5">
            <Award className="w-5 h-5 text-zinc-700 dark:text-zinc-300" />
          </div>
          <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-white">
            {t('certTab')}
          </h3>
        </div>
        
        <div className="space-y-4">
          {certifications.map((cert, idx) => (
            <motion.div 
              key={idx} 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.4, delay: idx * 0.05, ease: [0.16, 1, 0.3, 1] }}
            >
              <SpotlightCard className="flex items-start gap-5 p-5 hover:border-white/60 dark:hover:border-white/20 hover:-translate-y-1 transition-all duration-300 group">
                <div className="shrink-0 mt-0.5">
                  <div className="w-12 h-12 rounded-full bg-zinc-50 dark:bg-zinc-800/50 border border-zinc-100 dark:border-white/5 flex items-center justify-center text-zinc-400 dark:text-zinc-500 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 group-hover:bg-emerald-50 dark:group-hover:bg-emerald-900/20 group-hover:border-emerald-200 dark:group-hover:border-emerald-800/30 transition-colors">
                    <Award className="w-6 h-6" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <h4 className="text-base font-bold text-zinc-900 dark:text-zinc-100 leading-tight mb-2 group-hover:text-emerald-700 dark:group-hover:text-emerald-400 transition-colors">
                    {cert.name}
                  </h4>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium transition-colors">
                    {cert.issuer} <span className="text-zinc-300 dark:text-zinc-600 mx-1.5">•</span> {cert.year}
                  </p>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

