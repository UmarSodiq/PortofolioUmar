import { Mail, Linkedin, MapPin, Download, ArrowDownRight } from 'lucide-react';
import { motion, useScroll, useTransform, useMotionValue, useSpring, useMotionTemplate } from 'motion/react';
import { useRef, useEffect } from 'react';
import { Profile } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { MagneticButton } from './MagneticButton';
import { RevealText } from './RevealText';
import { HeroName } from './HeroName';
import { EASE_OUT_EXPO, INTRO_DELAY } from '../lib/smoothScroll';

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

  // --- Mouse-reactive spotlight & blob parallax ---
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const smx = useSpring(mx, { stiffness: 60, damping: 20 });
  const smy = useSpring(my, { stiffness: 60, damping: 20 });
  const blobX1 = useTransform(smx, [0, 1], [-40, 40]);
  const blobY1 = useTransform(smy, [0, 1], [-30, 30]);
  const blobX2 = useTransform(smx, [0, 1], [50, -50]);
  const blobY2 = useTransform(smy, [0, 1], [40, -40]);
  const spotX = useTransform(smx, (v) => `${v * 100}%`);
  const spotY = useTransform(smy, (v) => `${v * 100}%`);
  const spotlight = useMotionTemplate`radial-gradient(600px circle at ${spotX} ${spotY}, rgba(239,68,68,0.10), transparent 60%)`;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    };
    el.addEventListener('mousemove', onMove);
    return () => el.removeEventListener('mousemove', onMove);
  }, [mx, my]);

  const contactItem = 'flex items-center gap-3 hover:text-zinc-900 dark:hover:text-white transition-colors group';
  const iconBox =
    'w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 flex items-center justify-center group-hover:border-zinc-300 dark:group-hover:border-white/20 group-hover:shadow-sm group-hover:-translate-y-0.5 transition-all shrink-0';

  return (
    <section
      ref={ref}
      id="beranda"
      className="min-h-screen flex flex-col justify-center relative pt-24 sm:pt-28 bg-[#FAFAFA] dark:bg-zinc-950 transition-colors duration-300 overflow-hidden"
    >
      {/* Grid pattern that fades out toward the edges */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5, delay: D }}
        className="absolute inset-0 pointer-events-none text-zinc-900/[0.05] dark:text-white/[0.05] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]"
        style={{
          backgroundImage:
            'linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />

      {/* Mouse-following spotlight */}
      <motion.div aria-hidden className="absolute inset-0 pointer-events-none" style={{ background: spotlight }} />

      {/* Animated gradient blobs (scroll + mouse parallax) */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div style={{ x: blobX1, y: blobY1 }} className="absolute top-[-10%] left-[-10%]">
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-blue-200/40 dark:bg-blue-600/20 rounded-full blur-[100px]"
          />
        </motion.div>
        <motion.div style={{ x: blobX2, y: blobY2 }} className="absolute top-[20%] right-[-10%]">
          <motion.div
            animate={{ scale: [1, 1.3, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 20, repeat: Infinity, ease: 'easeInOut' }}
            className="w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-red-200/40 dark:bg-rose-600/20 rounded-full blur-[120px]"
          />
        </motion.div>
        <motion.div
          animate={{ scale: [1, 1.4, 1], opacity: [0.3, 0.6, 0.3], x: [0, 50, 0], y: [0, 100, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-purple-200/30 dark:bg-purple-600/20 rounded-full blur-[120px]"
        />
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

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full">
            <motion.div {...fadeUp(D + 1.05)} className="w-full sm:w-auto">
              <MagneticButton as="a" href="#pengalaman" className="group relative overflow-hidden inline-flex items-center justify-center px-8 py-3.5 rounded-full text-base font-medium text-white dark:text-zinc-900 bg-zinc-900 dark:bg-white shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all w-full sm:w-auto">
                <span className="absolute inset-0 bg-red-500 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] rounded-full" />
                <span className="relative">{t('viewExperience')}</span>
              </MagneticButton>
            </motion.div>
            <motion.div {...fadeUp(D + 1.12)} className="w-full sm:w-auto">
              <MagneticButton as="a" href="#proyek" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-base font-medium text-zinc-900 dark:text-white bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-sm transition-all w-full sm:w-auto">
                {t('viewProjects')}
              </MagneticButton>
            </motion.div>
            <motion.div {...fadeUp(D + 1.19)} className="w-full sm:w-auto">
              <MagneticButton as="a" href="/assets/CV_Umar_Sodiq.pdf" target="_blank" download="CV_Umar_Sodiq.pdf" className="group inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-medium text-red-700 dark:text-red-400 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 hover:bg-red-100 dark:hover:bg-red-500/20 shadow-sm transition-all w-full sm:w-auto">
                <Download className="w-5 h-5 group-hover:translate-y-0.5 transition-transform" />
                {t('downloadCV')}
              </MagneticButton>
            </motion.div>
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
