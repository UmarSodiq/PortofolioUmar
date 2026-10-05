import React from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, useScroll, useSpring } from 'motion/react';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Section } from '../components/Section';
const EducationCard = React.lazy(() => import('../components/EducationCard').then(module => ({ default: module.EducationCard })));
const ExperienceList = React.lazy(() => import('../components/ExperienceList').then(module => ({ default: module.ExperienceList })));
const ProjectGallery = React.lazy(() => import('../components/ProjectGallery').then(module => ({ default: module.ProjectGallery })));
const PublicationList = React.lazy(() => import('../components/PublicationList').then(module => ({ default: module.PublicationList })));
const SkillsCertifications = React.lazy(() => import('../components/SkillsCertifications').then(module => ({ default: module.SkillsCertifications })));
import { useLanguage } from '../context/LanguageContext';
import { SmoothScroll } from '../components/SmoothScroll';
import { Footer } from '../components/Footer';
import { BackToTop } from '../components/BackToTop';
import { PageLoader } from '../components/PageLoader';
import { DynamicBackground } from '../components/DynamicBackground';
import { useFirebaseData } from '../hooks/useFirebaseData';
import { SkeletonLoader } from '../components/SkeletonLoader';

export default function Home() {
  const { t, language } = useLanguage();
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const { projects, workExperiences, orgExperiences, education, certifications, skillCategories, socialLinks, profile, publications } = useFirebaseData();

  return (
    <div className="min-h-screen font-sans text-zinc-900 dark:text-zinc-50 transition-colors duration-300 overflow-x-hidden">
      <SmoothScroll />
      <PageLoader />
      <DynamicBackground />
      <Helmet>
        <title>{t('seoTitle')}</title>
        <meta name="description" content={t('seoDescription')} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={window.location.href} />
        <meta property="og:title" content={t('seoTitle')} />
        <meta property="og:description" content={t('seoDescription')} />
        <meta property="og:image" content="https://portofolio.umarsodiq.workers.dev/og-image.jpg" />
        <meta property="og:site_name" content="Umar Sodiq Portfolio" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:url" content={window.location.href} />
        <meta name="twitter:title" content={t('seoTitle')} />
        <meta name="twitter:description" content={t('seoDescription')} />
        <meta name="twitter:image" content="https://portofolio.umarsodiq.workers.dev/og-image.jpg" />
        <html lang={language} />
      </Helmet>
      
      <motion.div
        className="fixed top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-red-500 via-rose-500 to-red-600 origin-left z-[60]"
        style={{ scaleX }}
      />
      <Navbar />
      
      <main>
        <div id="beranda">
          <Hero profile={profile} />
        </div>
        
        <React.Suspense fallback={<SkeletonLoader />}>

        <Section id="pendidikan" title={t('educationTitle')} className="transition-colors duration-300">
          <EducationCard data={education} />
        </Section>

        <Section id="pengalaman" title={t('experienceTitle')} className="transition-colors duration-300">
          <div className="bg-white dark:bg-zinc-900 p-6 sm:p-10 rounded-[2.5rem] border border-black/[0.04] dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none transition-colors duration-300 relative overflow-hidden">
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
        </React.Suspense>
      </main>

      <Footer socialLinks={socialLinks} />
      <BackToTop />
    </div>
  );
}
