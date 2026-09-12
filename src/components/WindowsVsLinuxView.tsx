import React, { useState } from 'react';
import { SiberianCatMascot } from './SiberianCatMascot';
import {
  ArrowLeftRight,
  Terminal,
  FolderTree,
  ShieldCheck,
  Cpu,
  Search,
  BookOpen,
} from 'lucide-react';

interface ComparisonItem {
  id: string;
  category: string;
  concept: string;
  windowsWay: {
    title: string;
    commandOrPath: string;
    explanation: string;
  };
  linuxWay: {
    title: string;
    commandOrPath: string;
    explanation: string;
  };
}

const COMPARISONS: ComparisonItem[] = [
  {
    id: '1',
    category: 'Linha de Comando & Shell',
    concept: 'Identificação de Usuário',
    windowsWay: {
      title: 'CMD / PowerShell',
      commandOrPath: 'whoami',
      explanation: 'Retorna DOMINIO\\usuario em formato de rede corporativa ou local.',
    },
    linuxWay: {
      title: 'Bash / Zsh',
      commandOrPath: 'whoami  /  id',
      explanation: 'Retorna o nome do usuário puro (ex: kali) e o comando `id` lista UID, GID e grupos.',
    },
  },
  {
    id: '2',
    category: 'Estrutura de Arquivos',
    concept: 'Diretório Raiz & Executáveis',
    windowsWay: {
      title: 'Drives & System32',
      commandOrPath: 'C:\\Windows\\System32',
      explanation: 'O Windows divide discos em letras (C:, D:) e armazena binários centrais no System32.',
    },
    linuxWay: {
      title: 'Árvore Única (FHS)',
      commandOrPath: '/  e  /bin , /usr/bin',
      explanation: 'Tudo nasce na raiz `/`. Executáveis padrão residem em `/bin` e programas em `/usr/bin`.',
    },
  },
  {
    id: '3',
    category: 'Gerenciamento de Processos',
    concept: 'Monitorar Processos em Execução',
    windowsWay: {
      title: 'Gerenciador de Tarefas / tasklist',
      commandOrPath: 'tasklist  /  Taskmgr',
      explanation: 'Interface gráfica com abas de desempenho ou utilitário `tasklist` no CMD.',
    },
    linuxWay: {
      title: 'ps / top / htop',
      commandOrPath: 'ps aux  /  top',
      explanation: '`ps aux` lista todos os processos detalhados; `top` ou `htop` fornecem monitoramento interativo em tempo real.',
    },
  },
  {
    id: '4',
    category: 'Configurações de Sistema',
    concept: 'Registro vs Arquivos de Texto',
    windowsWay: {
      title: 'Registro do Windows (Registry)',
      commandOrPath: 'regedit  /  HKLM, HKCU',
      explanation: 'Banco de dados binário centralizado e hierárquico contendo todas as configurações.',
    },
    linuxWay: {
      title: 'Diretório /etc',
      commandOrPath: '/etc/*',
      explanation: 'Filosofia Unix: configurações são arquivos de texto puro e editáveis (ex: `/etc/passwd`, `/etc/network`).',
    },
  },
  {
    id: '5',
    category: 'Privilégios & Segurança',
    concept: 'Elevação de Privilégios',
    windowsWay: {
      title: 'UAC / Executar como Administrador',
      commandOrPath: 'Run as Administrator',
      explanation: 'Janela de confirmação do Controle de Conta de Usuário (UAC) para rodar processos elevados.',
    },
    linuxWay: {
      title: 'Superusuário / sudo',
      commandOrPath: 'sudo [comando]  /  su -',
      explanation: 'Comando `sudo` (SuperUser DO) concede privilégios de root para a execução de uma ordem específica.',
    },
  },
];

export const WindowsVsLinuxView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Todas');

  const categories = ['Todas', 'Linha de Comando & Shell', 'Estrutura de Arquivos', 'Gerenciamento de Processos', 'Configurações de Sistema', 'Privilégios & Segurança'];

  const filtered = COMPARISONS.filter((item) => {
    const matchSearch =
      item.concept.toLowerCase().includes(search.toLowerCase()) ||
      item.windowsWay.commandOrPath.toLowerCase().includes(search.toLowerCase()) ||
      item.linuxWay.commandOrPath.toLowerCase().includes(search.toLowerCase());
    const matchCat = activeCategory === 'Todas' || item.category === activeCategory;
    return matchSearch && matchCat;
  });

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full select-none">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-layer1 border border-outline-subtle flex items-center justify-between shadow-surface-card">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-primary-electric/15 text-primary-electric border border-primary-electric/30">
            <ArrowLeftRight className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-on-surface flex items-center gap-2">
              Comparador Windows vs Linux
              <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-primary-electric/15 text-primary-electric border border-primary-electric/30">
                Guia de Migração Didática
              </span>
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              Traduza o que você já conhece do Windows para os equivalentes conceituais e comandos no Linux/Kali.
            </p>
          </div>
        </div>

        <SiberianCatMascot size={52} mood="focused" />
      </div>

      {/* Busca e Filtros */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-layer1 rounded-xl border border-outline-subtle">
        <div className="flex items-center gap-2 bg-surface-container px-3 py-2 rounded-lg border border-outline-subtle w-72 text-xs">
          <Search className="w-4 h-4 text-outline" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar conceito ou comando..."
            className="bg-transparent border-none outline-none text-on-surface font-mono w-full"
          />
        </div>

        <div className="flex flex-wrap items-center gap-1.5">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`
                px-3 py-1.5 rounded-lg text-xs font-mono transition-all
                ${
                  activeCategory === cat
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

      {/* Grid de Comparações Lado a Lado */}
      <div className="flex flex-col gap-4">
        {filtered.map((item) => (
          <div
            key={item.id}
            className="p-5 rounded-2xl bg-layer1 border border-outline-subtle shadow-surface-card flex flex-col gap-4"
          >
            <div className="flex items-center justify-between border-b border-outline-subtle/60 pb-2.5">
              <span className="text-xs font-mono text-primary-electric font-bold">
                {item.category}
              </span>
              <span className="text-sm font-display font-bold text-on-surface">
                {item.concept}
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Lado Windows */}
              <div className="p-4 rounded-xl bg-surface-container/70 border border-outline-subtle/80 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold text-blue-400">
                    NO WINDOWS
                  </span>
                  <span className="text-xs font-medium text-on-surface-variant">
                    {item.windowsWay.title}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-surface-lowest font-mono text-xs text-blue-300 border border-outline-subtle/40">
                  {item.windowsWay.commandOrPath}
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {item.windowsWay.explanation}
                </p>
              </div>

              {/* Lado Linux */}
              <div className="p-4 rounded-xl bg-surface-container/70 border border-secondary-emerald/30 space-y-2 shadow-glow-secondary/10">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono font-semibold text-secondary-emerald">
                    NO LINUX / KALI
                  </span>
                  <span className="text-xs font-medium text-on-surface-variant">
                    {item.linuxWay.title}
                  </span>
                </div>
                <div className="p-2.5 rounded-lg bg-terminal font-mono text-xs text-secondary-emerald border border-secondary-emerald/30">
                  {item.linuxWay.commandOrPath}
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  {item.linuxWay.explanation}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
