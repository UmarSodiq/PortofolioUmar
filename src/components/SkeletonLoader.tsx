import React from 'react';

export function SkeletonLoader() {
  return (
    <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20 space-y-20">
      {/* Section Skeleton */}
      <div className="space-y-8">
        <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-1/3 animate-pulse"></div>
        <div className="bg-white dark:bg-zinc-900 p-6 sm:p-10 rounded-[2.5rem] border border-black/[0.04] dark:border-white/5 shadow-sm">
           <div className="space-y-6">
             <div className="h-8 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-1/4 animate-pulse"></div>
             <div className="h-32 bg-zinc-200 dark:bg-zinc-800 rounded-3xl w-full animate-pulse"></div>
             <div className="h-32 bg-zinc-200 dark:bg-zinc-800 rounded-3xl w-full animate-pulse"></div>
           </div>
        </div>
      </div>
      
      {/* Projects Skeleton */}
      <div className="space-y-8">
        <div className="h-10 bg-zinc-200 dark:bg-zinc-800 rounded-lg w-1/4 animate-pulse"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="h-[400px] bg-zinc-200 dark:bg-zinc-800 rounded-[2rem] animate-pulse"></div>
          <div className="h-[400px] bg-zinc-200 dark:bg-zinc-800 rounded-[2rem] animate-pulse"></div>
        </div>
      </div>
    </div>
  );
}
