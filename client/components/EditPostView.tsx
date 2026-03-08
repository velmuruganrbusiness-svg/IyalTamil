import React, { useState, useEffect } from 'react';
import type { Post, Category, User } from '../types';
import { Icon } from './Icon';
import { t, Language } from '../utils/translations';
import { SEO } from './SEO';
import { Breadcrumbs } from './Breadcrumbs';
import { api } from '../services/api';
import { CommentsSection } from './CommentsSection';

interface EditPostViewProps {
  postId: string;
  initialPost?: Post | null;
  onNavigate: (page: 'home' | 'category' | 'post' | 'author', id?: string | null, category?: Category | null) => void;
  language: Language;
  currentUser?: User | null;
  onSave: (updated: Post) => void;
}

export const EditPostView: React.FC<EditPostViewProps> = ({
  postId,
  initialPost,
  onNavigate,
  language,
  currentUser,
  onSave,
}) => {
  const [post, setPost] = useState<Post | null>(initialPost ?? null);
  const [title, setTitle] = useState(initialPost?.title ?? '');
  const [content, setContent] = useState(initialPost?.content ?? '');
  const [loading, setLoading] = useState(!initialPost);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (initialPost) {
      setPost(initialPost);
      setTitle(initialPost.title);
      setContent(initialPost.content);
      return;
    }
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const p = await api.getPost(postId);
        if (!cancelled && p) {
          setPost(p);
          setTitle(p.title);
          setContent(p.content);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [postId, initialPost?._id]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) return;
    setSaving(true);
    setError('');
    try {
      const updated = await api.updatePost(postId, { title: title.trim(), content: content.trim() });
      if (updated) {
        setPost(updated);
        onSave(updated);
      }
    } catch (err: any) {
      setError(err.message || (language === 'ta' ? 'சேமிப்பில் பிழை.' : 'Error saving.'));
    } finally {
      setSaving(false);
    }
  };

  const breadcrumbs = post
    ? [
        { label: t('home', language), onClick: () => onNavigate('home') },
        { label: post.category, onClick: () => onNavigate('category', null, post.category as Category) },
        { label: post.title, onClick: () => onNavigate('post', post._id) },
        { label: t('editCreation', language), active: true },
      ]
    : [{ label: t('home', language), onClick: () => onNavigate('home') }, { label: t('editCreation', language), active: true }];

  if (loading || !post) {
    return (
      <div className="max-w-4xl mx-auto pt-4 pb-32 px-4 animate-subtle-fade bg-bone dark:bg-stone-950">
        <Breadcrumbs items={breadcrumbs} />
        <div className="py-20 text-center text-stone-500 dark:text-stone-400 font-serif italic">
          {language === 'ta' ? 'ஏற்றுகிறது...' : 'Loading...'}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto pt-4 pb-32 px-4 animate-subtle-fade bg-bone dark:bg-stone-950">
      <SEO title={`${t('editCreation', language)}: ${post.title} | VetriZen`} />

      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
        <Breadcrumbs items={breadcrumbs} />
        <button
          type="button"
          onClick={() => onNavigate('post', post._id)}
          className="flex items-center gap-2 text-xs font-bold text-stone-500 hover:text-zen-green transition-all uppercase tracking-widest px-2 py-1"
        >
          <Icon name="chevron-left" />
          <span>{language === 'ta' ? 'பார்வைக்கு திரும்பு' : 'Back to view'}</span>
        </button>
      </div>

      <div className="mb-10 text-center">
        <h2 className="text-xl md:text-2xl font-bold font-tamil text-stone-900 dark:text-stone-100">
          {t('editCreation', language)}
        </h2>
      </div>

      <div className="bg-white dark:bg-stone-900 rounded-[2rem] shadow-xl border border-stone-200 dark:border-stone-800 overflow-hidden">
        <form onSubmit={handleSave} className="p-6 md:p-10 space-y-6">
          <div>
            <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">
              {t('title', language)}
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t('titlePlaceholder', language)}
              className="w-full px-4 py-3 md:py-4 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl font-tamil text-lg text-stone-700 dark:text-stone-200 focus:ring-2 focus:ring-zen-green/30 focus:border-zen-green transition-all"
              required
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest mb-2">
              {t('content', language)}
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={14}
              placeholder={t('contentPlaceholder', language)}
              className="w-full px-4 py-3 md:py-4 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-xl font-tamil text-base leading-relaxed text-stone-700 dark:text-stone-200 focus:ring-2 focus:ring-zen-green/30 focus:border-zen-green transition-all resize-none"
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div className="pt-4 border-t border-stone-100 dark:border-stone-800 flex flex-wrap items-center justify-end gap-3">
            <button
              type="button"
              onClick={() => onNavigate('post', post._id)}
              className="px-5 py-2.5 rounded-xl font-bold text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 border border-stone-200 dark:border-stone-700 transition-all"
            >
              {language === 'ta' ? 'ரத்து' : 'Cancel'}
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-2.5 rounded-xl font-bold text-white bg-zen-green hover:bg-zen-lightGreen disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-zen-green/20"
            >
              {saving ? (language === 'ta' ? 'சேமிக்கிறது...' : 'Saving...') : t('saveChanges', language)}
            </button>
          </div>
        </form>
      </div>

      <div className="mt-12">
        <CommentsSection
          postId={postId}
          language={language}
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};
