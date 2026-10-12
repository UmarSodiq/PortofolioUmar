import { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useTransform } from 'motion/react';
import { Award, ChevronLeft, ChevronRight, RotateCcw, Layers, ListFilter } from 'lucide-react';
import { Certification } from '../types';
import { useLanguage } from '../context/LanguageContext';

interface DraggableCardDeckProps {
  certifications: Certification[];
}

export function DraggableCardDeck({ certifications }: DraggableCardDeckProps) {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('right');
  const [viewMode, setViewMode] = useState<'deck' | 'list'>('deck');

  const total = certifications.length;

  const handleSwipe = (dir: 'left' | 'right') => {
    setDirection(dir);
    setCurrentIndex((prev) => (prev + 1) % total);
  };

  const handlePrev = () => {
    setDirection('left');
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  };

  const handleReset = () => {
    setCurrentIndex(0);
  };

  // Stack of visible cards (top 3)
  const visibleCards = [
    certifications[currentIndex % total],
    certifications[(currentIndex + 1) % total],
    certifications[(currentIndex + 2) % total],
  ].filter(Boolean);

  const isId = language === 'id';

  return (
    <div className="w-full flex flex-col">
      {/* Top Header / Mode Switcher */}
      <div className="w-full flex items-center justify-between mb-8 pb-4 border-b border-black/[0.04] dark:border-white/[0.04]">
        <div className="flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/5 text-zinc-700 dark:text-zinc-300">
            <Award className="w-5 h-5 text-red-500" />
          </div>
          <div>
            <h3 className="text-2xl font-display font-bold text-zinc-900 dark:text-white">
              {isId ? 'Sertifikasi & Lisensi' : 'Certifications & Licenses'}
            </h3>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
              {isId ? 'Daftar sertifikasi dan lisensi profesional' : 'Professional credentials and certifications'}
            </p>
          </div>
        </div>

        {/* Toggle View: Deck vs List */}
        <div className="flex items-center p-1 rounded-xl bg-zinc-100 dark:bg-zinc-800/80 border border-zinc-200 dark:border-white/5 text-xs font-semibold">
          <button
            onClick={() => setViewMode('deck')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              viewMode === 'deck'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-red-500" />
            <span>Deck</span>
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all cursor-pointer ${
              viewMode === 'list'
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm'
                : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            <ListFilter className="w-3.5 h-3.5" />
            <span>{isId ? 'Daftar' : 'List'}</span>
          </button>
        </div>
      </div>

      {viewMode === 'deck' ? (
        <div className="w-full flex flex-col items-center">
          {/* Card Deck Stage with 3D Depth */}
          <div className="relative w-full max-w-md h-[320px] flex items-center justify-center select-none perspective-[1200px]">
            <AnimatePresence mode="popLayout" custom={direction}>
              {visibleCards.map((cert, index) => {
                const isTop = index === 0;
                return (
                  <DeckCardItem
                    key={`${cert.name}-${(currentIndex + index) % total}`}
                    cert={cert}
                    index={index}
                    isTop={isTop}
                    onSwipe={handleSwipe}
                    total={total}
                    direction={direction}
                    itemNumber={((currentIndex + index) % total) + 1}
                  />
                );
              })}
            </AnimatePresence>
          </div>

          {/* Bottom Interactive Controls */}
          <div className="mt-8 flex items-center justify-between w-full max-w-md px-2">
            <div className="flex items-center gap-2">
              <button
                onClick={handlePrev}
                aria-label="Previous card"
                className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:border-red-500 hover:text-red-500 transition-colors shadow-sm cursor-pointer active:scale-95"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleSwipe('right')}
                aria-label="Next card"
                className="w-10 h-10 rounded-full bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-700 dark:text-zinc-300 hover:border-red-500 hover:text-red-500 transition-colors shadow-sm cursor-pointer active:scale-95"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>

            {/* Counter badge */}
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 text-xs font-semibold text-zinc-600 dark:text-zinc-300 tabular-nums border border-zinc-200/50 dark:border-white/5">
              <span className="text-red-500 font-bold">{currentIndex + 1}</span>
              <span className="text-zinc-400">/</span>
              <span>{total}</span>
            </div>

            <button
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs font-semibold text-zinc-500 dark:text-zinc-400 hover:text-red-500 dark:hover:text-red-400 transition-colors cursor-pointer"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>

          <p className="mt-3 text-[11px] text-zinc-400 dark:text-zinc-500 font-medium">
            {isId ? 'Geser kartu atau gunakan tombol navigasi' : 'Swipe card or use navigation buttons'}
          </p>
        </div>
      ) : (
        /* List Mode Fallback */
        <div className="w-full space-y-3">
          {certifications.map((cert, idx) => (
            <div
              key={idx}
              className="p-4 rounded-2xl bg-white/70 dark:bg-zinc-900/60 backdrop-blur-md border border-black/[0.04] dark:border-white/10 hover:border-red-500/30 transition-all flex items-start gap-4 group"
            >
              <div className="p-2.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 text-zinc-500 group-hover:text-red-500 group-hover:bg-red-50 dark:group-hover:bg-red-950/30 transition-colors shrink-0 mt-0.5">
                <Award className="w-4 h-4" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-baseline justify-between gap-2 mb-1">
                  <h4 className="text-sm font-bold text-zinc-900 dark:text-white leading-tight">
                    {cert.name}
                  </h4>
                  <span className="text-xs font-semibold text-zinc-400 dark:text-zinc-500 shrink-0">
                    {cert.year}
                  </span>
                </div>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {cert.issuer}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

interface DeckCardItemProps {
  key?: string;
  cert: Certification;
  index: number;
  isTop: boolean;
  onSwipe: (dir: 'left' | 'right') => void;
  total: number;
  direction: 'left' | 'right';
  itemNumber: number;
}

function DeckCardItem({ cert, index, isTop, onSwipe, total, direction, itemNumber }: DeckCardItemProps) {
  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-18, 18]);
  const opacity = useTransform(x, [-200, -100, 0, 100, 200], [0.4, 0.9, 1, 0.9, 0.4]);

  const handleDragEnd = (_: any, info: { offset: { x: number; y: number }; velocity: { x: number } }) => {
    if (Math.abs(info.offset.x) > 80 || Math.abs(info.velocity.x) > 400) {
      onSwipe(info.offset.x > 0 ? 'right' : 'left');
    }
  };

  // Stack styling per layer
  const scale = 1 - index * 0.05;
  const yOffset = index * 14;
  const zIndex = 30 - index * 10;

  return (
    <motion.div
      data-cursor={isTop ? 'drag' : undefined}
      style={{
        zIndex,
        ...(isTop ? { x, rotate, opacity } : {}),
      }}
      initial={{ scale: scale * 0.9, y: yOffset + 20, opacity: 0 }}
      animate={{
        scale,
        y: yOffset,
        opacity: isTop ? 1 : 0.85 - index * 0.25,
        transition: { type: 'spring', stiffness: 350, damping: 26 },
      }}
      exit={{
        x: direction === 'right' ? 380 : -380,
        opacity: 0,
        rotate: direction === 'right' ? 24 : -24,
        transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] },
      }}
      drag={isTop ? 'x' : false}
      dragConstraints={{ left: 0, right: 0 }}
      dragElastic={0.8}
      onDragEnd={handleDragEnd}
      whileDrag={{ scale: 1.04, cursor: 'grabbing' }}
      className={`absolute inset-x-0 mx-auto w-full max-w-sm rounded-[2rem] p-7 border overflow-hidden transition-shadow duration-300 ${
        isTop
          ? 'cursor-grab bg-white dark:bg-zinc-900 border-zinc-200/90 dark:border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.08)] dark:shadow-[0_24px_60px_rgba(0,0,0,0.5)]'
          : 'bg-zinc-50 dark:bg-zinc-900/80 border-zinc-200/60 dark:border-white/5 shadow-md pointer-events-none'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="w-10 h-10 rounded-2xl bg-zinc-100 dark:bg-zinc-800 border border-zinc-200/80 dark:border-white/10 text-zinc-700 dark:text-zinc-300 flex items-center justify-center shadow-xs">
          <Award className="w-5 h-5 text-red-500" />
        </div>

        <span className="text-xs font-mono font-bold text-zinc-400 dark:text-zinc-500 tabular-nums">
          #{String(itemNumber).padStart(2, '0')}
        </span>
      </div>

      {/* Main Content */}
      <div className="space-y-2.5 mb-6">
        <h4 className="text-lg font-bold font-display text-zinc-900 dark:text-white leading-snug">
          {cert.name}
        </h4>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 font-medium leading-relaxed">
          {cert.issuer}
        </p>
      </div>

      {/* Footer Info */}
      <div className="pt-4 border-t border-black/[0.05] dark:border-white/5 flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
        <span className="font-medium">Tahun Terbit</span>
        <span className="font-bold text-zinc-900 dark:text-zinc-100 tabular-nums">{cert.year}</span>
      </div>
    </motion.div>
  );
}
