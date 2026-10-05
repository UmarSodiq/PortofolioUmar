import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'motion/react';
import { Moon, Sun, ArrowUpRight, Globe, Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { MagneticButton } from './MagneticButton';
import { EASE_OUT_EXPO } from '../lib/smoothScroll';

/**
 * Dynamic Island Floating Capsule Navbar (Raycast / Apple Style):
 * - Floating glassmorphic pill centered at the top with genuine specular depth.
 * - Interactive spring-sliding active pill layout indicator (layoutId).
 * - Tactile micro-monogram badge with crimson pulse.
 * - Integrated theme & language controls within an aerodynamic capsule.
 * - Dynamic Island expansion on mobile.
 */
export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('beranda');
  const [hovered, setHovered] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const { language, toggleLanguage, t } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { scrollY } = useScroll();

  const links = useMemo(() => [
    { name: t('navHome'), href: '#beranda', id: 'beranda' },
    { name: t('navEducation'), href: '#pendidikan', id: 'pendidikan' },
    { name: t('navExperience'), href: '#pengalaman', id: 'pengalaman' },
    { name: t('navProjects'), href: '#proyek', id: 'proyek' },
    { name: t('navPublications'), href: '#publikasi', id: 'publikasi' },
    { name: t('navSkills'), href: '#keterampilan', id: 'keterampilan' },
  ], [t]);

  // Keep navbar always visible; only update compact glass style on scroll
  useMotionValueEvent(scrollY, 'change', (latest) => {
    setScrolled(latest > 30);
  });

  // Track active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sectionElements = links.map((l) => document.getElementById(l.id));
      const scrollPosition = window.scrollY + 250;

      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= scrollPosition) {
          setActiveSection(links[i].id);
          return;
        }
      }
      if (window.scrollY < 300) {
        setActiveSection('beranda');
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [links]);

  const ctaLabel = language === 'id' ? 'Hubungi' : 'Contact';

  return (
    <>
      {/* Outer Centered Floating Anchor - Always Visible */}
      <motion.div
        initial={{ y: -60, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        className="fixed top-4 sm:top-6 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
      >
        {/* Dynamic Island Capsule Container */}
        <motion.nav
          layout
          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
          className={`pointer-events-auto relative flex items-center gap-1 sm:gap-2 p-1.5 sm:p-2 rounded-full border backdrop-blur-2xl transition-[background-color,border-color,box-shadow] duration-500 ${
            scrolled
              ? 'bg-white/85 dark:bg-zinc-900/85 border-black/10 dark:border-white/15 shadow-[0_20px_50px_-10px_rgba(0,0,0,0.15)] dark:shadow-[0_24px_60px_-12px_rgba(0,0,0,0.8),0_0_0_1px_rgba(255,255,255,0.08)]'
              : 'bg-white/70 dark:bg-zinc-900/70 border-white/60 dark:border-white/10 shadow-[0_12px_32px_-6px_rgba(0,0,0,0.08)] dark:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.6)]'
          }`}
        >
          {/* Top Edge Specular Highlight Sheen */}
          <div
            aria-hidden="true"
            className="absolute inset-x-6 top-0 h-px bg-gradient-to-r from-transparent via-white/80 dark:via-white/20 to-transparent pointer-events-none rounded-full"
          />

          {/* Left Brand: Clean wordmark "Umar." */}
          <a
            href="#beranda"
            className="group flex items-center pl-3 pr-2.5 py-1 rounded-full hover:bg-black/5 dark:hover:bg-white/5 transition-colors select-none"
            aria-label="Umar Sodiq - Home"
          >
            <span className="font-display font-bold text-sm sm:text-base tracking-tight text-zinc-900 dark:text-white transition-colors group-hover:text-red-600 dark:group-hover:text-red-400">
              Umar<span className="text-red-500">.</span>
            </span>
          </a>

          {/* Center Navigation: Segmented Sliding Spring Tabs */}
          <div
            className="hidden md:flex items-center relative"
            onMouseLeave={() => setHovered(null)}
          >
            {links.map((link) => {
              const isActive = activeSection === link.id;
              const isHovered = hovered === link.id;

              return (
                <a
                  key={link.id}
                  href={link.href}
                  onMouseEnter={() => setHovered(link.id)}
                  className={`relative px-3 py-1.5 text-xs font-semibold tracking-wide transition-colors duration-200 z-10 ${
                    isActive
                      ? 'text-white dark:text-zinc-900'
                      : isHovered
                      ? 'text-zinc-900 dark:text-white'
                      : 'text-zinc-500 dark:text-zinc-400'
                  }`}
                >
                  {/* Sliding Active Pill Background */}
                  {isActive && (
                    <motion.div
                      layoutId="islandActivePill"
                      className="absolute inset-0 rounded-full bg-zinc-900 dark:bg-white shadow-sm -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 32 }}
                    />
                  )}

                  {/* Hover Subtle Pill for inactive tabs */}
                  {!isActive && isHovered && (
                    <motion.div
                      layoutId="islandHoverPill"
                      className="absolute inset-0 rounded-full bg-black/5 dark:bg-white/10 -z-10"
                      transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    />
                  )}

                  <span>{link.name}</span>
                </a>
              );
            })}
          </div>

          {/* Integrated Vertical Micro-Divider */}
          <div className="h-4 w-px bg-zinc-200 dark:bg-white/10 mx-0.5 hidden sm:block" />

          {/* Right Action Tools: Language, Theme, Contact Pill */}
          <div className="flex items-center gap-1 sm:gap-1.5">
            {/* Language Switcher */}
            <MagneticButton>
              <button
                onClick={toggleLanguage}
                className="flex items-center gap-1 px-2 sm:px-2.5 py-1.5 rounded-full text-[11px] font-semibold text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                aria-label="Toggle language"
              >
                <Globe className="w-3.5 h-3.5 text-zinc-400" />
                <span>{language.toUpperCase()}</span>
              </button>
            </MagneticButton>

            {/* Theme Switcher */}
            <MagneticButton>
              <button
                onClick={toggleTheme}
                className="w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/10 transition-colors"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={theme}
                    initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                    animate={{ opacity: 1, rotate: 0, scale: 1 }}
                    exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                    transition={{ duration: 0.25, ease: EASE_OUT_EXPO }}
                  >
                    {theme === 'dark' ? (
                      <Sun className="w-3.5 h-3.5 text-amber-400" />
                    ) : (
                      <Moon className="w-3.5 h-3.5 text-zinc-700" />
                    )}
                  </motion.div>
                </AnimatePresence>
              </button>
            </MagneticButton>

            {/* Contact CTA Pill */}
            <MagneticButton>
              <a
                href="#contact"
                className="hidden sm:inline-flex items-center gap-1 pl-3 pr-2.5 py-1.5 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-sm shadow-red-500/25 transition-all duration-300 hover:shadow-red-500/40 hover:scale-[1.02]"
              >
                <span>{ctaLabel}</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </a>
            </MagneticButton>

            {/* Mobile Island Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden w-8 h-8 rounded-full flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none"
              aria-label={isOpen ? 'Tutup menu' : 'Buka menu'}
            >
              {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>
        </motion.nav>
      </motion.div>

      {/* Mobile Dynamic Island Expanded Sheet */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            className="fixed inset-x-4 top-20 z-50 md:hidden bg-white/95 dark:bg-zinc-900/95 backdrop-blur-2xl rounded-3xl border border-black/10 dark:border-white/15 shadow-[0_24px_50px_rgba(0,0,0,0.2)] p-6"
          >
            <nav className="flex flex-col space-y-2 mb-5">
              {links.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`flex items-center justify-between px-4 py-3 rounded-2xl text-sm font-semibold transition-colors ${
                    activeSection === link.id
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900'
                      : 'text-zinc-600 dark:text-zinc-400 hover:bg-black/5 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{link.name}</span>
                  {activeSection === link.id && (
                    <span className="w-1.5 h-1.5 rounded-full bg-red-500" />
                  )}
                </a>
              ))}
            </nav>

            <a
              href="#contact"
              onClick={() => setIsOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 py-3 rounded-2xl bg-red-600 text-white text-xs font-semibold shadow-md shadow-red-500/25 transition-colors"
            >
              <span>{ctaLabel}</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
