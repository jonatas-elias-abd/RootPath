import React, { useState } from 'react';
import { SiberianCatMascot } from './SiberianCatMascot';
import {
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  Play,
  Terminal,
  Clock,
  Sparkles,
  HelpCircle,
} from 'lucide-react';

interface ErrorItem {
  id: string;
  commandTyped: string;
  expectedCommand: string;
  context: string;
  explanation: string;
  timesFailed: number;
  lastAttempt: string;
}

const ERROR_HISTORY: ErrorItem[] = [
  {
    id: 'err-1',
    commandTyped: 'who am i',
    expectedCommand: 'whoami',
    context: 'Lição L1.2 — Identidade e Máquina',
    explanation: 'No Linux, a maioria dos comandos essenciais é uma única palavra concisa sem espaços.',
    timesFailed: 2,
    lastAttempt: 'Hoje às 20:15',
  },
  {
    id: 'err-2',
    commandTyped: 'cd..',
    expectedCommand: 'cd ..',
    context: 'Lição L2.2 — Navegação entre Diretórios',
    explanation: 'O Bash exige um espaço obrigatório entre o comando `cd` e o argumento de diretório pai `..`.',
    timesFailed: 1,
    lastAttempt: 'Hoje às 20:40',
  },
  {
    id: 'err-3',
    commandTyped: 'dir',
    expectedCommand: 'ls -la',
    context: 'Chamado TK-102 — Listar Arquivos Ocultos',
    explanation: 'Embora o Windows use `dir`, no Linux o padrão nativo é `ls`. Para ver arquivos ocultos, use o parâmetro `-a`.',
    timesFailed: 1,
    lastAttempt: 'Hoje às 21:05',
  },
];

export const ErrorReviewView: React.FC = () => {
  const [practiceInput, setPracticeInput] = useState<Record<string, string>>({});
  const [feedback, setFeedback] = useState<Record<string, { ok: boolean; msg: string }>>({});

  const handleTest = (errId: string, expected: string) => {
    const typed = (practiceInput[errId] || '').trim();
    if (typed === expected) {
      setFeedback((prev) => ({
        ...prev,
        [errId]: { ok: true, msg: 'Excelente! Comando dominado com sucesso.' },
      }));
    } else {
      setFeedback((prev) => ({
        ...prev,
        [errId]: { ok: false, msg: `Ainda divergente. O formato correto é: '${expected}'.` },
      }));
    }
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full select-none">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-layer1 border border-outline-subtle flex items-center justify-between shadow-surface-card">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-orange-500/15 text-orange-400 border border-orange-500/30">
            <RotateCcw className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-on-surface flex items-center gap-2">
              Caderno de Erros & Revisão Espaçada
              <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30">
                Fixação Inteligente
              </span>
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              Reúne automaticamente os comandos que você errou nos exercícios e chamados para re-treinar e fixar.
            </p>
          </div>
        </div>

        <SiberianCatMascot size={52} mood="curious" />
      </div>

      {/* Lista de Erros para Re-treino */}
      <div className="flex flex-col gap-4">
        {ERROR_HISTORY.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-layer1 border border-outline-subtle shadow-surface-card space-y-4"
          >
            <div className="flex items-center justify-between border-b border-outline-subtle/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono font-bold text-orange-400 bg-orange-500/10 px-2 py-0.5 rounded border border-orange-500/20">
                  {item.context}
                </span>
                <span className="text-xs font-mono text-on-surface-variant flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {item.lastAttempt}
                </span>
              </div>

              <span className="text-[11px] font-mono text-on-surface-variant">
                Tentativas incorretas: <strong className="text-orange-400">{item.timesFailed}</strong>
              </span>
            </div>

            {/* Comparação do Erro com a Explicação */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div className="p-3 bg-error-container/10 border border-error/20 rounded-xl space-y-1 text-error">
                <span className="text-[10px] uppercase font-bold text-error/80 block">O que você digitou:</span>
                <span className="line-through font-semibold">{item.commandTyped}</span>
              </div>

              <div className="p-3 bg-secondary-emerald/10 border border-secondary-emerald/20 rounded-xl space-y-1 text-secondary-emerald">
                <span className="text-[10px] uppercase font-bold text-secondary-emerald/80 block">Comando correto esperado:</span>
                <span className="font-bold">{item.expectedCommand}</span>
              </div>
            </div>

            <p className="text-xs text-on-surface-variant leading-relaxed p-3 bg-surface-container rounded-xl border border-outline-subtle">
              💡 <strong>Por que errou:</strong> {item.explanation}
            </p>

            {/* Mini-Terminal de Re-treino */}
            <div className="space-y-2 pt-1">
              <span className="text-[11px] font-mono font-semibold text-primary-electric flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5" /> Pratique e valide agora mesmo:
              </span>

              <div className="flex items-center gap-2 bg-terminal p-3 rounded-xl border border-outline-subtle font-mono text-xs">
                <span className="text-secondary-emerald font-bold">user@kali:~$</span>
                <input
                  type="text"
                  value={practiceInput[item.id] || ''}
                  onChange={(e) =>
                    setPracticeInput((prev) => ({ ...prev, [item.id]: e.target.value }))
                  }
                  onKeyDown={(e) => e.key === 'Enter' && handleTest(item.id, item.expectedCommand)}
                  placeholder="digite o comando correto e aperte Enter..."
                  className="flex-1 bg-transparent border-none outline-none text-on-surface font-mono"
                />
                <button
                  onClick={() => handleTest(item.id, item.expectedCommand)}
                  className="px-3 py-1 bg-primary-electric hover:bg-primary-electric/90 text-white rounded-lg text-xs font-mono flex items-center gap-1"
                >
                  <Play className="w-3 h-3" /> Testar
                </button>
              </div>

              {feedback[item.id] && (
                <div
                  className={`p-2.5 rounded-lg text-xs font-mono border ${
                    feedback[item.id].ok
                      ? 'bg-secondary-emerald/10 text-secondary-emerald border-secondary-emerald/30'
                      : 'bg-error-container/20 text-error border-error/30'
                  }`}
                >
                  {feedback[item.id].msg}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
