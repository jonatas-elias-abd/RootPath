use std::collections::HashSet;

pub struct SecurityGuard {
    dangerous_commands: HashSet<&'static str>,
}

impl SecurityGuard {
    pub fn new() -> Self {
        let mut dangerous_commands = HashSet::new();
        dangerous_commands.insert("rm -rf /");
        dangerous_commands.insert("rm -rf /*");
        dangerous_commands.insert("mkfs");
        dangerous_commands.insert("dd");
        dangerous_commands.insert(":(){ :|:& };:"); // Fork bomb
        
        Self { dangerous_commands }
    }

    /// Verifica se uma linha de comando requer confirmação prévia e explícita do usuário.
    pub fn requires_explicit_confirmation(&self, command: &str) -> Option<String> {
        let trimmed = command.trim();
        for dangerous in &self.dangerous_commands {
            if trimmed.contains(dangerous) {
                return Some(format!(
                    "ATENÇÃO DE SEGURANÇA: O comando contém '{}', que é uma ação potencialmente destrutiva para o sistema. Deseja confirmar a execução?",
                    dangerous
                ));
            }
        }
        None
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_security_guard_interception() {
        let guard = SecurityGuard::new();

        // Comando seguro
        assert!(guard.requires_explicit_confirmation("whoami").is_none());
        assert!(guard.requires_explicit_confirmation("ls -la").is_none());

        // Comando perigoso
        assert!(guard.requires_explicit_confirmation("rm -rf /").is_some());
    }
}
