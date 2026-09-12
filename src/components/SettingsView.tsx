import React, { useState } from 'react';
import { SiberianCatMascot } from './SiberianCatMascot';
import {
  Settings,
  ShieldCheck,
  ShieldAlert,
  Bot,
  Terminal,
  Volume2,
  HardDrive,
  CheckCircle2,
} from 'lucide-react';

interface AuditLog {
  id: string;
  command: string;
  riskLevel: 'Crítico' | 'Alto' | 'Médio';
  timestamp: string;
  actionTaken: 'Confirmado pelo Usuário' | 'Bloqueado por Segurança';
}

const AUDIT_HISTORY: AuditLog[] = [
  {
    id: 'aud-1',
    command: 'rm -rf /',
    riskLevel: 'Crítico',
    timestamp: 'Hoje às 19:40',
    actionTaken: 'Bloqueado por Segurança',
  },
  {
    id: 'aud-2',
    command: 'dd if=/dev/zero of=/dev/sda',
    riskLevel: 'Crítico',
    timestamp: 'Hoje às 20:10',
    actionTaken: 'Bloqueado por Segurança',
  },
  {
    id: 'aud-3',
    command: 'sudo chmod -R 777 /etc',
    riskLevel: 'Alto',
    timestamp: 'Hoje às 21:00',
    actionTaken: 'Confirmado pelo Usuário',
  },
];

export const SettingsView: React.FC = () => {
  const [terminalFontSize, setTerminalFontSize] = useState('13px');
  const [aiModelStatus] = useState('Pronto (Qwen3 0.6B Q4_K_M Offline)');
  const [soundEffects, setSoundEffects] = useState(true);

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full select-none">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-layer1 border border-outline-subtle flex items-center justify-between shadow-surface-card">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-primary-electric/15 text-primary-electric border border-primary-electric/30">
            <Settings className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-on-surface flex items-center gap-2">
              Configurações & Monitor de Auditoria
              <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-primary-electric/15 text-primary-electric border border-primary-electric/30">
                Sistema & Segurança
              </span>
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              Gerencie parâmetros da interface, status do motor de IA offline e logs de proteção de segurança.
            </p>
          </div>
        </div>

        <SiberianCatMascot size={52} mood="focused" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Painel de Preferências da Interface */}
        <div className="p-6 rounded-2xl bg-layer1 border border-outline-subtle space-y-4 shadow-surface-card">
          <h2 className="font-display font-bold text-lg text-on-surface border-b border-outline-subtle pb-3 flex items-center gap-2">
            <Terminal className="w-5 h-5 text-primary-electric" />
            <span>Preferências do Terminal & Interface</span>
          </h2>

          <div className="space-y-4 text-xs font-mono">
            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container">
              <div>
                <p className="text-on-surface font-semibold">Tamanho da Fonte do Terminal</p>
                <p className="text-[11px] text-on-surface-variant">Ajuste da fonte JetBrains Mono</p>
              </div>
              <select
                value={terminalFontSize}
                onChange={(e) => setTerminalFontSize(e.target.value)}
                className="bg-layer1 border border-outline-subtle rounded-lg px-2.5 py-1 text-on-surface outline-none"
              >
                <option value="12px">12px (Compacto)</option>
                <option value="13px">13px (Padrão)</option>
                <option value="15px">15px (Grande)</option>
              </select>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-surface-container">
              <div>
                <p className="text-on-surface font-semibold">Efeitos Sonoros de Feedback</p>
                <p className="text-[11px] text-on-surface-variant">Sons ao concluir lições e tickets</p>
              </div>
              <button
                onClick={() => setSoundEffects(!soundEffects)}
                className={`px-3 py-1 rounded-lg border text-xs ${
                  soundEffects
                    ? 'bg-secondary-emerald/20 text-secondary-emerald border-secondary-emerald/40'
                    : 'bg-surface-lowest text-outline border-outline-subtle'
                }`}
              >
                {soundEffects ? 'Ativado' : 'Desativado'}
              </button>
            </div>

            <div className="p-3.5 rounded-xl bg-surface-container space-y-1.5">
              <div className="flex items-center justify-between">
                <span className="text-on-surface font-semibold flex items-center gap-1.5">
                  <Bot className="w-4 h-4 text-tertiary-indigo" /> Tutor IA Local
                </span>
                <span className="text-secondary-emerald font-bold text-[10px]">OPERACIONAL</span>
              </div>
              <p className="text-[11px] text-on-surface-variant">
                Modelo: {aiModelStatus}
              </p>
            </div>
          </div>
        </div>

        {/* Monitor de Auditoria & Segurança */}
        <div className="p-6 rounded-2xl bg-layer1 border border-outline-subtle space-y-4 shadow-surface-card">
          <h2 className="font-display font-bold text-lg text-on-surface border-b border-outline-subtle pb-3 flex items-center gap-2">
            <ShieldAlert className="w-5 h-5 text-orange-400" />
            <span>Monitor de Segurança & Ações Interceptadas</span>
          </h2>

          <div className="space-y-3">
            {AUDIT_HISTORY.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-surface-container border border-outline-subtle/80 flex items-center justify-between text-xs font-mono"
              >
                <div className="space-y-0.5">
                  <span className="text-error font-bold">{log.command}</span>
                  <div className="text-[10px] text-on-surface-variant flex items-center gap-2">
                    <span>{log.timestamp}</span>
                    <span>&bull;</span>
                    <span className="text-orange-400">Risco: {log.riskLevel}</span>
                  </div>
                </div>

                <span
                  className={`text-[10px] px-2 py-0.5 rounded border ${
                    log.actionTaken.includes('Bloqueado')
                      ? 'bg-error-container/20 text-error border-error/30'
                      : 'bg-secondary-emerald/15 text-secondary-emerald border-secondary-emerald/30'
                  }`}
                >
                  {log.actionTaken}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
