import React from 'react';

interface SkeletonLoaderProps {
  lines?: number;
  className?: string;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({ lines = 3, className = '' }) => {
  return (
    <div className={`space-y-3 animate-pulse ${className}`} role="status" aria-label="Loading content">
      {Array.from({ length: lines }).map((_, i) => (
        <div
          key={i}
          className="h-4 bg-slate-200 rounded-md"
          style={{ width: `${Math.max(45, 95 - i * 15)}%` }}
        />
      ))}
      <span className="sr-only">Loading...</span>
    </div>
  );
};
