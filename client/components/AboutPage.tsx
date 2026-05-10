import React from 'react';
import { Breadcrumbs } from './Breadcrumbs';
import { SEO } from './SEO';
import { t, Language } from '../utils/translations';

interface AboutPageProps {
  language: Language;
  onNavigate: (
    page: string,
    id?: string | number | null,
    category?: unknown,
    workId?: string | null
  ) => void;
}

const LINE_KEYS = ['aboutIntro1', 'aboutIntro2', 'aboutIntro3', 'aboutIntro4', 'aboutIntro5'] as const;

export const AboutPage: React.FC<AboutPageProps> = ({ language, onNavigate }) => {
  const breadcrumbs = [
    { label: t('home', language), onClick: () => onNavigate('home') },
    { label: t('about', language), active: true },
  ];

  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-[#F9F8F4] dark:bg-stone-950">
      <SEO
        title={`${t('about', language)} | IyalTamil`}
        description={t('aboutIntro1', language)}
      />

      <div className="w-full max-w-2xl px-4 pt-4 pb-32">
        <div className="mb-10">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold font-tamil text-stone-900 dark:text-stone-100 mb-10 text-center md:text-left">
          {t('about', language)}
        </h1>

        <div className="space-y-6 text-stone-700 dark:text-stone-300 leading-[1.85] font-tamil text-base md:text-lg text-center md:text-left">
          {LINE_KEYS.map((key) => (
            <p key={key}>{t(key, language)}</p>
          ))}
        </div>
      </div>
    </div>
  );
};
