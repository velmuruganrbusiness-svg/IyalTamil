import React, { useState, useEffect } from 'react';
import { t, Language } from '../utils/translations';
import { api, type CommentResponse } from '../services/api';
import type { User } from '../types';

interface CommentsSectionProps {
  postId: string;
  language: Language;
  currentUser?: User | null;
  onCommentAdded?: () => void;
}

export const CommentsSection: React.FC<CommentsSectionProps> = ({
  postId,
  language,
  currentUser,
  onCommentAdded,
}) => {
  const [comments, setComments] = useState<CommentResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [commentText, setCommentText] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  const fetchComments = async () => {
    setLoading(true);
    try {
      const list = await api.getComments(postId);
      setComments(list);
    } catch {
      setComments([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComments();
  }, [postId]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const text = commentText.trim();
    if (!text) return;
    setSubmitting(true);
    setError('');
    try {
      await api.createComment(postId, text, currentUser ?? undefined);
      setCommentText('');
      await fetchComments();
      onCommentAdded?.();
    } catch (err: any) {
      setError(err.message || t('submitComment', language));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="mt-12 pt-10 border-t border-stone-200 dark:border-stone-800">
      <h3 className="text-base font-bold font-tamil text-stone-800 dark:text-stone-200 mb-6 uppercase tracking-[0.1em]">
        {t('comments', language)}
      </h3>

      {loading ? (
        <p className="text-stone-500 dark:text-stone-400 text-sm py-4">{language === 'ta' ? 'ஏற்றுகிறது...' : 'Loading...'}</p>
      ) : (
        <ul className="space-y-4 mb-8">
          {comments.length === 0 ? (
            <li className="text-stone-500 dark:text-stone-400 text-sm py-2 font-serif italic">
              {language === 'ta' ? 'இன்னும் கருத்துகள் இல்லை.' : 'No comments yet.'}
            </li>
          ) : (
            comments.map((c) => (
              <li
                key={c.id}
                className="bg-stone-50 dark:bg-stone-900/50 rounded-xl px-4 py-3 border border-stone-100 dark:border-stone-800"
              >
                <p className="font-tamil text-stone-800 dark:text-stone-200 text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                  {c.text}
                </p>
                <p className="mt-2 text-xs text-stone-500 dark:text-stone-400">
                  {c.user?.name ?? 'வாசகர்'} · {new Date(c.createdAt).toLocaleDateString('ta-IN', { dateStyle: 'medium' })}
                </p>
              </li>
            ))
          )}
        </ul>
      )}

      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
        <input
          type="text"
          value={commentText}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder={t('postCommentPlaceholder', language)}
          className="flex-1 min-w-0 px-4 py-3 rounded-xl border border-stone-200 dark:border-stone-700 bg-white dark:bg-stone-900 text-stone-800 dark:text-stone-200 placeholder-stone-400 focus:ring-2 focus:ring-zen-green/30 focus:border-zen-green transition-all text-sm md:text-base font-tamil"
          maxLength={500}
        />
        <button
          type="submit"
          disabled={submitting || !commentText.trim()}
          className="px-6 py-3 rounded-xl font-bold text-white bg-zen-green hover:bg-zen-lightGreen disabled:opacity-50 disabled:cursor-not-allowed transition-all text-sm whitespace-nowrap"
        >
          {submitting ? (language === 'ta' ? 'பதிவு...' : 'Posting...') : t('submitComment', language)}
        </button>
      </form>
      {error && <p className="mt-2 text-red-500 text-sm">{error}</p>}
    </section>
  );
};
