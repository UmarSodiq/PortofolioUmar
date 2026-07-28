import { ExternalLink, Github, Code, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { SpotlightCard } from './SpotlightCard';
import { MagneticButton } from './MagneticButton';

interface ProjectGalleryProps {
  projects: Project[];
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
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.7,
      ease: [0.16, 1, 0.3, 1],
    },
  },
};

export function ProjectGallery({ projects }: ProjectGalleryProps) {
  const { t, language } = useLanguage();

  if (projects.length === 0) {
    return (
      <div className="text-zinc-500 dark:text-zinc-400 italic py-10 text-center border-2 border-dashed border-zinc-200 dark:border-white/10 rounded-[2rem] transition-colors">
        {t('noProjects')}
      </div>
    );
  }

  return (
    <motion.div 
      key={language}
      className="grid gap-10 lg:grid-cols-2"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
    >
      {projects.map((project, index) => (
        <motion.div 
          key={project.id} 
          variants={itemVariants}
        >
          <SpotlightCard className="group flex flex-col h-full hover:border-zinc-300 dark:hover:border-white/20 transition-all duration-500 hover:shadow-xl dark:hover:shadow-2xl/10">
          
          {/* Gallery Area */}
          <div className="relative bg-zinc-50 dark:bg-zinc-800/50 overflow-hidden border-b border-black/[0.03] dark:border-white/[0.02] transition-colors">
            {project.images.length > 0 ? (
              <div className="w-full h-full relative">
                <img 
                  src={project.images[0]} 
                  alt={`${project.title} screenshot`}
                  loading="lazy"
                  decoding="async"
                  className="w-full h-auto object-contain group-hover:scale-105 transition-transform duration-700 ease-in-out"
                />
              </div>
            ) : (
              <div className="w-full h-64 flex flex-col items-center justify-center text-zinc-400 dark:text-zinc-500 transition-colors">
                <Code className="w-12 h-12 mb-3 opacity-50 text-zinc-300 dark:text-zinc-600 transition-colors" />
                <span className="text-sm font-medium">{t('noPreview')}</span>
              </div>
            )}
          </div>

          {/* Content Area */}
          <div className="p-8 flex flex-col flex-grow">
            <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-3 transition-colors">{project.title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-8 flex-grow transition-colors">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-8">
              {project.tags.map((tag) => (
                <span key={tag} className="px-3 py-1 text-xs font-semibold bg-zinc-100/80 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 rounded-lg transition-colors">
                  {tag}
                </span>
              ))}
            </div>

            <div className="flex flex-wrap gap-3 mt-auto">
              {project.demoUrl && (
                <MagneticButton 
                  as="a"
                  href={project.demoUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)]"
                >
                  <ExternalLink className="w-4 h-4" />
                  <span>{t('demo')}</span>
                </MagneticButton>
              )}
              {project.repoUrl && (
                <MagneticButton 
                  as="a"
                  href={project.repoUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 text-sm font-medium rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm"
                >
                  <Github className="w-4 h-4" />
                  <span>{t('repo')}</span>
                </MagneticButton>
              )}
              {project.driveUrl && (
                <MagneticButton 
                  as="a"
                  href={project.driveUrl} 
                  target="_blank" 
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 text-sm font-medium rounded-xl hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors shadow-sm"
                >
                  <ArrowRight className="w-4 h-4" />
                  <span>{t('drive')}</span>
                </MagneticButton>
              )}
            </div>
          </div>
          </SpotlightCard>
        </motion.div>
      ))}
    </motion.div>
  );
}
