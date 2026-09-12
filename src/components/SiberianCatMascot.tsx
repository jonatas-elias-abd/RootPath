import React from 'react';

interface MascotProps {
  className?: string;
  size?: number;
  mood?: 'curious' | 'happy' | 'focused';
}

export const SiberianCatMascot: React.FC<MascotProps> = ({
  className = '',
  size = 64,
  mood = 'curious',
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 120 120"
      width={size}
      height={size}
      fill="none"
      className={`shrink-0 select-none ${className}`}
    >
      <defs>
        {/* Gradiente Pelagem Siberiana Slate/Cinza Profundo */}
        <linearGradient id="furGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="50%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>

        {/* Gradiente Pelagem Clara Peito / Bochechas volumosas */}
        <linearGradient id="furRuff" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#334155" />
          <stop offset="100%" stopColor="#1e293b" />
        </linearGradient>

        {/* Olhos Cibernéticos Kali Cyan */}
        <radialGradient id="cyberEye" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#7dd3fc" />
          <stop offset="60%" stopColor="#0284c7" />
          <stop offset="100%" stopColor="#0369a1" />
        </radialGradient>

        {/* Brilho HUD Neon */}
        <filter id="cyberGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>

      {/* Juba Volumosa Típica do Siberiano (Base Traseira) */}
      <path
        d="M20 70 C10 85 24 105 40 108 C50 114 70 114 80 108 C96 105 110 85 100 70 C92 78 86 82 80 84 C70 88 50 88 40 84 C34 82 28 78 20 70 Z"
        fill="url(#furRuff)"
      />

      {/* Orelhas Robustas com Pelos Internos Típicos */}
      {/* Orelha Esquerda */}
      <polygon points="26,45 36,12 52,35" fill="url(#furGrad)" stroke="#38bdf8" strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="32,40 38,18 48,34" fill="#0b1329" />
      <path d="M35 34 L43 25 L45 36" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />

      {/* Orelha Direita */}
      <polygon points="94,45 84,12 68,35" fill="url(#furGrad)" stroke="#38bdf8" strokeWidth="1.5" strokeLinejoin="round" />
      <polygon points="88,40 82,18 72,34" fill="#0b1329" />
      <path d="M85 34 L77 25 L75 36" stroke="#94a3b8" strokeWidth="1.2" strokeLinecap="round" />

      {/* Cabeça Arredondada e Larga (Siberiana) */}
      <path
        d="M26 50 C22 66 26 84 36 90 C46 95 74 95 84 90 C94 84 98 66 94 50 C90 36 78 30 60 30 C42 30 30 36 26 50 Z"
        fill="url(#furGrad)"
        stroke="#334155"
        strokeWidth="1.5"
      />

      {/* Bochechas Volumosas e Peludas */}
      <path d="M24 64 L16 72 L26 76" stroke="#0284c7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M96 64 L104 72 L94 76" stroke="#0284c7" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Fone / Headset Cyber Tech Sutil na orelha direita */}
      <rect x="88" y="44" width="8" height="14" rx="3" fill="#0284c7" filter="url(#cyberGlow)" />
      <line x1="92" y1="58" x2="84" y2="70" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="84" cy="70" r="2" fill="#10b981" />

      {/* Marcação da Testa Siberiana em 'M' / Grid Cyber Sutil */}
      <path
        d="M48 38 L54 48 L60 42 L66 48 L72 38"
        stroke="#38bdf8"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.85"
      />

      {/* Olhos Inteligentes e Curiosos (Amêndoa / Cyber Cyan) */}
      {/* Olho Esquerdo */}
      <ellipse cx="44" cy="58" rx="8" ry="7" fill="#031024" stroke="#38bdf8" strokeWidth="1.5" />
      <circle cx="44" cy="58" r="5" fill="url(#cyberEye)" />
      <ellipse cx="44" cy="58" rx="1.8" ry="4.5" fill="#020617" />
      <circle cx="46.5" cy="55.5" r="1.5" fill="#ffffff" />

      {/* Olho Direito */}
      <ellipse cx="76" cy="58" rx="8" ry="7" fill="#031024" stroke="#38bdf8" strokeWidth="1.5" />
      <circle cx="76" cy="58" r="5" fill="url(#cyberEye)" />
      <ellipse cx="76" cy="58" rx="1.8" ry="4.5" fill="#020617" />
      <circle cx="78.5" cy="55.5" r="1.5" fill="#ffffff" />

      {/* Focinho e Nariz Triangular */}
      <polygon points="60,67 56,72 64,72" fill="#38bdf8" />
      <path d="M60 72 L60 77 C57 79 53 79 50 77 M60 77 C63 79 67 79 70 77" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />

      {/* Bigodes Tecnológicos / Linhas Luminosas Sutis */}
      <line x1="36" y1="74" x2="18" y2="72" stroke="#38bdf8" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <line x1="36" y1="77" x2="20" y2="80" stroke="#38bdf8" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <line x1="84" y1="74" x2="102" y2="72" stroke="#38bdf8" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
      <line x1="84" y1="77" x2="100" y2="80" stroke="#38bdf8" strokeWidth="1" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
};
