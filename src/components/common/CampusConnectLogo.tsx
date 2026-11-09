import React from 'react';

interface CampusConnectLogoProps {
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showText?: boolean;
  className?: string;
}

export const CampusConnectLogo: React.FC<CampusConnectLogoProps> = ({
  size = 'md',
  showText = true,
  className = ''
}) => {
  const getDimensions = () => {
    switch (size) {
      case 'sm':
        return { iconSize: 'w-8 h-8', textSize: 'text-sm', subSize: 'text-[9px]' };
      case 'lg':
        return { iconSize: 'w-14 h-14', textSize: 'text-xl', subSize: 'text-xs' };
      case 'xl':
        return { iconSize: 'w-20 h-20', textSize: 'text-2xl', subSize: 'text-sm' };
      default:
        return { iconSize: 'w-10 h-10', textSize: 'text-base', subSize: 'text-[10px]' };
    }
  };

  const { iconSize, textSize, subSize } = getDimensions();

  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* App Icon matching uploaded logo */}
      <div
        className={`${iconSize} rounded-2xl relative shrink-0 overflow-hidden shadow-md shadow-indigo-500/20 flex items-center justify-center p-1.5`}
        style={{
          background: 'linear-gradient(135deg, #10b981 0%, #06b6d4 35%, #3b82f6 70%, #7c3aed 100%)'
        }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
          {/* Back Chat Bubble with Student & Mortarboard Cap */}
          <path
            d="M48 28C48 23.5817 51.5817 20 56 20H84C88.4183 20 92 23.5817 92 28V54C92 58.4183 88.4183 62 84 62H76L68 70V62H56C51.5817 62 48 58.4183 48 54V28Z"
            fill="white"
            fillOpacity="0.32"
          />
          {/* Mortarboard graduation cap on the back bubble */}
          <path
            d="M70 12L88 20L70 28L52 20L70 12Z"
            fill="white"
          />
          <path
            d="M60 25.5V33C60 36 64.5 38.5 70 38.5C75.5 38.5 80 36 80 33V25.5"
            stroke="white"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
          <path
            d="M84 21.5V35"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
          />
          {/* Back bubble avatar */}
          <circle cx="70" cy="46" r="6" fill="white" />
          <path
            d="M60 60C60 55 64.5 54 70 54C75.5 54 80 55 80 60"
            fill="white"
          />

          {/* Front Chat Bubble (solid white) */}
          <path
            d="M12 24C12 18.4772 16.4772 14 22 14H54C59.5228 14 64 18.4772 64 24V50C64 55.5228 59.5228 60 54 60H30L18 68V60H22C16.4772 60 12 55.5228 12 50V24Z"
            fill="white"
          />
          {/* Front bubble blue silhouette student avatar */}
          <circle cx="38" cy="34" r="8" fill="#0284c7" />
          <path
            d="M24 53C24 46.5 30 45 38 45C46 45 52 46.5 52 53"
            fill="#0284c7"
          />

          {/* Text underneath in icon if standalone */}
          <text
            x="50"
            y="88"
            textAnchor="middle"
            fill="white"
            fontSize="12.5"
            fontWeight="800"
            fontFamily="system-ui, -apple-system, sans-serif"
            letterSpacing="-0.3"
          >
            CampusConnect
          </text>
        </svg>
      </div>

      {showText && (
        <div className="leading-tight">
          <span className={`font-bold text-slate-900 tracking-tight block ${textSize}`}>
            Campus<span className="text-indigo-600">Connect</span>
          </span>
          <span className={`font-semibold text-slate-400 uppercase tracking-wider block ${subSize}`}>
            Smart University Portal
          </span>
        </div>
      )}
    </div>
  );
};
