import React from 'react';
import { t, Language } from '../utils/translations';
import { Icon } from './Icon';

interface FooterProps {
  language: Language;
  onNavigate: (page: any, id?: number | null, category?: any | null) => void;
}

export const Footer: React.FC<FooterProps> = ({ language, onNavigate }) => {
  return (
    <footer className="bg-[#FDFBF7] dark:bg-stone-950 text-[#3E2723] dark:text-stone-200 py-20 px-6 border-t border-[#3E2723]/10 dark:border-stone-800/50 transition-colors duration-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-12">
        {/* Column 1: Brand */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h2 className="text-3xl font-serif font-bold mb-1 text-[#3E2723] dark:text-stone-100">IyalTamil</h2>
          <p className="text-[10px] font-sans text-[#5D4037] dark:text-stone-500 opacity-70 mb-6 tracking-[0.25em] uppercase font-bold">Success in Simplicity</p>
          <p className="text-base text-[#5D4037] dark:text-stone-400 max-w-xs leading-relaxed font-tamil italic opacity-90">
             "A digital sanctuary for Tamil literature and peaceful reading."
          </p>
        </div>

        {/* Column 2: Quick Links */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-xs font-black mb-8 uppercase tracking-[0.3em] text-[#3E2723] dark:text-stone-300">Explore</h3>
          <ul className="space-y-4 font-semibold text-sm">
            <li>
                <button 
                  onClick={() => onNavigate('home')} 
                  className="text-[#5D4037] dark:text-stone-400 hover:text-[#2d5f2e] dark:hover:text-zen-lightGreen transition-colors duration-300 text-left"
                >
                    {t('home', language)}
                </button>
            </li>
            <li>
                <button 
                  onClick={() => onNavigate('classics')} 
                  className="text-[#5D4037] dark:text-stone-400 hover:text-[#2d5f2e] dark:hover:text-zen-lightGreen transition-colors duration-300 text-left"
                >
                    {language === 'ta' ? 'ஞானம்' : 'Wisdom (Gnanam)'}
                </button>
            </li>
            <li>
                <button 
                  onClick={() => onNavigate('category', null, 'கவிதை')} 
                  className="text-[#5D4037] dark:text-stone-400 hover:text-[#2d5f2e] dark:hover:text-zen-lightGreen transition-colors duration-300 text-left"
                >
                    {t('poems', language)}
                </button>
            </li>
            <li>
                <button 
                  onClick={() => onNavigate('potikal')} 
                  className="text-[#5D4037] dark:text-stone-400 hover:text-[#2d5f2e] dark:hover:text-zen-lightGreen transition-colors duration-300 text-left"
                >
                    {t('competitions', language)}
                </button>
            </li>
          </ul>
        </div>

        {/* Column 3: Connect */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left">
          <h3 className="text-xs font-black mb-8 uppercase tracking-[0.3em] text-[#3E2723] dark:text-stone-300">Community</h3>
          <ul className="space-y-4 font-semibold text-sm">
            <li>
                <a href="#" className="text-[#5D4037] dark:text-stone-400 hover:text-[#2d5f2e] dark:hover:text-zen-lightGreen transition-colors duration-300">{t('about', language)}</a>
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