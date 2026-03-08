
import React from 'react';

interface SkeletonProps {
  variant?: 'default' | 'minimal';
}

export const Skeleton: React.FC<SkeletonProps> = ({ variant = 'default' }) => {
  if (variant === 'minimal') {
    return (
      <div className="bg-white dark:bg-[#1a1a1a] rounded-3xl p-8 border border-stone-50 dark:border-stone-900 h-full flex flex-col animate-pulse shadow-[0_4px_20px_rgba(0,0,0,0.03)]">
        <div className="h-6 w-1/2 bg-stone-100 dark:bg-neutral-800 rounded-lg mb-4"></div>
        <div className="space-y-2">
            <div className="h-3 w-full bg-stone-50 dark:bg-neutral-900 rounded-full"></div>
            <div className="h-3 w-4/5 bg-stone-50 dark:bg-neutral-900 rounded-full"></div>
        </div>
        <div className="flex gap-4 mt-6">
            <div className="h-2 w-16 bg-stone-50 dark:bg-neutral-900 rounded-full"></div>
            <div className="h-2 w-16 bg-stone-50 dark:bg-neutral-900 rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-[#1a1a1a] rounded-[2.5rem] p-6 sm:p-8 border border-stone-100 dark:border-stone-800 h-full flex flex-col animate-pulse">
      {/* Top Meta Skeleton */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-4 w-20 bg-stone-200 dark:bg-neutral-800 rounded-full"></div>
        <div className="h-4 w-24 bg-stone-200 dark:bg-neutral-800 rounded-full"></div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-grow mb-6 space-y-3">
         <div className="h-8 w-3/4 bg-stone-200 dark:bg-neutral-800 rounded-lg"></div>
         <div className="h-4 w-full bg-stone-100 dark:bg-neutral-800/50 rounded-full mt-4"></div>
         <div className="h-4 w-full bg-stone-100 dark:bg-neutral-800/50 rounded-full"></div>
         <div className="h-4 w-2/3 bg-stone-100 dark:bg-neutral-800/50 rounded-full"></div>
      </div>

      {/* Divider Skeleton */}
      <div className="h-px w-full bg-stone-100 dark:bg-neutral-800 mb-5"></div>

      {/* Footer Skeleton */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
             <div className="w-8 h-8 rounded-full bg-stone-200 dark:bg-neutral-800"></div>
             <div className="h-4 w-24 bg-stone-200 dark:bg-neutral-800 rounded-full"></div>
        </div>
        <div className="flex gap-4">
            <div className="h-4 w-8 bg-stone-200 dark:bg-neutral-800 rounded-full"></div>
            <div className="h-4 w-8 bg-stone-200 dark:bg-neutral-800 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};
