
import React, { useState, useMemo } from 'react';
import type { Post, Category, User } from '../types';
import { PostCard } from './PostCard';
import { t, Language } from '../utils/translations';
import { Icon } from './Icon';
import { SEO } from './SEO';
import { Skeleton } from './Skeleton';
import { Breadcrumbs } from './Breadcrumbs';

interface HomeProps {
  posts: Post[];
  onNavigate: (page: any, id?: string | null, category?: Category | null) => void;
  category?: Category | null;
  language: Language;
  searchQuery?: string;
  onSearch: (query: string) => void;
  currentUser?: User | null;
  isLoading?: boolean;
  selectedAuthor?: User;
}

const VisionSection: React.FC<{ onNavigate: (page: any) => void }> = ({ onNavigate }) => (
    <div className="text-center py-16 animate-subtle-fade px-4">
        <p className="text-lg md:text-xl font-tamil text-stone-700 dark:text-stone-300 leading-loose max-w-3xl mx-auto italic mb-10">
            "இயல்தமிழ் (IyalTamil) என்பது ஒரு டிஜிட்டல் நந்தவனம். பரபரப்பான உலகில், அமைதியான சூழலில் படைப்புகளைப் படிக்கவும் பகிரவும் உருவாக்கப்பட்ட ஒரு தளம்."
        </p>
        <button 
            onClick={() => onNavigate('classics')}
            className="inline-block border-2 border-[#3E2723] dark:border-stone-200 text-[#3E2723] dark:text-stone-200 font-medium rounded-full px-8 py-2 hover:bg-[#2d5f2e] hover:text-white hover:border-[#2d5f2e] transition-all duration-300 active:scale-95"
        >
            பயணத்தைத் தொடங்க
        </button>
    </div>
);

const FeaturePillars: React.FC = () => (
    <div className="max-w-4xl mx-auto px-4 py-16 animate-subtle-fade">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 border-y border-stone-200/50 dark:border-stone-800/50 py-16">
            <div className="text-center md:text-left">
                <h4 className="text-2xl font-bold font-tamil text-zen-green mb-4 leading-relaxed">தடையற்ற வாசிப்பு</h4>
                <p className="text-stone-500 dark:text-stone-400 text-base leading-relaxed">
                    விளம்பரங்கள் மற்றும் கவனச்சிதறல்கள் அற்ற தூய்மையான வாசிப்பு அனுபவம்.
                </p>
            </div>
            <div className="text-center md:text-left">
                <h4 className="text-2xl font-bold font-tamil text-zen-green mb-4 leading-relaxed">தரமான படைப்புகள்</h4>
                <p className="text-stone-500 dark:text-stone-400 text-base leading-relaxed">
                    ஆழமான சிந்தனைகள் மற்றும் கவிதைகளுக்கான பிரத்யேகத் தளம்.
                </p>
            </div>
            <div className="text-center md:text-left">
                <h4 className="text-2xl font-bold font-tamil text-zen-green mb-4 leading-relaxed">எழுத்தாளர்களின் சங்கமம்</h4>
                <p className="text-stone-500 dark:text-stone-400 text-base leading-relaxed">
                    படைப்பாளிகள் தங்களின் எழுத்துப் பயணத்தை அமைதியாகத் தொடங்கும் இடம்.
                </p>
            </div>
        </div>
    </div>
);

const WordOfTheDay: React.FC<{ language: Language }> = ({ language }) => (
    <div className="py-16 flex justify-center animate-subtle-fade w-full">
        <div className="bg-white dark:bg-stone-900 rounded-[2.5rem] p-8 md:p-14 shadow-[0_12px_45px_rgba(0,0,0,0.04)] text-center relative overflow-hidden group border border-stone-100 dark:border-stone-800 w-[90%] sm:w-[85%] md:max-w-3xl">
            <div className="flex items-center justify-center gap-2 mb-6 text-stone-500 dark:text-stone-500">
                <Icon name="calendar" />
                <span className="text-[10px] font-bold uppercase tracking-[0.2em]">{t('wordOfTheDay', language)}</span>
            </div>
            
            <h3 className="text-2xl md:text-3xl font-bold font-tamil-serif text-stone-900 dark:text-stone-100 mb-4 leading-[1.3]">அறம்</h3>
            <p className="text-base md:text-xl text-stone-500 dark:text-stone-500 font-serif italic mb-10">
                {t('meaning', language)}: Dharma / Virtue / Righteousness
            </p>
            
            <div className="max-w-md mx-auto pt-8 border-t border-stone-50 dark:border-stone-800">
                <p className="font-tamil text-sm md:text-base text-stone-700 dark:text-stone-300 leading-relaxed italic">
                    "அறம் செய விரும்பு"
                </p>
                <p className="text-stone-500 dark:text-stone-500 mt-3 font-serif text-sm">— ஔவையார்</p>
            </div>
        </div>
    </div>
);

const AuthorProfile: React.FC<{ author: User; postCount: number }> = ({ author, postCount }) => (
    <div className="mb-16 px-2 animate-subtle-fade max-w-4xl mx-auto">
        <div className="bg-white dark:bg-stone-900 rounded-[2rem] border border-stone-200 dark:border-stone-800 p-10 flex flex-col md:flex-row items-center gap-10 shadow-sm">
             <div className="relative z-10 flex-shrink-0">
                 <div className="p-1.5 rounded-full bg-bone dark:bg-stone-900 border-4 border-zen-green/20 shadow-xl">
                    <img src={author.avatarUrl} alt={author.name} className="w-32 h-32 rounded-full object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-700" />
                 </div>
             </div>
             
             <div className="relative z-10 text-center md:text-left">
                 <h2 className="text-4xl font-bold font-tamil text-stone-900 dark:text-stone-100 mb-3 leading-snug">{author.name}</h2>
                 <div className="flex items-center justify-center md:justify-start gap-4 mb-6">
                     <span className="px-4 py-1 rounded-full bg-stone-100 dark:bg-stone-800 text-stone-600 dark:text-stone-400 text-xs font-bold uppercase tracking-widest">
                         {postCount} {t('posts', 'en')}
                     </span>
                     <span className="px-4 py-1 rounded-full bg-zen-green/10 text-zen-green text-xs font-bold uppercase tracking-widest">
                         ஆசிரியர்
                     </span>
                 </div>
                 <p className="text-stone-600 dark:text-stone-400 font-serif max-w-xl text-lg leading-relaxed italic">
                     தமிழ் இலக்கியத்திற்குத் தன் எழுத்துக்களால் வளம் சேர்க்கும் படைப்பாளி.
                 </p>
             </div>
        </div>
    </div>
);

export const Home: React.FC<HomeProps> = ({ 
    posts, 
    onNavigate, 
    category = null, 
    language, 
    searchQuery = '', 
    onSearch, 
    currentUser,
    isLoading = false,
    selectedAuthor
}) => {
    const [subFilter, setSubFilter] = useState<string | null>(null);
    
    let pageTitle = "IyalTamil - Success in Simplicity";
    let pageDescription = t('subTagline', language);

    const isRootHome = !category && !searchQuery && !selectedAuthor;
    const isPoemCategory = category === 'கவிதை';

    const breadcrumbs = [];
    if (!isRootHome) {
        breadcrumbs.push({ label: t('home', language), onClick: () => onNavigate('home') });
    }

    if (category) {
        pageTitle = `${category} | IyalTamil`;
        breadcrumbs.push({ label: category, active: true });
    } else if (selectedAuthor) {
        pageTitle = `${selectedAuthor.name} | IyalTamil`;
        breadcrumbs.push({ label: selectedAuthor.name, active: true });
    } else if (searchQuery) {
        pageTitle = `Search: ${searchQuery} | IyalTamil`;
        breadcrumbs.push({ label: t('searchResultsFor', language).replace('{query}', searchQuery), active: true });
    }

    const filteredPosts = useMemo(() => {
        if (!subFilter || !isPoemCategory) return posts;
        const keywords: Record<string, string[]> = {
            'இயற்கை': ['மழை', 'மரம்', 'காடு', 'பூ', 'நிலவு', 'வான்', 'விண்ணை', 'விவசாயம்'],
            'காதல்': ['அன்பு', 'நினைவில்', 'காதலர்', 'ஆசை', 'அகம்', 'முகம்'],
            'வாழ்வியல்': ['வாழ்க்கை', 'அறம்', 'முயற்சி', 'நேரம்', 'தனிமை', 'புத்தகம்', 'மாற்றம்'],
            'ஆன்மீகம்': ['கடவுள்', 'இறைவன்', 'தெய்வம்', 'தவம்', 'அரனை']
        };
        const currentKeywords = keywords[subFilter] || [];
        return posts.filter(post => 
            currentKeywords.some(keyword => 
                post.title.includes(keyword) || post.content.includes(keyword)
            )
        );
    }, [posts, subFilter, isPoemCategory]);

  return (
    <div className="w-full flex flex-col items-center min-h-screen bg-[#F9F8F4] dark:bg-stone-950">
      <SEO title={pageTitle} description={pageDescription} />

      <div className={`w-full ${isPoemCategory ? 'max-w-[800px]' : 'max-w-4xl'} px-4 pt-4 pb-32`}>
        {breadcrumbs.length > 0 && <div className="mb-8"><Breadcrumbs items={breadcrumbs} /></div>}

        {isRootHome && (
          <div className="text-center pt-6 animate-subtle-fade">
            <h2 className="text-[2.5rem] font-medium font-tamil text-stone-900 dark:text-stone-100 leading-[1.3] mb-8">
              {t('tagline', language)}
            </h2>
            <p className="text-xl md:text-2xl text-stone-500 dark:text-stone-500 font-serif italic max-w-2xl mx-auto leading-relaxed mb-12">
              {t('subTagline', language)}
            </p>
            <VisionSection onNavigate={onNavigate} />
            <WordOfTheDay language={language} />
            <FeaturePillars />
          </div>
        )}

        {false && category && isPoemCategory && (
            <div className="mb-12 px-2 animate-subtle-fade max-w-xl mx-auto text-center">
              <div className="flex flex-wrap justify-center gap-2 animate-subtle-fade">
                  {['இயற்கை', 'காதல்', 'வாழ்வியல்', 'ஆன்மீகம்'].map((chip) => (
                      <button
                          key={chip}
                          onClick={() => setSubFilter(subFilter === chip ? null : chip)}
                          className={`px-5 py-1.5 rounded-full text-[13px] font-bold transition-all duration-300 border ${
                              subFilter === chip 
                              ? 'bg-zen-green border-zen-green text-white shadow-md' 
                              : 'bg-transparent border-zen-green/30 text-zen-green hover:border-zen-green'
                          }`}
                      >
                          {chip}
                      </button>
                  ))}
              </div>
            </div>
        )}
        
        <div className="animate-subtle-fade">
          {selectedAuthor && <AuthorProfile author={selectedAuthor} postCount={posts.length} />}

          {isLoading ? (
              <div className={`w-full mx-auto ${isPoemCategory ? 'space-y-6' : 'space-y-12'}`}>
                  {[1, 2, 3].map(i => (
                      <div key={i} className={isPoemCategory ? 'h-32' : 'h-64'}>
                        <Skeleton variant={isPoemCategory ? 'minimal' : 'default'} />
                      </div>
                  ))}
              </div>
          ) : (
              !isRootHome ? (
                  filteredPosts.length > 0 ? (
                      <div className={`${isPoemCategory ? 'space-y-6' : 'space-y-12 sm:space-y-20'} w-full mx-auto`}>
                          {searchQuery && (
                            <div className="flex items-center gap-2 mb-10 text-stone-500 px-2 uppercase text-[10px] font-bold tracking-widest">
                              <Icon name="search" />
                              <span>{t('searchResultsFor', language).replace('{query}', searchQuery)}</span>
                            </div>
                          )}

                          {filteredPosts.map((post) => (
                              <div key={post._id} className="animate-subtle-fade">
                                  <PostCard 
                                    post={post} 
                                    onNavigate={onNavigate} 
                                    currentUser={currentUser}
                                    variant={isPoemCategory ? 'minimal' : 'default'}
                                  />
                              </div>
                          ))}
                      </div>
                  ) : (
                      <div className="text-center py-32 bg-white dark:bg-stone-900/50 rounded-3xl border border-dashed border-stone-200 dark:border-stone-800 mx-2 w-full mx-auto">
                          <p className="text-xl font-serif italic text-stone-500">
                              {searchQuery || subFilter ? t('noSearchResults', language) : t('noPostsFound', language)}
                          </p>
                      </div>
                  )
              ) : null
          )}
        </div>
      </div>
    </div>
  );
};
