import React, { useState } from 'react';
import { LearningTree } from './components/LearningTree';
import { LessonView } from './components/LessonView';
import { AITutorPanel } from './components/AITutorPanel';
import { RootPathLogo } from './components/RootPathLogo';
import { LessonNode, UserProgress } from './types';
import { Shield, Award, BookOpen, Flame } from 'lucide-react';

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
      concept_explanation: 'No terminal, você envia instruções curtas e diretas. O comando `whoami` responde exatamente com o nome do seu usuário atual. O comando `hostname` exibe a identificação da sua máquina na rede.',
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
  const [nodes, setNodes] = useState<LessonNode[]>(INITIAL_NODES);
  const [selectedNode, setSelectedNode] = useState<LessonNode | undefined>(INITIAL_NODES[0]);
  const [progress, setProgress] = useState<UserProgress>({
    user_id: 'iniciante_rootpath',
    total_xp: 0,
    completed_node_ids: [],
    current_node_id: 'L1.1',
    last_active_timestamp: Date.now(),
  });
  const [streakDays, setStreakDays] = useState<number>(1);

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
    <div className="min-h-screen bg-canvas text-on-surface flex flex-col font-sans">
      {/* Top Header / App Spine */}
      <header className="h-16 border-b border-outline-subtle bg-layer1/80 backdrop-blur-md px-6 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <RootPathLogo size="md" />
        </div>

        {/* User XP, Streak & Stats (Gamificação) */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 bg-layer2 px-3.5 py-1.5 rounded-full border border-outline-subtle text-xs font-mono">
            <Flame className="w-4 h-4 text-orange-400" />
            <span className="text-on-surface-variant">Ofensiva:</span>
            <span className="font-bold text-orange-400">{streakDays} dia(s)</span>
          </div>

          <div className="flex items-center gap-2 bg-layer2 px-3.5 py-1.5 rounded-full border border-outline-subtle text-xs font-mono">
            <Award className="w-4 h-4 text-secondary-emerald" />
            <span className="text-on-surface-variant">XP Total:</span>
            <span className="font-bold text-secondary-emerald">{progress.total_xp}</span>
          </div>

          <div className="flex items-center gap-2 bg-layer2 px-3.5 py-1.5 rounded-full border border-outline-subtle text-xs font-mono">
            <Shield className="w-4 h-4 text-tertiary-indigo" />
            <span className="text-on-surface-variant">Lições Concluídas:</span>
            <span className="font-bold text-tertiary-indigo">{progress.completed_node_ids.length}</span>
          </div>
        </div>
      </header>

      {/* Main 3-Column Desktop Layout */}
      <main className="flex-1 p-6 grid grid-cols-12 gap-6 max-w-[1600px] mx-auto w-full">
        <section className="col-span-4 flex flex-col gap-4">
          <LearningTree
            nodes={nodes}
            onSelectNode={(node) => setSelectedNode(node)}
            selectedNodeId={selectedNode?.id}
          />
        </section>

        <section className="col-span-5 flex flex-col gap-4">
          {selectedNode ? (
            <LessonView node={selectedNode} onCompleteLesson={handleCompleteLesson} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-layer1 rounded-2xl border border-outline-subtle">
              <BookOpen className="w-12 h-12 text-outline mb-3" />
              <h3 className="font-display font-semibold text-lg">Selecione uma Lição</h3>
              <p className="text-xs text-on-surface-variant mt-1">
                Escolha um nó disponível no mapa da árvore à esquerda para iniciar.
              </p>
            </div>
          )}
        </section>

        <section className="col-span-3 flex flex-col gap-4 h-[calc(100vh-7rem)] sticky top-20">
          <AITutorPanel currentLessonTitle={selectedNode?.title} />
        </section>
      </main>
    </div>
  );
}

export default App;
