import React, { useState } from 'react';
import { SiberianCatMascot } from './SiberianCatMascot';
import {
  Award,
  Flame,
  CheckCircle2,
  Lock,
  Sparkles,
  Trophy,
  Calendar,
  Zap,
} from 'lucide-react';

interface BadgeItem {
  id: string;
  title: string;
  description: string;
  category: string;
  isUnlocked: boolean;
  unlockedDate?: string;
  xpReward: number;
}

const BADGES_LIST: BadgeItem[] = [
  {
    id: 'b1',
    title: 'Primeiro Contato Linux',
    description: 'Executou seus primeiros comandos de terminal com sucesso.',
    category: 'Fundamentos',
    isUnlocked: true,
    unlockedDate: 'Hoje',
    xpReward: 50,
  },
  {
    id: 'b2',
    title: 'Quem Sou Eu?',
    description: 'Dominou o comando whoami e compreendeu identidades no sistema.',
    category: 'Comandos',
    isUnlocked: true,
    unlockedDate: 'Hoje',
    xpReward: 100,
  },
  {
    id: 'b3',
    title: 'Mestre do Chmod',
    description: 'Compreendeu e alterou permissões de arquivos no padrão octal (755).',
    category: 'Permissões',
    isUnlocked: false,
    xpReward: 200,
  },
  {
    id: 'b4',
    title: 'Primeiro Chamado Resolvido',
    description: 'Atendeu e concluiu um incidente de suporte técnico na mesa de tickets.',
    category: 'Operações',
    isUnlocked: false,
    xpReward: 150,
  },
  {
    id: 'b5',
    title: 'Sentinela do Kali',
    description: 'Utilizou o Nmap para auditar portas em ambiente controlado.',
    category: 'Segurança',
    isUnlocked: false,
    xpReward: 300,
  },
  {
    id: 'b6',
    title: 'Consistência de Aço',
    description: 'Manteve uma sequência ininterrupta de 7 dias de ofensiva no RootPath.',
    category: 'Consistência',
    isUnlocked: false,
    xpReward: 250,
  },
];

export const AchievementsView: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<string>('Todas');

  const filteredBadges = BADGES_LIST.filter(
    (b) => selectedFilter === 'Todas' || b.category === selectedFilter
  );

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full select-none">
      {/* Header do Quadro de Conquistas */}
      <div className="p-6 rounded-2xl bg-layer1 border border-outline-subtle flex items-center justify-between shadow-surface-card">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-secondary-emerald/15 text-secondary-emerald border border-secondary-emerald/30">
            <Trophy className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-secondary-emerald/15 text-secondary-emerald border border-secondary-emerald/30">
                GALERIA DE HONRA
              </span>
              <span className="text-xs font-mono text-on-surface-variant">
                {BADGES_LIST.filter((b) => b.isUnlocked).length} de {BADGES_LIST.length} Desbloqueadas
              </span>
            </div>
            <h1 className="font-display font-bold text-2xl text-on-surface mt-1">
              Quadro de Conquistas & Medalhas
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              Recompensas visuais concedidas por marcos técnicos e consistência de estudo no RootPath.
            </p>
          </div>
        </div>

        <SiberianCatMascot size={56} mood="happy" />
      </div>

      {/* Grid de Cards de Medalhas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {filteredBadges.map((badge) => (
          <div
            key={badge.id}
            className={`
              p-5 rounded-2xl border transition-all flex flex-col justify-between gap-4 shadow-surface-card
              ${
                badge.isUnlocked
                  ? 'bg-layer1 border-secondary-emerald/40 shadow-glow-secondary/20'
                  : 'bg-surface-lowest/70 border-outline-subtle/50 opacity-60'
              }
            `}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div
                  className={`
                    w-12 h-12 rounded-xl flex items-center justify-center border
                    ${
                      badge.isUnlocked
                        ? 'bg-secondary-emerald/20 text-secondary-emerald border-secondary-emerald/40 shadow-glow-secondary'
                        : 'bg-surface-container text-outline border-outline-subtle'
                    }
                  `}
                >
                  {badge.isUnlocked ? (
                    <Award className="w-6 h-6" />
                  ) : (
                    <Lock className="w-5 h-5" />
                  )}
                </div>

                <span className="text-xs font-mono font-bold text-secondary-emerald">
                  +{badge.xpReward} XP
                </span>
              </div>

              <div>
                <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-wider block">
                  {badge.category}
                </span>
                <h3 className="font-display font-bold text-base text-on-surface mt-0.5">
                  {badge.title}
                </h3>
                <p className="text-xs text-on-surface-variant mt-1 leading-relaxed">
                  {badge.description}
                </p>
              </div>
            </div>

            <div className="pt-3 border-t border-outline-subtle/50 flex items-center justify-between text-[11px] font-mono">
              {badge.isUnlocked ? (
                <span className="text-secondary-emerald flex items-center gap-1 font-semibold">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Conquistada ({badge.unlockedDate})
                </span>
              ) : (
                <span className="text-outline flex items-center gap-1">
                  <Lock className="w-3 h-3" /> Bloqueada
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
