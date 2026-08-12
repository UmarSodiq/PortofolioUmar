import { Mail, Linkedin, MapPin, ChevronDown, Download } from 'lucide-react';
import { motion, useScroll, useTransform } from 'motion/react';
import { useEffect, useState, useRef } from 'react';
import { Profile } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { MagneticButton } from './MagneticButton';

export function Hero({ profile }: { profile?: Profile }) {
  const { t, language } = useLanguage();
  const [displayedName, setDisplayedName] = useState('');
  const fullName = "Umar Sodiq.";
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  });

  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  useEffect(() => {
    let i = 0;
    const typingInterval = setInterval(() => {
      if (i < fullName.length) {
        setDisplayedName(fullName.slice(0, i + 1));
        i++;
      } else {
        clearInterval(typingInterval);
      }
    }, 150);

    return () => clearInterval(typingInterval);
  }, []);

  return (
    <section ref={ref} id="beranda" className="min-h-screen flex flex-col justify-center relative pt-20 bg-[#FAFAFA] dark:bg-zinc-950 transition-colors duration-300 overflow-hidden">
      {/* Animated Gradient Background */}
      <motion.div style={{ y: backgroundY }} className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.4, 0.6, 0.4],
            x: [0, 100, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] max-w-[600px] max-h-[600px] bg-blue-200/40 dark:bg-blue-600/20 rounded-full blur-[100px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.3, 0.5, 0.3],
            x: [0, -100, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-[20%] right-[-10%] w-[60vw] h-[60vw] max-w-[700px] max-h-[700px] bg-emerald-200/40 dark:bg-emerald-600/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0.6, 0.3],
            x: [0, 50, 0],
            y: [0, 100, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute bottom-[-20%] left-[20%] w-[70vw] h-[70vw] max-w-[800px] max-h-[800px] bg-purple-200/30 dark:bg-purple-600/20 rounded-full blur-[120px]"
        />
      </motion.div>
      
      <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        <motion.div
          style={{ y: contentY, opacity }}
          className="max-w-3xl"
        >
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-sm font-medium text-zinc-600 dark:text-zinc-300 mb-8 shadow-sm transition-colors">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500"></span>
            </span>
            {t('availableForInternship')}
          </div>
          
          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-semibold tracking-tighter text-zinc-900 dark:text-white mb-6 leading-[1.05] flex items-center flex-wrap min-h-[1.2em]">
            <span>{displayedName}</span>
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ repeat: Infinity, duration: 0.8, ease: "steps(2)" }}
              className="inline-block w-[0.08em] h-[0.9em] bg-zinc-900 dark:bg-white ml-2"
            />
          </h1>
          <h2 className="text-lg sm:text-xl md:text-2xl text-zinc-600 dark:text-zinc-400 mb-10 font-medium max-w-2xl leading-relaxed">
            {t('jobTitle')}
          </h2>
          
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 sm:gap-5 mb-10 text-zinc-600 dark:text-zinc-400">
            <a href="mailto:umarsodiq.work@gmail.com" className="flex items-center gap-3 hover:text-zinc-900 dark:hover:text-white transition-colors group">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 flex items-center justify-center group-hover:border-zinc-300 dark:group-hover:border-white/20 group-hover:shadow-sm transition-all shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <span className="font-medium truncate">umarsodiq.work@gmail.com</span>
            </a>
            <a href="https://www.linkedin.com/in/umarsodiq" target="_blank" rel="noreferrer" className="flex items-center gap-3 hover:text-zinc-900 dark:hover:text-white transition-colors group">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 flex items-center justify-center group-hover:border-zinc-300 dark:group-hover:border-white/20 group-hover:shadow-sm transition-all shrink-0">
                <Linkedin className="w-4 h-4" />
              </div>
              <span className="font-medium">LinkedIn</span>
            </a>
            <div className="group relative flex items-center gap-3 cursor-default">
              <div className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 flex items-center justify-center group-hover:border-zinc-300 dark:group-hover:border-white/20 group-hover:shadow-sm transition-all relative overflow-hidden shrink-0">
                <MapPin className="w-4 h-4 text-zinc-700 dark:text-zinc-300 relative z-10 group-hover:scale-110 transition-transform" />
                <div className="absolute inset-0 bg-emerald-50 dark:bg-emerald-500/20 opacity-0 group-hover:opacity-100 transition-opacity" />
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
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.8)] border border-white dark:border-zinc-900"></span>
                      </span>
                    </div>
                 </div>
                 <p className="text-[10px] uppercase tracking-wider text-center text-zinc-500 dark:text-zinc-400 font-bold">Base of Operations</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row flex-wrap gap-4 w-full">
            <MagneticButton as="a" href="#pengalaman" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-base font-medium text-white dark:text-zinc-900 bg-zinc-900 dark:bg-white hover:bg-zinc-800 dark:hover:bg-zinc-200 shadow-[0_4px_14px_0_rgb(0,0,0,0.1)] hover:shadow-[0_6px_20px_rgba(0,0,0,0.15)] transition-all w-full sm:w-auto">
              {t('viewExperience')}
            </MagneticButton>
            <MagneticButton as="a" href="#proyek" className="inline-flex items-center justify-center px-8 py-3.5 rounded-full text-base font-medium text-zinc-900 dark:text-white bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 hover:bg-zinc-50 dark:hover:bg-zinc-800 shadow-sm transition-all w-full sm:w-auto">
              {t('viewProjects')}
            </MagneticButton>
            <MagneticButton as="a" href="/assets/CV_Umar_Sodiq.pdf" target="_blank" download="CV_Umar_Sodiq.pdf" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-base font-medium text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/10 border border-emerald-200 dark:border-emerald-500/20 hover:bg-emerald-100 dark:hover:bg-emerald-500/20 shadow-sm transition-all w-full sm:w-auto">
              <Download className="w-5 h-5" />
              {t('downloadCV')}
            </MagneticButton>
          </div>
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1, repeat: Infinity, repeatType: "reverse" }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-zinc-400 dark:text-zinc-500"
      >
        <ChevronDown className="w-6 h-6" />
      </motion.div>
    </section>
  );
}
