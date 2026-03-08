import React, { useState, useEffect, useRef } from 'react';
import type { ClassicalWork, ClassicalSection, ClassicalChapter, Category } from '../types';
import { t, Language } from '../utils/translations';
import { SEO } from './SEO';
import { Icon } from './Icon';
import { Breadcrumbs, BreadcrumbItem } from './Breadcrumbs';

interface ClassicsViewProps {
  works: ClassicalWork[];
  language: Language;
  selectedWorkId: string | null;
  onNavigate: (page: any, id?: number | null, category?: Category | null, workId?: string | null) => void;
}

const ReadingSettings: React.FC<{ 
    fontSize: 'text-lg' | 'text-xl' | 'text-2xl' | 'text-3xl'; 
    setFontSize: (size: 'text-lg' | 'text-xl' | 'text-2xl' | 'text-3xl') => void;
    viewMode: 'scroll' | 'book' | 'olai';
    setViewMode: (mode: 'scroll' | 'book' | 'olai') => void;
    language: Language;
}> = ({ fontSize, setFontSize, viewMode, setViewMode, language }) => {
    const [isOpen, setIsOpen] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <div className="relative" ref={ref}>
            <button 
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2.5 rounded-full border transition-all shadow-sm ${isOpen ? 'bg-zen-green text-white border-zen-green' : 'bg-white text-stone-500 border-stone-200 hover:text-zen-green dark:bg-stone-900 dark:border-stone-800'}`}
                title={t('appearance', language)}
            >
                <Icon name="settings" />
            </button>
            
            {isOpen && (
                <div className="absolute right-0 mt-3 w-72 bg-white dark:bg-stone-900 rounded-2xl shadow-2xl border border-stone-100 dark:border-stone-800 p-6 z-50 animate-subtle-fade">
                    <div className="mb-6">
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-3">வாசிப்பு முறை</label>
                        <div className="grid grid-cols-1 gap-2">
                             <button onClick={() => setViewMode('scroll')} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${viewMode === 'scroll' ? 'bg-zen-green border-zen-green text-white' : 'bg-stone-50 dark:bg-stone-800 border-stone-100 dark:border-stone-700 text-stone-600 dark:text-stone-400'}`}>உருள் முறை (Scroll)</button>
                             <button onClick={() => setViewMode('book')} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${viewMode === 'book' ? 'bg-zen-green border-zen-green text-white' : 'bg-stone-50 dark:bg-stone-800 border-stone-100 dark:border-stone-700 text-stone-600 dark:text-stone-400'}`}>புத்தக முறை (Book)</button>
                             <button onClick={() => setViewMode('olai')} className={`w-full text-left px-4 py-2.5 rounded-xl text-sm font-bold border transition-all ${viewMode === 'olai' ? 'bg-amber-600 border-amber-600 text-white' : 'bg-stone-50 dark:bg-stone-800 border-stone-100 dark:border-stone-700 text-stone-600 dark:text-stone-400'}`}>ஓலைச்சுவடி முறை (Palm Leaf)</button>
                        </div>
                    </div>

                    <div>
                        <label className="text-[10px] font-bold text-stone-400 uppercase tracking-widest block mb-3">{t('fontSize', language)}</label>
                        <div className="flex items-center justify-between bg-stone-50 dark:bg-stone-800 rounded-xl p-1.5 border border-stone-100 dark:border-stone-700">
                            {(['text-lg', 'text-xl', 'text-2xl', 'text-3xl'] as const).map(size => (
                                <button 
                                    key={size}
                                    onClick={() => setFontSize(size)}
                                    className={`flex-1 py-1.5 rounded-lg text-sm font-bold transition-all ${fontSize === size ? 'bg-white dark:bg-stone-700 shadow-sm text-zen-green' : 'text-stone-400'}`}
                                >
                                    A
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const VerseDisplay: React.FC<{ 
    chapter: ClassicalChapter, 
    workTitle: string, 
    language: Language,
    viewMode: 'scroll' | 'book' | 'olai',
    isSoundEnabled: boolean,
    fontSize: 'text-lg' | 'text-xl' | 'text-2xl' | 'text-3xl',
    onFinish: () => void
}> = ({ chapter, workTitle, language, viewMode, isSoundEnabled, fontSize, onFinish }) => {
    const [currentPage, setCurrentPage] = useState(0);
    const audioContextRef = useRef<AudioContext | null>(null);
    const totalPages = chapter.verses.length;

    useEffect(() => {
        setCurrentPage(0);
    }, [chapter]);

    const playPageTurnSound = () => {
        if (!isSoundEnabled) return;
        try {
            if (!audioContextRef.current) {
                audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
            }
            const ctx = audioContextRef.current;
            if (ctx.state === 'suspended') ctx.resume();
            const bufferSize = ctx.sampleRate * 0.2;
            const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
            const data = buffer.getChannelData(0);
            for (let i = 0; i < bufferSize; i++) data[i] = Math.random() * 2 - 1;
            const noise = ctx.createBufferSource();
            noise.buffer = buffer;
            const filter = ctx.createBiquadFilter();
            filter.type = 'lowpass';
            filter.frequency.value = 1000;
            const gainNode = ctx.createGain();
            gainNode.gain.setValueAtTime(0, ctx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.1, ctx.currentTime + 0.05);
            gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.2);
            noise.connect(filter);
            filter.connect(gainNode);
            gainNode.connect(ctx.destination);
            noise.start();
            noise.stop(ctx.currentTime + 0.2);
        } catch (e) {}
    };

    const isFirstPage = currentPage === 0;
    const isLastPage = currentPage === totalPages - 1;

    if (viewMode === 'olai') {
        return (
            <div className="animate-fade-in pb-20 px-4 w-full flex flex-col items-center">
                 <div className="max-w-4xl w-full">
                     {chapter.verses.map((verse, idx) => (
                         <div key={idx} className="olai-container animate-subtle-fade">
                             <div className="olai-hole olai-hole-left"></div>
                             <div className="olai-hole olai-hole-right"></div>
                             <div className="relative z-10 text-center">
                                 <span className="block text-[10px] font-black text-[#8D6E63]/60 uppercase tracking-[0.3em] mb-4">சுவடி எண்: {idx + 1}</span>
                                 <p className={`font-tamil olai-text font-bold ${fontSize === 'text-lg' ? 'text-xl' : fontSize === 'text-xl' ? 'text-2xl' : fontSize === 'text-2xl' ? 'text-3xl' : 'text-4xl'}`}>
                                    {verse.text}
                                 </p>
                                 {verse.explanation && (
                                     <div className="olai-meaning">
                                         <p className="font-tamil text-lg leading-relaxed">{verse.explanation}</p>
                                     </div>
                                 )}
                             </div>
                         </div>
                     ))}
                     <div className="flex justify-center pt-8">
                        <button 
                            onClick={onFinish}
                            className="bg-[#3E2723] text-white px-12 py-4 rounded-full font-bold shadow-2xl hover:bg-[#5D4037] transition-all transform hover:-translate-y-1 active:scale-95"
                        >
                            முற்றும்
                        </button>
                     </div>
                 </div>
            </div>
        );
    }

    if (viewMode === 'book') {
        const verse = chapter.verses[currentPage];
        return (
            <div className="animate-subtle-fade pb-20 px-4 flex flex-col items-center w-full">
                <div className="bg-white dark:bg-stone-900 w-full max-w-2xl min-h-[480px] rounded-[2.5rem] shadow-2xl p-10 md:p-16 flex flex-col justify-center text-center border border-stone-100 dark:border-stone-800 relative border-t-4 border-[#3E2723]">
                     <div className="absolute top-8 left-10 text-stone-200 dark:text-stone-800">
                        <Icon name="leaf" />
                     </div>
                     <span className="absolute bottom-8 right-10 text-5xl font-black text-stone-50 dark:text-stone-800/30 select-none">{currentPage + 1}</span>
                     
                     <div className={`font-serif leading-[1.8] mb-12 text-[#3E2723] dark:text-stone-100 ${fontSize === 'text-lg' ? 'text-2xl' : fontSize === 'text-xl' ? 'text-3xl' : fontSize === 'text-2xl' ? 'text-4xl' : 'text-5xl'}`}>
                        {verse.text}
                     </div>
                     
                     {verse.explanation && (
                         <div className="pt-10 border-t border-stone-50 dark:border-stone-800">
                             <h5 className="text-[10px] font-black text-zen-green uppercase tracking-[0.4em] mb-4">விளக்கம்</h5>
                             <p className="text-[#4b5563] dark:text-stone-400 italic leading-relaxed text-lg md:text-xl font-tamil max-w-lg mx-auto">
                                {verse.explanation}
                             </p>
                         </div>
                     )}
                </div>

                <div className="flex items-center gap-8 mt-12">
                    <button 
                        disabled={isFirstPage}
                        onClick={() => { setCurrentPage(prev => prev - 1); playPageTurnSound(); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                        className={`flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm transition-all border ${isFirstPage ? 'opacity-50 cursor-not-allowed border-stone-100 text-stone-300' : 'border-stone-200 text-[#8D6E63] hover:border-zen-green hover:text-zen-green bg-white shadow-sm hover:shadow-md'}`}
                    >
                        <Icon name="chevron-left" />
                        <span>{t('prevPage', language)}</span>
                    </button>
                    
                    <div className="text-sm font-bold text-stone-400 uppercase tracking-widest hidden sm:block">
                        {currentPage + 1} / {totalPages}
                    </div>

                    <button 
                        onClick={() => { if (isLastPage) onFinish(); else { setCurrentPage(prev => prev + 1); playPageTurnSound(); window.scrollTo({top: 0, behavior: 'smooth'}); } }}
                        className="flex items-center gap-2 px-8 py-3.5 rounded-full font-bold text-sm transition-all bg-[#2d5f2e] text-white hover:bg-zen-lightGreen shadow-lg shadow-[#2d5f2e]/20 hover:-translate-y-0.5 active:scale-95"
                    >
                        <span>{isLastPage ? 'முற்றும்' : t('nextPage', language)}</span>
                        <Icon name={isLastPage ? 'leaf' : 'chevron-right'} />
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="animate-subtle-fade pb-20 px-4 w-full">
            <div className="max-w-4xl mx-auto space-y-12">
                {chapter.verses.map((verse, idx) => (
                    <div key={idx} className="bg-white dark:bg-stone-900 p-10 md:p-12 rounded-3xl border border-stone-200 dark:border-stone-800 shadow-xl relative overflow-hidden border-t-4 border-[#3E2723]">
                        <span className="absolute top-6 right-8 text-4xl font-black text-stone-100 dark:text-stone-800 select-none">{idx + 1}</span>
                        <p className={`font-serif text-[#3E2723] dark:text-stone-100 leading-[1.8] mb-10 text-center ${fontSize === 'text-lg' ? 'text-xl' : fontSize === 'text-xl' ? 'text-2xl' : fontSize === 'text-2xl' ? 'text-3xl' : 'text-4xl'}`}>{verse.text}</p>
                        {verse.explanation && (
                            <div className="pt-8 border-t border-stone-50 dark:border-stone-800">
                                <h5 className="text-[10px] font-black text-zen-green uppercase tracking-[0.3em] mb-4 text-center">விளக்கம்</h5>
                                <p className="font-tamil text-lg md:text-xl text-[#4b5563] dark:text-stone-400 leading-relaxed italic text-center px-4 max-w-2xl mx-auto">{verse.explanation}</p>
                            </div>
                        )}
                    </div>
                ))}
                <div className="flex justify-center pt-8">
                   <button 
                       onClick={onFinish}
                       className="bg-[#3E2723] text-white px-12 py-4 rounded-full font-bold shadow-xl hover:bg-[#5D4037] transition-all transform hover:-translate-y-1 active:scale-95"
                   >
                       {t('theEnd', language)}
                   </button>
                </div>
            </div>
        </div>
    );
};

export const ClassicsView: React.FC<ClassicsViewProps> = ({ works, language, selectedWorkId, onNavigate }) => {
  const [selectedSection, setSelectedSection] = useState<ClassicalSection | null>(null);
  const [selectedChapter, setSelectedChapter] = useState<ClassicalChapter | null>(null);
  const [fontSize, setFontSize] = useState<'text-lg' | 'text-xl' | 'text-2xl' | 'text-3xl'>('text-2xl');
  const [viewMode, setViewMode] = useState<'book' | 'scroll' | 'olai'>('book');
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const work = works.find(w => w.id === selectedWorkId);

  useEffect(() => {
    setSelectedSection(null);
    setSelectedChapter(null);
  }, [selectedWorkId]);

  const breadcrumbs: BreadcrumbItem[] = [
    { label: t('home', language), onClick: () => onNavigate('home') },
    { label: t('classics', language), onClick: () => onNavigate('classics', null), active: !selectedWorkId }
  ];

  if (work) {
    breadcrumbs.push({ label: work.title, onClick: () => { setSelectedSection(null); setSelectedChapter(null); }, active: !selectedSection && !selectedChapter });
    if (selectedSection) {
        breadcrumbs.push({ label: selectedSection.title, onClick: () => setSelectedChapter(null), active: !selectedChapter });
    }
    if (selectedChapter) {
        breadcrumbs.push({ label: selectedChapter.chapter, active: true });
    }
  }

  const renderLibrary = () => {
    // Show only Thirukkural and Aathichoodi as requested
    const filteredWorks = works.filter(w => w.id === 'thirukkural' || w.id === 'aathichoodi');
    
    return (
        <div className="grid gap-10 md:grid-cols-2 max-w-4xl mx-auto px-4">
            {filteredWorks.map((w) => (
                <div 
                    key={w.id} 
                    onClick={() => onNavigate('classics', null, null, w.id)}
                    className="group cursor-pointer bg-white dark:bg-stone-900 rounded-[2.5rem] border-2 border-stone-100 dark:border-stone-800 p-10 shadow-md hover:shadow-xl hover:-translate-y-2 hover:border-[#2d5f2e] transition-all duration-300 ease-in-out flex flex-col h-full overflow-hidden relative"
                >
                    <div className="relative z-10 flex flex-col h-full">
                        <div className="flex justify-between items-start mb-10">
                            <div className="w-16 h-16 bg-bone dark:bg-stone-800 text-zen-green rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-zen-green group-hover:text-white transition-all duration-500">
                                 <Icon name="book" />
                            </div>
                            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-stone-400">கருவூலம்</span>
                        </div>
                        <h3 className="text-3xl font-black font-tamil text-[#3E2723] dark:text-stone-100 mb-2 leading-tight group-hover:text-[#2d5f2e] transition-colors">{w.title}</h3>
                        <p className="text-sm font-bold text-stone-400 uppercase tracking-widest mb-6">{w.author}</p>
                        <p className="text-stone-500 dark:text-stone-400 leading-relaxed font-serif italic mb-8 flex-grow">{w.description}</p>
                        
                        <div className="mt-auto">
                            <div className="bg-[#2d5f2e] hover:bg-[#1a3b1c] text-white py-3.5 rounded-full font-semibold text-[15px] transition-all duration-300 shadow-md hover:shadow-lg flex items-center justify-center w-full group-hover:scale-[1.02]">
                                <span>பயிலத் தொடங்க</span>
                                <span className="ml-2 transform group-hover:translate-x-1.5 transition-transform duration-300">
                                     <Icon name="chevron-right" />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
  };

  const renderWorkExplorer = () => {
    if (!work) return null;

    if (selectedChapter) {
        return (
            <div className="w-full">
                <div className="flex justify-between items-center mb-12 w-full max-w-4xl mx-auto px-4">
                    <Breadcrumbs items={breadcrumbs} />
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => setIsSoundEnabled(!isSoundEnabled)}
                            className={`p-2.5 rounded-full border transition-all shadow-sm ${isSoundEnabled ? 'text-zen-green border-zen-green bg-zen-green/5' : 'text-stone-400 border-stone-200 dark:border-stone-800 bg-white'}`}
                            title={isSoundEnabled ? t('soundOff', language) : t('soundOn', language)}
                        >
                            <Icon name={isSoundEnabled ? 'volume-up' : 'volume-off'} />
                        </button>
                        <ReadingSettings 
                            fontSize={fontSize} setFontSize={setFontSize} 
                            viewMode={viewMode} setViewMode={setViewMode} 
                            language={language} 
                        />
                    </div>
                </div>

                <VerseDisplay 
                    chapter={selectedChapter} 
                    workTitle={work.title}
                    language={language}
                    viewMode={viewMode}
                    isSoundEnabled={isSoundEnabled}
                    fontSize={fontSize}
                    onFinish={() => { setSelectedChapter(null); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                />
            </div>
        );
    }

    if (work.sections && !selectedSection) {
        return (
            <div className="w-full max-w-6xl mx-auto">
                <div className="mb-10 px-4">
                    <Breadcrumbs items={breadcrumbs} />
                </div>
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-4">
                    {work.sections.map((s) => (
                        <div 
                            key={s.id}
                            onClick={() => { setSelectedSection(s); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                            className="group bg-white dark:bg-stone-900 border-2 border-stone-100 dark:border-stone-800 p-10 rounded-[3rem] cursor-pointer shadow-md hover:shadow-xl hover:-translate-y-2 hover:border-[#2d5f2e] transition-all duration-300 ease-in-out flex flex-col justify-between overflow-hidden relative"
                        >
                            <div className="relative z-10">
                                <h4 className="text-3xl font-black font-tamil text-[#3E2723] dark:text-stone-100 mb-4 group-hover:text-[#2d5f2e] transition-colors">{s.title}</h4>
                                <p className="text-stone-500 dark:text-stone-400 text-lg italic font-serif leading-relaxed mb-10">{s.description}</p>
                            </div>
                            <div className="flex items-center justify-between text-[11px] font-black uppercase tracking-widest text-stone-400 mt-auto">
                                <span>{s.chapters.length} அதிகாரங்கள்</span>
                                <div className="w-12 h-12 rounded-full border border-stone-100 dark:border-stone-800 flex items-center justify-center text-stone-300 group-hover:bg-[#2d5f2e] group-hover:text-white group-hover:border-[#2d5f2e] transition-all duration-300">
                                    <Icon name="chevron-right" />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        );
    }

    const currentChapters = selectedSection ? selectedSection.chapters : work.content || [];

    return (
        <div className="w-full max-w-6xl mx-auto px-4">
            <div className="mb-10">
                <Breadcrumbs items={breadcrumbs} />
            </div>
            <div className="text-center mb-16">
                 <h2 className="text-4xl md:text-5xl font-black font-tamil text-[#3E2723] dark:text-white mb-4 leading-tight">{selectedSection ? selectedSection.title : work.title}</h2>
                 <p className="text-stone-500 dark:text-stone-400 text-xl font-medium italic font-serif max-w-2xl mx-auto">{selectedSection ? selectedSection.description : work.description}</p>
            </div>
            
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 pb-20">
                {currentChapters.map((ch, idx) => (
                    <button 
                        key={idx}
                        onClick={() => { setSelectedChapter(ch); window.scrollTo({top: 0, behavior: 'smooth'}); }}
                        className="group bg-white dark:bg-stone-900 p-8 rounded-3xl border border-stone-100 dark:border-stone-800 text-left hover:border-zen-green hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex items-center justify-between"
                    >
                        <div className="flex items-center gap-5">
                            <span className="text-xs font-black text-stone-300 dark:text-stone-700 group-hover:text-zen-green transition-colors">{(idx + 1).toString().padStart(2, '0')}</span>
                            <span className="font-tamil font-bold text-xl text-[#3E2723] dark:text-stone-200 group-hover:text-zen-green transition-colors">{ch.chapter}</span>
                        </div>
                        <div className="text-stone-200 dark:text-stone-800 group-hover:text-zen-green transition-colors">
                            <Icon name="chevron-right" />
                        </div>
                    </button>
                ))}
            </div>
        </div>
    );
  };

  return (
    <div className="w-full max-w-7xl mx-auto pb-32 animate-subtle-fade">
      <SEO title={`${t('classics', language)} | VetriZen`} />
      
      {!selectedWorkId && (
        <div className="px-4">
            <Breadcrumbs items={breadcrumbs} />
        </div>
      )}

      <div className="mt-8">
        {!selectedWorkId ? (
            <>
                <div className="text-center mb-16 px-4">
                    <h2 className="text-4xl md:text-5xl font-serif text-black dark:text-white mb-6 tracking-tight">{t('classics', language)}</h2>
                    <p className="text-[#555555] dark:text-stone-300 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed font-serif italic">
                        பண்டையத் தமிழ் இலக்கியங்களின் கருவூலம். காலத்தால் அழியாத ஞானத்தை நவீன வடிவில் படியுங்கள்.
                    </p>
                </div>
                {renderLibrary()}
            </>
        ) : renderWorkExplorer()}
      </div>
    </div>
  );
};
