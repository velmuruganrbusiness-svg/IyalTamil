
import React, { useState } from 'react';
import type { Post, User } from '../types';
import { Icon } from './Icon';

interface PostCardProps {
  post: Post;
  onNavigate: (page: 'post' | 'author', id: string) => void;
  currentUser?: User | null;
  variant?: 'default' | 'minimal' | 'related';
}

export const PostCard: React.FC<PostCardProps> = ({ post, onNavigate, currentUser, variant = 'default' }) => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(post.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isLiked) {
        setLikeCount(prev => prev - 1);
        setIsLiked(false);
    } else {
        setLikeCount(prev => prev + 1);
        setIsLiked(true);
    }
  };

  const handleAuthorClick = (e: React.MouseEvent) => {
      e.stopPropagation();
      onNavigate('author', post.author.id);
  };
  
  const formattedDate = new Date(post.createdAt).toLocaleDateString('ta-IN', { 
    month: 'short', 
    day: 'numeric', 
    year: 'numeric' 
  });

  if (variant === 'related') {
      return (
        <article 
          onClick={() => onNavigate('post', post._id)}
          className="group bg-white dark:bg-stone-900 p-7 rounded-[20px] shadow-[0_4px_15px_rgba(0,0,0,0.04)] hover:bg-stone-50 dark:hover:bg-stone-800/50 transition-all duration-300 cursor-pointer flex flex-col h-full border border-stone-100 dark:border-stone-800"
        >
            <h4 className="text-[19px] font-bold font-tamil-serif text-zen-green mb-5 line-clamp-2 leading-snug">
                {post.title}
            </h4>
            <div className="mt-auto flex flex-col gap-1">
                <span className="text-[12px] font-medium text-[#555555] dark:text-stone-400 uppercase tracking-wider">
                    {post.author.name}
                </span>
                <span className="text-[11px] text-stone-400 font-normal">
                    {formattedDate}
                </span>
            </div>
        </article>
      );
  }

  if (variant === 'minimal') {
      return (
        <article 
          onClick={() => onNavigate('post', post._id)}
          className="group relative bg-white dark:bg-stone-900 border border-stone-100 dark:border-stone-800 p-10 rounded-[20px] shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.06)] hover:-translate-y-1.5 transition-all duration-500 cursor-pointer flex flex-col"
        >
            <div className="flex-grow">
                <h3 className="text-2xl font-bold font-tamil-serif text-zen-green mb-5 group-hover:text-zen-lightGreen transition-colors duration-500">
                    {post.title}
                </h3>
                <p className="text-stone-500 dark:text-stone-400 font-tamil-serif text-lg leading-[2.0] line-clamp-2 italic group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-colors duration-500">
                    {post.content}
                </p>
            </div>
            
            <div className="flex items-center gap-2 mt-3 text-[14px] text-[#555555] dark:text-stone-400">
                <span 
                    className="font-medium hover:text-[#5A7D5B] hover:underline hover:decoration-[#5A7D5B]/30 transition-all duration-300 cursor-pointer uppercase tracking-[0.12em]"
                    onClick={handleAuthorClick}
                >
                    {post.author.name}
                </span>
                <span className="opacity-40 font-sans text-xs select-none">•</span>
                <span className="font-normal uppercase tracking-[0.12em]">
                    {formattedDate}
                </span>
            </div>
        </article>
      );
  }

  const snippet = post.content.substring(0, 160) + (post.content.length > 160 ? '...' : '');

  return (
    <article 
      onClick={() => onNavigate('post', post._id)}
      className="group relative bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-800 pb-12 p-8 rounded-3xl shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer flex flex-col h-full"
    >
      <div className="flex items-center gap-3 mb-6">
        <span className="text-[10px] font-bold tracking-widest uppercase text-zen-green/60">
           {post.category}
        </span>
      </div>

      <div className="flex-grow">
         <h3 className="text-3xl sm:text-4xl font-bold font-tamil-serif mb-6 text-stone-900 dark:text-stone-100 leading-tight group-hover:text-zen-green transition-colors duration-500">
            {post.title}
         </h3>
         <p className="text-stone-600 dark:text-stone-400 font-tamil-serif text-lg sm:text-xl leading-relaxed line-clamp-4 italic">
            {snippet}
         </p>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div className="flex items-center gap-3">
             <img 
                src={post.author.avatarUrl} 
                alt={post.author.name} 
                className="w-8 h-8 rounded-full object-cover grayscale opacity-80 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-500" 
             />
             <div className="flex items-center gap-2 text-[14px] text-[#555555] dark:text-stone-400">
                <span 
                    className="font-medium hover:text-[#5A7D5B] hover:underline hover:decoration-[#5A7D5B]/30 transition-all duration-300 cursor-pointer uppercase tracking-wider"
                    onClick={handleAuthorClick}
                >
                    {post.author.name}
                </span>
                <span className="opacity-40 font-sans text-xs select-none">•</span>
                <span className="font-normal uppercase tracking-wider">
                    {formattedDate}
                </span>
             </div>
        </div>

        <div className="flex items-center gap-6 text-stone-400 text-xs">
            <button 
                onClick={handleLike}
                className={`flex items-center gap-1.5 transition-colors ${isLiked ? 'text-zen-terracotta' : 'hover:text-zen-green'}`}
            >
                <Icon name="like" isFilled={isLiked} />
                <span className="font-bold">{likeCount}</span>
            </button>
            <div className="flex items-center gap-1.5">
                <Icon name="comment" />
                <span className="font-bold">{post.comments.length}</span>
            </div>
        </div>
      </div>
    </article>
  );
};
