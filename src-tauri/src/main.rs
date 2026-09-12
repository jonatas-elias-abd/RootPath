pub mod content;
pub mod models;
pub mod persistence;
pub mod progression;
pub mod security;

use content::load_full_curriculum;
use models::{LessonNode, UserProgress};
use persistence::PersistenceManager;
use progression::ProgressionEngine;
use security::SecurityGuard;
use std::path::PathBuf;
use std::sync::Mutex;
use tauri::State;

pub struct AppState {
    pub engine: ProgressionEngine,
    pub persistence: PersistenceManager,
    pub security: SecurityGuard,
    pub progress: Mutex<UserProgress>,
}

#[tauri::command]
fn get_tree_state(state: State<AppState>) -> Vec<LessonNode> {
    let progress = state.progress.lock().unwrap();
    state.engine.get_tree_state(&progress)
}

#[tauri::command]
fn get_user_progress(state: State<AppState>) -> UserProgress {
    state.progress.lock().unwrap().clone()
}

#[tauri::command]
fn complete_lesson(lesson_id: String, state: State<AppState>) -> Result<UserProgress, String> {
    let mut progress = state.progress.lock().unwrap();
    if state.engine.complete_node(&mut progress, &lesson_id) {
        state.persistence.save_progress(&progress)?;
    }
    Ok(progress.clone())
}

#[tauri::command]
fn check_security_command(command: String, state: State<AppState>) -> Option<String> {
    state.security.requires_explicit_confirmation(&command)
}

fn main() {
    // Corrige artefatos visuais / listras na tela em máquinas virtuais Linux / WebKitGTK (DMA-BUF compositing bug)
    #[cfg(target_os = "linux")]
    {
        std::env::set_var("WEBKIT_DISABLE_COMPOSITING_MODE", "1");
        std::env::set_var("WEBKIT_DISABLE_DMABUF_RENDERER", "1");
    }

    let storage_path = dirs_next().join("user_progress.json");
    let persistence = PersistenceManager::new(storage_path);
    let initial_progress = persistence.load_progress();
    let curriculum = load_full_curriculum();
    let engine = ProgressionEngine::new(curriculum);
    let security = SecurityGuard::new();

    let app_state = AppState {
        engine,
        persistence,
        security,
        progress: Mutex::new(initial_progress),
    };

    tauri::Builder::default()
        .manage(app_state)
        .invoke_handler(tauri::generate_handler![
            get_tree_state,
            get_user_progress,
            complete_lesson,
            check_security_command
        ])
        .run(tauri::generate_context!())
        .expect("erro ao iniciar a aplicação Tauri RootPath");
}

fn dirs_next() -> PathBuf {
    directories::ProjectDirs::from("org", "RootPath", "RootPath")
        .map(|proj| proj.data_dir().to_path_buf())
        .unwrap_or_else(|| PathBuf::from("./rootpath_data"))
}
