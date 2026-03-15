import React, { useState, useEffect } from 'react';
import { Footer } from './components/Footer';
import { Home } from './components/Home';
import { PostView } from './components/PostView';
import { EditPostView } from './components/EditPostView';
import { Editor } from './components/Editor';
import { ClassicsView } from './components/ClassicsView';
import { PotikalView } from './components/PotikalView';
import { TamilKarkaView } from './components/TamilKarkaView';
import { LoginModal } from './components/LoginModal';
import { Header } from './components/Header';
import { api } from './services/api';
import { mockApi } from './services/mockApi';
import { Icon } from './components/Icon';
import type { Post, User, ClassicalWork, Category, Competition } from './types';
import type { Language } from './utils/translations';

type Page = 'home' | 'post' | 'post-edit' | 'editor' | 'classics' | 'category' | 'potikal' | 'karka' | 'author';
type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [page, setPage] = useState<Page>('home');
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null); // Changed from number to string
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [selectedClassicalWorkId, setSelectedClassicalWorkId] = useState<string | null>(null);
  const [selectedAuthorId, setSelectedAuthorId] = useState<string | number | null>(null); // Changed to support string
  const [posts, setPosts] = useState<Post[]>([]);
  const [classicalWorks, setClassicalWorks] = useState<ClassicalWork[]>([]);
  const [competitions, setCompetitions] = useState<Competition[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [language, setLanguage] = useState<Language>('ta');
  const [theme, setTheme] = useState<Theme>('light');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // Use real API for posts if reachable, otherwise fallback to mock
        const isServerUp = await api.checkHealth();
        let fetchedPosts;
        
        if (isServerUp) {
          fetchedPosts = await api.getPosts();
        } else {
          fetchedPosts = await mockApi.getPosts();
        }
        
        const [fetchedClassics, fetchedCompetitions] = await Promise.all([
          mockApi.getClassicalWorks(),
          mockApi.getCompetitions(),
        ]);
        
        setPosts(fetchedPosts);
        setClassicalWorks(fetchedClassics);
        setCompetitions(fetchedCompetitions);

        // Restore session: use saved user so id/name match API posts (My Creations + Edit work after refresh)
        const savedToken = localStorage.getItem('token');
        const savedUser = localStorage.getItem('user');
        if (savedToken && savedUser) {
          try {
            const parsed = JSON.parse(savedUser);
            setCurrentUser({ ...parsed, id: String(parsed.id) });
          } catch {
            setCurrentUser({ id: 1, name: 'வாசகர்', avatarUrl: 'https://ui-avatars.com/api/?name=User&background=4A6741&color=fff' });
          }
        } else if (savedToken) {
          setCurrentUser({ id: 1, name: 'வாசகர்', avatarUrl: 'https://ui-avatars.com/api/?name=User&background=4A6741&color=fff' });
        }
      } catch (e) {
        console.error("Failed to load data", e);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 300);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigate = (newPage: Page, _id: string | number | null = null, category: Category | null = null, workId: string | null = null) => {
    setPage(newPage);
    if (newPage === 'post') setSelectedPostId(String(_id)); // Convert to string
    if (newPage === 'post-edit') setSelectedPostId(_id ? String(_id) : null);
    if (newPage === 'category') setSelectedCategory(category);
    if (newPage === 'classics') setSelectedClassicalWorkId(workId);
    if (newPage === 'author') setSelectedAuthorId(_id);
    setSearchQuery('');
    window.scrollTo(0, 0);
  };

  const handleSearch = (query: string) => setSearchQuery(query);

  const handleLogin = (userData: User) => {
    const user = { ...userData, id: String(userData.id) };
    setCurrentUser(user);
    try {
      localStorage.setItem('user', JSON.stringify(user));
    } catch {}
    setShowLoginModal(false);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const handlePostSubmit = async (newPost: Omit<Post, '_id' | 'author' | 'likes' | 'comments' | 'createdAt' | '__v'>) => {
    if (!currentUser) {
      setShowLoginModal(true);
      return;
    }

    try {
      const created = await api.createPost({
        ...newPost,
        author: currentUser
      } as any);
      
      if (created) {
        setPosts([created, ...posts]);
      }
      handleNavigate('home');
    } catch (err) {
      alert("படைப்பைச் சேமிப்பதில் சிக்கல் ஏற்பட்டது.");
    }
  };

  const handlePostSave = (updated: Post) => {
    setPosts(prev => prev.map(p => p._id === updated._id ? updated : p));
  };

  const toggleLanguage = () => setLanguage(l => l === 'ta' ? 'en' : 'ta');
  const toggleTheme = () => setTheme(t => t === 'light' ? 'dark' : 'light');

  const renderContent = () => {
    const searchedPosts = posts.filter(post =>
      searchQuery
        ? post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          post.content.toLowerCase().includes(searchQuery.toLowerCase())
        : true
    );

    switch (page) {
      case 'post':
        const post = posts.find(p => p._id === selectedPostId); // Changed from p.id to p._id
        return post
          ? <PostView post={post} onNavigate={handleNavigate} language={language} currentUser={currentUser} />
          : <div className="text-center p-20 font-serif italic text-stone-400">படைப்பு காணப்படவில்லை</div>;
      case 'post-edit':
        const editPost = posts.find(p => p._id === selectedPostId) ?? null;
        return selectedPostId
          ? <EditPostView
              postId={selectedPostId}
              initialPost={editPost}
              onNavigate={handleNavigate}
              language={language}
              currentUser={currentUser}
              onSave={handlePostSave}
            />
          : <div className="text-center p-20 font-serif italic text-stone-400">படைப்பு காணப்படவில்லை</div>;
      case 'editor':
        return <Editor onSubmit={handlePostSubmit} language={language} onNavigate={handleNavigate} />;
      case 'classics':
        return <ClassicsView works={classicalWorks} language={language} selectedWorkId={selectedClassicalWorkId} onNavigate={handleNavigate} />;
      case 'potikal':
        return <PotikalView competitions={competitions} language={language} onNavigate={handleNavigate} />;
      case 'karka':
        return <TamilKarkaView language={language} onNavigate={handleNavigate} />;
      case 'category':
        return (
          <Home
            posts={searchedPosts.filter(p => p.category === selectedCategory)}
            onNavigate={handleNavigate}
            category={selectedCategory}
            language={language}
            searchQuery={searchQuery}
            onSearch={handleSearch}
            currentUser={currentUser}
            isLoading={loading}
          />
        );
      case 'author':
        const authorPosts = searchedPosts.filter(p => String(p.author?.id) === String(selectedAuthorId));
        const authorDetails = authorPosts.length > 0
          ? authorPosts[0].author
          : posts.find(p => String(p.author?.id) === String(selectedAuthorId))?.author
            ?? (currentUser && selectedAuthorId != null && String(currentUser.id) === String(selectedAuthorId)
              ? { id: currentUser.id, name: currentUser.name, email: currentUser.email, avatarUrl: currentUser.avatarUrl }
              : undefined);
        return (
          <Home
            posts={authorPosts}
            onNavigate={handleNavigate}
            language={language}
            searchQuery={searchQuery}
            onSearch={handleSearch}
            currentUser={currentUser}
            isLoading={loading}
            selectedAuthor={authorDetails}
          />
        );
      case 'home':
      default:
        return (
          <Home
            posts={searchedPosts}
            onNavigate={handleNavigate}
            language={language}
            searchQuery={searchQuery}
            onSearch={handleSearch}
            currentUser={currentUser}
            isLoading={loading}
          />
        );
    }
  };

  useEffect(() => {
    if (page === 'author' && currentUser) {
      api.getMyPosts(String(currentUser.id)).then(setPosts).catch(console.error);
    }
  }, [page, currentUser]);

  return (
    <div className="min-h-screen flex flex-col transition-colors duration-500 bg-[#FDFBF7] dark:bg-stone-950 selection:bg-zen-green/20">
      <Header
        currentUser={currentUser}
        onLoginClick={() => setShowLoginModal(true)}
        onLogout={handleLogout}
        onNavigate={handleNavigate}
        language={language}
        theme={theme}
        onToggleLanguage={toggleLanguage}
        onToggleTheme={toggleTheme}
        activePage={page}
        activeCategory={selectedCategory}
        selectedAuthorId={selectedAuthorId}
      />

      <main className="flex-grow flex justify-center pt-[180px] md:pt-[216px] pb-12 px-4">
        <div className="w-full max-w-5xl">
          {renderContent()}
        </div>
      </main>

      <Footer language={language} onNavigate={handleNavigate} />

      {showScrollTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-8 right-8 p-4 rounded-full bg-zen-green text-white shadow-2xl hover:bg-zen-lightGreen transition-all z-50 flex items-center justify-center hover:scale-110 active:scale-95"
          aria-label="Scroll to top"
        >
          <Icon name="arrow-up" />
        </button>
      )}

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLogin={handleLogin}
          language={language}
        />
      )}
    </div>
  );
};

export default App;