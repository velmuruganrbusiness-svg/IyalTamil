
import React from 'react';
import type { Competition } from '../types';
import { t, Language } from '../utils/translations';
import { SEO } from './SEO';
import { Icon } from './Icon';
import { Breadcrumbs } from './Breadcrumbs';

interface PotikalViewProps {
  competitions: Competition[];
  language: Language;
  onNavigate: (page: 'home') => void;
}

export const PotikalView: React.FC<PotikalViewProps> = ({ competitions, language, onNavigate }) => {
  const getStatusColor = (status: Competition['status']) => {
    switch (status) {
        case 'active': return 'bg-[#5A7D5B]/10 text-[#5A7D5B] border-[#5A7D5B]/20';
        case 'upcoming': return 'bg-blue-50 text-blue-700 dark:bg-blue-900/20 dark:text-blue-300 border-blue-100 dark:border-blue-800';
        case 'completed': return 'bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-400 border-stone-200 dark:border-stone-700';
        default: return 'bg-stone-50 text-stone-800';
    }
  };

  const breadcrumbs = [
      { label: t('home', language), onClick: () => onNavigate('home') },
      { label: t('competitions', language), active: true }
  ];

  return (
    <div className="max-w-6xl mx-auto pb-20 animate-subtle-fade">
      <SEO 
        title={`${t('competitions', language)} | IyalTamil`}
        description="Participate in Tamil literary competitions, win prizes, and showcase your talent."
        keywords={['Tamil Competitions', 'Poetry Contest', 'Story Writing', 'Awards']}
      />

      <Breadcrumbs items={breadcrumbs} />

      <div className="mb-16 text-center">
        <h2 className="text-xl md:text-2xl font-black font-tamil text-[#2D2D2D] dark:text-white mb-6 tracking-tight">{t('competitions', language)}</h2>
        <p className="text-[#555555] dark:text-stone-400 text-lg max-w-2xl mx-auto font-medium">
            உங்கள் திறமைகளை வெளிப்படுத்தவும், பரிசுகளை வெல்லவும் ஒரு மேடை.
        </p>
      </div>

      <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
        {competitions.map((comp) => (
            <div key={comp.id} className="group bg-white dark:bg-stone-900 rounded-[2rem] border border-stone-200 dark:border-stone-800 shadow-sm overflow-hidden hover:-translate-y-[5px] hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] transition-all duration-300">
                <div className="h-52 overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
                    <img 
                        src={comp.imageUrl} 
                        alt={comp.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 z-20">
                         <span className={`px-4 py-1.5 rounded-full text-[11px] font-black uppercase tracking-[0.1em] border backdrop-blur-md ${getStatusColor(comp.status)}`}>
                            {t(comp.status, language)}
                         </span>
                    </div>
                </div>

                <div className="p-8">
                    <h3 className="text-2xl font-bold font-tamil-serif mb-4 text-[#2D2D2D] dark:text-white leading-tight group-hover:text-zen-green transition-colors">
                        {comp.title}
                    </h3>
                    <p className="text-[#555555] dark:text-stone-400 text-base leading-relaxed mb-8 line-clamp-3">
                        {comp.description}
                    </p>
                    
                    <div className="space-y-4 mb-10">
                        <div className="flex items-center text-sm text-[#555555] dark:text-stone-400">
                             <div className="w-8 h-8 rounded-lg bg-zen-green/5 flex items-center justify-center mr-3 text-zen-green">
                                <Icon name="calendar" />
                             </div>
                             <span className="font-bold mr-2 uppercase tracking-wider text-[11px]">{t('deadline', language)}:</span>
                             <span className="font-medium">{new Date(comp.deadline).toLocaleDateString('ta-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                        </div>
                        <div className="flex items-center text-sm text-[#555555] dark:text-stone-400">
                             <div className="w-8 h-8 rounded-lg bg-zen-terracotta/5 flex items-center justify-center mr-3 text-zen-terracotta">
                                <Icon name="trophy" />
                             </div>
                             <span className="font-bold mr-2 uppercase tracking-wider text-[11px]">{t('prize', language)}:</span>
                             <span className="font-medium">{comp.prize}</span>
                        </div>
                    </div>

                    <button 
                        disabled={comp.status === 'completed'}
                        className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-3 ${
                            comp.status === 'active' 
                            ? 'bg-zen-green text-white hover:bg-zen-lightGreen shadow-lg shadow-zen-green/20 active:scale-[0.98]' 
                            : 'bg-stone-100 text-stone-400 cursor-not-allowed dark:bg-stone-800 dark:text-stone-600'
                        }`}
                    >
                        <span>{comp.status === 'completed' ? t('completed', language) : t('participate', language)}</span>
                        {comp.status === 'active' && <span className="w-4 h-4"><Icon name="pen" /></span>}
                    </button>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};
