import React from 'react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Github, Linkedin, Mail, Instagram, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { MagneticButton } from './MagneticButton';

export function Connect() {
  const { t } = useLanguage();
  const [showToast, setShowToast] = useState(false);

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('umarsodiq.work@gmail.com');
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  const socials = [
    {
      name: 'LinkedIn',
      icon: Linkedin,
      href: 'https://linkedin.com/in/umarsodiq',
      bgStyle: { backgroundColor: '#0A66C2' },
      hoverText: 'group-hover:text-white',
    },
    {
      name: 'GitHub',
      icon: Github,
      href: 'https://github.com/umarsodiq',
      bgClass: 'bg-zinc-900 dark:bg-white',
      hoverText: 'group-hover:text-white dark:group-hover:text-zinc-900',
    },
    {
      name: 'Email',
      icon: Mail,
      href: 'mailto:umarsodiq.work@gmail.com',
      bgStyle: { backgroundColor: '#EA4335' },
      hoverText: 'group-hover:text-white',
      onClick: handleEmailClick,
    },
    {
      name: 'Instagram',
      icon: Instagram,
      href: 'https://instagram.com/u.marr.s',
      bgStyle: { background: 'linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)' },
      hoverText: 'group-hover:text-white',
    },
  ];

  return (
    <>
      <div className="flex flex-wrap justify-center gap-3 mt-8 mb-4 max-w-2xl mx-auto">
        {socials.map((social) => (
          <MagneticButton key={social.name}>
            <motion.a
              href={social.href}
              onClick={social.onClick}
              target="_blank"
              rel="noreferrer"
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.95 }}
              className="relative flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white dark:bg-zinc-900 border border-black/[0.04] dark:border-white/5 shadow-[0_4px_20px_rgb(0,0,0,0.02)] dark:shadow-none hover:shadow-[0_8px_30px_rgb(0,0,0,0.06)] dark:hover:shadow-[0_8px_30px_rgba(255,255,255,0.02)] transition-all duration-300 group overflow-hidden cursor-pointer"
            >
              {/* Hover background color fill */}
              <div 
                className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 ${social.bgClass || ''}`}
                style={social.bgStyle}
              />
              
              <div className="relative z-10 w-8 h-8 rounded-full bg-zinc-50 dark:bg-zinc-800/50 flex items-center justify-center group-hover:bg-white/20 dark:group-hover:bg-black/10 transition-colors duration-300 border border-black/5 dark:border-white/5 group-hover:border-transparent">
                <social.icon className={`w-3.5 h-3.5 text-zinc-600 dark:text-zinc-400 transition-colors duration-300 ${social.hoverText}`} />
              </div>
              
              <span className={`relative z-10 font-bold text-xs text-zinc-900 dark:text-zinc-100 transition-colors duration-300 ${social.hoverText}`}>
                {social.name}
              </span>
            </motion.a>
          </MagneticButton>
        ))}
      </div>

      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2.5 px-4 py-3 bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 rounded-full shadow-lg"
          >
            <CheckCircle2 className="w-4 h-4 text-emerald-400 dark:text-emerald-600" />
            <span className="text-sm font-bold">{t('emailCopied')}</span>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
