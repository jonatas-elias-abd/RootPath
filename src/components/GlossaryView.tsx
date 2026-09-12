import React, { useState } from 'react';
import { SiberianCatMascot } from './SiberianCatMascot';
import {
  BookOpen,
  Search,
  Tag,
  Sparkles,
  ChevronRight,
  Terminal,
} from 'lucide-react';

interface GlossaryTerm {
  id: string;
  term: string;
  category: 'Fundamentos' | 'Kernel & Sistema' | 'Redes' | 'Segurança';
  pronunciation?: string;
  summary: string;
  inDepth: string;
  practicalExample: string;
}

const GLOSSARY_DATA: GlossaryTerm[] = [
  {
    id: '1',
    term: 'Kernel',
    category: 'Kernel & Sistema',
    summary: 'O núcleo central do sistema operacional que gerencia o hardware e os processos.',
    inDepth: 'O Kernel é o primeiro programa carregado na inicialização. Ele atua como uma ponte entre os aplicativos do usuário e a memória física, CPU, discos e placas de rede.',
    practicalExample: 'uname -r  (exibe a versão atual do Kernel Linux carregado)',
  },
  {
    id: '2',
    term: 'Shell / Bash',
    category: 'Fundamentos',
    summary: 'O interpretador de comandos que recebe suas instruções digitadas e as envia ao Kernel.',
    inDepth: 'O Shell é a interface de texto. Bash (Bourne Again Shell) e Zsh são os interpretadores mais populares no ecossistema Linux e no Kali.',
    practicalExample: 'echo $SHELL  (mostra qual interpretador de comandos você está usando)',
  },
  {
    id: '3',
    term: 'Daemon',
    category: 'Kernel & Sistema',
    summary: 'Processos que rodam em segundo plano de forma silenciosa e contínua.',
    inDepth: 'Daemons geralmente terminam com a letra "d" (como `sshd`, `systemd`, `httpd`). Eles aguardam requisições sem exigir uma janela aberta.',
    practicalExample: 'systemctl status ssh  (verifica se o daemon SSH está ativo)',
  },
  {
    id: '4',
    term: 'Pipeline ( | )',
    category: 'Fundamentos',
    summary: 'Conecta a saída de um comando diretamente na entrada do próximo comando.',
    inDepth: 'Permite encadear pequenas ferramentas para realizar tarefas complexas, seguindo a filosofia de que cada programa Unix deve fazer uma única coisa muito bem.',
    practicalExample: 'cat /etc/passwd | grep kali',
  },
  {
    id: '5',
    term: 'Sudo (SuperUser DO)',
    category: 'Segurança',
    summary: 'Permite que um usuário autorizado execute comandos com privilégios de administrador (root).',
    inDepth: 'Em vez de usar a conta de root diretamente o tempo todo (o que é arriscado), usa-se o `sudo` pontualmente para tarefas administrativas.',
    practicalExample: 'sudo apt update',
  },
  {
    id: '6',
    term: 'Porta & Socket',
    category: 'Redes',
    summary: 'Um número de 0 a 65535 que identifica para qual serviço de rede uma conexão é destinada.',
    inDepth: 'Exemplos: Porta 80 para HTTP, 443 para HTTPS, 22 para SSH e 53 para DNS. O Nmap é a ferramenta padrão para verificar quais portas estão abertas.',
    practicalExample: 'ss -tuln  (lista todas as portas TCP e UDP abertas ouvindo conexões)',
  },
];

export const GlossaryView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [activeCategory, setActiveCategory] = useState<string>('Todas');
  const [selectedTerm, setSelectedTerm] = useState<GlossaryTerm>(GLOSSARY_DATA[0]);

  const categories = ['Todas', 'Fundamentos', 'Kernel & Sistema', 'Redes', 'Segurança'];

  const filtered = GLOSSARY_DATA.filter((item) => {
    const matchesSearch =
      item.term.toLowerCase().includes(search.toLowerCase()) ||
      item.summary.toLowerCase().includes(search.toLowerCase()) ||
      item.inDepth.toLowerCase().includes(search.toLowerCase());
    const matchesCat = activeCategory === 'Todas' || item.category === activeCategory;
    return matchesSearch && matchesCat;
  });

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full select-none">
      {/* Header */}
      <div className="p-6 rounded-2xl bg-layer1 border border-outline-subtle flex items-center justify-between shadow-surface-card">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-tertiary-indigo/15 text-tertiary-indigo border border-tertiary-indigo/30">
            <BookOpen className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-on-surface flex items-center gap-2">
              Glossário de Conceitos Linux
              <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-tertiary-indigo/15 text-tertiary-indigo border border-tertiary-indigo/30">
                Dicionário Desmistificado
              </span>
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              Explicações claras e sem jargões para termos fundamentais de Linux, redes e cibersegurança.
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
            placeholder="Pesquisar termo ou conceito..."
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

      {/* Grid: Lista de Termos + Detalhe */}
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-5 flex flex-col gap-3">
          {filtered.map((item) => {
            const isSelected = selectedTerm.id === item.id;
            return (
              <div
                key={item.id}
                onClick={() => setSelectedTerm(item)}
                className={`
                  p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-1.5
                  ${
                    isSelected
                      ? 'bg-surface-container-high border-tertiary-indigo shadow-glow-tertiary/40'
                      : 'bg-layer1 border-outline-subtle hover:border-outline'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="font-display font-bold text-base text-on-surface">
                    {item.term}
                  </span>
                  <span className="text-[10px] font-mono text-tertiary-indigo bg-tertiary-indigo/10 px-2 py-0.5 rounded border border-tertiary-indigo/20">
                    {item.category}
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant line-clamp-2 leading-relaxed">
                  {item.summary}
                </p>
              </div>
            );
          })}
        </div>

        <div className="col-span-7 flex flex-col gap-4">
          <div className="p-6 rounded-2xl bg-layer1 border border-outline-subtle space-y-4 shadow-surface-card">
            <div className="flex items-center justify-between border-b border-outline-subtle pb-3">
              <div>
                <span className="text-xs font-mono text-tertiary-indigo uppercase tracking-wider">
                  {selectedTerm.category}
                </span>
                <h2 className="font-display font-bold text-2xl text-on-surface mt-0.5">
                  {selectedTerm.term}
                </h2>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface-container/80 border border-outline-subtle text-sm text-on-surface leading-relaxed">
              {selectedTerm.summary}
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold text-on-surface-variant flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-primary-electric" /> ENTENDIMENTO PROFUNDO
              </span>
              <p className="text-xs text-on-surface-variant leading-relaxed p-4 rounded-xl bg-surface-lowest border border-outline-subtle">
                {selectedTerm.inDepth}
              </p>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold text-on-surface-variant">
                EXEMPLO PRÁTICO NO TERMINAL
              </span>
              <div className="p-3 bg-terminal rounded-xl border border-outline-subtle font-mono text-xs text-secondary-emerald flex items-center gap-2">
                <Terminal className="w-4 h-4 text-outline shrink-0" />
                <span>user@kali:~$ {selectedTerm.practicalExample}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
