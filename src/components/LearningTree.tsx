import React from 'react';
import { LessonNode } from '../types';
import { SiberianCatMascot } from './SiberianCatMascot';
import {
  Lock,
  CheckCircle2,
  Circle,
  ArrowRight,
  Award,
  Sparkles,
  BookOpen,
  HelpCircle,
  Compass,
} from 'lucide-react';

interface LearningTreeProps {
  nodes: LessonNode[];
  onSelectNode: (node: LessonNode) => void;
  selectedNodeId?: string;
}

export const LearningTree: React.FC<LearningTreeProps> = ({
  nodes,
  onSelectNode,
  selectedNodeId,
}) => {
  const mainLessons = nodes.filter((n) => n.node_type === 'MainLesson');
  const practiceTasks = nodes.filter((n) => n.node_type === 'PracticeTask');

  return (
    <div className="flex flex-col gap-6 max-w-5xl mx-auto w-full select-none">
      {/* Header Visual da Trilha */}
      <div className="p-6 rounded-2xl bg-layer1 border border-outline-subtle flex items-center justify-between shadow-surface-card">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary-electric/15 text-primary-electric border border-primary-electric/30">
            <Compass className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-on-surface flex items-center gap-2">
              Mapa de Aprendizagem
              <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-primary-electric/15 text-primary-electric border border-primary-electric/30">
                Trilha Interativa
              </span>
            </h1>
            <p className="text-xs text-on-surface-variant mt-1 flex items-center gap-2">
              <span><strong className="text-primary-electric font-mono">|</strong> Lições Principais (Caminho Obrigatório)</span>
              <span>&bull;</span>
              <span><strong className="text-secondary-emerald font-mono">o</strong> Fixações & Bounties (Treino Opcional)</span>
            </p>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <SiberianCatMascot size={52} mood="focused" />
        </div>
      </div>

      {/* Árvore / Trilha Estilo Duolingo + Cyber Nodes */}
      <div className="relative flex flex-col gap-8 py-4 px-2">
        {mainLessons.map((mainNode, index) => {
          const isMainLocked = mainNode.status === 'Locked';
          const isMainCompleted = mainNode.status === 'Completed';
          const isMainSelected = selectedNodeId === mainNode.id;

          // Encontra as atividades de fixação (o) subordinadas a essa lição
          const linkedPractices = practiceTasks.filter(
            (p) => p.parent_id === mainNode.id || p.prerequisite_ids.includes(mainNode.id)
          );

          return (
            <div key={mainNode.id} className="flex flex-col gap-4 relative">
              {/* Linha Conectora Vertical entre Lições Principais */}
              {index < mainLessons.length - 1 && (
                <div
                  className={`absolute left-8 top-20 bottom-[-2rem] w-1 rounded-full z-0 transition-colors ${
                    isMainCompleted ? 'bg-secondary-emerald/60' : 'bg-outline-subtle/50'
                  }`}
                />
              )}

              {/* CARD DA LIÇÃO PRINCIPAL (|) - Card Amplo e Amigável */}
              <div
                onClick={() => !isMainLocked && onSelectNode(mainNode)}
                className={`
                  z-10 flex items-center justify-between p-5 rounded-2xl border transition-all cursor-pointer relative shadow-surface-card
                  ${
                    isMainSelected
                      ? 'bg-surface-container-high border-primary-electric shadow-glow-primary'
                      : isMainLocked
                      ? 'bg-surface-lowest/70 border-outline-subtle/50 opacity-60 cursor-not-allowed'
                      : 'bg-layer1 border-outline-subtle hover:border-primary-electric/50 hover:bg-surface-container'
                  }
                `}
              >
                <div className="flex items-center gap-4">
                  {/* Ícone de Estado Grande */}
                  <div
                    className={`
                      w-14 h-14 rounded-2xl flex items-center justify-center font-display font-bold text-lg border transition-all
                      ${
                        isMainCompleted
                          ? 'bg-secondary-emerald/20 text-secondary-emerald border-secondary-emerald/40 shadow-glow-secondary'
                          : isMainLocked
                          ? 'bg-surface-container text-outline border-outline-subtle'
                          : 'bg-primary-electric/20 text-primary-electric border-primary-electric/40 shadow-glow-primary'
                      }
                    `}
                  >
                    {isMainCompleted ? (
                      <CheckCircle2 className="w-7 h-7" />
                    ) : isMainLocked ? (
                      <Lock className="w-6 h-6" />
                    ) : (
                      <BookOpen className="w-6 h-6" />
                    )}
                  </div>

                  {/* Informações da Lição */}
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-md bg-surface-bright text-primary-electric border border-primary-electric/20">
                        | LIÇÃO {mainNode.id}
                      </span>
                      {isMainCompleted && (
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-secondary-emerald/15 text-secondary-emerald border border-secondary-emerald/30">
                          CONCLUÍDA
                        </span>
                      )}
                    </div>
                    <h3 className="font-display font-bold text-base text-on-surface">
                      {mainNode.title}
                    </h3>
                    <p className="text-xs text-on-surface-variant max-w-xl leading-relaxed">
                      {mainNode.description}
                    </p>
                  </div>
                </div>

                {/* Recompensa de XP e Ação */}
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-secondary-emerald/10 border border-secondary-emerald/20 text-secondary-emerald text-xs font-mono font-bold">
                    <Award className="w-4 h-4" />
                    <span>+{mainNode.xp_reward} XP</span>
                  </div>

                  {!isMainLocked && (
                    <button className="p-2.5 rounded-xl bg-primary-electric/15 text-primary-electric border border-primary-electric/30 hover:bg-primary-electric hover:text-white transition-all">
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* ATIVIDADES DE FIXAÇÃO (o) - Orbitando e Ramificadas */}
              {linkedPractices.length > 0 && (
                <div className="ml-12 pl-6 border-l-2 border-dashed border-outline-subtle flex flex-col gap-3 py-1">
                  <span className="text-[11px] font-mono text-on-surface-variant flex items-center gap-1">
                    <Sparkles className="w-3 h-3 text-secondary-emerald" />
                    Atividades de Fixação & Bounties Opcionais (o)
                  </span>

                  <div className="grid grid-cols-2 gap-3">
                    {linkedPractices.map((practice) => {
                      const isPracLocked = practice.status === 'Locked';
                      const isPracCompleted = practice.status === 'Completed';
                      const isPracSelected = selectedNodeId === practice.id;

                      return (
                        <div
                          key={practice.id}
                          onClick={() => !isPracLocked && onSelectNode(practice)}
                          className={`
                            p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between
                            ${
                              isPracSelected
                                ? 'bg-surface-container-high border-secondary-emerald shadow-glow-secondary'
                                : isPracLocked
                                ? 'bg-surface-lowest/60 border-outline-subtle/40 opacity-50 cursor-not-allowed'
                                : 'bg-surface-container/70 border-outline-subtle hover:border-secondary-emerald/50 hover:bg-surface-container'
                            }
                          `}
                        >
                          <div className="flex items-center gap-3 min-w-0">
                            <div
                              className={`
                                w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-xs font-mono border
                                ${
                                  isPracCompleted
                                    ? 'bg-secondary-emerald/20 text-secondary-emerald border-secondary-emerald/40'
                                    : isPracLocked
                                    ? 'bg-surface-lowest text-outline border-outline-subtle'
                                    : 'bg-secondary-emerald/10 text-secondary-emerald border-secondary-emerald/30'
                                }
                              `}
                            >
                              {isPracCompleted ? (
                                <CheckCircle2 className="w-4 h-4" />
                              ) : isPracLocked ? (
                                <Lock className="w-3.5 h-3.5" />
                              ) : (
                                <span>o</span>
                              )}
                            </div>

                            <div className="flex flex-col min-w-0">
                              <span className="text-xs font-semibold text-on-surface truncate">
                                {practice.title}
                              </span>
                              <span className="text-[10px] text-on-surface-variant font-mono">
                                {practice.estimated_minutes} min &bull; +{practice.xp_reward} XP
                              </span>
                            </div>
                          </div>

                          {!isPracLocked && (
                            <ArrowRight className="w-3.5 h-3.5 text-secondary-emerald shrink-0 ml-2" />
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
