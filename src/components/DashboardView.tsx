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
  BookOpen,
  CheckCircle2,
  Clock,
  ExternalLink,
} from 'lucide-react';

interface DashboardViewProps {
  onNavigate: (page: NavPage) => void;
  totalXp: number;
  streakDays: number;
  completedLessonsCount: number;
  userRank: string;
  userTeam: string;
  nextLessonTitle?: string;
  pendingTicketsCount?: number;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  onNavigate,
  totalXp,
  streakDays,
  completedLessonsCount,
  userRank,
  userTeam,
  nextLessonTitle = 'Primeiros Comandos: Identidade e Máquina (whoami)',
  pendingTicketsCount = 3,
}) => {
  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full select-none">
      {/* 1. Hero Card de Continuidade e Boas-Vindas */}
      <div className="relative overflow-hidden p-7 rounded-2xl bg-gradient-to-r from-layer1 via-surface-container to-layer1 border border-outline-subtle flex items-center justify-between shadow-surface-card">
        <div className="flex flex-col gap-2.5 z-10 max-w-xl">
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-primary-electric/15 text-primary-electric border border-primary-electric/30 flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> RootPath Central Hub
            </span>
            <span className="text-xs font-mono text-on-surface-variant">
              Linux & Kali Mastery
            </span>
          </div>

          <h1 className="font-display font-bold text-3xl text-on-surface leading-tight">
            Pronto para continuar sua jornada no Linux?
          </h1>
          <p className="text-sm text-on-surface-variant leading-relaxed">
            Seu ambiente de aprendizagem está configurado. Continue de onde parou para acumular
            XP, desbloquear novas ferramentas e forjar sua carreira em segurança.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => onNavigate('lessons')}
              className="px-5 py-2.5 bg-primary-electric hover:bg-primary-electric/90 text-white font-display font-semibold rounded-xl text-xs flex items-center gap-2 shadow-glow-primary transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Continuar Próxima Lição
            </button>
            <button
              onClick={() => onNavigate('tickets')}
              className="px-5 py-2.5 bg-surface-container-high hover:bg-surface-bright text-on-surface font-display font-semibold rounded-xl text-xs flex items-center gap-2 border border-outline-subtle transition-all"
            >
              <Inbox className="w-3.5 h-3.5 text-secondary-emerald" /> Atender Chamados ({pendingTicketsCount})
            </button>
            <button
              onClick={() => onNavigate('learning-tree')}
              className="px-4 py-2.5 text-on-surface-variant hover:text-on-surface text-xs font-medium flex items-center gap-1.5 transition-colors"
            >
              <GitBranch className="w-3.5 h-3.5" /> Explorar Trilha
            </button>
          </div>
        </div>

        {/* Mascote Siberiano em Destaque no Hub */}
        <div className="hidden md:flex flex-col items-center gap-2 relative z-10 p-3 bg-surface-container-lowest/80 rounded-2xl border border-primary-electric/30 shadow-glow-primary/20">
          <SiberianCatMascot size={120} mood="curious" />
          <span className="text-[10px] font-mono text-on-surface-variant px-2 py-0.5 rounded bg-surface-container">
            Companheiro Siberiano
          </span>
        </div>
      </div>

      {/* 2. Grid de Estatísticas Rápidas (Cards Amplos) */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-layer1 border border-outline-subtle flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-secondary-emerald/15 text-secondary-emerald border border-secondary-emerald/30">
            <Award className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-on-surface-variant font-mono">XP Total Acumulado</span>
            <p className="text-xl font-bold font-mono text-secondary-emerald">{totalXp}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-layer1 border border-outline-subtle flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/30">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-on-surface-variant font-mono">Ofensiva Atual</span>
            <p className="text-xl font-bold font-mono text-orange-400">{streakDays} Dias Seguidos</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-layer1 border border-outline-subtle flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-primary-electric/15 text-primary-electric border border-primary-electric/30">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-on-surface-variant font-mono">Patente do Aluno</span>
            <p className="text-xs font-bold font-mono text-on-surface truncate">{userRank}</p>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-layer1 border border-outline-subtle flex items-center gap-3.5">
          <div className="p-3 rounded-xl bg-tertiary-indigo/15 text-tertiary-indigo border border-tertiary-indigo/30">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-[11px] text-on-surface-variant font-mono">Especialização / Team</span>
            <p className="text-xs font-bold font-mono text-tertiary-indigo truncate">{userTeam}</p>
          </div>
        </div>
      </div>

      {/* 3. Seção Próximos Passos & Chamados em Destaque */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Card de Próxima Lição */}
        <div className="p-5 rounded-2xl bg-layer1 border border-outline-subtle flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-primary-electric/10 text-primary-electric border border-primary-electric/20">
                PRÓXIMA LIÇÃO DA TRILHA
              </span>
              <span className="text-xs font-mono text-on-surface-variant flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" /> ~8 min
              </span>
            </div>
            <h3 className="font-display font-bold text-lg text-on-surface">
              {nextLessonTitle}
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Aprenda a consultar o nome do usuário logado e o hostname da máquina através de comandos diretos de terminal.
            </p>
          </div>

          <div className="pt-4 mt-2 border-t border-outline-subtle/60 flex items-center justify-between">
            <span className="text-xs font-mono text-secondary-emerald font-semibold">+120 XP</span>
            <button
              onClick={() => onNavigate('lessons')}
              className="text-xs font-semibold text-primary-electric hover:underline flex items-center gap-1"
            >
              <span>Abrir Lição</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Card de Chamados estilo while True: learn() */}
        <div className="p-5 rounded-2xl bg-layer1 border border-outline-subtle flex flex-col justify-between">
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold px-2 py-0.5 rounded bg-secondary-emerald/10 text-secondary-emerald border border-secondary-emerald/20">
                CHAMADO PENDENTE EM ABERTO
              </span>
              <span className="text-xs font-mono text-orange-400">Prioridade Média</span>
            </div>
            <h3 className="font-display font-bold text-lg text-on-surface">
              TK-101: Serviço Web Suspeito: Identificar Usuário
            </h3>
            <p className="text-xs text-on-surface-variant leading-relaxed">
              Cliente Finance Corp IT precisa que você confirme qual usuário está executando o processo do servidor web.
            </p>
          </div>

          <div className="pt-4 mt-2 border-t border-outline-subtle/60 flex items-center justify-between">
            <span className="text-xs font-mono text-secondary-emerald font-semibold">+100 XP</span>
            <button
              onClick={() => onNavigate('tickets')}
              className="text-xs font-semibold text-secondary-emerald hover:underline flex items-center gap-1"
            >
              <span>Atender Chamado</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* 4. Grid de Atalhos para Áreas Complementares */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
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
              Percorra os módulos progressivos com lições principais (|) e fixações opcionais (o).
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-primary-electric mt-4">
            <span>Abrir Trilha</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

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
              Resolva chamados e tickets de suporte de sistemas com terminal interativo.
            </p>
          </div>
          <div className="flex items-center gap-1 text-xs font-semibold text-secondary-emerald mt-4">
            <span>Ver Tickets</span>
            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
          </div>
        </div>

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
              Enciclopédia das ferramentas nativas (Nmap, Wireshark, Metasploit) e comandos.
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
