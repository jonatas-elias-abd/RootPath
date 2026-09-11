import React, { useState } from 'react';
import { LessonNode, Exercise } from '../types';
import { Terminal as TerminalIcon, CheckCircle, HelpCircle, ArrowRight } from 'lucide-react';

interface LessonViewProps {
  node: LessonNode;
  onCompleteLesson: (lessonId: string) => void;
}

export const LessonView: React.FC<LessonViewProps> = ({ node, onCompleteLesson }) => {
  const [selectedOptions, setSelectedOptions] = useState<Record<string, number>>({});
  const [commandInputs, setCommandInputs] = useState<Record<string, string>>({});
  const [exerciseFeedback, setExerciseFeedback] = useState<Record<string, { success: boolean; message: string }>>({});

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
          [exercise.id]: { success: false, message: 'Por favor, selecione uma opção antes de verificar.' },
        }));
        return false;
      }

      if (selected === correct) {
        setExerciseFeedback((prev) => ({
          ...prev,
          [exercise.id]: { success: true, message: 'Resposta Correta! Excelente compreenção.' },
        }));
        return true;
      } else {
        setExerciseFeedback((prev) => ({
          ...prev,
          [exercise.id]: { success: false, message: 'Resposta incorreta. Tente novamente ou leia a dica!' },
        }));
        return false;
      }
    } else if (exercise.exercise_type.type === 'TerminalCommand') {
      const input = (commandInputs[exercise.id] || '').trim();
      const expected = exercise.exercise_type.data.expected_command;

      if (input === expected) {
        setExerciseFeedback((prev) => ({
          ...prev,
          [exercise.id]: { success: true, message: 'Comando executado com sucesso!' },
        }));
        return true;
      } else {
        setExerciseFeedback((prev) => ({
          ...prev,
          [exercise.id]: { success: false, message: `Comando incorreto. Esperado: '${expected}'` },
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
    <div className="flex flex-col gap-6 p-6 bg-surface-container rounded-2xl border border-outline-subtle shadow-surface-card max-w-4xl mx-auto">
      {/* Header da Lição */}
      <div className="flex items-center justify-between border-b border-outline-subtle pb-4">
        <div>
          <span className="font-mono text-xs text-primary-electric bg-primary-electric/10 px-2.5 py-1 rounded-full border border-primary-electric/20">
            {node.node_type === 'MainLesson' ? 'Lição Principal |' : 'Fixação o'} {node.id}
          </span>
          <h1 className="font-display text-2xl font-bold text-on-surface mt-2">{node.title}</h1>
        </div>
        <div className="text-right">
          <span className="text-xs text-on-surface-variant">Tempo estimado</span>
          <p className="font-mono font-semibold text-sm text-secondary-emerald">{node.estimated_minutes} min</p>
        </div>
      </div>

      {/* Explicação Didática */}
      <div className="space-y-3">
        <h3 className="font-display font-semibold text-lg text-on-surface">1. Conceito Fundamental</h3>
        <p className="text-on-surface-variant leading-relaxed text-sm bg-surface-container-low p-4 rounded-xl border border-outline-subtle">
          {node.content.concept_explanation}
        </p>
      </div>

      {/* Demonstração Prática */}
      {node.content.demonstration && (
        <div className="space-y-3">
          <h3 className="font-display font-semibold text-lg text-on-surface">2. Demonstração no Terminal</h3>
          <div className="bg-terminal p-4 rounded-xl border border-outline-subtle font-mono text-xs text-on-surface flex items-center gap-3">
            <TerminalIcon className="w-4 h-4 text-secondary-emerald shrink-0" />
            <span>{node.content.demonstration}</span>
          </div>
        </div>
      )}

      {/* Exercícios Práticos */}
      <div className="space-y-4 pt-2">
        <h3 className="font-display font-semibold text-lg text-on-surface">3. Prática e Fixação</h3>

        {node.content.exercises.map((ex) => (
          <div key={ex.id} className="p-5 bg-surface-container-low rounded-xl border border-outline-subtle space-y-4">
            <p className="font-semibold text-on-surface text-sm">{ex.prompt}</p>

            {/* Múltipla Escolha */}
            {ex.exercise_type.type === 'MultipleChoice' && (
              <div className="flex flex-col gap-2">
                {ex.exercise_type.data.options.map((opt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSelectOption(ex.id, idx)}
                    className={`
                      w-full text-left p-3 rounded-lg border transition-all text-sm
                      ${selectedOptions[ex.id] === idx ? 'border-primary-electric bg-primary-electric/10 text-on-surface font-medium' : 'border-outline-subtle bg-surface-container hover:bg-surface-container-high text-on-surface-variant'}
                    `}
                  >
                    {idx + 1}. {opt}
                  </button>
                ))}
              </div>
            )}

            {/* Comando de Terminal */}
            {ex.exercise_type.type === 'TerminalCommand' && (
              <div className="flex items-center gap-2 bg-terminal p-3 rounded-lg border border-outline-subtle font-mono text-xs">
                <span className="text-secondary-emerald font-bold">user@kali:~$</span>
                <input
                  type="text"
                  value={commandInputs[ex.id] || ''}
                  onChange={(e) => handleCommandChange(ex.id, e.target.value)}
                  placeholder="digite o comando aqui..."
                  className="bg-transparent border-none outline-none flex-1 text-on-surface font-mono"
                />
              </div>
            )}

            {/* Feedback & Botão de Verificar */}
            {exerciseFeedback[ex.id] && (
              <div
                className={`p-3 rounded-lg text-xs font-medium ${
                  exerciseFeedback[ex.id].success ? 'bg-secondary-emerald/10 text-secondary-emerald border border-secondary-emerald/30' : 'bg-error-container/20 text-error border border-error/30'
                }`}
              >
                {exerciseFeedback[ex.id].message}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Botão de Conclusão da Lição */}
      <button
        onClick={handleFinishLesson}
        className="mt-4 flex items-center justify-center gap-2 w-full py-3.5 bg-primary-electric hover:bg-primary-electric/90 text-white font-display font-semibold rounded-xl transition-all shadow-glow-primary"
      >
        <span>Concluir Lição e Avançar</span>
        <ArrowRight className="w-5 h-5" />
      </button>
    </div>
  );
};
