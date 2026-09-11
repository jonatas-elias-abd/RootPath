import React from 'react';

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const RootPathLogo: React.FC<LogoProps> = ({ className = '', showText = true, size = 'md' }) => {
  if (!showText) {
    const sizePx = size === 'sm' ? 32 : size === 'lg' ? 48 : 40;
    return (
      <svg
        viewBox="0 0 56 56"
        width={sizePx}
        height={sizePx}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`shrink-0 ${className}`}
      >
        <defs>
          <linearGradient id="rpTopFaceSolo" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#0284c7" />
          </linearGradient>
        </defs>

        <g transform="translate(4, 4)">
          {/* Face Superior (Shell / Prompt) */}
          <polygon
            points="28,4 48,14 28,24 8,14"
            fill="#0f172a"
            stroke="#38bdf8"
            strokeWidth="2"
            strokeLinejoin="round"
          />
          <path
            d="M22 13 L26 15 L22 17"
            stroke="#10b981"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <line
            x1="29"
            y1="17"
            x2="34"
            y2="17"
            stroke="#38bdf8"
            strokeWidth="1.8"
            strokeLinecap="round"
          />

          {/* Face Esquerda (Filesystem / Camada POSIX) */}
          <polygon
            points="8,17 26,26 26,48 8,39"
            fill="#172554"
            fillOpacity="0.8"
            stroke="#0284c7"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <line
            x1="14"
            y1="28"
            x2="20"
            y2="31"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeLinecap="round"
          />
          <line
            x1="14"
            y1="35"
            x2="22"
            y2="39"
            stroke="#38bdf8"
            strokeWidth="1.5"
            strokeLinecap="round"
          />

          {/* Face Direita (Memória / Sandboxing) */}
          <polygon
            points="30,26 48,17 48,39 30,48"
            fill="#0b1329"
            stroke="#10b981"
            strokeWidth="1.8"
            strokeLinejoin="round"
          />
          <circle cx="39" cy="33" r="2.5" fill="#10b981" />
          <circle
            cx="39"
            cy="33"
            r="5"
            stroke="#10b981"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
        </g>
      </svg>
    );
  }

  const height = size === 'sm' ? 36 : size === 'lg' ? 54 : 44;
  const width = Math.round((height * 290) / 70);

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 290 70"
      width={width}
      height={height}
      fill="none"
      className={`shrink-0 select-none ${className}`}
    >
      <defs>
        <linearGradient id="rpTopFace" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#38bdf8" />
          <stop offset="100%" stopColor="#0284c7" />
        </linearGradient>
      </defs>

      {/* Cubo isométrico de camadas de sistema */}
      <g transform="translate(12, 10)">
        {/* Face Superior (Shell / Prompt) */}
        <polygon
          points="28,4 48,14 28,24 8,14"
          fill="#0f172a"
          stroke="#38bdf8"
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path
          d="M22 13 L26 15 L22 17"
          stroke="#10b981"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <line
          x1="29"
          y1="17"
          x2="34"
          y2="17"
          stroke="#38bdf8"
          strokeWidth="1.8"
          strokeLinecap="round"
        />

        {/* Face Esquerda (Filesystem / Camada POSIX) */}
        <polygon
          points="8,17 26,26 26,48 8,39"
          fill="#172554"
          fillOpacity="0.8"
          stroke="#0284c7"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        <line
          x1="14"
          y1="28"
          x2="20"
          y2="31"
          stroke="#38bdf8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <line
          x1="14"
          y1="35"
          x2="22"
          y2="39"
          stroke="#38bdf8"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* Face Direita (Memória / Sandboxing) */}
        <polygon
          points="30,26 48,17 48,39 30,48"
          fill="#0b1329"
          stroke="#10b981"
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
        {/* Ponto central flutuante de elevação de privilégios */}
        <circle cx="39" cy="33" r="2.5" fill="#10b981" />
        <circle
          cx="39"
          cy="33"
          r="5"
          stroke="#10b981"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
      </g>

      {/* Tipografia */}
      <text
        x="76"
        y="38"
        fill="#f8fafc"
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontWeight="900"
        fontSize="22"
        letterSpacing="-0.03em"
      >
        Root<tspan fill="#38bdf8">Path</tspan>
      </text>
      <text
        x="77"
        y="52"
        fill="#38bdf8"
        fontFamily="'JetBrains Mono', ui-monospace, monospace"
        fontWeight="700"
        fontSize="9"
        letterSpacing="0.18em"
      >
        SANDBOX // ENV
      </text>
    </svg>
  );
};
