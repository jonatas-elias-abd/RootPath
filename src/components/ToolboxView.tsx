import React, { useState } from 'react';
import { SiberianCatMascot } from './SiberianCatMascot';
import {
  Wrench,
  Search,
  Lock,
  Unlock,
  Terminal as TerminalIcon,
  ShieldAlert,
  ExternalLink,
  Tag,
} from 'lucide-react';

export interface KaliTool {
  id: string;
  name: string;
  category: 'Reconhecimento' | 'Análise de Vulnerabilidade' | 'Exploração' | 'Pós-Exploração' | 'Forense';
  shortDesc: string;
  syntax: string;
  isUnlocked: boolean;
  unlockedAtLesson: string;
  example: string;
}

const KALI_TOOLS_CATALOG: KaliTool[] = [
  {
    id: 'nmap',
    name: 'Nmap (Network Mapper)',
    category: 'Reconhecimento',
    shortDesc: 'Scanner de portas e explorador de rede para auditoria de segurança e descoberta de serviços.',
    syntax: 'nmap [flags] [alvo]',
    isUnlocked: true,
    unlockedAtLesson: 'L3.1',
    example: 'nmap -sV -p 80,443 192.168.1.1',
  },
  {
    id: 'whoami',
    name: 'whoami & id',
    category: 'Reconhecimento',
    shortDesc: 'Comandos nativos para identificação do usuário e privilégios associados no sistema operacional.',
    syntax: 'whoami | id',
    isUnlocked: true,
    unlockedAtLesson: 'L1.2',
    example: 'whoami',
  },
  {
    id: 'wireshark',
    name: 'Wireshark & TShark',
    category: 'Reconhecimento',
    shortDesc: 'Analisador de protocolos de rede que captura pacotes em tempo real para inspeção minuciosa.',
    syntax: 'tshark -i eth0 -f "tcp port 80"',
    isUnlocked: false,
    unlockedAtLesson: 'Módulo 4: Redes Avançadas',
    example: 'tshark -r capture.pcap',
  },
  {
    id: 'metasploit',
    name: 'Metasploit Framework',
    category: 'Exploração',
    shortDesc: 'Plataforma completa para desenvolvimento, teste e execução de exploits contra alvos autorizados.',
    syntax: 'msfconsole -q',
    isUnlocked: false,
    unlockedAtLesson: 'Módulo 5: Segurança Ofensiva',
    example: 'use exploit/multi/handler',
  },
  {
    id: 'john',
    name: 'John the Ripper',
    category: 'Pós-Exploração',
    shortDesc: 'Utilitário ágil de auditoria e quebra de senhas fracas por força bruta e dicionário.',
    syntax: 'john [opções] arquivo_de_hashes',
    isUnlocked: false,
    unlockedAtLesson: 'Módulo 5: Criptografia e Senhas',
    example: 'john --wordlist=rockyou.txt hashes.txt',
  },
];

export const ToolboxView: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('Todas');
  const [selectedTool, setSelectedTool] = useState<KaliTool>(KALI_TOOLS_CATALOG[0]);

  const categories = ['Todas', 'Reconhecimento', 'Análise de Vulnerabilidade', 'Exploração', 'Pós-Exploração'];

  const filteredTools = KALI_TOOLS_CATALOG.filter((tool) => {
    const matchesSearch =
      tool.name.toLowerCase().includes(search.toLowerCase()) ||
      tool.shortDesc.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'Todas' || tool.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full select-none">
      {/* Header do Arsenal */}
      <div className="p-6 rounded-2xl bg-layer1 border border-outline-subtle flex items-center justify-between shadow-surface-card">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-tertiary-indigo/15 text-tertiary-indigo border border-tertiary-indigo/30">
            <Wrench className="w-7 h-7" />
          </div>
          <div>
            <h1 className="font-display font-bold text-2xl text-on-surface flex items-center gap-2">
              Arsenal de Ferramentas Kali
              <span className="text-xs font-mono font-normal px-2.5 py-0.5 rounded-full bg-tertiary-indigo/15 text-tertiary-indigo border border-tertiary-indigo/30">
                Enciclopédia Interativa
              </span>
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              Catálogo das ferramentas nativas do Kali Linux, sintaxes e desbloqueios pedagógicos.
            </p>
          </div>
        </div>

        <SiberianCatMascot size={52} mood="focused" />
      </div>

      {/* Filtros e Busca */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 bg-layer1 rounded-xl border border-outline-subtle">
        <div className="flex items-center gap-2 bg-surface-container px-3 py-2 rounded-lg border border-outline-subtle w-72 text-xs">
          <Search className="w-4 h-4 text-outline" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Buscar ferramenta ou comando..."
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

      {/* Grid: Lista de Cards (Esquerda) + Ficha Técnica Detalhada (Direita) */}
      <div className="grid grid-cols-12 gap-6">
        {/* Coluna Esquerda: Cards de Ferramentas */}
        <div className="col-span-6 flex flex-col gap-3">
          {filteredTools.map((tool) => {
            const isSelected = tool.id === selectedTool.id;
            return (
              <div
                key={tool.id}
                onClick={() => setSelectedTool(tool)}
                className={`
                  p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-2.5
                  ${
                    isSelected
                      ? 'bg-surface-container-high border-tertiary-indigo shadow-glow-tertiary/40'
                      : 'bg-layer1 border-outline-subtle hover:border-outline'
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold text-tertiary-indigo flex items-center gap-1">
                    <Tag className="w-3 h-3" /> {tool.category}
                  </span>

                  <div className="flex items-center gap-1.5 text-[11px] font-mono">
                    {tool.isUnlocked ? (
                      <span className="text-secondary-emerald bg-secondary-emerald/10 px-2 py-0.5 rounded-full border border-secondary-emerald/20 flex items-center gap-1">
                        <Unlock className="w-3 h-3" /> Desbloqueada
                      </span>
                    ) : (
                      <span className="text-outline bg-surface-lowest px-2 py-0.5 rounded-full border border-outline-subtle flex items-center gap-1">
                        <Lock className="w-3 h-3" /> Bloqueada
                      </span>
                    )}
                  </div>
                </div>

                <h3 className="font-display font-bold text-base text-on-surface">
                  {tool.name}
                </h3>
                <p className="text-xs text-on-surface-variant leading-relaxed line-clamp-2">
                  {tool.shortDesc}
                </p>
              </div>
            );
          })}
        </div>

        {/* Coluna Direita: Ficha Técnica Completa da Ferramenta */}
        <div className="col-span-6 flex flex-col gap-4">
          <div className="p-6 rounded-xl bg-layer1 border border-outline-subtle space-y-4">
            <div className="flex items-center justify-between border-b border-outline-subtle pb-3">
              <div>
                <span className="text-[11px] font-mono text-tertiary-indigo uppercase tracking-wider">
                  {selectedTool.category}
                </span>
                <h2 className="font-display font-bold text-xl text-on-surface mt-1">
                  {selectedTool.name}
                </h2>
              </div>
            </div>

            <p className="text-sm text-on-surface-variant leading-relaxed">
              {selectedTool.shortDesc}
            </p>

            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold text-on-surface-variant">
                SINTAXE RECOMENDADA
              </span>
              <div className="p-3 bg-surface-lowest rounded-lg border border-outline-subtle font-mono text-xs text-primary-electric">
                {selectedTool.syntax}
              </div>
            </div>

            <div className="space-y-1.5">
              <span className="text-xs font-mono font-bold text-on-surface-variant">
                EXEMPLO DE USO NO TERMINAL KALI
              </span>
              <div className="p-3 bg-terminal rounded-lg border border-outline-subtle font-mono text-xs text-secondary-emerald flex items-center gap-2">
                <TerminalIcon className="w-4 h-4 text-outline shrink-0" />
                <span>user@kali:~$ {selectedTool.example}</span>
              </div>
            </div>

            <div className="p-3 rounded-lg bg-surface-container border border-outline-subtle text-xs font-mono text-on-surface-variant">
              Requisito de Desbloqueio: <span className="text-on-surface font-semibold">{selectedTool.unlockedAtLesson}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
