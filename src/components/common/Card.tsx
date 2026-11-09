import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
  headerBorder?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className = '',
  title,
  subtitle,
  action,
  headerBorder = true
}) => {
  return (
    <div className={`bg-white dark:bg-slate-950 rounded-xl border border-slate-200/80 dark:border-slate-800 shadow-xs overflow-hidden ${className}`}>
      {(title || subtitle || action) && (
        <div className={`px-5 py-4 flex flex-wrap items-center justify-between gap-3 ${headerBorder ? 'border-b border-slate-100 dark:border-slate-800' : ''}`}>
          <div>
            {title && <h3 className="font-semibold text-slate-800 dark:text-slate-100 text-base">{title}</h3>}
            {subtitle && <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{subtitle}</p>}
          </div>
          {action && <div className="flex items-center gap-2">{action}</div>}
        </div>
      )}
      <div className="p-5 text-slate-800 dark:text-slate-200">{children}</div>
    </div>
  );
};
