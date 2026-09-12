import React, { useState } from 'react';
import { SiberianCatMascot } from './SiberianCatMascot';
import {
  ArrowLeftRight,
  Search,
  Monitor,
  Terminal as TerminalIcon,
  HelpCircle,
  FileText,
  Shield,
  Layers,
} from 'lucide-react';

interface ComparisonItem {
  id: string;
  category: 'Comandos Básicos' | 'Sistema de Arquivos' | 'Processos e Tarefas' | 'Configuração & Rede';
  windowsConcept: string;
  windowsExample: string;
  linuxConcept: string;
  linuxExample: string;
  didacticExplanation: string;
}

const COMPARISON_DATA: ComparisonItem[] = [
  {
    id: 'c1',
    category: 'Comandos Básicos',
    windowsConcept: 'cmd: dir / powershell: Get-ChildItem',
    windowsExample: 'dir',
    linuxConcept: 'ls (list)',
    linuxExample: 'ls -la',
    didacticExplanation:
      'Enquanto no Windows você usa dir para ver arquivos de uma pasta, no Linux usa-se ls. O modificador -la exibe permissões detalhadas e arquivos ocultos (que começam com ponto).',
  },
  {
    id: 'c2',
    category: 'Comandos Básicos',
    windowsConcept: 'cmd: cls / powershell: Clear-Host',
    windowsExample: 'cls',
    linuxConcept: 'clear (ou Ctrl + L)',
    linuxExample: 'clear',
    didacticExplanation:
      'Limpa o conteúdo visual da tela do terminal. No Linux o atalho de teclado Ctrl + L faz exatamente a mesma coisa instantaneamente.',
  },
  {
    id: 'c3',
    category: 'Sistema de Arquivos',
    windowsConcept: 'C:\\Windows\\System32 (Executáveis do Sistema)',
    windowsExample: 'C:\\Windows\\System32',
    linuxConcept: '/bin e /usr/bin (Binários essenciais)',
    linuxExample: '/bin',
    didacticExplanation:
      'O Windows organiza discos por letras (C:, D:). O Linux unifica tudo a partir da raiz (/), e os programas executáveis do sistema ficam dentro de /bin ou /usr/bin.',
  },
  {
    id: 'c4',
    category: 'Sistema de Arquivos',
    windowsConcept: 'Registro do Windows & Painel de Controle',
    windowsExample: 'regedit / Control Panel',
    linuxConcept: '/etc (Arquivos de Configuração em Texto)',
    linuxExample: '/etc',
    didacticExplanation:
      'No Windows, configurações ficam guardadas em um banco de dados binário (Registry). No Linux, tudo é arquivo de texto legível dentro do diretório /etc.',
  },
  {
    id: 'c5',
    category: 'Processos e Tarefas',
    windowsConcept: 'Gerenciador de Tarefas (Task Manager)',
    windowsExample: 'taskmgr.exe / Get-Process',
    linuxConcept: 'top / htop / ps aux',
    linuxExample: 'ps aux | grep serviço',
    didacticExplanation:
      'Para inspecionar uso de CPU e memória em tempo real no terminal Linux, usa-se o comando top ou htop. Para listar processos ativos em formato de texto usa-se ps aux.',
  },
  {
    id: 'c6',
    category: 'Configuração & Rede',
    windowsConcept: 'ipconfig',
    windowsExample: 'ipconfig /all',
    linuxConcept: 'ip a (ou ifconfig legado)',
    linuxExample: 'ip a',
    didacticExplanation:
      'ipconfig exibe os adaptadores de rede no Windows. No Linux moderno, o comando padrão é ip a (ip address), que mostra interfaces de rede e endereços IPv4/IPv6.',
  },
];

export const WindowsVsLinuxView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');

  const categories = [
    'Todas',
    'Comandos Básicos',
    'Sistema de Arquivos',
    'Processos e Tarefas',
    'Configuração & Rede',
  ];

  const filteredItems = COMPARISON_DATA.filter((item) => {
    const matchesSearch =
      item.windowsConcept.toLowerCase().includes(search.toLowerCase()) ||
      item.linuxConcept.toLowerCase().includes(search.toLowerCase()) ||
      item.didacticExplanation.toLowerCase().includes(search.toLowerCase());
    const matchesCategory =
      selectedCategory === 'Todas' || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full select-none">
      {/* Header com Mascote Siberiano */}
      <div className="p-6 rounded-2xl bg-layer1 border border-outline-subtle flex items-center justify-between shadow-surface-card">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-primary-electric/15 text-primary-electric border border-primary-electric/30">
            <ArrowLeftRight className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-primary-electric/15 text-primary-electric border border-primary-electric/30">
                GUIA DE TRANSIÇÃO
              </span>
              <span className="text-xs font-mono text-on-surface-variant">
                Desmistificando o Terminal
              </span>
            </div>
            <h1 className="font-display font-bold text-2xl text-on-surface mt-1">
              Comparador Windows vs Linux
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              Mapeamento direto de comandos, pastas e conceitos do Windows para equivalentes no Linux.
            </p>
          </div>
        </div>

        <SiberianCatMascot size={56} mood="curious" />
      </div>

      {/* Barra de Filtros e Busca */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-layer1 rounded-xl border border-outline-subtle">
        <div className="flex items-center gap-2 bg-surface-container px-3 py-2 rounded-lg border border-outline-subtle w-80 text-xs">
          <Search className="w-4 h-4 text-outline" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar por comando Windows ou Linux..."
            className="bg-transparent border-none outline-none text-on-surface font-mono w-full"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-mono transition-all
                ${
                  selectedCategory === cat
                    ? 'bg-primary-electric text-white font-semibold shadow-glow-primary/40'
                    : 'bg-surface-container text-on-surface-variant hover:text-on-surface'
                }
              `}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid de Cards Comparativos (Estilo Duolingo Amplo) */}
      <div className="grid grid-cols-1 gap-4">
        {filteredItems.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-layer1 border border-outline-subtle flex flex-col gap-4 shadow-surface-card hover:border-outline transition-all"
          >
            <div className="flex items-center justify-between border-b border-outline-subtle/60 pb-3">
              <span className="text-[11px] font-mono text-tertiary-indigo font-bold">
                {item.category}
              </span>
              <span className="text-[10px] font-mono text-on-surface-variant px-2 py-0.5 rounded bg-surface-container">
                Equivalência Direta
              </span>
            </div>

            {/* Comparação Visual Lado a Lado */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Lado Windows */}
              <div className="p-3.5 rounded-xl bg-surface-container border border-outline-subtle/70 flex flex-col gap-2">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-blue-400">
                  <Monitor className="w-4 h-4" />
                  <span>No Windows (CMD / PowerShell)</span>
                </div>
                <div className="font-mono text-xs text-on-surface bg-surface-lowest p-2 rounded-lg border border-outline-subtle/50">
                  {item.windowsExample}
                </div>
                <p className="text-[11px] text-on-surface-variant font-mono">
                  {item.windowsConcept}
                </p>
              </div>

              {/* Lado Linux */}
              <div className="p-3.5 rounded-xl bg-surface-container border border-primary-electric/30 flex flex-col gap-2 shadow-glow-primary/10">
                <div className="flex items-center gap-2 text-xs font-mono font-bold text-secondary-emerald">
                  <TerminalIcon className="w-4 h-4" />
                  <span>No Linux / Kali (Bash)</span>
                </div>
                <div className="font-mono text-xs text-secondary-emerald bg-terminal p-2 rounded-lg border border-outline-subtle/50">
                  user@kali:~$ {item.linuxExample}
                </div>
                <p className="text-[11px] text-on-surface-variant font-mono">
                  {item.linuxConcept}
                </p>
              </div>
            </div>

            {/* Explicação Pedagógica */}
            <p className="text-xs text-on-surface-variant leading-relaxed bg-surface-container-low p-3.5 rounded-xl border border-outline-subtle/50">
              <strong className="text-on-surface font-semibold">Por que é assim: </strong>
              {item.didacticExplanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};
