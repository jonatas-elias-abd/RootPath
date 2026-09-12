import React, { useState } from 'react';
import { Sidebar, NavPage } from './components/Sidebar';
import { LearningTree } from './components/LearningTree';
import { LessonView } from './components/LessonView';
import { TicketsView } from './components/TicketsView';
import { DashboardView } from './components/DashboardView';
import { AITutorDrawer } from './components/AITutorDrawer';
import { LessonNode, UserProgress } from './types';
import { Wrench, Layers, Award, Settings, Flame, Shield } from 'lucide-react';

const INITIAL_NODES: LessonNode[] = [
  {
    id: 'L1.1',
    title: 'O que é Linux?',
    description: 'Compreenda o conceito de sistema operacional e a importância do Linux na segurança.',
    node_type: 'MainLesson',
    status: 'Available',
    prerequisite_ids: [],
    xp_reward: 100,
    estimated_minutes: 5,
    content: {
      concept_explanation: 'O Linux é o núcleo (kernel) de um sistema operacional livre e de código aberto. Ao contrário de sistemas proprietários como o Windows, ele permite inspecionar, alterar e entender exatamente cada operação executada no computador.',
      demonstration: 'No Linux, interagimos diretamente com o sistema através da linha de comando (terminal).',
      exercises: [
        {
          id: 'E1.1.1',
          prompt: 'O que é o Linux?',
          exercise_type: {
            type: 'MultipleChoice',
            data: {
              options: [
                'Um editor de texto antigo',
                'Um núcleo (kernel) de sistema operacional livre e aberto',
                'Uma marca de computador',
              ],
              correct_index: 1,
            },
          },
        },
      ],
    },
  },
  {
    id: 'F1.1a',
    title: 'Fixação: Filosofia Open Source',
    description: 'Reforce o entendimento sobre código aberto e auditoria de segurança.',
    node_type: 'PracticeTask',
    status: 'Locked',
    parent_id: 'L1.1',
    prerequisite_ids: ['L1.1'],
    xp_reward: 50,
    estimated_minutes: 3,
    content: {
      concept_explanation: 'A transparência do código aberto permite que especialistas de todo o mundo auditem e corrijam falhas de segurança rapidamente.',
      demonstration: '',
      exercises: [
        {
          id: 'EF1.1.1',
          prompt: 'Qual é uma vantagem essencial do código aberto na segurança cibernética?',
          exercise_type: {
            type: 'MultipleChoice',
            data: {
              options: [
                'Transparência total para auditoria e correção de falhas',
                'Cobrança de mensalidade',
                'Impossibilidade de ver o código',
              ],
              correct_index: 0,
            },
          },
        },
      ],
    },
  },
  {
    id: 'L1.2',
    title: 'Primeiros Comandos: Identidade e Máquina',
    description: 'Aprenda a consultar o usuário logado (`whoami`) e o nome da máquina (`hostname`).',
    node_type: 'MainLesson',
    status: 'Locked',
    parent_id: 'L1.1',
    prerequisite_ids: ['L1.1'],
    xp_reward: 120,
    estimated_minutes: 8,
    content: {
      concept_explanation: 'No terminal, você envia instruções curtas e diretas. O comando `whoami` responde com o nome do seu usuário atual. O comando `hostname` exibe a identificação da sua máquina na rede.',
      demonstration: 'user@kali:~$ whoami\nkali',
      exercises: [
        {
          id: 'E1.2.1',
          prompt: 'Digite o comando para verificar qual usuário está conectado no momento:',
          exercise_type: {
            type: 'TerminalCommand',
            data: {
              expected_command: 'whoami',
            },
          },
        },
      ],
    },
  },
  {
    id: 'L2.1',
    title: 'Navegação: Onde Estou? (`pwd` e `ls`)',
    description: 'Descubra o diretório atual e liste seu conteúdo.',
    node_type: 'MainLesson',
    status: 'Locked',
    parent_id: 'L1.2',
    prerequisite_ids: ['L1.2'],
    xp_reward: 150,
    estimated_minutes: 10,
    content: {
      concept_explanation: '`pwd` significa Print Working Directory. Ele mostra o caminho completo da pasta onde você está. `ls` exibe os arquivos e pastas do diretório.',
      demonstration: 'user@kali:~$ pwd\n/home/kali',
      exercises: [
        {
          id: 'E2.1.1',
          prompt: 'Qual comando exibe o caminho absoluto do diretório onde você se encontra atualmente?',
          exercise_type: {
            type: 'TerminalCommand',
            data: {
              expected_command: 'pwd',
            },
          },
        },
      ],
    },
  },
  {
    id: 'L3.1',
    title: 'O que é o Kali Linux & Uso Responsável',
    description: 'Conheça a finalidade do Kali Linux e o princípio da segurança ética.',
    node_type: 'MainLesson',
    status: 'Locked',
    parent_id: 'L2.1',
    prerequisite_ids: ['L2.1'],
    xp_reward: 200,
    estimated_minutes: 12,
    content: {
      concept_explanation: 'O Kali Linux é uma distribuição especializada desenvolvida para auditoria de segurança, testes de invasão autorizados (pentest) e computação forense.',
      demonstration: 'O Kali vem pré-instalado com centenas de utilitários organizados por categorias.',
      exercises: [
        {
          id: 'E3.1.1',
          prompt: 'Qual é o objetivo primordial do Kali Linux e o conceito de Hack de Segurança Ética?',
          exercise_type: {
            type: 'MultipleChoice',
            data: {
              options: [
                'Invadir redes de terceiros sem permissão',
                'Testes de invasão autorizados, análise de vulnerabilidades e defesa',
                'Substituir sistemas operacionais domésticos sem foco em segurança',
              ],
              correct_index: 1,
            },
          },
        },
      ],
    },
  },
];

export function App() {
  const [currentPage, setCurrentPage] = useState<NavPage>('dashboard');
  const [isAiTutorOpen, setIsAiTutorOpen] = useState<boolean>(false);
  const [nodes, setNodes] = useState<LessonNode[]>(INITIAL_NODES);
  const [selectedNode, setSelectedNode] = useState<LessonNode | undefined>(INITIAL_NODES[0]);
  const [progress, setProgress] = useState<UserProgress>({
    user_id: 'iniciante_rootpath',
    total_xp: 150,
    completed_node_ids: [],
    current_node_id: 'L1.1',
    last_active_timestamp: Date.now(),
  });
  const [streakDays] = useState<number>(3);
  const [userTeam] = useState<string>('Novato (Indefinido)');
  const [userRank] = useState<string>('Script Kiddie I');

  const handleCompleteLesson = (completedId: string) => {
    setNodes((prevNodes) =>
      prevNodes.map((node) => {
        if (node.id === completedId) {
          return { ...node, status: 'Completed' };
        }
        if (node.prerequisite_ids.includes(completedId) && node.status === 'Locked') {
          return { ...node, status: 'Available' };
        }
        return node;
      })
    );

    const completedNode = nodes.find((n) => n.id === completedId);
    const addedXp = completedNode ? completedNode.xp_reward : 100;

    setProgress((prev) => ({
      ...prev,
      total_xp: prev.total_xp + addedXp,
      completed_node_ids: [...prev.completed_node_ids, completedId],
    }));

    const nextAvailable = nodes.find(
      (n) => n.id !== completedId && (n.status === 'Available' || n.prerequisite_ids.includes(completedId))
    );
    if (nextAvailable) {
      setSelectedNode(nextAvailable);
    }
  };

  return (
    <div className="min-h-screen bg-canvas text-on-surface flex font-sans antialiased overflow-x-hidden">
      {/* 1. Barra Lateral Fixa Agrupada (Opção 2) */}
      <Sidebar
        currentPage={currentPage}
        onNavigate={(page) => setCurrentPage(page)}
        onToggleAiTutor={() => setIsAiTutorOpen((prev) => !prev)}
        isAiTutorOpen={isAiTutorOpen}
        userTeam={userTeam}
        userRank={userRank}
        totalXp={progress.total_xp}
      />

      {/* 2. Área Central de Conteúdo Principal */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Header com Status Rápidos e Ofensiva */}
        <header className="h-14 border-b border-outline-subtle bg-layer1/60 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2 text-xs font-mono text-on-surface-variant">
            <span>RootPath</span>
            <span>/</span>
            <span className="text-primary-electric capitalize">{currentPage.replace('-', ' ')}</span>
          </div>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-layer2 px-3 py-1 rounded-full border border-outline-subtle text-xs font-mono">
              <Flame className="w-3.5 h-3.5 text-orange-400" />
              <span className="font-bold text-orange-400">{streakDays} Dias</span>
            </div>

            <div className="flex items-center gap-2 bg-layer2 px-3 py-1 rounded-full border border-outline-subtle text-xs font-mono">
              <Shield className="w-3.5 h-3.5 text-primary-electric" />
              <span className="font-bold text-secondary-emerald">{progress.total_xp} XP</span>
            </div>
          </div>
        </header>

        {/* View Router */}
        <main className="flex-1 p-6 overflow-y-auto">
          {currentPage === 'dashboard' && (
            <DashboardView
              onNavigate={(page) => setCurrentPage(page)}
              totalXp={progress.total_xp}
              streakDays={streakDays}
              completedLessonsCount={progress.completed_node_ids.length}
              userRank={userRank}
              userTeam={userTeam}
            />
          )}

          {currentPage === 'learning-tree' && (
            <div className="max-w-4xl mx-auto">
              <LearningTree
                nodes={nodes}
                onSelectNode={(node) => {
                  setSelectedNode(node);
                  setCurrentPage('lessons');
                }}
                selectedNodeId={selectedNode?.id}
              />
            </div>
          )}

          {currentPage === 'lessons' && selectedNode && (
            <LessonView
              node={selectedNode}
              onCompleteLesson={handleCompleteLesson}
              onOpenAiTutor={() => setIsAiTutorOpen(true)}
            />
          )}

          {currentPage === 'tickets' && <TicketsView />}

          {/* Telas Planejadas */}
          {currentPage === 'toolbox' && (
            <div className="p-8 bg-layer1 rounded-2xl border border-outline-subtle max-w-4xl mx-auto text-center space-y-3">
              <Wrench className="w-12 h-12 text-tertiary-indigo mx-auto" />
              <h2 className="font-display font-bold text-xl">Arsenal de Ferramentas Kali</h2>
              <p className="text-xs text-on-surface-variant max-w-md mx-auto">
                Enciclopédia interativa (Nmap, Wireshark, Metasploit, John). As ferramentas são desbloqueadas conforme sua evolução nos fundamentos.
              </p>
            </div>
          )}

          {currentPage === 'skill-tree' && (
            <div className="p-8 bg-layer1 rounded-2xl border border-outline-subtle max-w-4xl mx-auto text-center space-y-3">
              <Layers className="w-12 h-12 text-primary-electric mx-auto" />
              <h2 className="font-display font-bold text-xl">Árvore de Habilidades & Seleção de Team</h2>
              <p className="text-xs text-on-surface-variant max-w-md mx-auto">
                Você está no nível inicial de fundamentos como <strong>{userTeam}</strong>. Conclua os módulos para escolher sua especialização (Red Team, Blue Team, SOC, Pentester...).
              </p>
            </div>
          )}

          {currentPage === 'achievements' && (
            <div className="p-8 bg-layer1 rounded-2xl border border-outline-subtle max-w-4xl mx-auto text-center space-y-3">
              <Award className="w-12 h-12 text-secondary-emerald mx-auto" />
              <h2 className="font-display font-bold text-xl">Quadro de Medalhas e Conquistas</h2>
              <p className="text-xs text-on-surface-variant max-w-md mx-auto">
                Badges obtidas por marcos alcançados: Mestre do Chmod, Primeiro Nmap, Chamados Resolvidos.
              </p>
            </div>
          )}

          {currentPage === 'settings' && (
            <div className="p-8 bg-layer1 rounded-2xl border border-outline-subtle max-w-4xl mx-auto text-center space-y-3">
              <Settings className="w-12 h-12 text-outline mx-auto" />
              <h2 className="font-display font-bold text-xl">Configurações & Auditoria</h2>
              <p className="text-xs text-on-surface-variant max-w-md mx-auto">
                Preferências de terminal, histórico do Tutor IA Qwen3 0.6B e registro de comandos perigosos interceptados pelo sistema.
              </p>
            </div>
          )}
        </main>
      </div>

      {/* 3. Gaveta Retrátil do Tutor IA (abre sem poluir a tela) */}
      <AITutorDrawer
        isOpen={isAiTutorOpen}
        onClose={() => setIsAiTutorOpen(false)}
        currentLessonTitle={selectedNode?.title}
      />
    </div>
  );
}

export default App;
