import React from 'react';

interface RivaLogoProps {
  className?: string;
  variant?: 'full' | 'compact' | 'symbol';
  light?: boolean;
}

export const RivaLogo: React.FC<RivaLogoProps> = ({
  className = 'h-9',
  variant = 'full',
  light = false
}) => {
  const textColor = light ? '#FAF7F3' : '#1C1C1A';
  const subtitleColor = light ? '#D6BD9A' : '#745548';
  const goldColor = '#D6BD9A';
  const taupeColor = '#A17E70';

  if (variant === 'symbol') {
    return (
      <svg viewBox="0 0 64 64" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="32,2 62,32 32,62 2,32" stroke={goldColor} strokeWidth="2" />
        <polygon points="32,8 56,32 32,56 8,32" stroke={taupeColor} strokeWidth="1.2" strokeDasharray="3 2" />
        <path 
          d="M22,18 L22,46 M22,18 L34,18 C39,18 42,21 42,26 C42,31 39,34 34,34 L22,34 M32,34 L43,46" 
          stroke={textColor} 
          strokeWidth="2.8" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <polygon points="32,2 34,7 32,12 30,7" fill={goldColor} />
        <polygon points="62,32 57,34 52,32 57,30" fill={goldColor} />
        <polygon points="32,62 30,57 32,52 34,57" fill={goldColor} />
        <polygon points="2,32 7,30 12,32 7,34" fill={goldColor} />
      </svg>
    );
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Emblem */}
      <svg viewBox="0 0 64 64" className="h-full aspect-square" fill="none" xmlns="http://www.w3.org/2000/svg">
        <polygon points="32,2 62,32 32,62 2,32" stroke={goldColor} strokeWidth="2" />
        <polygon points="32,8 56,32 32,56 8,32" stroke={taupeColor} strokeWidth="1.2" strokeDasharray="3 2" />
        <path 
          d="M22,18 L22,46 M22,18 L34,18 C39,18 42,21 42,26 C42,31 39,34 34,34 L22,34 M32,34 L43,46" 
          stroke={textColor} 
          strokeWidth="2.8" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
        />
        <polygon points="32,2 34,7 32,12 30,7" fill={goldColor} />
        <polygon points="62,32 57,34 52,32 57,30" fill={goldColor} />
        <polygon points="32,62 30,57 32,52 34,57" fill={goldColor} />
        <polygon points="2,32 7,30 12,32 7,34" fill={goldColor} />
      </svg>

      {/* Wordmark */}
      <div className="flex flex-col justify-center">
        <div 
          className="font-serif text-lg sm:text-xl font-medium tracking-[0.24em] leading-none"
          style={{ color: textColor }}
        >
          RIVA
        </div>
        <div 
          className="font-sans text-[8px] sm:text-[9px] font-semibold tracking-[0.32em] uppercase mt-1 leading-none"
          style={{ color: subtitleColor }}
        >
          JEWELS
        </div>
      </div>
    </div>
  );
};
