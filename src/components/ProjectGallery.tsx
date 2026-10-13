import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ExternalLink, Github, Code, ArrowRight, Eye, MoveRight } from 'lucide-react';
import { motion } from 'motion/react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Project } from '../types';
import { useLanguage } from '../context/LanguageContext';
import { SpotlightCard } from './SpotlightCard';
import { MagneticButton } from './MagneticButton';
import { ProjectDetailModal } from './ProjectDetailModal';
import { RevealText } from './RevealText';
import { EASE_OUT_EXPO } from '../lib/smoothScroll';

gsap.registerPlugin(ScrollTrigger);

interface ProjectGalleryProps {
  projects: Project[];
  title: string;
  description: string;
}

/** Pinned horizontal scroll only on large screens with motion allowed. */
const PIN_QUERY = '(min-width: 1024px) and (prefers-reduced-motion: no-preference)';

function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setMatches(mql.matches);
    onChange();
    mql.addEventListener('change', onChange);
    return () => mql.removeEventListener('change', onChange);
  }, [query]);
  return matches;
}

let refreshTimer: ReturnType<typeof setTimeout> | undefined;
const queueRefresh = () => {
  clearTimeout(refreshTimer);
  refreshTimer = setTimeout(() => ScrollTrigger.refresh(), 150);
};

export function ProjectGallery({ projects, title, description }: ProjectGalleryProps) {
  const { t, language } = useLanguage();
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const pinned = useMediaQuery(PIN_QUERY);

  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);

  const total = projects.length;
  const pad = (n: number) => String(n).padStart(2, '0');

  // --- Horizontal pinned scroll (GSAP ScrollTrigger) ---
  useLayoutEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!pinned || !section || !track || total === 0) return;

    const ctx = gsap.context(() => {
      const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);

      const tween = gsap.to(track, {
        x: () => -distance(),
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top top',
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            if (progressRef.current) progressRef.current.style.transform = `scaleX(${self.progress})`;
            if (counterRef.current) {
              const idx = Math.min(total, Math.max(1, Math.round(self.progress * (total - 1)) + 1));
              counterRef.current.textContent = pad(idx);
            }
          },
        },
      });

      // Cards rise / scale into place as they slide in from the right.
      gsap.utils.toArray<HTMLElement>('[data-card-inner]').forEach((el) => {
        gsap.fromTo(
          el,
          { scale: 0.86, opacity: 0.35, rotate: 2 },
          {
            scale: 1,
            opacity: 1,
            rotate: 0,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              containerAnimation: tween,
              start: 'left 100%',
              end: 'left 55%',
              scrub: true,
            },
          },
        );
      });

      // Screenshot drifts against the scroll direction (depth parallax).
      gsap.utils.toArray<HTMLElement>('[data-parallax]').forEach((el) => {
        gsap.fromTo(
          el,
          { xPercent: 7 },
          {
            xPercent: -7,
            ease: 'none',
            scrollTrigger: {
              trigger: el,
              containerAnimation: tween,
              start: 'left right',
              end: 'right left',
              scrub: true,
            },
          },
        );
      });
    }, section);

    queueRefresh();
    return () => ctx.revert();
  }, [pinned, total]);

  if (total === 0) {
    return (
      <section id="proyek" className="py-24">
        <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Intro title={title} description={description} />
          <div className="text-zinc-500 dark:text-zinc-400 italic py-10 text-center border-2 border-dashed border-zinc-200 dark:border-white/10 rounded-[2rem] transition-colors">
            {t('noProjects')}
          </div>
        </div>
      </section>
    );
  }

  const scrollHint = language === 'id' ? 'Scroll untuk menjelajah' : 'Scroll to explore';
  const swipeHint = language === 'id' ? 'Geser untuk melihat' : 'Swipe to browse';
  const detailLabel = (name: string) => (language === 'id' ? `Lihat detail proyek ${name}` : `View details for ${name}`);
  const onCardKey = (e: KeyboardEvent, project: Project) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setSelectedProject(project);
    }
  };

  return (
    <>
      <section
        ref={sectionRef}
        id="proyek"
        className={
          pinned
            ? 'relative h-screen overflow-hidden flex items-center bg-[#09090b] text-white transition-colors duration-500 border-t border-b border-zinc-200/80 dark:border-white/[0.08] shadow-2xl'
            : 'relative py-28 sm:py-36 bg-[#09090b] text-white transition-colors duration-500 border-t border-b border-zinc-200/80 dark:border-white/[0.08]'
        }
      >
        {/* Subtle architectural star dust grid (no muddy blur blobs) */}
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden z-0">
          <div 
            className="absolute inset-0 opacity-[0.035] pointer-events-none"
            style={{
              backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)',
              backgroundSize: '32px 32px'
            }}
          />
        </div>

        {!pinned && (
          <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <Intro title={title} description={description} />
            <p className="flex items-center gap-2 text-xs uppercase tracking-[0.25em] font-semibold text-zinc-400 mb-6">
              {swipeHint} <MoveRight className="w-4 h-4" />
            </p>
          </div>
        )}

        <div
          ref={trackRef}
          data-cursor={pinned ? "drag" : undefined}
          className={
            pinned
              ? 'relative z-10 flex w-max items-center gap-10 pl-[max(2rem,calc((100vw_-_64rem)/2_+_2rem))] pr-[12vw] will-change-transform'
              : 'relative z-10 flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar px-4 sm:px-6 pb-4 scroll-px-4'
          }
        >
          {pinned && (
            <div className="shrink-0 w-[34vw] max-w-[440px] pr-6">
              <Intro title={title} description={description} />
              <div className="flex items-center gap-3 text-xs uppercase tracking-[0.25em] font-semibold text-zinc-400">
                <span>{scrollHint}</span>
                <motion.span
                  animate={{ x: [0, 8, 0] }}
                  transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
                  className="inline-flex"
                >
                  <MoveRight className="w-4 h-4 text-red-500" />
                </motion.span>
              </div>
            </div>
          )}

          {projects.map((project, idx) => (
            <article
              key={project.id}
              className={
                pinned
                  ? 'shrink-0 w-[min(48vw,640px)] h-[min(74vh,640px)]'
                  : 'shrink-0 w-[85vw] sm:w-[60vw] snap-start'
              }
            >
              <div data-card-inner className="h-full origin-bottom-left">
                <SpotlightCard className="group flex flex-col h-full bg-zinc-900/90 border border-white/10 hover:border-red-500/40 transition-all duration-500 rounded-[2rem] shadow-[0_12px_40px_rgba(0,0,0,0.6)]">
                  <div className="flex flex-col h-full">
                    {/* Uniform Cinematic Image Area */}
                    <div
                      data-cursor="view"
                      role="button"
                      tabIndex={0}
                      aria-label={detailLabel(project.title)}
                      onClick={() => setSelectedProject(project)}
                      onKeyDown={(e) => onCardKey(e, project)}
                      className={`relative w-full bg-zinc-950 overflow-hidden border-b border-white/10 cursor-pointer group/img outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-inset shrink-0 ${
                        pinned ? 'h-[52%]' : 'aspect-[16/10] sm:aspect-[16/9]'
                      }`}
                    >
                      {/* Outlined index number */}
                      <span className="text-outline absolute top-2 right-4 text-[4.5rem] sm:text-[6rem] leading-none font-display font-bold select-none pointer-events-none z-10 drop-shadow">
                        {pad(idx + 1)}
                      </span>

                      {project.images && project.images.length > 0 ? (
                        <div data-parallax className="relative z-[1] w-full h-full overflow-hidden">
                          {/* Ambient background blur for cinematic depth */}
                          <div 
                            aria-hidden="true" 
                            className="absolute inset-0 bg-cover bg-center blur-2xl opacity-25 scale-125 pointer-events-none"
                            style={{ backgroundImage: `url(${project.images[0]})` }}
                          />

                          {/* Uniform full-bleed image with consistent object-top framing */}
                          <img
                            src={project.images[0]}
                            alt={`${project.title} screenshot`}
                            loading="lazy"
                            decoding="async"
                            onLoad={queueRefresh}
                            className="relative z-[1] w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                          />

                          {/* Subtle bottom vignette transitioning into the card content */}
                          <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-zinc-900/90 via-zinc-900/40 to-transparent pointer-events-none z-[2]" />

                          {/* Hover action pill */}
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/img:opacity-100 transition-opacity duration-300 flex items-center justify-center backdrop-blur-[2px] z-[3]">
                            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white text-zinc-950 text-xs font-semibold shadow-2xl translate-y-2 group-hover/img:translate-y-0 transition-transform duration-300">
                              <Eye className="w-4 h-4 text-red-500" />
                              {language === 'id' ? 'Lihat Detail Proyek' : 'View Project Details'}
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className="relative z-[1] w-full h-full flex flex-col items-center justify-center text-zinc-500 bg-zinc-950/80">
                          <Code className="w-12 h-12 mb-3 opacity-50 text-zinc-600" />
                          <span className="text-sm font-medium">{t('noPreview')}</span>
                        </div>
                      )}
                    </div>

                    {/* Content area */}
                    <div className="p-6 sm:p-8 flex flex-col shrink-0">
                      <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 line-clamp-1">
                        <button
                          type="button"
                          onClick={() => setSelectedProject(project)}
                          className="text-left transition-colors cursor-pointer hover:text-red-400 focus-visible:text-red-400 outline-none focus-visible:underline underline-offset-4"
                        >
                          {project.title}
                        </button>
                      </h3>
                      <p className="text-zinc-400 text-sm leading-relaxed mb-4 line-clamp-2">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-2 mb-5">
                        {project.tags?.slice(0, 5).map((tag) => (
                          <span key={tag} className="px-3 py-1 text-xs font-semibold bg-zinc-800/90 text-zinc-300 border border-white/5 rounded-lg">
                            {tag}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/5">
                        <button
                          onClick={() => setSelectedProject(project)}
                          className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-red-400 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-colors cursor-pointer mr-auto"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>{language === 'id' ? 'Detail' : 'Details'}</span>
                        </button>

                        {project.demoUrl && (
                          <MagneticButton
                            as="a"
                            href={project.demoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-white text-zinc-950 text-xs font-medium rounded-xl hover:bg-zinc-200 transition-colors shadow-sm"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                            <span>{t('demo')}</span>
                          </MagneticButton>
                        )}
                        {project.driveUrl && (
                          <MagneticButton
                            as="a"
                            href={project.driveUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-red-600 text-white text-xs font-medium rounded-xl hover:bg-red-700 transition-colors shadow-sm"
                          >
                            <ArrowRight className="w-3.5 h-3.5" />
                            <span>{t('drive')}</span>
                          </MagneticButton>
                        )}
                        {project.repoUrl && (
                          <MagneticButton
                            as="a"
                            href={project.repoUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-800 text-zinc-200 border border-white/10 text-xs font-medium rounded-xl hover:bg-zinc-700 transition-colors shadow-sm"
                          >
                            <Github className="w-3.5 h-3.5" />
                            <span>{t('repo')}</span>
                          </MagneticButton>
                        )}
                      </div>
                    </div>
                  </div>
                </SpotlightCard>
              </div>
            </article>
          ))}
        </div>

        {/* HUD: counter + progress (pinned mode) */}
        {pinned && (
          <div className="absolute bottom-8 left-0 right-0 pointer-events-none z-20">
            <div className="w-full max-w-5xl mx-auto px-8 flex items-center gap-6">
              <span className="font-display text-sm font-semibold tabular-nums text-white">
                <span ref={counterRef} className="text-white font-bold">01</span>
                <span className="text-zinc-500"> / {pad(total)}</span>
              </span>
              <div className="relative flex-1 h-px bg-white/15 overflow-hidden">
                <div
                  ref={progressRef}
                  className="absolute inset-0 origin-left bg-gradient-to-r from-red-500 to-rose-400 shadow-[0_0_8px_rgba(239,68,68,0.8)]"
                  style={{ transform: 'scaleX(0)' }}
                />
              </div>
            </div>
          </div>
        )}
      </section>
      {/* Dark → light fade back out of the cinematic section */}
      <div aria-hidden="true" className="h-40 -mb-24 bg-gradient-to-b from-[#09090b] to-transparent pointer-events-none dark:hidden" />

      <ProjectDetailModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
      />
    </>
  );
}

function Intro({ title, description }: { title: string; description: string }) {
  return (
    <>
      <div className="inline-flex items-center gap-2 mb-3 font-mono text-[11px] uppercase tracking-[0.24em] text-zinc-400 select-none">
        <span className="text-red-500 font-semibold">//</span>
        <span>03</span>
        <span className="w-8 h-px bg-white/20 ml-1" />
      </div>
      <RevealText
        as="h2"
        text={title}
        by="word"
        stagger={0.08}
        className="block text-4xl md:text-5xl font-display font-semibold tracking-tight text-white mb-6"
      />
      <p className="text-zinc-300 mb-10 max-w-2xl text-lg leading-relaxed">{description}</p>
    </>
  );
}
