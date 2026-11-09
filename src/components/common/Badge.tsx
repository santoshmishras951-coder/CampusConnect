import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext.tsx';

export type BadgeVariant =
  | 'pending'
  | 'approved'
  | 'rejected'
  | 'assigned'
  | 'in_progress'
  | 'resolved'
  | 'closed'
  | 'urgent'
  | 'high'
  | 'medium'
  | 'low'
  | 'present'
  | 'absent'
  | 'late'
  | 'excused'
  | 'default';

interface BadgeProps {
  variant: BadgeVariant | string;
  label?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ variant, label, className = '' }) => {
  const { t } = useLanguage();

  const getStyleAndDefaultLabel = (): { style: string; defaultLabel: string } => {
    switch (variant) {
      case 'pending':
        return {
          style: 'bg-amber-50 text-amber-700 border-amber-200 ring-amber-600/20',
          defaultLabel: t.pending
        };
      case 'approved':
        return {
          style: 'bg-emerald-50 text-emerald-700 border-emerald-200 ring-emerald-600/20',
          defaultLabel: t.approved
        };
      case 'rejected':
        return {
          style: 'bg-rose-50 text-rose-700 border-rose-200 ring-rose-600/20',
          defaultLabel: t.rejected
        };
      case 'assigned':
        return {
          style: 'bg-blue-50 text-blue-700 border-blue-200 ring-blue-600/20',
          defaultLabel: t.assigned
        };
      case 'in_progress':
        return {
          style: 'bg-indigo-50 text-indigo-700 border-indigo-200 ring-indigo-600/20',
          defaultLabel: t.inProgress
        };
      case 'resolved':
        return {
          style: 'bg-teal-50 text-teal-700 border-teal-200 ring-teal-600/20',
          defaultLabel: t.resolved
        };
      case 'closed':
        return {
          style: 'bg-slate-100 text-slate-700 border-slate-200 ring-slate-600/20',
          defaultLabel: t.closed
        };
      case 'urgent':
        return {
          style: 'bg-red-100 text-red-800 border-red-300 font-semibold ring-red-600/20',
          defaultLabel: 'Urgent'
        };
      case 'high':
        return {
          style: 'bg-orange-50 text-orange-700 border-orange-200 ring-orange-600/20',
          defaultLabel: 'High'
        };
      case 'medium':
        return {
          style: 'bg-yellow-50 text-yellow-800 border-yellow-200 ring-yellow-600/20',
          defaultLabel: 'Medium'
        };
      case 'low':
        return {
          style: 'bg-slate-100 text-slate-600 border-slate-200 ring-slate-500/10',
          defaultLabel: 'Low'
        };
      case 'present':
        return {
          style: 'bg-emerald-100 text-emerald-800 border-emerald-200',
          defaultLabel: 'Present'
        };
      case 'absent':
        return {
          style: 'bg-rose-100 text-rose-800 border-rose-200',
          defaultLabel: 'Absent'
        };
      case 'late':
        return {
          style: 'bg-amber-100 text-amber-800 border-amber-200',
          defaultLabel: 'Late'
        };
      case 'excused':
        return {
          style: 'bg-sky-100 text-sky-800 border-sky-200',
          defaultLabel: 'Excused'
        };
      default:
        return {
          style: 'bg-slate-100 text-slate-700 border-slate-200',
          defaultLabel: label || variant
        };
    }
  };

  const { style, defaultLabel } = getStyleAndDefaultLabel();

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${style} ${className}`}
    >
      {label || defaultLabel}
    </span>
  );
};
