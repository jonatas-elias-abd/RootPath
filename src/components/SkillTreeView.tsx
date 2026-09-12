import React, { useState } from 'react';
import { SiberianCatMascot } from './SiberianCatMascot';
import {
  Layers,
  Shield,
  Target,
  Eye,
  Crosshair,
  Lock,
  CheckCircle2,
  Sparkles,
  Award,
} from 'lucide-react';

interface TeamInfo {
  id: string;
  name: string;
  color: string;
  bgColor: string;
  borderColor: string;
  role: string;
  description: string;
  skills: string[];
}

const TEAMS_DATA: TeamInfo[] = [
  {
    id: 'red',
    name: 'Red Team',
    color: '#ef4444',
    bgColor: 'rgba(239, 68, 68, 0.1)',
    borderColor: 'rgba(239, 68, 68, 0.3)',
    role: 'Ataque & Exploração Ofensiva',
    description: 'Simula adversários reais para encontrar e explorar vulnerabilidades em sistemas autorizados.',
    skills: ['Pentesting', 'Engenharia Social', 'Exploits', 'Evasão de Defesa'],
  },
  {
    id: 'blue',
    name: 'Blue Team',
    color: '#3b82f6',
    bgColor: 'rgba(59, 130, 246, 0.1)',
    borderColor: 'rgba(59, 130, 246, 0.3)',
    role: 'Defesa & Resposta a Incidentes',
    description: 'Monitora redes, detecta ameaças em tempo real e fortifica a infraestrutura de segurança.',
    skills: ['Análise de Logs', 'SIEM / SOC', 'Hardening Linux', 'Resposta a Incidentes'],
  },
  {
    id: 'purple',
    name: 'Purple Team',
    color: '#a855f7',
    bgColor: 'rgba(168, 85, 247, 0.1)',
    borderColor: 'rgba(168, 85, 247, 0.3)',
    role: 'Integração Ofensiva + Defensiva',
    description: 'Aplica os resultados das investidas do Red Team para aperfeiçoar as regras de detecção do Blue Team.',
    skills: ['Threat Hunting', 'Simulação de Adversários', 'Mapeamento MITRE ATT&CK'],
  },
  {
    id: 'white',
    name: 'White Team',
    color: '#e2e8f0',
    bgColor: 'rgba(226, 232, 240, 0.1)',
    borderColor: 'rgba(226, 232, 240, 0.3)',
    role: 'Governança & Regras de Exercício',
    description: 'Coordena e supervisiona simulações de cibersegurança, garantindo conformidade e regras claras.',
    skills: ['Compliance', 'Gestão de Crise', 'Avaliação de Risco'],
  },
];

export const SkillTreeView: React.FC = () => {
  const [currentTeam, setCurrentTeam] = useState<string>('Novato (Indefinido)');
  const [selectedTeam, setSelectedTeam] = useState<TeamInfo>(TEAMS_DATA[0]);

  const skillBranches = [
    {
      branch: 'Fundamentos de Linux',
      progress: 65,
      nodes: [
        { name: 'Navegação e Caminhos (pwd, cd, ls)', done: true },
        { name: 'Manipulação de Arquivos (touch, cat, nano)', done: true },
        { name: 'Permissões e Usuários (chmod, chown, sudo)', done: false },
        { name: 'Gerenciamento de Processos (ps, top, kill)', done: false },
      ],
    },
    {
      branch: 'Redes & Conectividade',
      progress: 25,
      nodes: [
        { name: 'Interfaces e IPs (ip a, ifconfig)', done: true },
        { name: 'Testes de Rota e Latência (ping, traceroute)', done: false },
        { name: 'Varredura de Portas (nmap basico)', done: false },
        { name: 'Captura de Tráfego (tcpdump)', done: false },
      ],
    },
    {
      branch: 'Kali & Segurança Prática',
      progress: 10,
      nodes: [
        { name: 'Metodologia Ética e Escopo', done: true },
        { name: 'Enumeração de Serviços', done: false },
        { name: 'Auditoria de Senhas', done: false },
        { name: 'Exploração Controlada', done: false },
      ],
    },
  ];

  return (
    <div className="flex flex-col gap-6 max-w-6xl mx-auto w-full select-none">
      {/* Header com Mascote e Status de Team */}
      <div className="p-6 rounded-2xl bg-layer1 border border-outline-subtle flex items-center justify-between shadow-surface-card">
        <div className="flex items-center gap-4">
          <div className="p-3.5 rounded-xl bg-primary-electric/15 text-primary-electric border border-primary-electric/30">
            <Layers className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-mono font-bold px-2.5 py-0.5 rounded-full bg-surface-container text-on-surface-variant border border-outline-subtle">
                ESPECIALIZAÇÃO
              </span>
              <span className="text-xs font-mono font-bold text-primary-electric">
                Status: {currentTeam}
              </span>
            </div>
            <h1 className="font-display font-bold text-2xl text-on-surface mt-1">
              Árvore de Habilidades & Seleção de Teams
            </h1>
            <p className="text-xs text-on-surface-variant mt-1">
              Evolua seus ramos de conhecimento nos fundamentos para habilitar a escolha do seu Team definitivo.
            </p>
          </div>
        </div>

        <SiberianCatMascot size={56} mood="focused" />
      </div>

      {/* Seção: O Aluno e a Escolha do Team */}
      <div className="p-6 rounded-2xl bg-layer1 border border-outline-subtle space-y-4">
        <div className="flex items-center justify-between border-b border-outline-subtle pb-3">
          <h2 className="font-display font-bold text-lg text-on-surface flex items-center gap-2">
            <span>Conheça os Security Teams</span>
            <span className="text-xs font-mono font-normal text-on-surface-variant">
              (Desbloqueio após completar o Módulo 3)
            </span>
          </h2>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {TEAMS_DATA.map((team) => {
            const isSelected = selectedTeam.id === team.id;
            return (
              <div
                key={team.id}
                onClick={() => setSelectedTeam(team)}
                style={{
                  backgroundColor: isSelected ? team.bgColor : undefined,
                  borderColor: isSelected ? team.color : undefined,
                }}
                className={`
                  p-4 rounded-xl border transition-all cursor-pointer flex flex-col gap-2
                  ${isSelected ? 'shadow-glow-primary' : 'bg-surface-container border-outline-subtle hover:border-outline'}
                `}
              >
                <div className="flex items-center justify-between">
                  <span
                    style={{ color: team.color }}
                    className="font-display font-bold text-sm"
                  >
                    {team.name}
                  </span>
                  <Shield className="w-4 h-4" style={{ color: team.color }} />
                </div>
                <p className="text-xs text-on-surface font-medium leading-snug">{team.role}</p>
                <p className="text-[11px] text-on-surface-variant leading-relaxed line-clamp-2">
                  {team.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Ramos de Habilidades (Skill Tree Progress) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {skillBranches.map((branch, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-layer1 border border-outline-subtle flex flex-col justify-between gap-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="font-display font-bold text-base text-on-surface">{branch.branch}</h3>
                <span className="text-xs font-mono text-secondary-emerald font-bold">
                  {branch.progress}%
                </span>
              </div>

              {/* Barra de Progresso */}
              <div className="w-full bg-surface-container rounded-full h-2 overflow-hidden">
                <div
                  className="bg-secondary-emerald h-full transition-all duration-500"
                  style={{ width: `${branch.progress}%` }}
                />
              </div>

              {/* Nós de Habilidades */}
              <div className="space-y-2 pt-2">
                {branch.nodes.map((node, nIdx) => (
                  <div
                    key={nIdx}
                    className="flex items-center gap-2.5 p-2 rounded-lg bg-surface-container/60 border border-outline-subtle/50 text-xs"
                  >
                    {node.done ? (
                      <CheckCircle2 className="w-4 h-4 text-secondary-emerald shrink-0" />
                    ) : (
                      <Lock className="w-3.5 h-3.5 text-outline shrink-0" />
                    )}
                    <span className={node.done ? 'text-on-surface font-medium' : 'text-on-surface-variant'}>
                      {node.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
