use crate::models::UserProgress;
use std::fs::{self, File};
use std::io::Write;
use std::path::{Path, PathBuf};

pub struct PersistenceManager {
    storage_path: PathBuf,
}

impl PersistenceManager {
    pub fn new<P: AsRef<Path>>(path: P) -> Self {
        Self {
            storage_path: path.as_ref().to_path_buf(),
        }
    }

    /// Carrega o progresso do disco. Se o arquivo não existir ou estiver corrompido,
    /// retorna um estado inicial padrão com segurança.
    pub fn load_progress(&self) -> UserProgress {
        if !self.storage_path.exists() {
            return UserProgress::default();
        }

        match fs::read_to_string(&self.storage_path) {
            Ok(content) => match serde_json::from_str::<UserProgress>(&content) {
                Ok(progress) => progress,
                Err(_) => {
                    // Arquivo corrompido: faz backup do corrompido e inicia novo estado
                    let _ = fs::rename(&self.storage_path, self.storage_path.with_extension("bak"));
                    UserProgress::default()
                }
            },
            Err(_) => UserProgress::default(),
        }
    }

    /// Salva o progresso atomicamente para evitar corrupção em falhas repentinas.
    pub fn save_progress(&self, progress: &UserProgress) -> Result<(), String> {
        if let Some(parent) = self.storage_path.parent() {
            fs::create_dir_all(parent).map_err(|e| e.to_string())?;
        }

        let temp_path = self.storage_path.with_extension("tmp");
        let json_data = serde_json::to_string_pretty(progress).map_err(|e| e.to_string())?;

        {
            let mut file = File::create(&temp_path).map_err(|e| e.to_string())?;
            file.write_all(json_data.as_bytes()).map_err(|e| e.to_string())?;
            file.sync_all().map_err(|e| e.to_string())?;
        }

        fs::rename(&temp_path, &self.storage_path).map_err(|e| e.to_string())?;
        Ok(())
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    use tempfile::tempdir;

    #[test]
    fn test_persistence_save_and_load() {
        let dir = tempdir().unwrap();
        let file_path = dir.path().join("test_progress.json");
        let manager = PersistenceManager::new(&file_path);

        let mut progress = UserProgress::default();
        progress.user_id = "test_user".to_string();
        progress.total_xp = 250;
        progress.completed_node_ids = vec!["L1".to_string()];

        manager.save_progress(&progress).unwrap();

        let loaded = manager.load_progress();
        assert_eq!(loaded.user_id, "test_user");
        assert_eq!(loaded.total_xp, 250);
        assert_eq!(loaded.completed_node_ids, vec!["L1".to_string()]);
    }
}
