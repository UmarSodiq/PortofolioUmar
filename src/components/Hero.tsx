import { Mail, Linkedin, MapPin, Download, ArrowDownRight, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useRef } from 'react';
import { Profile } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { MagneticButton } from './MagneticButton';
import { RevealText } from './RevealText';
import { HeroName } from './HeroName';
import { EASE_OUT_EXPO, INTRO_DELAY } from '../lib/smoothScroll';
import HeroContourWaves from './HeroContourWaves';
import { HeroTopology3D } from './HeroTopology3D';

const D = INTRO_DELAY;

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 30, filter: 'blur(8px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)' },
  transition: { duration: 0.9, delay, ease: EASE_OUT_EXPO },
});

export function Hero({ profile }: { profile?: Profile }) {
  const { t } = useLanguage();
  const ref = useRef<HTMLElement>(null);

  // --- Scroll-linked parallax ---
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] });
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.92]);
  const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const badgeRotate = useTransform(scrollYProgress, [0, 1], [0, 180]);

  // Note: the contour-wave canvas is the hero's single cursor-reactive layer.
  // Extra mouse spotlights / blob parallax were removed to reduce visual noise and GPU load.

  const contactItem = 'flex items-center gap-3 hover:text-zinc-900 dark:hover:text-white transition-colors group';
  const iconBox =
    'w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 flex items-center justify-center group-hover:border-zinc-300 dark:group-hover:border-white/20 group-hover:shadow-sm group-hover:-translate-y-0.5 transition-all shrink-0';

  return (
    <section
      ref={ref}
      id="beranda"
      className="min-h-screen flex flex-col justify-center relative pt-24 sm:pt-28 bg-[#FAFAFA] dark:bg-zinc-950 transition-colors duration-300 overflow-hidden"
    >
      {/* Topographic / Fourier Waveform Contour Lines — the single cursor-reactive layer */}
      <HeroContourWaves progress={scrollYProgress} />

      {/* Static brand-tinted glows (scroll parallax only — no infinite blur animation) */}
      <motion.div style={{ y: backgroundY }} aria-hidden className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-15%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-rose-200/40 dark:bg-rose-600/15 rounded-full blur-[100px]" />
        <div className="absolute top-[25%] right-[-12%] w-[55vw] h-[55vw] max-w-[680px] max-h-[680px] bg-amber-100/50 dark:bg-red-700/15 rounded-full blur-[110px]" />
      </motion.div>
 
      {/* 3D Mathematical Topology & Neural Manifold (Three.js) */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.3, delay: D + 0.35, ease: EASE_OUT_EXPO }}
        className="absolute right-[-15%] sm:right-[-4%] lg:right-[1%] xl:right-[4%] 2xl:right-[8%] top-[10%] sm:top-[12%] lg:top-[13%] w-[270px] h-[270px] sm:w-[350px] sm:h-[350px] lg:w-[420px] lg:h-[420px] z-[6] opacity-35 sm:opacity-50 lg:opacity-90 pointer-events-none lg:pointer-events-auto flex flex-col items-center justify-center"
      >
        <div className="w-full h-full relative">
          <HeroTopology3D progress={scrollYProgress} />
        </div>
        {/* Subtle mathematical topology indicator on desktop */}
        <div className="hidden lg:flex items-center gap-2 mt-[-18px] px-3 py-1 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border border-zinc-200/80 dark:border-white/10 text-[10.5px] font-mono text-zinc-500 dark:text-zinc-400 select-none shadow-sm pointer-events-none">
          <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" />
          <span>Torus Manifold • Drag to rotate</span>
        </div>
      </motion.div>

      {/* Rotating circular badge with magnetic cursor physics (desktop) */}
      <div className="hidden lg:flex absolute right-[8%] bottom-[14%] z-20 items-center justify-center">
        <MagneticButton>
          <motion.a
            href="#proyek"
            aria-label={t('viewProjects')}
            initial={{ opacity: 0, scale: 0.5, rotate: -90 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 1.2, delay: D + 1.1, ease: EASE_OUT_EXPO }}
            className="w-36 h-36 flex items-center justify-center group relative cursor-pointer"
          >
            <motion.div style={{ rotate: badgeRotate }} className="absolute inset-0">
              <motion.svg
                viewBox="0 0 100 100"
                className="w-full h-full text-zinc-500 dark:text-zinc-400 group-hover:text-zinc-900 dark:group-hover:text-white transition-colors duration-500"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              >
                <defs>
                  <path id="hero-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
                </defs>
                <text className="fill-current text-[9.5px] uppercase tracking-[0.32em] font-medium">
                  <textPath href="#hero-circle">Data • Statistics • AI • Analysis •</textPath>
                </text>
              </motion.svg>
            </motion.div>
            <span className="relative w-14 h-14 rounded-full bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 flex items-center justify-center group-hover:scale-110 group-hover:bg-red-500 dark:group-hover:bg-red-500 group-hover:text-white transition-all duration-500 shadow-md">
              <ArrowDownRight className="w-6 h-6 group-hover:rotate-[-45deg] transition-transform duration-500" />
            </span>
          </motion.a>
        </MagneticButton>
      </div>

      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <motion.div style={{ y: contentY, opacity, scale: contentScale }} className="max-w-3xl origin-top-left">
          {/* Availability badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.6, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            whileHover={{ scale: 1.025, y: -2 }}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: D }}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 dark:bg-zinc-900/80 backdrop-blur border border-zinc-200 dark:border-white/10 text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-8 shadow-sm transition-colors cursor-default"
          >
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
            </span>
            {t('availableForInternship')}
          </motion.div>

          {/* Name — masked intro, idle wave, springy per-letter hover */}
          <h1 className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-display font-semibold tracking-tighter text-zinc-900 dark:text-white mb-6 leading-[0.95]">
            <HeroName text="Umar Sodiq" delay={D + 0.1} />
          </h1>

          {/* Animated underline with a repeating light sweep */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.2, delay: D + 0.6, ease: EASE_OUT_EXPO }}
            className="relative h-[2px] w-40 rounded-full bg-gradient-to-r from-red-500/70 to-transparent origin-left mb-8 overflow-hidden"
          >
            <motion.span
              className="absolute inset-y-0 w-12 bg-gradient-to-r from-transparent via-rose-300 to-transparent"
              initial={{ x: '-100%' }}
              animate={{ x: '400%' }}
              transition={{ duration: 1.6, ease: 'easeInOut', delay: D + 1.8, repeat: Infinity, repeatDelay: 2.5 }}
            />
          </motion.div>

          <h2 className="text-lg sm:text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-10 font-medium max-w-2xl leading-relaxed">
            <RevealText text={t('jobTitle')} by="word" immediate delay={D + 0.5} stagger={0.03} duration={0.8} />
          </h2>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5 mb-10 text-zinc-600 dark:text-zinc-400">
            <motion.a {...fadeUp(D + 0.8)} href="mailto:umarsodiq.work@gmail.com" className={contactItem}>
              <div className={iconBox}>
                <Mail className="w-4 h-4" />
              </div>
              <span className="font-medium truncate">umarsodiq.work@gmail.com</span>
            </motion.a>
            <motion.a {...fadeUp(D + 0.88)} href="https://www.linkedin.com/in/umarsodiq" target="_blank" rel="noreferrer" className={contactItem}>
              <div className={iconBox}>
                <Linkedin className="w-4 h-4" />
              </div>
              <span className="font-medium">LinkedIn</span>
            </motion.a>
            <motion.div {...fadeUp(D + 0.96)} className="group relative flex items-center gap-3 cursor-default">
              <div className={`${iconBox} relative overflow-hidden`}>
                <MapPin className="w-4 h-4 text-zinc-700 dark:text-zinc-300 relative z-10 group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-red-50 dark:bg-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
              <span className="font-medium group-hover:text-zinc-900 dark:group-hover:text-white transition-colors">{t('location')}</span>

              {/* Map Visualization Tooltip */}
              <div className="absolute top-full left-0 sm:left-auto mt-3 p-3 bg-white dark:bg-zinc-900 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-black/5 dark:border-white/10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 -translate-y-2 group-hover:translate-y-0 z-50 w-48 pointer-events-none">
                <div className="w-full h-24 bg-zinc-50 dark:bg-zinc-800 rounded-xl border border-zinc-100 dark:border-white/5 overflow-hidden relative mb-2 flex items-center justify-center">
                  {/* Abstract dots pattern representing a map */}
                  <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle, #d4d4d8 1px, transparent 1px)', backgroundSize: '8px 8px', backgroundPosition: 'center' }}></div>
                  {/* Glowing pin */}
                  <div className="relative z-10 flex flex-col items-center">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)] border border-white dark:border-zinc-900"></span>
                    </span>
                  </div>
                </div>
                <p className="text-[10px] uppercase tracking-wider text-center text-zinc-500 dark:text-zinc-400 font-bold">Base of Operations</p>
              </div>
            </motion.div>
          </div>

          {/* CTA hierarchy: one primary, one secondary, one tertiary text link */}
          <div className="flex flex-col sm:flex-row sm:items-center flex-wrap gap-4 sm:gap-6 w-full">
            <motion.div {...fadeUp(D + 1.05)} className="w-full sm:w-auto">
              <MagneticButton as="a" href="#proyek" className="group relative overflow-hidden inline-flex items-center justify-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-white dark:text-zinc-900 dark:hover:text-white bg-zinc-900 dark:bg-white shadow-[0_8px_24px_-6px_rgba(0,0,0,0.25)] hover:shadow-[0_12px_32px_-6px_rgba(239,68,68,0.45)] transition-[color,box-shadow] duration-300 w-full sm:w-auto">
                <span className="absolute inset-0 bg-red-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full" />
                <span className="relative">{t('viewProjects')}</span>
                <ArrowRight className="relative w-4 h-4 group-hover:translate-x-1 transition-transform duration-300 group-hover:text-white" />
              </MagneticButton>
            </motion.div>
            <motion.div {...fadeUp(D + 1.12)} className="w-full sm:w-auto">
              <MagneticButton as="a" href="#pengalaman" className="inline-flex items-center justify-center px-7 py-4 rounded-full text-base font-medium text-zinc-900 dark:text-white bg-white/70 dark:bg-zinc-900/70 backdrop-blur border border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/25 transition-colors w-full sm:w-auto">
                {t('viewExperience')}
              </MagneticButton>
            </motion.div>
            <motion.a
              {...fadeUp(D + 1.19)}
              href="/CV_Umar_Sodiq.pdf"
              download="CV_Umar_Sodiq.pdf"
              className="group inline-flex items-center justify-center sm:justify-start gap-2 py-2 text-sm font-semibold text-red-600 dark:text-red-400"
            >
              <Download className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
              <span className="relative">
                {t('downloadCV')}
                <span className="absolute left-0 -bottom-0.5 h-px w-full bg-current origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
              </span>
            </motion.a>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#pendidikan"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: D + 1.4, duration: 0.8, ease: EASE_OUT_EXPO }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
        aria-label="Scroll down"
      >
        <span className="w-6 h-10 rounded-full border-2 border-current flex justify-center pt-2">
          <motion.span
            animate={{ y: [0, 12, 0], opacity: [1, 0, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 rounded-full bg-current"
          />
        </span>
        <span className="text-[10px] uppercase tracking-[0.3em] font-medium">Scroll</span>
      </motion.a>
    </section>
  );
}
