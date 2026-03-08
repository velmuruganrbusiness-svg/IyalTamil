import React, { useState } from 'react';
import { api } from '../services/api';

const WritePage: React.FC = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [status, setStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim() || !content.trim()) {
      setStatus({ type: 'error', message: 'Please fill in both title and content.' });
      return;
    }

    setIsSubmitting(true);
    setStatus(null);

    try {
      // Fixed: Type 'string' is not assignable to type 'User'.
      // Changed the author string to a User object to match the Post type definition in client/types.ts.
      await api.createPost({
        title: title.trim(),
        content: content.trim(),
        author: { id: '0', name: "Anonymous" },
        category: "கவிதை"
      });

      setStatus({ type: 'success', message: '✅ Published!' });
      setTitle('');
      setContent('');
    } catch (err: any) {
      setStatus({ type: 'error', message: `❌ Error: ${err.message}` });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 md:p-8 animate-subtle-fade">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-black font-tamil text-stone-900 dark:text-stone-100 mb-2">புதிய படைப்பு</h1>
        <p className="text-stone-500 dark:text-stone-400 font-medium">Draft your next masterpiece in the Zen sanctuary.</p>
      </div>

      <div className="bg-white dark:bg-stone-900 rounded-[2.5rem] shadow-xl border border-stone-200 dark:border-stone-800 overflow-hidden">
        <form onSubmit={handleSubmit} className="p-8 md:p-12 space-y-8">
          {status && (
            <div 
              className={`p-4 rounded-2xl font-bold text-center animate-subtle-fade ${
                status.type === 'success' 
                  ? 'bg-zen-green/10 text-zen-green border border-zen-green/20' 
                  : 'bg-red-50 text-red-600 border border-red-100'
              }`}
            >
              {status.message}
            </div>
          )}

          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest px-1">
              Title / தலைப்பு
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title here..."
              className="w-full p-4 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-2xl font-bold text-lg text-stone-700 dark:text-stone-200 focus:ring-2 focus:ring-zen-green/20 focus:border-zen-green transition-all outline-none"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-xs font-bold text-stone-400 uppercase tracking-widest px-1">
              Content / உள்ளடக்கம்
            </label>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              placeholder="Write your heart here..."
              className="w-full p-6 bg-stone-50 dark:bg-stone-950 border border-stone-200 dark:border-stone-800 rounded-3xl font-tamil text-xl leading-relaxed text-stone-700 dark:text-stone-200 focus:ring-2 focus:ring-zen-green/20 focus:border-zen-green transition-all outline-none resize-none"
              required
            />
          </div>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-stone-100 dark:border-stone-800">
            <p className="text-sm text-stone-400 italic">
              Your work will be preserved in the digital sanctuary of VetriZen.
            </p>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full sm:w-auto px-12 py-4 rounded-2xl font-bold text-white shadow-lg transition-all transform active:scale-95 ${
                isSubmitting 
                  ? 'bg-stone-400 cursor-not-allowed opacity-70' 
                  : 'bg-zen-green hover:bg-zen-lightGreen shadow-zen-green/20'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Publishing...
                </span>
              ) : 'Publish Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default WritePage;