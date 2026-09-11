# RootPath — SANDBOX // ENV

<p align="center">
  <img src="public/rootpath-logo.svg" alt="RootPath Logo" width="380">
</p>

<p align="center">
  <strong>Plataforma Desktop Progressiva & Gamificada para Aprendizado de Linux & Kali Linux</strong>
</p>

---

## 🎯 Sobre o RootPath

O **RootPath** é uma aplicação desktop nativa desenvolvida em **Rust** (Backend/Core) e **React + Tailwind** (Frontend), cujo objetivo principal é ensinar **Linux e Kali Linux** para pessoas completamente iniciantes, utilizando uma experiência de aprendizagem progressiva, visual e gamificada inspirada no conceito de plataformas como o Duolingo.

A premissa pedagógica central é:
$$\text{Aprender} \rightarrow \text{Praticar} \rightarrow \text{Compreender} \rightarrow \text{Fixar} \rightarrow \text{Avançar}$$

---

## ✨ Principais Características

- **Árvore de Aprendizagem Visual:**
  - `|` **Lições Principais:** Caminho sequencial estruturado com regras rígidas de pré-requisitos e desbloqueio.
  - `o` **Atividades de Fixação:** Desafios práticos e conceituais complementares que concedem XP.
- **Tutor IA Offline (Qwen3 0.6B Q4_K_M):**
  - Integração local com `llama.cpp` funcionando 100% offline, atuando como tutor pedagógico contextualizado sem vazamento de dados.
- **Fronteira de Segurança Ativa:**
  - Módulo de interceptação em Rust que identifica comandos potencialmente destrutivos (como `rm -rf`, `dd`, `mkfs`) e exige confirmação explícita do usuário com aviso de impacto.
- **Persistência Atômica:**
  - Armazenamento local com garantia de integridade contra encerramentos abruptos.
- **Design System Refinado:**
  - Estética *Deep Obsidian Slate* (`#0B0F19`), *Electric Kali Cyan* (`#0284C7`), *Emerald Validation* (`#10B981`) e *System Indigo* (`#6366F1`) com tipografia *Plus Jakarta Sans*, *Inter* e *JetBrains Mono*.

---

## 🚀 Como Executar

### Pré-requisitos
- [Node.js](https://nodejs.org/) (v18+)
- [Rust & Cargo](https://rustup.rs/) (v1.75+)

### Instalação de Dependências
```bash
npm install
```

### Modo de Desenvolvimento
```bash
npm run dev
```

### Build de Produção
```bash
npm run build
```

---

## 🛡️ Licença
Distribuído sob licença aberta para fins educacionais.
