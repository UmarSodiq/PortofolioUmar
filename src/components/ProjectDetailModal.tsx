import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, ExternalLink, Github, ArrowRight, Code, Sparkles } from 'lucide-react';
import { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { MagneticButton } from './MagneticButton';

interface ProjectDetailModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

export function ProjectDetailModal({ project, isOpen, onClose }: ProjectDetailModalProps) {
  const { t, language } = useLanguage();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  useEffect(() => {
    if (project) {
      setSelectedImageIndex(0);
    }
  }, [project]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-8">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-3xl max-h-[90vh] bg-white dark:bg-zinc-900 rounded-[2rem] border border-zinc-200 dark:border-white/10 shadow-2xl overflow-hidden flex flex-col z-10"
          >
            {/* Header with Close Button */}
            <div className="flex items-center justify-between p-6 pb-4 border-b border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/50">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  <Sparkles className="w-5 h-5" />
                </span>
                <span className="text-xs font-bold uppercase tracking-wider text-zinc-400">
                  {language === 'id' ? 'Detail Proyek' : 'Project Detail'}
                </span>
              </div>
              <button
                onClick={onClose}
                aria-label="Close modal"
                className="p-2.5 rounded-full hover:bg-zinc-200/60 dark:hover:bg-zinc-800 text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="overflow-y-auto p-6 sm:p-8 space-y-6 flex-1">
              {/* Main Image Showcase */}
              {project.images && project.images.length > 0 ? (
                <div className="space-y-3">
                  <div className="relative rounded-2xl overflow-hidden bg-zinc-950/5 dark:bg-black/30 border border-zinc-200/60 dark:border-white/5 max-h-[380px] flex items-center justify-center">
                    <img
                      src={project.images[selectedImageIndex]}
                      alt={project.title}
                      className="w-full h-auto max-h-[380px] object-contain rounded-2xl"
                    />
                  </div>

                  {/* Thumbnail Row if Multiple Images */}
                  {project.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-1">
                      {project.images.map((img, idx) => (
                        <button
                          key={idx}
                          onClick={() => setSelectedImageIndex(idx)}
                          className={`relative rounded-xl overflow-hidden w-20 h-14 shrink-0 border-2 transition-all cursor-pointer ${
                            selectedImageIndex === idx
                              ? 'border-emerald-500 scale-105 shadow-md'
                              : 'border-transparent opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img src={img} alt="Thumbnail" className="w-full h-full object-cover" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <div className="w-full h-48 rounded-2xl bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200 dark:border-white/5 flex flex-col items-center justify-center text-zinc-400">
                  <Code className="w-12 h-12 mb-2 opacity-40 text-emerald-500" />
                  <span className="text-sm font-medium">{t('noPreview')}</span>
                </div>
              )}

              {/* Title & Tags */}
              <div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white mb-3">
                  {project.title}
                </h2>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags && project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 text-xs font-semibold bg-emerald-50 dark:bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 rounded-lg border border-emerald-200/50 dark:border-emerald-500/20"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div className="prose dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300 text-sm sm:text-base leading-relaxed whitespace-pre-line bg-zinc-50 dark:bg-zinc-800/30 p-5 rounded-2xl border border-zinc-100 dark:border-white/5">
                {project.description}
              </div>
            </div>

            {/* Modal Footer / Action Buttons */}
            <div className="p-6 border-t border-zinc-100 dark:border-white/5 bg-zinc-50/70 dark:bg-zinc-900/80 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap gap-3">
                {project.demoUrl && (
                  <MagneticButton
                    as="a"
                    href={project.demoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white text-sm font-medium rounded-xl transition-colors shadow-md cursor-pointer"
                  >
                    <ExternalLink className="w-4 h-4" />
                    <span>{t('demo')}</span>
                  </MagneticButton>
                )}

                {project.driveUrl && (
                  <MagneticButton
                    as="a"
                    href={project.driveUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-medium rounded-xl hover:bg-zinc-800 dark:hover:bg-zinc-200 transition-colors shadow-md cursor-pointer"
                  >
                    <ArrowRight className="w-4 h-4" />
                    <span>{t('drive')}</span>
                  </MagneticButton>
                )}

                {project.repoUrl && (
                  <MagneticButton
                    as="a"
                    href={project.repoUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-200 border border-zinc-200 dark:border-white/10 text-sm font-medium rounded-xl hover:bg-zinc-100 dark:hover:bg-zinc-700 transition-colors shadow-sm cursor-pointer"
                  >
                    <Github className="w-4 h-4" />
                    <span>{t('repo')}</span>
                  </MagneticButton>
                )}
              </div>

              <button
                type="button"
                onClick={onClose}
                className="px-5 py-2.5 rounded-xl text-zinc-600 dark:text-zinc-400 hover:bg-zinc-200/50 dark:hover:bg-zinc-800 text-sm font-medium transition-colors cursor-pointer ml-auto"
              >
                {language === 'id' ? 'Tutup' : 'Close'}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
