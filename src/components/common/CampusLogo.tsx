import React from 'react';

interface CampusLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showSubtitle?: boolean;
  className?: string;
  lightMode?: boolean;
}

export const CampusLogo: React.FC<CampusLogoProps> = ({
  size = 'md',
  showSubtitle = true,
  className = '',
  lightMode = false
}) => {
  const getIconSize = () => {
    switch (size) {
      case 'sm':
        return 'w-8 h-8';
      case 'lg':
        return 'w-12 h-12';
      case 'xl':
        return 'w-16 h-16';
      default:
        return 'w-10 h-10';
    }
  };

  const getTextClasses = () => {
    switch (size) {
      case 'sm':
        return { title: 'text-sm font-bold', sub: 'text-[9px]' };
      case 'lg':
        return { title: 'text-xl font-extrabold tracking-tight', sub: 'text-xs' };
      case 'xl':
        return { title: 'text-2xl sm:text-3xl font-extrabold tracking-tight', sub: 'text-xs' };
      default:
        return { title: 'text-base font-bold tracking-tight', sub: 'text-[10px]' };
    }
  };

  const { title, sub } = getTextClasses();

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Precision Vector Emblem for CampusConnect */}
      <div
        className={`${getIconSize()} rounded-xl bg-gradient-to-tr from-indigo-700 via-indigo-600 to-sky-500 p-0.5 shadow-md shadow-indigo-500/20 flex items-center justify-center shrink-0 ring-1 ring-white/20`}
      >
        <svg
          viewBox="0 0 40 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full p-1"
        >
          {/* Mortarboard Academic Cap */}
          <path
            d="M20 7L34 14L20 21L6 14L20 7Z"
            fill="white"
            stroke="white"
            strokeWidth="0.5"
          />
          <path
            d="M11 17.5V25C11 28.5 15 31.5 20 31.5C25 31.5 29 28.5 29 25V17.5"
            stroke="white"
            strokeWidth="2.2"
            strokeLinecap="round"
          />
          {/* Graduation Tassel with Connectivity Node */}
          <path
            d="M31 16.5V24C31 24.5 32 25 32.5 25"
            stroke="#93C5FD"
            strokeWidth="1.8"
            strokeLinecap="round"
          />
          <circle cx="32.5" cy="25" r="1.5" fill="#FDE047" />
          {/* Connecting digital nodes beneath */}
          <circle cx="20" cy="24" r="2" fill="#E0E7FF" />
          <path
            d="M16 25L13 28M24 25L27 28"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <circle cx="13" cy="28" r="1.5" fill="#38BDF8" />
          <circle cx="27" cy="28" r="1.5" fill="#38BDF8" />
        </svg>
      </div>

      <div className="leading-tight">
        <span
          className={`block ${title} ${
            lightMode
              ? 'text-white'
              : 'text-slate-900 bg-gradient-to-r from-slate-900 via-indigo-950 to-indigo-800 bg-clip-text text-transparent'
          }`}
        >
          CampusConnect
        </span>
        {showSubtitle && (
          <span
            className={`block ${sub} uppercase font-bold tracking-wider ${
              lightMode ? 'text-indigo-200' : 'text-indigo-600'
            }`}
          >
            Smart Campus Portal
          </span>
        )}
      </div>
    </div>
  );
};
