export type NodeStatus = 'Locked' | 'Available' | 'InProgress' | 'Completed';
export type NodeType = 'MainLesson' | 'PracticeTask';

export interface MultipleChoiceData {
  options: string[];
  correct_index: number;
}

export interface TerminalCommandData {
  expected_command: string;
  validation_regex?: string;
}

export type ExerciseType =
  | { type: 'MultipleChoice'; data: MultipleChoiceData }
  | { type: 'TerminalCommand'; data: TerminalCommandData }
  | { type: 'ConceptualRead'; data?: null };

export interface Exercise {
  id: string;
  prompt: string;
  hint?: string;
  exercise_type: ExerciseType;
}

export interface LessonContent {
  concept_explanation: string;
  demonstration: string;
  exercises: Exercise[];
}

export interface LessonNode {
  id: string;
  title: string;
  description: string;
  node_type: NodeType;
  status: NodeStatus;
  parent_id?: string;
  prerequisite_ids: string[];
  xp_reward: number;
  estimated_minutes: number;
  content: LessonContent;
}

export interface UserProgress {
  user_id: string;
  total_xp: number;
  completed_node_ids: string[];
  current_node_id?: string;
  last_active_timestamp: number;
}
