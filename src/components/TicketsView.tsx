import React, { useState } from 'react';
import { SiberianCatMascot } from './SiberianCatMascot';
import {
  Inbox,
  Terminal as TerminalIcon,
  CheckCircle2,
  AlertCircle,
  Play,
  ArrowRight,
  Sparkles,
  Lock,
} from 'lucide-react';

export interface Ticket {
  id: string;
  title: string;
  client: string;
  urgency: 'baixa' | 'media' | 'alta' | 'critica';
  description: string;
  isSpecialBounty?: boolean;
  isLocked?: boolean;
  unlockedByPracticeId?: string;
  expectedCommand: string;
  solved: boolean;
}

const INITIAL_TICKETS: Ticket[] = [
  {
    id: 'TK-101',
    title: 'Serviço Web Suspeito: Identificar Usuário Atual',
    client: 'Finance Corp IT',
    urgency: 'media',
    description:
      'Detectamos uma conexão remota e precisamos confirmar imediatamente com qual conta de usuário o processo está em execução.',
    expectedCommand: 'whoami',
    solved: false,
  },
  {
    id: 'TK-102',
    title: 'Verificação de Diretório Atual do Servidor de Arquivos',
    client: 'Hospital Regional',
    urgency: 'baixa',
    description:
      'O técnico de campo precisa saber exatamente em qual pasta absoluta o script de backup foi descompactado.',
    expectedCommand: 'pwd',
    solved: false,
  },
  {
    id: 'TK-SP-001',
    title: 'Bounty Especial: Investigar Arquivo Oculto de Permissões',
    client: 'Operação Sigilosa',
    urgency: 'alta',
    isSpecialBounty: true,
    isLocked: true,
    unlockedByPracticeId: 'F1.1a',
    description:
      'Chamado de recompensa máxima! Desbloqueado ao concluir a atividade de fixação da filosofia Linux.',
    expectedCommand: 'ls -la',
    solved: false,
  },
];

export const TicketsView: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [selectedTicketId, setSelectedTicketId] = useState<string>(INITIAL_TICKETS[0].id);
  const [terminalInput, setTerminalInput] = useState('');
  const [terminalLogs, setTerminalLogs] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<{ success: boolean; msg: string } | null>(null);

  const activeTicket = tickets.find((t) => t.id === selectedTicketId) || tickets[0];

  const handleExecute = (e: React.FormEvent) => {
    e.preventDefault();
    if (!terminalInput.trim()) return;

    const cmd = terminalInput.trim();
    setTerminalLogs((prev) => [...prev, `user@kali:~$ ${cmd}`]);

    if (cmd === activeTicket.expectedCommand) {
      setFeedback({
        success: true,
        msg: `[CHAMADO CONCLUÍDO]: O comando '${cmd}' resolveu a ocorrência com sucesso! Relatório gerado.`,
      });
      setTickets((prev) =>
        prev.map((t) => (t.id === activeTicket.id ? { ...t, solved: true } : t))
      );
    } else {
      setFeedback({
        success: false,
        msg: `[FALHA NA RESOLUÇÃO]: O comando '${cmd}' não solucionou o problema solicitado pelo cliente.`,
      });
    }

    setTerminalInput('');
  };

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full">
      {/* Header do Sistema de Chamados */}
      <div className="flex items-center justify-between p-6 bg-layer1 rounded-2xl border border-outline-subtle">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-xl bg-primary-electric/15 text-primary-electric border border-primary-electric/30">
            <Inbox className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-on-surface flex items-center gap-2">
              Caixa de Entrada de Chamados
              <span className="text-xs font-mono font-normal px-2 py-0.5 rounded-full bg-secondary-emerald/15 text-secondary-emerald border border-secondary-emerald/30">
                while True: learn() Mode
              </span>
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              Resolva tickets e incidentes reais através da linha de comando do terminal.
            </p>
          </div>
        </div>

        <SiberianCatMascot size={56} />
      </div>

      {/* Grid: Lista de Tickets (Esquerda) + Terminal e Detalhe (Direita) */}
      <div className="grid grid-cols-12 gap-6">
        {/* Coluna Esquerda: Lista de Tickets */}
        <div className="col-span-5 flex flex-col gap-3">
          <h2 className="text-xs font-mono font-bold text-on-surface-variant uppercase tracking-wider px-1">
            Tickets Pendentes ({tickets.filter((t) => !t.solved).length})
          </h2>

          {tickets.map((ticket) => {
            const isSelected = ticket.id === activeTicket.id;
            return (
              <div
                key={ticket.id}
                onClick={() => !ticket.isLocked && setSelectedTicketId(ticket.id)}
                className={`
                  p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-2 relative
                  ${
                    isSelected
                      ? 'bg-surface-container-high border-primary-electric shadow-glow-primary'
                      : 'bg-layer1 border-outline-subtle hover:border-outline'
                  }
                  ${ticket.isLocked ? 'opacity-50 cursor-not-allowed' : ''}
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-bold text-primary-electric">
                    {ticket.id}
                  </span>
                  <div className="flex items-center gap-2">
                    {ticket.isSpecialBounty && (
                      <span className="text-[9px] font-mono px-2 py-0.5 rounded-full bg-orange-500/15 text-orange-400 border border-orange-500/30 flex items-center gap-1">
                        <Sparkles className="w-2.5 h-2.5" /> BOUNTY
                      </span>
                    )}
                    {ticket.solved ? (
                      <span className="text-[10px] font-mono text-secondary-emerald flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Resolvido
                      </span>
                    ) : ticket.isLocked ? (
                      <span className="text-[10px] font-mono text-outline flex items-center gap-1">
                        <Lock className="w-3.5 h-3.5" /> Bloqueado
                      </span>
                    ) : (
                      <span className="text-[10px] font-mono text-orange-400 flex items-center gap-1">
                        <AlertCircle className="w-3.5 h-3.5" /> Aberto
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-semibold text-sm text-on-surface leading-snug">
                  {ticket.title}
                </h3>
                <p className="text-xs text-on-surface-variant font-mono">
                  Cliente: <span className="text-on-surface">{ticket.client}</span>
                </p>
              </div>
            );
          })}
        </div>

        {/* Coluna Direita: Briefing do Chamado + Terminal Interativo */}
        <div className="col-span-7 flex flex-col gap-4">
          {/* Briefing */}
          <div className="p-5 bg-layer1 rounded-xl border border-outline-subtle flex flex-col gap-3">
            <div className="flex items-center justify-between border-b border-outline-subtle pb-3">
              <div>
                <span className="text-xs font-mono text-primary-electric">
                  {activeTicket.client} &bull; {activeTicket.id}
                </span>
                <h2 className="font-display font-bold text-lg text-on-surface mt-1">
                  {activeTicket.title}
                </h2>
              </div>
            </div>

            <p className="text-sm text-on-surface-variant leading-relaxed">
              {activeTicket.description}
            </p>
          </div>

          {/* Terminal Embutido para Resolução */}
          <div className="flex flex-col bg-terminal rounded-xl border border-outline-subtle overflow-hidden shadow-surface-card">
            {/* Terminal Header */}
            <div className="bg-surface-container px-4 py-2 flex items-center justify-between border-b border-outline-subtle text-xs font-mono text-on-surface-variant">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-error" />
                <div className="w-2.5 h-2.5 rounded-full bg-orange-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-secondary-emerald" />
                <span className="ml-2">bash - ticket-solver@kali</span>
              </div>
              <TerminalIcon className="w-3.5 h-3.5 text-primary-electric" />
            </div>

            {/* Terminal Output */}
            <div className="p-4 font-mono text-xs text-on-surface min-h-[160px] space-y-2 overflow-y-auto">
              <div className="text-on-surface-variant">
                # Conectado ao ambiente controlado do chamado {activeTicket.id}
                <br /># Digite o comando adequado para auditar ou resolver o problema:
              </div>
              {terminalLogs.map((log, idx) => (
                <div key={idx} className="text-secondary-emerald">
                  {log}
                </div>
              ))}
            </div>

            {/* Terminal Input Form */}
            <form onSubmit={handleExecute} className="flex items-center gap-2 p-3 bg-surface-lowest border-t border-outline-subtle">
              <span className="text-xs font-mono font-bold text-secondary-emerald">
                user@kali:~$
              </span>
              <input
                type="text"
                value={terminalInput}
                onChange={(e) => setTerminalInput(e.target.value)}
                placeholder="digite o comando e pressione Enter..."
                className="flex-1 bg-transparent border-none outline-none text-xs font-mono text-on-surface"
              />
              <button
                type="submit"
                className="px-3 py-1.5 bg-primary-electric hover:bg-primary-electric/90 text-white rounded-lg text-xs font-mono flex items-center gap-1.5"
              >
                <Play className="w-3 h-3" /> Executar
              </button>
            </form>
          </div>

          {/* Feedback do Chamado */}
          {feedback && (
            <div
              className={`p-3.5 rounded-xl text-xs font-mono border ${
                feedback.success
                  ? 'bg-secondary-emerald/10 text-secondary-emerald border-secondary-emerald/30'
                  : 'bg-error-container/20 text-error border-error/30'
              }`}
            >
              {feedback.msg}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
