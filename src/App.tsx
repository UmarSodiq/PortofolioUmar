/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { Section } from './components/Section';
const EducationCard = React.lazy(() => import('./components/EducationCard').then(module => ({ default: module.EducationCard })));
const ExperienceList = React.lazy(() => import('./components/ExperienceList').then(module => ({ default: module.ExperienceList })));
const ProjectGallery = React.lazy(() => import('./components/ProjectGallery').then(module => ({ default: module.ProjectGallery })));
const PublicationList = React.lazy(() => import('./components/PublicationList').then(module => ({ default: module.PublicationList })));
const SkillsCertifications = React.lazy(() => import('./components/SkillsCertifications').then(module => ({ default: module.SkillsCertifications })));
const Connect = React.lazy(() => import('./components/Connect').then(module => ({ default: module.Connect })));
import { Github, Linkedin, Mail, Instagram, CheckCircle2, Heart, Globe, LucideIcon } from 'lucide-react';
import { useLanguage } from './context/LanguageContext';
import { BackToTop } from './components/BackToTop';
import { PageLoader } from './components/PageLoader';
import { DynamicBackground } from './components/DynamicBackground';
import { useSupabaseData } from './hooks/useSupabaseData';

export default function App() {
  const { t, language } = useLanguage();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { projects, workExperiences, orgExperiences, education, certifications, skillCategories, socialLinks, profile, publications } = useSupabaseData();

  const getIcon = (iconName: string): LucideIcon => {
    switch (iconName.toLowerCase()) {
      case 'github': return Github;
      case 'linkedin': return Linkedin;
      case 'mail': return Mail;
      case 'instagram': return Instagram;
      default: return Globe;
    }
  };

  return (
    <div className="min-h-screen font-sans text-zinc-900 dark:text-zinc-50 transition-colors duration-300 overflow-x-hidden">
      <PageLoader />
      <DynamicBackground />
      <Helmet>
        <title>{t('seoTitle')}</title>
        <meta name="description" content={t('seoDescription')} />
        
        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={t('seoTitle')} />
        <meta property="og:description" content={t('seoDescription')} />
        <meta property="og:image" content={window.location.origin + '/assets/.aistudio/REZ04302-1.jpg'} />
        <meta property="og:site_name" content="Umar Sodiq Portfolio" />

        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={window.location.href} />
        <meta name="twitter:title" content={t('seoTitle')} />
        <meta name="twitter:description" content={t('seoDescription')} />
        <meta name="twitter:image" content={window.location.origin + '/assets/.aistudio/REZ04302-1.jpg'} />

        <html lang={language} />
      </Helmet>
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-zinc-900 dark:bg-emerald-500 origin-left z-50"
        style={{ scaleX }}
      />
      <Navbar />
      
      <main>
        <div id="beranda">
          <Hero profile={profile} />
        </div>
        
        <React.Suspense fallback={<div className="py-20 flex justify-center"><div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div></div>}>
        <Section id="pendidikan" title={t('educationTitle')} className="transition-colors duration-300">
          <EducationCard data={education} />
        </Section>

        <Section id="pengalaman" title={t('experienceTitle')} className="transition-colors duration-300">
          <div className="bg-white dark:bg-zinc-900 p-6 sm:p-10 rounded-[2.5rem] border border-black/[0.04] dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none transition-colo[...]">
            <ExperienceList title={t('workExperience')} experiences={workExperiences} />
            <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent w-full my-12" />
            <ExperienceList title={t('orgExperience')} experiences={orgExperiences} />
          </div>
        </Section>

        <Section id="proyek" title={t('projectsTitle')} className="transition-colors duration-300">
          <p className="text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl text-lg leading-relaxed">
            {t('projectsDesc')}
          </p>
          <ProjectGallery projects={projects} />
        </Section>


        <Section id="publikasi" title={t('publicationsTitle')} className="transition-colors duration-300">
          <p className="text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl text-lg leading-relaxed">
            {t('publicationsDesc')}
          </p>
          <PublicationList publications={publications} />
        </Section>
        <Section id="keterampilan" title={t('skillsTitle')} className="transition-colors duration-300">
          <SkillsCertifications certifications={certifications} skillCategories={skillCategories} />
        </Section>

        <Section id="connect" title={t('connectTitle')} className="transition-colors duration-300">
          <Connect />
        </Section>
              </React.Suspense>
      </main>

      <footer className="py-12 border-t border-black/[0.04] dark:border-white/5 mt-10 transition-colors duration-300">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-sm text-zinc-500 dark:text-zinc-400 flex flex-col items-center justify-center">
          {socialLinks && socialLinks.length > 0 && (
            <div className="flex gap-4 mb-6">
              {socialLinks.map((link) => {
                const Icon = getIcon(link.icon);
                return (
                  <a
                    key={link.id}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    className="p-2 bg-zinc-100 dark:bg-zinc-900 rounded-full hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-colors text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:h[...]"
                    aria-label={link.name}
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          )}
          <p className="flex items-center gap-1.5 font-medium">
            {t('madeWith')} <Heart className="w-4 h-4 text-red-500 fill-current" /> {t('by')} Umar Sodiq
          </p>
          <p className="mt-3">© {new Date().getFullYear()} {t('copyright')}</p>
        </div>
      </footer>
      <BackToTop />
    </div>
  );
}
