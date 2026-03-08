
import React, { useState, useEffect } from 'react';
import type { User, Category } from '../types';
import { Icon } from './Icon';
import { t, Language } from '../utils/translations';

interface HeaderProps {
  currentUser: User | null;
  onLoginClick: () => void;
  onLogout: () => void;
  onNavigate: (page: any, id?: string | number | null, category?: Category | null, workId?: string | null) => void;
  language: Language;
  theme: 'light' | 'dark';
  onToggleLanguage: () => void;
  onToggleTheme: () => void;
  activePage?: string;
  activeCategory?: Category | null;
  selectedAuthorId?: string | number | null;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onLoginClick,
  onLogout,
  onNavigate,
  language,
  theme,
  onToggleLanguage,
  onToggleTheme,
  activePage,
  activeCategory,
  selectedAuthorId,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userMenuRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!userMenuOpen) return;
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as Node;
      if (userMenuRef.current && !userMenuRef.current.contains(target)) {
        setUserMenuOpen(false);
      }
    };
    // Use click (not mousedown) so the dropdown button click fires first
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [userMenuOpen]);

  const NavItem = ({ label, onClick, active = false }: { label: string; onClick: () => void; active?: boolean }) => (
    <button
        type="button"
        onClick={(e) => { e.stopPropagation(); onClick(); }}
        className={`text-[16px] md:text-[17px] font-semibold transition-all duration-300 ease-in-out whitespace-nowrap ${
            active 
            ? 'text-zen-green' 
            : 'text-[#2D2D2D] dark:text-stone-300 hover:text-zen-green'
        }`}
    >
        {label}
    </button>
  );

  const NavGroup = ({ label, items, align = 'center', active = false }: { label: string; items: { label: string; onClick: () => void }[]; align?: 'left' | 'right' | 'center'; active?: boolean }) => (
    <div className="relative group h-full flex items-center">
        <button
            type="button"
            onClick={() => {}}
            className={`text-[16px] md:text-[17px] font-semibold transition-all duration-300 ease-in-out flex items-center whitespace-nowrap ${
                active
                ? 'text-zen-green'
                : 'text-[#2D2D2D] dark:text-stone-300 hover:text-zen-green'
            }`}
        >
            {label}
        </button>

        {/* Dropdown Menu - Refined with 0.2s fade-in */}
        <div className={`absolute top-full ${align === 'right' ? 'right-0' : align === 'center' ? 'left-1/2 -translate-x-1/2' : 'left-0'} w-48 bg-white dark:bg-stone-900 rounded-xl shadow-2xl py-2 border border-[#EDEDED] dark:border-stone-800 invisible opacity-0 translate-y-1 group-hover:visible group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 z-50`}>
            {items.map((item, i) => (
                <button
                    key={i}
                    type="button"
                    onClick={item.onClick}
                    className="w-full text-left px-5 py-3 text-[14px] text-[#2D2D2D] dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/50 hover:text-zen-green transition-all duration-200 font-semibold border-l-2 border-transparent hover:border-zen-green/40"
                >
                    {item.label}
                </button>
            ))}
        </div>
    </div>
  );

  const UserMenu = () => {
    if (!currentUser) return null;
    const id = String(currentUser.id);
    const handleMyCreations = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onNavigate('author', id);
      setUserMenuOpen(false);
    };
    const handleLogoutClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onLogout();
      setUserMenuOpen(false);
    };
    const handleThemeClick = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      onToggleTheme();
      setUserMenuOpen(false);
    };
    return (
      <div className="relative" ref={userMenuRef}>
        <button
          type="button"
          onClick={(e) => { e.stopPropagation(); setUserMenuOpen((o) => !o); }}
          className="text-[16px] md:text-[17px] font-semibold transition-all duration-300 ease-in-out flex items-center whitespace-nowrap text-[#2D2D2D] dark:text-stone-300 hover:text-zen-green"
        >
          {currentUser.name}
        </button>
        <div
          className={`absolute top-full right-0 mt-1 w-48 bg-white dark:bg-stone-900 rounded-xl shadow-2xl py-2 border border-[#EDEDED] dark:border-stone-800 transition-all duration-200 ${
            userMenuOpen ? 'visible opacity-100 translate-y-0 pointer-events-auto' : 'invisible opacity-0 -translate-y-1 pointer-events-none'
          }`}
          style={{ zIndex: 9999 }}
        >
          <button
            type="button"
            onClick={handleMyCreations}
            className="w-full text-left px-5 py-3 text-[14px] text-[#2D2D2D] dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/50 hover:text-zen-green transition-all duration-200 font-semibold border-l-2 border-transparent hover:border-zen-green/40"
          >
            My Creations
          </button>
          <button
            type="button"
            onClick={handleThemeClick}
            className="w-full text-left px-5 py-3 text-[14px] text-[#2D2D2D] dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/50 hover:text-zen-green transition-all duration-200 font-semibold border-l-2 border-transparent hover:border-zen-green/40"
          >
            {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
          </button>
          <button
            type="button"
            onClick={handleLogoutClick}
            className="w-full text-left px-5 py-3 text-[14px] text-[#2D2D2D] dark:text-stone-400 hover:bg-stone-50 dark:hover:bg-stone-800/50 hover:text-zen-green transition-all duration-200 font-semibold border-l-2 border-transparent hover:border-zen-green/40"
          >
            {t('logout', language)}
          </button>
        </div>
      </div>
    );
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-[60] transition-all duration-500 ease-in-out ${
        isScrolled 
          ? 'bg-bone/95 dark:bg-stone-950/95 backdrop-blur-md shadow-sm border-b border-[#EDEDED] dark:border-stone-800' 
          : 'bg-bone dark:bg-stone-950 border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        
        {/* Row 1: Logo & Auth */}
        <div className={`relative flex items-center justify-center transition-all duration-500 ${isScrolled ? 'pt-[15px] pb-1' : 'pt-[40px] pb-2'}`}>
          <div 
              className="flex flex-row items-center gap-3 cursor-pointer group flex-shrink-0" 
              onClick={(e) => { e.stopPropagation(); onNavigate('home'); }}
          >
              <div className={`transform group-hover:rotate-[15deg] transition-all duration-500 ease-out flex-shrink-0 overflow-hidden rounded-full ${isScrolled ? 'w-10 h-10' : 'w-14 h-14'}`}>
                  <img src="/images/IyalLogo.png" alt="Iyal" className="w-full h-full object-cover object-center" />
              </div>
              <div className="flex flex-col">
                <h1 className={`font-black font-sans tracking-tight transition-all duration-500 leading-none ${isScrolled ? 'text-xl md:text-2xl' : 'text-2xl md:text-3xl'}`}>
                  <span className="text-[#555555] dark:text-white">Iyal</span>
                  <span className="text-zen-green">Tamil</span>
                </h1>
                <span className={`font-sans font-medium text-[#333333] dark:text-stone-400 transition-all duration-500 ${isScrolled ? 'text-[9px] tracking-[0.12em] mt-1' : 'text-[11px] tracking-[0.18em] mt-1.5'}`}>
                  Success in Simplicity
                </span>
              </div>
          </div>

          <div className="hidden lg:flex absolute right-0 items-center gap-6">
              {currentUser ? (
                  <div className="flex items-center gap-4">
                      <button 
                          onClick={() => onNavigate('editor')}
                          className="bg-zen-green hover:bg-zen-lightGreen text-white px-5 py-2.5 rounded-[8px] font-bold text-sm transition-all duration-300 shadow-md shadow-zen-green/20 active:scale-95"
                      >
                          {t('write', language)}
                      </button>
                      <UserMenu />
                  </div>
              ) : (
                  <div className="flex items-center gap-3">
                      <button 
                          onClick={() => onNavigate('editor')}
                          className="bg-zen-green hover:bg-zen-lightGreen text-white px-5 py-2.5 rounded-[8px] font-bold text-sm transition-all duration-300 shadow-md shadow-zen-green/20 active:scale-95"
                      >
                          படைப்பைப் பகிர்க
                      </button>
                      <button
                          onClick={onLoginClick}
                          className="text-[15px] font-bold text-[#2D2D2D] dark:text-stone-300 hover:text-zen-green transition-all duration-300 px-5 py-2.5 rounded-[8px] border border-stone-200 dark:border-stone-800 hover:border-zen-green/50 hover:bg-white dark:hover:bg-stone-900"
                      >
                          {t('login', language)}
                      </button>
                  </div>
              )}
          </div>

          <div className="lg:hidden absolute right-0 flex items-center">
              <button 
                  onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                  className="text-[#2D2D2D] dark:text-bone p-2 hover:bg-stone-100 dark:hover:bg-stone-900 rounded-full transition-colors"
                  aria-label="Menu"
              >
                  <div className="space-y-1.5">
                      <span className={`block w-6 h-0.5 bg-current transition-transform ${isMobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                      <span className={`block w-6 h-0.5 bg-current transition-opacity ${isMobileMenuOpen ? 'opacity-0' : ''}`}></span>
                      <span className={`block w-6 h-0.5 bg-current transition-transform ${isMobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                  </div>
              </button>
          </div>
        </div>

        {/* Row 2: Menu - Balanced and Curated */}
        <nav className={`hidden lg:flex justify-center items-center gap-10 transition-all duration-500 ${isScrolled ? 'mt-1 pb-[15px]' : 'mt-[30px] pb-5'}`}>
            <NavItem label={t('home', language)} onClick={() => onNavigate('home')} active={activePage === 'home'} />
            {currentUser && (
              <NavItem label={language === 'ta' ? 'என் படைப்புகள்' : 'My Creations'} onClick={() => onNavigate('author', String(currentUser.id))} active={activePage === 'author' && selectedAuthorId != null && String(selectedAuthorId) === String(currentUser.id)} />
            )}
            <NavItem label={t('learnTamil', language)} onClick={() => onNavigate('karka')} active={activePage === 'karka'} />
            <NavItem label={t('poems', language)} onClick={() => onNavigate('category', null, 'கவிதை')} active={activePage === 'category' && activeCategory === 'கவிதை'} />
            <NavItem label={t('stories', language)} onClick={() => onNavigate('category', null, 'கதை')} active={activePage === 'category' && activeCategory === 'கதை'} />
            <NavItem label={t('competitions', language)} onClick={() => onNavigate('potikal')} active={activePage === 'potikal'} />
            <NavItem label={t('classics', language)} onClick={() => onNavigate('classics', null)} active={activePage === 'classics'} />
        </nav>
      </div>

      {isMobileMenuOpen && (
          <div className="lg:hidden bg-bone dark:bg-stone-950 border-t border-[#EDEDED] dark:border-stone-900 animate-subtle-fade absolute w-full left-0 shadow-2xl overflow-y-auto max-h-[calc(100vh-80px)]">
              <div className="px-6 py-8 space-y-8">
                  <div className="space-y-4">
                      <p className="text-[11px] font-black uppercase tracking-[0.2em] text-stone-400">Navigation</p>
                      <div className="flex flex-col gap-5">
                          <button type="button" onClick={(e) => { e.stopPropagation(); onNavigate('home'); setIsMobileMenuOpen(false); }} className={`text-left text-lg font-semibold ${activePage === 'home' ? 'text-zen-green' : 'text-[#2D2D2D] dark:text-bone'}`}>{t('home', language)}</button>
                          <button type="button" onClick={(e) => { e.stopPropagation(); onNavigate('karka'); setIsMobileMenuOpen(false); }} className={`text-left text-lg font-semibold ${activePage === 'karka' ? 'text-zen-green' : 'text-[#2D2D2D] dark:text-stone-300'}`}>{t('learnTamil', language)}</button>
                          <button type="button" onClick={(e) => { e.stopPropagation(); onNavigate('category', null, 'கவிதை'); setIsMobileMenuOpen(false); }} className={`text-left text-lg font-semibold ${activePage === 'category' && activeCategory === 'கவிதை' ? 'text-zen-green' : 'text-[#2D2D2D] dark:text-stone-300'}`}>{t('poems', language)}</button>
                          <button type="button" onClick={(e) => { e.stopPropagation(); onNavigate('category', null, 'கதை'); setIsMobileMenuOpen(false); }} className={`text-left text-lg font-semibold ${activePage === 'category' && activeCategory === 'கதை' ? 'text-zen-green' : 'text-[#2D2D2D] dark:text-stone-300'}`}>{t('stories', language)}</button>
                          <button type="button" onClick={(e) => { e.stopPropagation(); onNavigate('potikal'); setIsMobileMenuOpen(false); }} className={`text-left text-lg font-semibold ${activePage === 'potikal' ? 'text-zen-green' : 'text-[#2D2D2D] dark:text-stone-300'}`}>{t('competitions', language)}</button>
                          <button type="button" onClick={(e) => { e.stopPropagation(); onNavigate('classics', null); setIsMobileMenuOpen(false); }} className={`text-left text-lg font-semibold ${activePage === 'classics' ? 'text-zen-green' : 'text-[#2D2D2D] dark:text-stone-300'}`}>{t('classics', language)}</button>
                      </div>
                  </div>
                  
                  <div className="pt-8 border-t border-[#EDEDED] dark:border-stone-800 space-y-6">
                    <button type="button" onClick={(e) => { e.stopPropagation(); onNavigate('editor'); setIsMobileMenuOpen(false); }} className="w-full py-4 rounded-[8px] bg-zen-green text-white font-bold text-sm shadow-lg shadow-zen-green/20 transition-all duration-500">படைப்பைப் பகிர்க</button>
                    
                    <button type="button" onClick={(e) => { e.stopPropagation(); onToggleTheme(); setIsMobileMenuOpen(false); }} className="w-full flex items-center justify-center gap-3 p-4 bg-stone-100 dark:bg-stone-900 rounded-[8px] font-bold text-sm">
                        <Icon name={theme === 'light' ? 'moon' : 'sun'} />
                        <span>{theme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
                    </button>

                    {currentUser ? (
                        <div className="space-y-4">
                            <p className="text-xs font-bold text-stone-400 text-center">Logged in as {currentUser.name}</p>
                            <button type="button" onClick={(e) => { e.stopPropagation(); onNavigate('author', String(currentUser.id)); setIsMobileMenuOpen(false); }} className="w-full py-4 rounded-[8px] bg-stone-100 dark:bg-stone-900 text-[#2D2D2D] dark:text-bone font-bold text-sm">{language === 'ta' ? 'என் படைப்புகள்' : 'My Creations'}</button>
                            <button type="button" onClick={(e) => { e.stopPropagation(); onLogout(); setIsMobileMenuOpen(false); }} className="w-full py-4 rounded-[8px] bg-stone-100 dark:bg-stone-900 text-[#2D2D2D] dark:text-bone font-bold text-sm">{t('logout', language)}</button>
                        </div>
                    ) : (
                        <button type="button" onClick={(e) => { e.stopPropagation(); onLoginClick(); setIsMobileMenuOpen(false); }} className="w-full py-4 rounded-[8px] border border-stone-200 dark:border-stone-800 text-[#2D2D2D] dark:text-bone font-bold text-sm">{t('login', language)}</button>
                    )}
                  </div>
              </div>
          </div>
      )}
    </header>
  );
};
