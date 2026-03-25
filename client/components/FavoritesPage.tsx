import React from 'react';
import type { Post, User, Category } from '../types';
import { PostCard } from './PostCard';
import { t, Language } from '../utils/translations';
import { SEO } from './SEO';
import { Breadcrumbs } from './Breadcrumbs';
import { Icon } from './Icon';

interface FavoritesPageProps {
  posts: Post[];
  onNavigate: (page: any, id?: string | null, category?: Category | null) => void;
  language: Language;
  currentUser?: User | null;
  onToggleLike?: (postId: string) => void;
  onLoginRequired?: () => void;
}

export const FavoritesPage: React.FC<FavoritesPageProps> = ({
  posts,
  onNavigate,
  language,
  currentUser,
  onToggleLike,
  onLoginRequired,
}) => {
  const breadcrumbs = [
    { label: t('home', language), onClick: () => onNavigate('home') },
    { label: t('favorites', language), active: true },
  ];

  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-[#F9F8F4] dark:bg-stone-950">
      <SEO
        title={`${t('favorites', language)} | IyalTamil`}
        description={t('favorites', language)}
      />

      <div className="w-full max-w-4xl px-4 pt-4 pb-32">
        <div className="mb-8">
          <Breadcrumbs items={breadcrumbs} />
        </div>

        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold font-tamil text-stone-900 dark:text-stone-100 mb-3">
            {t('favorites', language)}
          </h2>
          <p className="text-stone-500 dark:text-stone-400 text-base font-serif italic">
            {language === 'ta'
              ? 'நீங்கள் விரும்பிய படைப்புகள்'
              : 'Your liked creations'}
          </p>
        </div>

        {!currentUser ? (
          <div className="text-center py-32 bg-white dark:bg-stone-900/50 rounded-3xl border border-dashed border-stone-200 dark:border-stone-800">
            <Icon name="like" />
            <p className="text-xl font-serif italic text-stone-500 mt-4">
              {t('loginToLike', language)}
            </p>
            <button
              onClick={onLoginRequired}
              className="mt-6 bg-zen-green hover:bg-zen-lightGreen text-white px-6 py-2.5 rounded-lg font-bold text-sm transition-all duration-300"
            >
              {t('login', language)}
            </button>
          </div>
        ) : posts.length > 0 ? (
          <div className="space-y-12 sm:space-y-20 w-full mx-auto animate-subtle-fade">
            {posts.map((post) => (
              <div key={post._id} className="animate-subtle-fade">
                <PostCard
                  post={post}
                  onNavigate={onNavigate}
                  currentUser={currentUser}
                  variant={post.category === 'கவிதை' ? 'minimal' : 'default'}
                  onToggleLike={onToggleLike}
                  onLoginRequired={onLoginRequired}
                />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-32 bg-white dark:bg-stone-900/50 rounded-3xl border border-dashed border-stone-200 dark:border-stone-800">
            <p className="text-xl font-serif italic text-stone-500">
              {language === 'ta'
                ? 'விருப்பங்கள் ஏதும் இல்லை. படைப்புகளை விரும்புங்கள்!'
                : 'No favorites yet. Start liking some creations!'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
