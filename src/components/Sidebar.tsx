import React from 'react';
import { RootPathLogo } from './RootPathLogo';
import { SiberianCatMascot } from './SiberianCatMascot';
import {
  LayoutDashboard,
  GitBranch,
  BookOpen,
  Inbox,
  Wrench,
  Layers,
  Award,
  Settings,
  Sparkles,
  ChevronRight,
  ShieldAlert,
  ArrowLeftRight,
} from 'lucide-react';

export type NavPage =
  | 'dashboard'
  | 'learning-tree'
  | 'lessons'
  | 'tickets'
  | 'toolbox'
  | 'windows-vs-linux'
  | 'skill-tree'
  | 'achievements'
  | 'settings';

interface SidebarProps {
  currentPage: NavPage;
  onNavigate: (page: NavPage) => void;
  onToggleAiTutor: () => void;
  isAiTutorOpen: boolean;
  userTeam: string;
  userRank: string;
  totalXp: number;
}

export const Sidebar: React.FC<SidebarProps> = ({
  currentPage,
  onNavigate,
  onToggleAiTutor,
  isAiTutorOpen,
  userTeam,
  userRank,
  totalXp,
}) => {
  const navSections = [
    {
      group: 'APRENDER',
      items: [
        { id: 'dashboard' as NavPage, label: 'Dashboard', icon: LayoutDashboard, badge: null },
        { id: 'learning-tree' as NavPage, label: 'Mapa da Árvore', icon: GitBranch, badge: 'Trilha' },
        { id: 'lessons' as NavPage, label: 'Lições Ativas', icon: BookOpen, badge: null },
      ],
    },
    {
      group: 'PRÁTICA & OPERAÇÃO',
      items: [
        { id: 'tickets' as NavPage, label: 'Chamados (Tickets)', icon: Inbox, badge: 'Novo' },
        { id: 'toolbox' as NavPage, label: 'Arsenal Kali', icon: Wrench, badge: null },
        { id: 'windows-vs-linux' as NavPage, label: 'Windows vs Linux', icon: ArrowLeftRight, badge: 'Guia' },
      ],
    },
    {
      group: 'CARREIRA & EVOLUÇÃO',
      items: [
        { id: 'skill-tree' as NavPage, label: 'Árvore de Habilidades', icon: Layers, badge: null },
        { id: 'achievements' as NavPage, label: 'Conquistas', icon: Award, badge: null },
      ],
    },
    {
      group: 'SISTEMA',
      items: [
        { id: 'settings' as NavPage, label: 'Configurações', icon: Settings, badge: null },
      ],
    },
  ];

  return (
    <aside className="w-72 bg-layer1 border-r border-outline-subtle flex flex-col justify-between h-screen sticky top-0 select-none shrink-0">
      {/* Top: Logo & Mascote Badge */}
      <div className="p-4 border-b border-outline-subtle flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <RootPathLogo size="sm" />
        </div>

        {/* Card do Aluno + Mascote Siberiano */}
        <div className="flex items-center gap-3 p-2.5 rounded-xl bg-surface-container border border-outline-subtle/80">
          <SiberianCatMascot size={46} />
          <div className="flex flex-col min-w-0">
            <span className="text-[11px] font-mono text-primary-electric font-bold truncate">
              {userRank}
            </span>
            <span className="text-xs text-on-surface font-semibold truncate flex items-center gap-1">
              TEAM: <span className="text-tertiary-indigo">{userTeam}</span>
            </span>
            <span className="text-[10px] text-on-surface-variant font-mono">
              {totalXp} XP acumulados
            </span>
          </div>
        </div>
      </div>

      {/* Middle: Navigation Links agrupados */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
        {navSections.map((section) => (
          <div key={section.group} className="space-y-1">
            <span className="px-3 text-[10px] font-mono font-bold text-on-surface-variant/70 tracking-wider">
              {section.group}
            </span>
            <div className="space-y-1 pt-1">
              {section.items.map((item) => {
                const Icon = item.icon;
                const isActive = currentPage === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => onNavigate(item.id)}
                    className={`
                      w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all
                      ${
                        isActive
                          ? 'bg-primary-electric/15 text-primary-electric font-semibold border border-primary-electric/30 shadow-glow-primary/40'
                          : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container border border-transparent'
                      }
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-primary-electric' : 'text-outline'}`} />
                      <span>{item.label}</span>
                    </div>
                    {item.badge && (
                      <span className="text-[9px] font-mono px-1.5 py-0.5 rounded-full bg-primary-electric/20 text-primary-electric border border-primary-electric/30">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom: Botão Acionador do Tutor IA Gaveta Retrátil */}
      <div className="p-3 border-t border-outline-subtle bg-surface-container-low/50">
        <button
          onClick={onToggleAiTutor}
          className={`
            w-full flex items-center justify-between p-3 rounded-xl border text-xs transition-all font-medium
            ${
              isAiTutorOpen
                ? 'bg-tertiary-indigo text-white border-tertiary-indigo shadow-glow-tertiary'
                : 'bg-surface-container hover:bg-surface-container-high text-on-surface border-outline-subtle'
            }
          `}
        >
          <div className="flex items-center gap-2.5">
            <div className="p-1.5 rounded-lg bg-tertiary-indigo/20 text-tertiary-indigo">
              <Sparkles className="w-4 h-4 text-primary-electric" />
            </div>
            <div className="text-left">
              <p className="font-semibold leading-tight">Tutor IA Offline</p>
              <p className="text-[10px] text-on-surface-variant">Qwen3 0.6B Local</p>
            </div>
          </div>
          <ChevronRight className={`w-4 h-4 transition-transform ${isAiTutorOpen ? 'rotate-90' : ''}`} />
        </button>
      </div>
    </aside>
  );
};
