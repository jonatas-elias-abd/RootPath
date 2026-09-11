use crate::models::{LessonNode, NodeStatus, NodeType, UserProgress};

pub struct ProgressionEngine {
    nodes: Vec<LessonNode>,
}

impl ProgressionEngine {
    pub fn new(nodes: Vec<LessonNode>) -> Self {
        Self { nodes }
    }

    /// Retorna todos os nós da árvore com seus estados atualizados para o progresso do usuário.
    pub fn get_tree_state(&self, progress: &UserProgress) -> Vec<LessonNode> {
        self.nodes
            .iter()
            .map(|node| {
                let mut updated_node = node.clone();
                updated_node.status = self.evaluate_status(node, progress);
                updated_node
            })
            .collect()
    }

    /// Avalia o status de um nó de acordo com as regras rígidas do Metaprompt:
    /// - Uma Lição Principal (|) requer que a Lição Principal anterior esteja concluída.
    /// - Atividades de Fixação (o) só ficam disponíveis quando a Lição Principal correspondente estiver concluída.
    pub fn evaluate_status(&self, node: &LessonNode, progress: &UserProgress) -> NodeStatus {
        // Se já foi concluído pelo usuário
        if progress.completed_node_ids.contains(&node.id) {
            return NodeStatus::Completed;
        }

        // Se é o nó atualmente em andamento
        if let Some(ref current_id) = progress.current_node_id {
            if current_id == &node.id {
                return NodeStatus::InProgress;
            }
        }

        // Verificar pré-requisitos (regra de bloqueio/desbloqueio)
        if node.prerequisite_ids.is_empty() {
            return NodeStatus::Available;
        }

        let all_prereqs_completed = node
            .prerequisite_ids
            .iter()
            .all(|prereq_id| progress.completed_node_ids.contains(prereq_id));

        if all_prereqs_completed {
            NodeStatus::Available
        } else {
            NodeStatus::Locked
        }
    }

    /// Processa a conclusão de um nó e retorna o progresso atualizado.
    pub fn complete_node(&self, progress: &mut UserProgress, node_id: &str) -> bool {
        if let Some(node) = self.nodes.iter().find(|n| n.id == node_id) {
            if !progress.completed_node_ids.contains(&node.id) {
                progress.completed_node_ids.push(node.id.clone());
                progress.total_xp += node.xp_reward;
                progress.current_node_id = self.find_next_available_main_lesson(progress);
                return true;
            }
        }
        false
    }

    /// Encontra a próxima Lição Principal (|) disponível na árvore.
    fn find_next_available_main_lesson(&self, progress: &UserProgress) -> Option<String> {
        for node in &self.nodes {
            if node.node_type == NodeType::MainLesson
                && !progress.completed_node_ids.contains(&node.id)
                && self.evaluate_status(node, progress) == NodeStatus::Available
            {
                return Some(node.id.clone());
            }
        }
        None
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use crate::models::{LessonContent, LessonNode, NodeStatus, NodeType, UserProgress};

    fn dummy_node(id: &str, node_type: NodeType, prereqs: Vec<&str>) -> LessonNode {
        LessonNode {
            id: id.to_string(),
            title: id.to_string(),
            description: "".to_string(),
            node_type,
            status: NodeStatus::Locked,
            parent_id: None,
            prerequisite_ids: prereqs.into_iter().map(String::from).collect(),
            xp_reward: 100,
            estimated_minutes: 5,
            content: LessonContent {
                concept_explanation: "".to_string(),
                demonstration: "".to_string(),
                exercises: vec![],
            },
        }
    }

    #[test]
    fn test_progression_locking_and_unlocking() {
        let nodes = vec![
            dummy_node("L1", NodeType::MainLesson, vec![]),
            dummy_node("F1", NodeType::PracticeTask, vec!["L1"]),
            dummy_node("L2", NodeType::MainLesson, vec!["L1"]),
        ];

        let engine = ProgressionEngine::new(nodes);
        let mut progress = UserProgress::default();

        // L1 deve estar disponível no início, L2 e F1 bloqueados
        assert_eq!(engine.evaluate_status(&engine.nodes[0], &progress), NodeStatus::Available);
        assert_eq!(engine.evaluate_status(&engine.nodes[1], &progress), NodeStatus::Locked);
        assert_eq!(engine.evaluate_status(&engine.nodes[2], &progress), NodeStatus::Locked);

        // Concluir L1
        engine.complete_node(&mut progress, "L1");

        // Após L1 concluído, F1 (fixação) e L2 (próxima lição principal) ficam disponíveis
        assert_eq!(engine.evaluate_status(&engine.nodes[0], &progress), NodeStatus::Completed);
        assert_eq!(engine.evaluate_status(&engine.nodes[1], &progress), NodeStatus::Available);
        assert_eq!(engine.evaluate_status(&engine.nodes[2], &progress), NodeStatus::Available);
    }
}
