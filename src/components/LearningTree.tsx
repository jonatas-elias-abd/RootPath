import React from 'react';
import { LessonNode } from '../types';
import { Lock, CheckCircle2, Circle, ArrowRight, Award } from 'lucide-react';

interface LearningTreeProps {
  nodes: LessonNode[];
  onSelectNode: (node: LessonNode) => void;
  selectedNodeId?: string;
}

export const LearningTree: React.FC<LearningTreeProps> = ({ nodes, onSelectNode, selectedNodeId }) => {
  return (
    <div className="flex flex-col gap-4 p-6 bg-surface-container-low rounded-2xl border border-outline-subtle shadow-surface-card">
      <div className="flex items-center justify-between border-b border-outline-subtle pb-4">
        <div>
          <h2 className="font-display font-bold text-2xl text-on-surface">Mapa da Árvore de Aprendizagem</h2>
          <p className="text-sm text-on-surface-variant">
            Progresso visual | <span className="text-primary-electric font-semibold font-mono">|</span> Lições Principais &bull; <span className="text-secondary-emerald font-semibold font-mono">o</span> Fixações Opcionais
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-6 my-4 relative">
        {nodes.map((node) => {
          const isMain = node.node_type === 'MainLesson';
          const isLocked = node.status === 'Locked';
          const isCompleted = node.status === 'Completed';
          const isSelected = selectedNodeId === node.id;

          return (
            <div
              key={node.id}
              onClick={() => !isLocked && onSelectNode(node)}
              className={`
                flex items-center justify-between p-4 rounded-xl transition-all cursor-pointer border
                ${isMain ? 'ml-0 font-display' : 'ml-8 font-sans text-sm scale-95'}
                ${isSelected ? 'shadow-glow-primary border-primary-electric bg-surface-container-high' : 'bg-surface-container border-outline-subtle hover:border-primary-electric/50'}
                ${isLocked ? 'opacity-50 cursor-not-allowed bg-surface-lowest' : ''}
              `}
            >
              <div className="flex items-center gap-4">
                <div className="flex items-center justify-center w-10 h-10 rounded-full bg-surface-container-highest border border-outline-subtle">
                  {isLocked ? (
                    <Lock className="w-5 h-5 text-outline" />
                  ) : isCompleted ? (
                    <CheckCircle2 className="w-5 h-5 text-secondary-emerald" />
                  ) : (
                    <Circle className={`w-5 h-5 ${isMain ? 'text-primary-electric' : 'text-tertiary-indigo'}`} />
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-surface-bright text-on-surface-variant">
                      {isMain ? '|' : 'o'} {node.id}
                    </span>
                    <h3 className="font-semibold text-on-surface">{node.title}</h3>
                  </div>
                  <p className="text-xs text-on-surface-variant mt-1">{node.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1 text-xs font-mono text-secondary-emerald bg-secondary-emerald/10 px-2 py-1 rounded-full border border-secondary-emerald/20">
                  <Award className="w-3.5 h-3.5" />
                  <span>+{node.xp_reward} XP</span>
                </div>
                {!isLocked && (
                  <ArrowRight className={`w-4 h-4 ${isSelected ? 'text-primary-electric' : 'text-outline'}`} />
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
