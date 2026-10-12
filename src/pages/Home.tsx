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
import { CustomCursor } from '../components/CustomCursor';

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
      <CustomCursor />
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
        <Hero profile={profile} />
        
        <React.Suspense fallback={<SkeletonLoader />}>

        <Section 
          id="pendidikan" 
          title={t('educationTitle')} 
          containerClassName="max-w-5xl" 
          className="transition-colors duration-300"
        >
          <EducationCard data={education} />
        </Section>

        {/* Split & Sticky Layout for Experience */}
        <Section 
          id="pengalaman" 
          title={t('experienceTitle')} 
          containerClassName="max-w-6xl" 
          className="transition-colors duration-300"
        >
          <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
            {/* Sticky Sidebar Info (Left Column) */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 space-y-6">
              <div className="p-6 sm:p-8 rounded-[2rem] bg-white/70 dark:bg-zinc-900/60 backdrop-blur-xl border border-black/[0.04] dark:border-white/10 shadow-[0_8px_30px_rgb(0,0,0,0.03)] dark:shadow-none">
                <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 text-red-600 dark:text-red-400 text-xs font-semibold mb-4 border border-red-500/20">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
                  {language === 'id' ? 'Karier & Kepemimpinan' : 'Career & Leadership'}
                </span>
                <h3 className="text-xl font-bold font-display text-zinc-900 dark:text-white mb-3">
                  {language === 'id' ? 'Rekam Jejak Profesional' : 'Professional Track Record'}
                </h3>
                <p className="text-zinc-600 dark:text-zinc-400 text-sm leading-relaxed mb-6">
                  {language === 'id'
                    ? 'Pengalaman pemagangan industri di BUMN dan instansi pemerintah, dipadukan dengan kepemimpinan aktif dalam organisasi kemahasiswaan statistika.'
                    : 'Industrial internship experience across state-owned enterprises and government agencies, combined with active leadership in student organizations.'}
                </p>

                <div className="space-y-3 pt-4 border-t border-black/[0.04] dark:border-white/5">
                  <div className="flex items-center gap-3 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    <span className="w-6 h-6 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center font-bold">1</span>
                    <span>{language === 'id' ? 'PERUM PERURI (BUMN)' : 'PERUM PERURI (SOE)'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    <span className="w-6 h-6 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center font-bold">2</span>
                    <span>{language === 'id' ? 'KPPN A1 Magelang' : 'KPPN A1 Magelang'}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-medium text-zinc-700 dark:text-zinc-300">
                    <span className="w-6 h-6 rounded-lg bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 flex items-center justify-center font-bold">3</span>
                    <span>{language === 'id' ? 'Himpunan & Divisi Riset' : 'Student Association & Research'}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Timeline Cards */}
            <div className="lg:col-span-8 bg-white dark:bg-zinc-900 p-6 sm:p-10 rounded-[2.5rem] border border-black/[0.04] dark:border-white/5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-none transition-colors duration-300 relative overflow-hidden">
              <ExperienceList title={t('workExperience')} experiences={workExperiences} />
              <div className="h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent w-full my-12" />
              <ExperienceList title={t('orgExperience')} experiences={orgExperiences} />
            </div>
          </div>
        </Section>

        {/* Owns its own full-bleed cinematic <section id="proyek"> — GSAP pinning */}
        <ProjectGallery projects={projects} title={t('projectsTitle')} description={t('projectsDesc')} />

        <Section 
          id="publikasi" 
          title={t('publicationsTitle')} 
          containerClassName="max-w-6xl" 
          className="transition-colors duration-300"
        >
          <p className="text-zinc-600 dark:text-zinc-400 mb-12 max-w-2xl text-lg leading-relaxed">
            {t('publicationsDesc')}
          </p>
          <PublicationList publications={publications} />
        </Section>

        <Section 
          id="keterampilan" 
          title={t('skillsTitle')} 
          containerClassName="max-w-6xl" 
          className="transition-colors duration-300"
        >
          <SkillsCertifications certifications={certifications} skillCategories={skillCategories} />
        </Section>
        </React.Suspense>
      </main>

      <Footer socialLinks={socialLinks} />
      <BackToTop />
    </div>
  );
}
