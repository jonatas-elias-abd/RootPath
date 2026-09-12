import React, { useState } from 'react';
import { LessonNode, Exercise } from '../types';
import { SiberianCatMascot } from './SiberianCatMascot';
import {
  Terminal as TerminalIcon,
  CheckCircle,
  HelpCircle,
  ArrowRight,
  Sparkles,
  BookOpen,
  Award,
  Clock,
  RotateCcw,
} from 'lucide-react';

interface LessonViewProps {
  node: LessonNode;
  onCompleteLesson: (lessonId: string) => void;
  onOpenAiTutor?: () => void;
}

export const LessonView: React.FC<LessonViewProps> = ({
  node,
  onCompleteLesson,
  onOpenAiTutor,
}) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [commandInputs, setCommandInputs] = useState<Record<string, string>>({});
  const [exerciseFeedback, setExerciseFeedback] = useState<
    Record<string, { success: boolean; message: string }>
  >({});

  const handleSelectOption = (exerciseId: string, optionIndex: number) => {
    setSelectedOptions((prev) => ({ ...prev, [exerciseId]: optionIndex }));
  };

  const handleCommandChange = (exerciseId: string, value: string) => {
    setCommandInputs((prev) => ({ ...prev, [exerciseId]: value }));
  };

  const validateExercise = (exercise: Exercise) => {
    if (exercise.exercise_type.type === 'MultipleChoice') {
      const selected = selectedOptions[exercise.id];
      const correct = exercise.exercise_type.data.correct_index;

      if (selected === undefined) {
        setExerciseFeedback((prev) => ({
          ...prev,
          [exercise.id]: {
            success: false,
            message: 'Por favor, selecione uma opção antes de validar.',
          },
        }));
        return false;
      }

      if (selected === correct) {
        setExerciseFeedback((prev) => ({
          ...prev,
          [exercise.id]: {
            success: true,
            message: 'Correto! Excelente compreensão do conceito.',
          },
        }));
        return true;
      } else {
        setExerciseFeedback((prev) => ({
          ...prev,
          [exercise.id]: {
            success: false,
            message: 'Incorreto. Leia a explicação didática com atenção ou solicite ajuda ao Tutor!',
          },
        }));
        return false;
      }
    } else if (exercise.exercise_type.type === 'TerminalCommand') {
      const input = (commandInputs[exercise.id] || '').trim();
      const expected = exercise.exercise_type.data.expected_command;

      if (input === expected) {
        setExerciseFeedback((prev) => ({
          ...prev,
          [exercise.id]: {
            success: true,
            message: `Comando '${expected}' validado com sucesso no terminal!`,
          },
        }));
        return true;
      } else {
        setExerciseFeedback((prev) => ({
          ...prev,
          [exercise.id]: {
            success: false,
            message: `Comando divergente. Esperado: '${expected}'. Tente novamente!`,
          },
        }));
        return false;
      }
    }
    return true;
  };

  const handleFinishLesson = () => {
    let allValid = true;
    for (const ex of node.content.exercises) {
      if (!validateExercise(ex)) {
        allValid = false;
      }
    }
    if (allValid) {
      onCompleteLesson(node.id);
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl mx-auto w-full select-none">
      {/* 1. Header da Lição (Amplo e Acolhedor estilo Duolingo) */}
      <div className="p-6 rounded-2xl bg-layer1 border border-outline-subtle flex items-center justify-between shadow-surface-card">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-primary-electric/15 text-primary-electric border border-primary-electric/30">
            <BookOpen className="w-7 h-7" />
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs font-bold px-2.5 py-0.5 rounded-full bg-primary-electric/15 text-primary-electric border border-primary-electric/30">
                {node.node_type === 'MainLesson' ? '| Lição Principal' : 'o Fixação Opcional'} &bull; {node.id}
              </span>
              <span className="text-xs font-mono text-secondary-emerald flex items-center gap-1 font-bold">
                <Award className="w-3.5 h-3.5" /> +{node.xp_reward} XP
              </span>
            </div>

            <h1 className="font-display font-bold text-2xl text-on-surface">
              {node.title}
            </h1>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-3">
          <div className="text-right">
            <span className="text-[10px] font-mono text-on-surface-variant block">TEMPO ESTIMADO</span>
            <span className="text-xs font-mono font-bold text-on-surface flex items-center gap-1 justify-end">
              <Clock className="w-3.5 h-3.5 text-primary-electric" /> {node.estimated_minutes} min
            </span>
          </div>
          <SiberianCatMascot size={52} mood="curious" />
        </div>
      </div>

      {/* 2. Bloco de Conteúdo & Explicação Didática (Cards Grandes) */}
      <div className="p-6 rounded-2xl bg-layer1 border border-outline-subtle space-y-4 shadow-surface-card">
        <div className="flex items-center justify-between border-b border-outline-subtle pb-3">
          <h2 className="font-display font-bold text-lg text-on-surface flex items-center gap-2">
            <span>1. Conceito Didático</span>
          </h2>

          {onOpenAiTutor && (
            <button
              onClick={onOpenAiTutor}
              className="text-xs font-mono text-primary-electric hover:underline flex items-center gap-1.5"
            >
              <Sparkles className="w-3.5 h-3.5" /> Dúvidas? Pergunte ao Tutor IA
            </button>
          )}
        </div>

        <p className="text-sm text-on-surface-variant leading-relaxed p-4 rounded-xl bg-surface-container border border-outline-subtle">
          {node.content.concept_explanation}
        </p>
      </div>

      {/* 3. Demonstração Prática & Terminal Visual Simulado */}
      {node.content.demonstration && (
        <div className="p-6 rounded-2xl bg-layer1 border border-outline-subtle space-y-4 shadow-surface-card">
          <h2 className="font-display font-bold text-lg text-on-surface flex items-center gap-2">
            <span>2. Exemplo no Terminal Kali</span>
          </h2>

          <div className="bg-terminal rounded-xl border border-outline-subtle overflow-hidden">
            <div className="bg-surface-container px-4 py-2 flex items-center justify-between border-b border-outline-subtle text-xs font-mono text-on-surface-variant">
              <span>Terminal Kali Linux (Simulação Didática)</span>
              <TerminalIcon className="w-3.5 h-3.5 text-secondary-emerald" />
            </div>
            <div className="p-4 font-mono text-xs text-on-surface space-y-1">
              <div className="text-secondary-emerald font-semibold">user@kali:~$</div>
              <div className="text-on-surface pl-2">{node.content.demonstration}</div>
            </div>
          </div>
        </div>
      )}

      {/* 4. Exercícios Práticos & Verificação */}
      <div className="p-6 rounded-2xl bg-layer1 border border-outline-subtle space-y-5 shadow-surface-card">
        <h2 className="font-display font-bold text-lg text-on-surface flex items-center gap-2">
          <span>3. Prática & Fixação</span>
        </h2>

        {node.content.exercises.map((ex) => (
          <div
            key={ex.id}
            className="p-5 rounded-xl bg-surface-container border border-outline-subtle space-y-4"
          >
            <p className="font-semibold text-sm text-on-surface">{ex.prompt}</p>

            {/* Múltipla Escolha */}
            {ex.exercise_type.type === 'MultipleChoice' && (
              <div className="flex flex-col gap-2.5">
                {ex.exercise_type.data.options.map((opt, idx) => {
                  const isChosen = selectedOptions[ex.id] === idx;
                  return (
                    <button
                      key={idx}
                      onClick={() => handleSelectOption(ex.id, idx)}
                      className={`
                        w-full text-left p-3.5 rounded-xl border text-xs transition-all flex items-center justify-between
                        ${
                          isChosen
                            ? 'border-primary-electric bg-primary-electric/15 text-on-surface font-semibold shadow-glow-primary/30'
                            : 'border-outline-subtle bg-layer1 hover:bg-surface-container-high text-on-surface-variant'
                        }
                      `}
                    >
                      <span>
                        <strong className="text-primary-electric font-mono mr-2">
                          {idx + 1}.
                        </strong>
                        {opt}
                      </span>
                      {isChosen && <CheckCircle className="w-4 h-4 text-primary-electric shrink-0" />}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Terminal Interativo para Comando */}
            {ex.exercise_type.type === 'TerminalCommand' && (
              <div className="flex items-center gap-2 bg-terminal p-3.5 rounded-xl border border-outline-subtle font-mono text-xs">
                <span className="text-secondary-emerald font-bold">user@kali:~$</span>
                <input
                  type="text"
                  value={commandInputs[ex.id] || ''}
                  onChange={(e) => handleCommandChange(ex.id, e.target.value)}
                  placeholder="digite o comando exato..."
                  className="flex-1 bg-transparent border-none outline-none text-on-surface font-mono"
                />
              </div>
            )}

            {/* Feedback Visual do Exercício */}
            {exerciseFeedback[ex.id] && (
              <div
                className={`p-3 rounded-xl text-xs font-mono border ${
                  exerciseFeedback[ex.id].success
                    ? 'bg-secondary-emerald/10 text-secondary-emerald border-secondary-emerald/30'
                    : 'bg-error-container/20 text-error border-error/30'
                }`}
              >
                {exerciseFeedback[ex.id].message}
              </div>
            )}
          </div>
        ))}

        {/* CTA de Conclusão */}
        <div className="pt-2">
          <button
            onClick={handleFinishLesson}
            className="w-full py-3.5 bg-primary-electric hover:bg-primary-electric/90 text-white font-display font-semibold rounded-xl text-xs flex items-center justify-center gap-2 shadow-glow-primary transition-all"
          >
            <span>Validar e Concluir Lição</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
};
