import React from 'react';
import { SiberianCatMascot } from './SiberianCatMascot';
import { NavPage } from './Sidebar';
import {
  Play,
  Award,
  Flame,
  Inbox,
  GitBranch,
  Shield,
  Layers,
  Wrench,
  ArrowRight,
  Sparkles,
} from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (page: NavPage) => void;
  totalXp: number;
  streakDays: number;
  completedLessonsCount: number;
  userRank: string;
  userTeam: string;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  totalXp,
  streakDays,
  completedLessonsCount,
  userRank,
  userTeam,
}) => {
  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full">
      {/* Banner Principal com Mascote Siberiano */}
      <div className="relative overflow-hidden p-6 rounded-2xl bg-gradient-to-r from-layer1 via-surface-container to-layer1 border border-outline-subtle flex items-center justify-between shadow-surface-card">
        <div className="flex flex-col gap-2 z-10 max-w-xl">
          <span className="text-xs font-mono font-bold text-primary-electric uppercase tracking-wider flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> RootPath Central Hub
          </span>
          <h1 className="font-display font-bold text-3xl text-on-surface">
            Pronto para dominar o Kali Linux?
          </h1>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Seu ambiente de aprendizagem e sandbox interativo está ativo. Resolva chamados,
            evolua pela árvore de lições e forje suas habilidades para escolher seu Team.
          </p>

          <div className="flex items-center gap-3 mt-3">
            <button
              onClick={() => onNavigate('lessons')}
              className="px-5 py-2.5 bg-primary-electric hover:bg-primary-electric/90 text-white font-display font-semibold rounded-xl text-xs flex items-center gap-2 shadow-glow-primary transition-all"
            >
              <Play className="w-3.5 h-3.5" /> Continuar Lição Atual
            </button>
            <button
              onClick={() => onNavigate('tickets')}
              className="px-5 py-2.5 bg-surface-container-high hover:bg-surface-bright text-on-surface font-display font-semibold rounded-xl text-xs flex items-center gap-2 border border-outline-subtle transition-all"
            >
              <Inbox className="w-3.5 h-3.5 text-secondary-emerald" /> Ver Chamados Pendentes
            </button>
          </div>
        </div>

        {/* Mascote Siberiano em Destaque */}
        <div className="relative z-10 p-2 bg-surface-container-lowest/60 rounded-2xl border border-primary-electric/30 shadow-glow-primary/30">
          <SiberianCatMascot size={110} mood="curious" />
        </div>
      </div>

      {/* Grid de Estatísticas Rápidas */}
      <div className="grid grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-layer1 border border-outline-subtle flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-secondary-emerald/10 text-secondary-emerald border border-secondary-emerald/20">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-on-surface-variant font-mono">XP Total</span>
            <p className="text-lg font-bold font-mono text-secondary-emerald">{totalXp}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-layer1 border border-outline-subtle flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-orange-500/10 text-orange-400 border border-orange-500/20">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-on-surface-variant font-mono">Ofensiva</span>
            <p className="text-lg font-bold font-mono text-orange-400">{streakDays} Dia(s)</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-layer1 border border-outline-subtle flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-primary-electric/10 text-primary-electric border border-primary-electric/20">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-on-surface-variant font-mono">Patente Atual</span>
            <p className="text-xs font-bold font-mono text-on-surface truncate">{userRank}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-layer1 border border-outline-subtle flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-tertiary-indigo/10 text-tertiary-indigo border border-tertiary-indigo/20">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs text-on-surface-variant font-mono">Especialização</span>
            <p className="text-xs font-bold font-mono text-tertiary-indigo">{userTeam}</p>
          </div>
        </div>
      </div>

      {/* Acesso aos Recursos e Telas Especiais */}
      <div className="grid grid-cols-3 gap-5">
        {/* Card: Mapa de Aprendizagem */}
        <div
          onClick={() => onNavigate('learning-tree')}
          className="p-5 rounded-2xl bg-layer1 border border-outline-subtle hover:border-primary-electric/50 transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-xl bg-primary-electric/10 text-primary-electric flex items-center justify-center border border-primary-electric/20">
              <GitBranch className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-on-surface group-hover:text-primary-electric transition-colors">
              Mapa da Árvore
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Percorra os módulos progressivos: Lições Principais (|) e Fixações Opcionais (o).
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-primary-electric mt-4">
            <span>Abrir Trilha</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card: Central de Chamados (while True: learn()) */}
        <div
          onClick={() => onNavigate('tickets')}
          className="p-5 rounded-2xl bg-layer1 border border-outline-subtle hover:border-secondary-emerald/50 transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-xl bg-secondary-emerald/10 text-secondary-emerald flex items-center justify-center border border-secondary-emerald/20">
              <Inbox className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-on-surface group-hover:text-secondary-emerald transition-colors">
              Mesa de Incidentes
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Atenda ocorrências com linha de comando para resolver incidentes em ambiente seguro.
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-secondary-emerald mt-4">
            <span>Resolver Chamados</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

        {/* Card: Arsenal Kali */}
        <div
          onClick={() => onNavigate('toolbox')}
          className="p-5 rounded-2xl bg-layer1 border border-outline-subtle hover:border-tertiary-indigo/50 transition-all cursor-pointer flex flex-col justify-between group"
        >
          <div className="space-y-2">
            <div className="w-9 h-9 rounded-xl bg-tertiary-indigo/10 text-tertiary-indigo flex items-center justify-center border border-tertiary-indigo/20">
              <Wrench className="w-5 h-5" />
            </div>
            <h3 className="font-display font-bold text-base text-on-surface group-hover:text-tertiary-indigo transition-colors">
              Arsenal do Kali
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Enciclopédia das ferramentas nativas (Nmap, Wireshark, Metasploit) e seus comandos.
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-tertiary-indigo mt-4">
            <span>Explorar Ferramentas</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>
      </div>
    </div>
  );
};
