use serde::{Deserialize, Serialize};

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub enum NodeStatus {
    Locked,
    Available,
    InProgress,
    Completed,
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
pub enum NodeType {
    MainLesson,   // Representado por '|' no mapa da árvore
    PracticeTask, // Representado por 'o' no mapa da árvore
}

#[derive(Debug, Clone, Serialize, Deserialize, PartialEq, Eq)]
#[serde(tag = "type", content = "data")]
pub enum ExerciseType {
    MultipleChoice {
        options: Vec<String>,
        correct_index: usize,
    },
    TerminalCommand {
        expected_command: String,
        validation_regex: Option<String>,
    },
    ConceptualRead,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct Exercise {
    pub id: String,
    pub prompt: String,
    pub hint: Option<String>,
    pub exercise_type: ExerciseType,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LessonContent {
    pub concept_explanation: String,
    pub demonstration: String,
    pub exercises: Vec<Exercise>,
}

#[derive(Debug, Clone, Serialize, Deserialize)]
pub struct LessonNode {
    pub id: String,
    pub title: String,
    pub description: String,
    pub node_type: NodeType,
    pub status: NodeStatus,
    pub parent_id: Option<String>,
    pub prerequisite_ids: Vec<String>,
    pub xp_reward: u32,
    pub estimated_minutes: u32,
    pub content: LessonContent,
}

#[derive(Debug, Clone, Serialize, Deserialize, Default)]
pub struct UserProgress {
    pub user_id: String,
    pub total_xp: u32,
    pub completed_node_ids: Vec<String>,
    pub current_node_id: Option<String>,
    pub last_active_timestamp: u64,
}
