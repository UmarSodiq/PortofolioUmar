import { useRef, type ReactNode } from 'react';
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useMotionValue,
  useVelocity,
  useAnimationFrame
} from 'motion/react';
import { Github, Linkedin, Mail, Instagram, Globe, Heart, ArrowUp, LucideIcon } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { EASE_OUT_EXPO, scrollToTarget } from '../lib/smoothScroll';
import { SocialLink } from '../types';

const getIcon = (iconName: string): LucideIcon => {
  switch (iconName.toLowerCase()) {
    case 'github': return Github;
    case 'linkedin': return Linkedin;
    case 'mail': return Mail;
    case 'instagram': return Instagram;
    default: return Globe;
  }
};

function wrap(min: number, max: number, v: number) {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
}

function VelocityMarquee({
  children,
  baseVelocity = -0.8
}: {
  children: ReactNode;
  baseVelocity?: number;
}) {
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 50,
    stiffness: 350,
  });
  const velocityFactor = useTransform(smoothVelocity, [0, 1000], [0, 5], {
    clamp: false,
  });

  // Seamless wrap across 4 repeating items (each is 25% of total width)
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_t, delta) => {
    let moveBy = baseVelocity * (delta / 1000) * 15;
    const vf = velocityFactor.get();
    if (vf !== 0) {
      moveBy += baseVelocity * Math.abs(vf) * (delta / 1000) * 18;
    }
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className="overflow-hidden flex flex-nowrap whitespace-nowrap select-none">
      <motion.div
        className="flex shrink-0 flex-nowrap items-center whitespace-nowrap will-change-transform"
        style={{ x }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center">{children}</div>
      </motion.div>
    </div>
  );
}

/**
 * Harmonized Theme Footer with Velocity-Responsive "UMAR SODIQ" Marquee:
 * - Color palette perfectly synchronized with the site (Zinc & Red accents).
 * - Reacts dynamically to scroll velocity with silky spring physics.
 * - Clean top row with subtitle, social icons, and Back to Top.
 * - Clean copyright row.
 */
export function Footer({ socialLinks }: { socialLinks?: SocialLink[] }) {
  const { t, language } = useLanguage();
  const year = new Date().getFullYear();

  const marqueeItem = (
    <span className="inline-flex items-center">
      <span className="font-display font-extrabold text-[14vw] sm:text-[12vw] md:text-[10vw] uppercase tracking-tighter text-zinc-900 dark:text-white select-none whitespace-nowrap px-4 sm:px-6">
        UMAR SODIQ
      </span>
      <span className="mx-4 sm:mx-8 text-red-500 text-[6vw] font-bold select-none">•</span>
    </span>
  );

  return (
    <footer id="contact" className="relative mt-12 overflow-hidden transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Subtle top divider line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: EASE_OUT_EXPO }}
          className="h-px w-full bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent origin-center"
        />

        {/* Top Info & Actions */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-10">
          <p className="text-sm text-zinc-500 dark:text-zinc-400 text-center md:text-left max-w-xs font-medium">
            {language === 'id'
              ? 'Mengubah data menjadi wawasan yang berarti.'
              : 'Turning data into meaningful insight.'}
          </p>

          {/* Social Icons */}
          {socialLinks && socialLinks.length > 0 && (
            <ul className="flex gap-3">
              {socialLinks.map((link) => {
                const Icon = getIcon(link.icon);
                return (
                  <li key={link.id}>
                    <a
                      href={link.url}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={link.name}
                      className="group relative flex w-10 h-10 rounded-full overflow-hidden border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400 hover:border-red-500/50 hover:text-red-500 dark:hover:text-red-400 transition-all duration-300 items-center justify-center bg-white dark:bg-zinc-900 shadow-sm"
                    >
                      <Icon className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" />
                    </a>
                  </li>
                );
              })}
            </ul>
          )}

          {/* Back to top button */}
          <button
            onClick={() => scrollToTarget(0)}
            className="group inline-flex items-center gap-2 text-sm font-medium text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white transition-colors"
          >
            <span>{language === 'id' ? 'Kembali ke atas' : 'Back to top'}</span>
            <span className="w-8 h-8 rounded-full border border-zinc-200 dark:border-white/10 flex items-center justify-center group-hover:border-zinc-400 dark:group-hover:border-white/30 group-hover:-translate-y-0.5 transition-all">
              <ArrowUp className="w-4 h-4" />
            </span>
          </button>
        </div>
      </div>

      {/* GIANT RUNNING MARQUEE "UMAR SODIQ" with Velocity-Responsive Physics */}
      <div className="w-full py-4 my-2 overflow-hidden border-y border-zinc-100 dark:border-white/5 bg-zinc-50/50 dark:bg-zinc-900/30">
        <VelocityMarquee baseVelocity={-0.8}>
          {marqueeItem}
        </VelocityMarquee>
      </div>

      {/* Copyright Bar */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-zinc-400 dark:text-zinc-500">
        <p>© {year} {t('copyright')}</p>
        <p className="flex items-center gap-1.5 font-medium">
          {t('madeWith')}
          <Heart className="w-3.5 h-3.5 text-red-500 fill-current" />
          {t('by')} Umar Sodiq
        </p>
      </div>
    </footer>
  );
}
