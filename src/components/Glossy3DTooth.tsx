import React from 'react';

interface Glossy3DToothProps {
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  showShadow?: boolean;
  animated?: boolean;
  withSparkles?: boolean;
}

export const Glossy3DTooth: React.FC<Glossy3DToothProps> = ({
  size = 'md',
  className = '',
  showShadow = true,
  animated = true,
  withSparkles = true,
}) => {
  const sizeMap = {
    xs: { width: 22, height: 24, shadowH: 4, shadowW: 18 },
    sm: { width: 32, height: 36, shadowH: 6, shadowW: 26 },
    md: { width: 56, height: 62, shadowH: 10, shadowW: 46 },
    lg: { width: 96, height: 106, shadowH: 14, shadowW: 76 },
    xl: { width: 130, height: 144, shadowH: 18, shadowW: 100 },
  };

  const currentSize = sizeMap[size] || sizeMap.md;

  return (
    <div className={`relative inline-flex flex-col items-center justify-center select-none ${className}`}>
      {/* Sparkle 1 */}
      {withSparkles && (size === 'lg' || size === 'xl') && (
        <div className="absolute -top-1 -right-1 text-orange-300 animate-pulse pointer-events-none z-20">
          <svg className="w-5 h-5 filter drop-shadow-[0_0_8px_#FF8A3D]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </div>
      )}

      {/* Sparkle 2 */}
      {withSparkles && size === 'xl' && (
        <div className="absolute top-1/2 -left-2 text-white/90 animate-pulse delay-700 pointer-events-none z-20">
          <svg className="w-3.5 h-3.5 filter drop-shadow-[0_0_6px_#ffffff]" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0L14.5 9.5L24 12L14.5 14.5L12 24L9.5 14.5L0 12L9.5 9.5L12 0Z" />
          </svg>
        </div>
      )}

      {/* 3D Glossy Vector Tooth */}
      <div className={animated ? 'animate-[float3d_3.2s_ease-in-out_infinite]' : ''}>
        <svg
          width={currentSize.width}
          height={currentSize.height}
          viewBox="0 0 120 132"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="filter drop-shadow-[0_12px_24px_rgba(255,138,61,0.28)] transition-transform duration-300"
        >
          <defs>
            {/* Primary Porcelain Crown Gradient */}
            <linearGradient id={`porcelainGrad-${size}`} x1="15" y1="10" x2="105" y2="125" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" />
              <stop offset="28%" stopColor="#F5F9FD" />
              <stop offset="65%" stopColor="#E0EAF6" />
              <stop offset="100%" stopColor="#BACCE0" />
            </linearGradient>

            {/* Pearlescent Warm Sheen */}
            <linearGradient id={`pearlSheen-${size}`} x1="30" y1="5" x2="90" y2="70" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
              <stop offset="50%" stopColor="#FFF2E8" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#FFE0CC" stopOpacity="0" />
            </linearGradient>

            {/* Specular Highlight Gloss Curve */}
            <linearGradient id={`specularHighlight-${size}`} x1="35" y1="12" x2="60" y2="48" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FFFFFF" stopOpacity="1" />
              <stop offset="40%" stopColor="#FFFFFF" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FFFFFF" stopOpacity="0" />
            </linearGradient>

            {/* Deep Root Shadow Gradient */}
            <linearGradient id={`rootShadow-${size}`} x1="60" y1="50" x2="60" y2="120" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#9BB5D1" stopOpacity="0" />
              <stop offset="100%" stopColor="#6C8CAE" stopOpacity="0.6" />
            </linearGradient>

            {/* Amber/Orange Ambient Rim Light */}
            <linearGradient id={`rimLight-${size}`} x1="0" y1="60" x2="120" y2="60" gradientUnits="userSpaceOnUse">
              <stop offset="0%" stopColor="#FF9E54" stopOpacity="0.4" />
              <stop offset="25%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="75%" stopColor="#FFFFFF" stopOpacity="0" />
              <stop offset="100%" stopColor="#FF7A1A" stopOpacity="0.45" />
            </linearGradient>

            {/* Inner Glow Filter */}
            <filter id={`toothGlow-${size}`} x="-10%" y="-10%" width="120%" height="120%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>

          {/* Base Tooth Anatomy Shape (Crown + 2 Roots) */}
          <path
            d="M60 16 
               C42 16 32 10 18 22 
               C6 32 6 52 14 74 
               C18 84 24 98 28 118 
               C30 125 38 126 44 120 
               C50 114 54 94 60 92 
               C66 94 70 114 76 120 
               C82 126 90 125 92 118 
               C96 98 102 84 106 74 
               C114 52 114 32 102 22 
               C88 10 78 16 60 16 Z"
            fill={`url(#porcelainGrad-${size})`}
          />

          {/* Warm Pearlescent Surface Reflection */}
          <path
            d="M60 16 
               C42 16 32 10 18 22 
               C6 32 6 52 14 74 
               C18 84 24 98 28 118 
               C30 125 38 126 44 120 
               C50 114 54 94 60 92 
               C66 94 70 114 76 120 
               C82 126 90 125 92 118 
               C96 98 102 84 106 74 
               C114 52 114 32 102 22 
               C88 10 78 16 60 16 Z"
            fill={`url(#pearlSheen-${size})`}
          />

          {/* Root Shading / Depth Bifurcation */}
          <path
            d="M60 16 
               C42 16 32 10 18 22 
               C6 32 6 52 14 74 
               C18 84 24 98 28 118 
               C30 125 38 126 44 120 
               C50 114 54 94 60 92 
               C66 94 70 114 76 120 
               C82 126 90 125 92 118 
               C96 98 102 84 106 74 
               C114 52 114 32 102 22 
               C88 10 78 16 60 16 Z"
            fill={`url(#rootShadow-${size})`}
          />

          {/* Lateral Rim Glow */}
          <path
            d="M60 16 
               C42 16 32 10 18 22 
               C6 32 6 52 14 74 
               C18 84 24 98 28 118 
               C30 125 38 126 44 120 
               C50 114 54 94 60 92 
               C66 94 70 114 76 120 
               C82 126 90 125 92 118 
               C96 98 102 84 106 74 
               C114 52 114 32 102 22 
               C88 10 78 16 60 16 Z"
            fill={`url(#rimLight-${size})`}
          />

          {/* Central Crown Dip Contour (Occlusal Groove Shadow) */}
          <path
            d="M48 24 C55 28 65 28 72 24 C68 36 52 36 48 24 Z"
            fill="#8FAECB"
            fillOpacity="0.25"
          />

          {/* Primary Top-Left Ultra-Gloss Specular Highlight (The 3D Glass Sheen) */}
          <path
            d="M24 28 
               C20 36 20 48 24 60 
               C26 46 32 36 44 32 
               C34 26 28 26 24 28 Z"
            fill={`url(#specularHighlight-${size})`}
          />

          {/* Secondary Top Ridge Specular Gloss Beam */}
          <path
            d="M32 20 
               C42 17 55 18 60 21 
               C52 23 42 22 32 20 Z"
            fill="#FFFFFF"
            fillOpacity="0.9"
          />

          {/* Right Cusp Soft Specular Dot */}
          <ellipse
            cx="88"
            cy="30"
            rx="7"
            ry="4"
            transform="rotate(-20 88 30)"
            fill="#FFFFFF"
            fillOpacity="0.75"
          />

          {/* Root Highlight Glints */}
          <path
            d="M30 85 C32 98 34 110 38 114 C36 106 34 94 32 85 Z"
            fill="#FFFFFF"
            fillOpacity="0.55"
          />
          <path
            d="M88 85 C86 98 84 110 80 114 C82 106 84 94 86 85 Z"
            fill="#FFFFFF"
            fillOpacity="0.4"
          />
        </svg>
      </div>

      {/* Realistic Soft 3D Ground Shadow */}
      {showShadow && (
        <div
          style={{
            width: currentSize.shadowW,
            height: currentSize.shadowH,
          }}
          className="rounded-full bg-black/60 blur-[4px] mt-1 transform scale-y-75 pointer-events-none transition-all duration-300"
        />
      )}
    </div>
  );
};
