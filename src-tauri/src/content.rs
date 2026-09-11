use crate::models::{Exercise, ExerciseType, LessonContent, LessonNode, NodeStatus, NodeType};

pub fn load_full_curriculum() -> Vec<LessonNode> {
    vec![
        // ==================== MÓDULO 1: FUNDAMENTOS & PRIMEIROS PASSOS ====================
        LessonNode {
            id: "L1.1".to_string(),
            title: "O que é Linux?".to_string(),
            description: "Compreenda o conceito de sistema operacional e por que o Linux é o padrão na infraestrutura e segurança.".to_string(),
            node_type: NodeType::MainLesson,
            status: NodeStatus::Available,
            parent_id: None,
            prerequisite_ids: vec![],
            xp_reward: 100,
            estimated_minutes: 5,
            content: LessonContent {
                concept_explanation: "O Linux é o núcleo (kernel) de um sistema operacional livre e de código aberto. Ao contrário de sistemas proprietários como o Windows, ele permite inspecionar, alterar e entender exatamente cada operação executada no computador.".to_string(),
                demonstration: "No Linux, interagimos diretamente com o sistema através da linha de comando (terminal).".to_string(),
                exercises: vec![
                    Exercise {
                        id: "E1.1.1".to_string(),
                        prompt: "O que é o Linux?".to_string(),
                        hint: Some("Pense na camada fundamental que gerencia o hardware.".to_string()),
                        exercise_type: ExerciseType::MultipleChoice {
                            options: vec![
                                "Um editor de texto antigo".to_string(),
                                "Um núcleo (kernel) de sistema operacional livre e aberto".to_string(),
                                "Uma marca de computador".to_string(),
                            ],
                            correct_index: 1,
                        },
                    }
                ],
            },
        },
        LessonNode {
            id: "F1.1a".to_string(),
            title: "Fixação: Filosofia Open Source".to_string(),
            description: "Reforce o entendimento sobre código aberto e auditoria de segurança.".to_string(),
            node_type: NodeType::PracticeTask,
            status: NodeStatus::Locked,
            parent_id: Some("L1.1".to_string()),
            prerequisite_ids: vec!["L1.1".to_string()],
            xp_reward: 50,
            estimated_minutes: 3,
            content: LessonContent {
                concept_explanation: "A transparência do código aberto permite que especialistas de todo o mundo auditem e corrijam falhas de segurança rapidamente.".to_string(),
                demonstration: "".to_string(),
                exercises: vec![
                    Exercise {
                        id: "EF1.1.1".to_string(),
                        prompt: "Qual é uma vantagem essencial do código aberto na segurança cibernética?".to_string(),
                        hint: None,
                        exercise_type: ExerciseType::MultipleChoice {
                            options: vec![
                                "Transparência total para auditoria e correção de falhas".to_string(),
                                "Cobrança de mensalidade".to_string(),
                                "Impossibilidade de ver o código".to_string(),
                            ],
                            correct_index: 0,
                        },
                    }
                ],
            },
        },
        LessonNode {
            id: "L1.2".to_string(),
            title: "Primeiros Comandos: Identidade e Máquina".to_string(),
            description: "Aprenda a consultar o usuário logado (`whoami`) e o nome da máquina (`hostname`).".to_string(),
            node_type: NodeType::MainLesson,
            status: NodeStatus::Locked,
            parent_id: Some("L1.1".to_string()),
            prerequisite_ids: vec!["L1.1".to_string()],
            xp_reward: 120,
            estimated_minutes: 8,
            content: LessonContent {
                concept_explanation: "No terminal, você envia instruções curtas e diretas. O comando `whoami` responde exatamente com o nome do seu usuário atual. O comando `hostname` exibe a identificação da sua máquina na rede.".to_string(),
                demonstration: "user@kali:~$ whoami\nkali".to_string(),
                exercises: vec![
                    Exercise {
                        id: "E1.2.1".to_string(),
                        prompt: "Digite o comando para verificar qual usuário está conectado no momento:".to_string(),
                        hint: Some("É 'who am i' sem espaços.".to_string()),
                        exercise_type: ExerciseType::TerminalCommand {
                            expected_command: "whoami".to_string(),
                            validation_regex: Some(r"^whoami$".to_string()),
                        },
                    }
                ],
            },
        },

        // ==================== MÓDULO 2: NAVEGAÇÃO E SISTEMA DE ARQUIVOS ====================
        LessonNode {
            id: "L2.1".to_string(),
            title: "Navegação: Onde Estou? (`pwd` e `ls`)".to_string(),
            description: "Descubra o diretório atual e liste seu conteúdo.".to_string(),
            node_type: NodeType::MainLesson,
            status: NodeStatus::Locked,
            parent_id: Some("L1.2".to_string()),
            prerequisite_ids: vec!["L1.2".to_string()],
            xp_reward: 150,
            estimated_minutes: 10,
            content: LessonContent {
                concept_explanation: "`pwd` significa Print Working Directory (Imprimir Diretório de Trabalho). Ele mostra o caminho completo da pasta onde você está. `ls` (list) exibe os arquivos e pastas contidos no diretório atual.".to_string(),
                demonstration: "user@kali:~$ pwd\n/home/kali\nuser@kali:~$ ls\nDocumentos Downloads Imagens".to_string(),
                exercises: vec![
                    Exercise {
                        id: "E2.1.1".to_string(),
                        prompt: "Qual comando exibe o caminho absoluto do diretório onde você se encontra atualmente?".to_string(),
                        hint: Some("Sigla para Print Working Directory.".to_string()),
                        exercise_type: ExerciseType::TerminalCommand {
                            expected_command: "pwd".to_string(),
                            validation_regex: Some(r"^pwd$".to_string()),
                        },
                    }
                ],
            },
        },
        LessonNode {
            id: "L2.2".to_string(),
            title: "Movendo-se entre Diretorios (`cd`)".to_string(),
            description: "Aprenda a entrar e sair de pastas utilizando caminhos relativos e absolutos.".to_string(),
            node_type: NodeType::MainLesson,
            status: NodeStatus::Locked,
            parent_id: Some("L2.1".to_string()),
            prerequisite_ids: vec!["L2.1".to_string()],
            xp_reward: 150,
            estimated_minutes: 10,
            content: LessonContent {
                concept_explanation: "`cd` significa Change Directory (Mudar de Diretório). Para entrar em uma pasta, use `cd nome_da_pasta`. Para subir um nível (voltar para a pasta anterior), use `cd ..`.".to_string(),
                demonstration: "user@kali:~$ cd /etc\nuser@kali:/etc$ cd ..\nuser@kali:~$".to_string(),
                exercises: vec![
                    Exercise {
                        id: "E2.2.1".to_string(),
                        prompt: "Qual comando você utiliza para subir um nível de diretório (voltar para a pasta pai)?".to_string(),
                        hint: Some("cd seguido de dois pontos.".to_string()),
                        exercise_type: ExerciseType::TerminalCommand {
                            expected_command: "cd ..".to_string(),
                            validation_regex: Some(r"^cd\s+\.\.$".to_string()),
                        },
                    }
                ],
            },
        },

        // ==================== MÓDULO 3: INTRODUÇÃO AO KALI LINUX & FERRAMENTAS ÉTICAS ====================
        LessonNode {
            id: "L3.1".to_string(),
            title: "O que é o Kali Linux & Uso Responsável".to_string(),
            description: "Conheça a finalidade do Kali Linux e o princípio da segurança ética.".to_string(),
            node_type: NodeType::MainLesson,
            status: NodeStatus::Locked,
            parent_id: Some("L2.2".to_string()),
            prerequisite_ids: vec!["L2.2".to_string()],
            xp_reward: 200,
            estimated_minutes: 12,
            content: LessonContent {
                concept_explanation: "O Kali Linux é uma distribuição especializada desenvolvida para auditoria de segurança, testes de invasão autorizados (pentest) e computação forense. Ferramentas de segurança só devem ser utilizadas em ambientes de teste autorizados ou em seus próprios sistemas.".to_string(),
                demonstration: "O Kali vem pré-instalado com centenas de utilitários organizados por categorias no menu e no terminal.".to_string(),
                exercises: vec![
                    Exercise {
                        id: "E3.1.1".to_string(),
                        prompt: "Qual é o objetivo primordial do Kali Linux e o conceito de Hack de Segurança Ética?".to_string(),
                        hint: None,
                        exercise_type: ExerciseType::MultipleChoice {
                            options: vec![
                                "Invadir redes de terceiros sem permissão".to_string(),
                                "Testes de invasão autorizados, análise de vulnerabilidades e defesa".to_string(),
                                "Substituir sistemas operacionais domésticos sem foco em segurança".to_string(),
                            ],
                            correct_index: 1,
                        },
                    }
                ],
            },
        },
    ]
}
