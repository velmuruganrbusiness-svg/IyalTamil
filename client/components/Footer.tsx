import React, { useMemo } from 'react';
import type { User } from '../types';
import { t, Language } from '../utils/translations';
import { Icon } from './Icon';

interface FooterProps {
  language: Language;
  currentUser?: User | null;
  onNavigate: (
    page: any,
    id?: string | number | null,
    category?: any | null,
    workId?: string | null
  ) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, currentUser = null, onNavigate }) => {
  /** Same order and `onNavigate` targets as Header desktop nav. */
  const exploreItems = useMemo(
    () => [
      { key: 'home', label: t('home', language), action: () => onNavigate('home') },
      ...(currentUser
        ? [
            {
              key: 'my-creations',
              label: language === 'ta' ? 'என் படைப்புகள்' : 'My Creations',
              action: () => onNavigate('author', String(currentUser.id)),
            },
          ]
        : []),
      { key: 'karka', label: t('learnTamil', language), action: () => onNavigate('karka') },
      {
        key: 'poems',
        label: t('poems', language),
        action: () => onNavigate('category', null, 'கவிதை'),
      },
      {
        key: 'stories',
        label: t('stories', language),
        action: () => onNavigate('category', null, 'கதை'),
      },
      { key: 'potikal', label: t('competitions', language), action: () => onNavigate('potikal') },
      { key: 'classics', label: t('classics', language), action: () => onNavigate('classics', null) },
    ],
    [language, currentUser, onNavigate]
  );
  return (
    <footer className="bg-[#FDFBF7] dark:bg-stone-950 text-[#3E2723] dark:text-stone-200 py-20 px-6 border-t border-[#3E2723]/10 dark:border-stone-800/50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
        {/* Column 1: Brand — matches Header logo + tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <button
            type="button"
            onClick={() => onNavigate('home')}
            className="flex flex-row items-center gap-3 cursor-pointer group text-left mx-auto md:mx-0"
          >
            <div className="transform group-hover:rotate-[15deg] transition-all duration-500 ease-out flex-shrink-0 overflow-hidden rounded-full w-14 h-14">
              <img src="/images/logo.png" alt="" className="w-full h-full object-cover object-center" aria-hidden />
            </div>
            <div className="inline-flex min-w-0 flex-col items-stretch text-center md:text-left">
              <div className="font-bold font-tamil tracking-tighter text-2xl md:text-3xl leading-none">
                <span className="text-[#555555] dark:text-white">இயல்</span>
                <span className="text-zen-green">தமிழ்</span>
              </div>
              <span className="block w-full font-tamil font-medium text-stone-600 dark:text-stone-400 text-[10px] md:text-[11px] tracking-normal leading-tight mt-1.5">
                எழுத்தால் இணைவோம்
              </span>
            </div>
          </button>
          <p className="mt-6 text-base text-[#5D4037] dark:text-stone-400 max-w-xs leading-relaxed font-tamil italic opacity-90">
             "A digital sanctuary for Tamil literature and peaceful reading."
          </p>
        </div>

        {/* Column 2 — Explore: mirrors Header nav order */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-xs font-black mb-8 uppercase tracking-[0.3em] text-[#3E2723] dark:text-stone-300">Explore</h3>
          <ul className="space-y-4 font-semibold text-sm">
            {exploreItems.map((item) => (
              <li key={item.key}>
                <button
                  type="button"
                  onClick={item.action}
                  className="text-[#5D4037] dark:text-stone-400 hover:text-[#2d5f2e] dark:hover:text-zen-lightGreen transition-colors duration-300 text-left w-full md:w-auto"
                >
                  {item.label}
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* Column 3: Connect */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-xs font-black mb-8 uppercase tracking-[0.3em] text-[#3E2723] dark:text-stone-300">Community</h3>
          <ul className="space-y-4 font-semibold text-sm">
            <li>
                <button
                  type="button"
                  onClick={() => onNavigate('about')}
                  className="text-[#5D4037] dark:text-stone-400 hover:text-[#2d5f2e] dark:hover:text-zen-lightGreen transition-colors duration-300 text-left"
                >
                  {t('about', language)}
                </button>
            </li>
            <li>
                <a href="#" className="text-[#5D4037] dark:text-stone-400 hover:text-[#2d5f2e] dark:hover:text-zen-lightGreen transition-colors duration-300">{t('contact', language)}</a>
            </li>        
            <li>
                <a 
                  href="/support" 
                  className="flex items-center gap-2 text-[#5D4037] dark:text-stone-400 hover:text-[#2d5f2e] dark:hover:text-zen-lightGreen transition-all duration-300 group hover:scale-105"
                >
                  <span className="text-red-400 w-4 h-4">
                    <Icon name="like" isFilled={true} />
                  </span>
                  <span>Support Us (ஆதரவளி)</span>
                </a>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-[#3E2723]/5 dark:border-stone-800/30 text-center text-[10px] text-[#5D4037] dark:text-stone-500 font-bold uppercase tracking-[0.2em] opacity-60">
        <p>© 2026 IyalTamil. Built with ❤️ for Tamil.</p>
      </div>
    </footer>
  );
};