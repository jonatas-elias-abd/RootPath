# Plano Mestre de Implementação Integral — RootPath

> [!NOTE]
> Este documento foi reestruturado para refletir o briefing consolidado entre o usuário e a IA, mantendo rigorosamente o que foi confirmado e evitando suposições.
> Status atualizado: APROVADO PARA IMPLEMENTAÇÃO DA ESTRUTURA DE TELAS, COMPONENTES PRINCIPAIS E BACKLOG VISUAL.

---

## 0. CONTEXTUALIZAÇÃO E REGRA DE EXECUÇÃO

Este documento tem como objetivo principal organizar a implementação do projeto RootPath em uma estrutura clara, verificável e sequenciável para o desenvolvimento da interface.

### 0.1 Regras aplicáveis ao documento

1. Não inventar informações que não foram confirmadas.
2. Não assumir arquitetura funcional que ainda não foi validada.
3. Separar claramente:
   - o que já foi confirmado;
   - o que foi sugerido, mas ainda não é requisito obrigatório;
   - o que é backlog futuro.
4. A estrutura visual deve priorizar:
   - app desktop em dark mode;
   - barra lateral fixa;
   - identidade visual com inspiração forte em Kali/Linux, em equilíbrio com o estilo Duolingo;
   - dashboard como hub central;
   - mapa de aprendizagem com estrutura `|` e `o`;
   - chamados/desafios práticos como caixa de entrada de problemas;
   - terminal visual embutido somente como parte da UI, sem funcionalidade real;
   - tutor IA apenas como ajuda momentânea, não como feature fixa de navegação.

### 0.2 Hierarquia de instruções aplicada

Este documento foi pensado obedecendo à seguinte ordem de prioridade:

1. Contexto e decisões explicitamente confirmadas pelo usuário.
2. Regras e restrições do projeto já existentes.
3. Estrutura e componentes de UI que já existem no código atual.
4. Sugestões e melhorias que não alteram a base confirmada.
5. Backlog futuro e extensões opcionais.

---

## 1. VISÃO HOLÍSTICA DO PRODUTO

O RootPath é uma plataforma educacional com foco em ensino de Linux e Kali Linux, combinando:

1. a abordagem pedagógica, progressiva e visual do Duolingo;
2. a atmosfera técnica, de suporte e desafios do while True: learn();
3. a evolução de carreira e identidade de security teams;
4. um mascote Siberiano estilizado como elemento de personalidade visual;
5. um ambiente de interface dark mode com forte inspiração Kali/Linux e estética cyber tech.

### 1.1 Direção visual confirmada

Os elementos abaixo foram confirmados explicitamente:

- Interface apenas com o conteúdo da aplicação, sem moldura fake de desktop.
- Dark mode apenas.
- Estilo visual: mistura dos dois universos, com balanceamento entre Duolingo e cyber/terminal.
- Identidade visual: forte inspiração em Kali/Linux, mas sem reproduzir a interface do Kali de forma literal.
- Navegação principal por barra lateral fixa.
- Dashboard como hub central acessível facilmente.
- Mapa de aprendizagem com trilha principal e atividades de fixação.
- Chamados/desafios práticos com dinâmica de caixa de entrada/tickets.
- Terminal visual embutido apenas para apresentação de UI.
- Tutor IA como painel retrátil de apoio momentâneo.
- Usuário controla a ordem de navegação; não há sequência rígida de telas.
- A aplicação é pensada para uso pessoal por enquanto, sem necessidade de público genérico.

### 1.2 Objetivo principal da primeira implementação

A primeira entrega do projeto deve focar na estrutura visual e estrutural da aplicação, sem implementar lógica funcional real de comandos, terminal, tutor ou persistência avançada.

A implementação deve priorizar:

- legibilidade;
- organização visual;
- sensação de progressão;
- capacidade de navegar livremente entre as áreas;
- aparência moderna, dark e técnica;
- cards grandes e amigáveis;
- elementos de progressão e descoberta.

---

## 2. ARQUITETURA DE TELAS CONFIRMADA

A estrutura da aplicação deve seguir a organização abaixo.

### 2.1 Barra lateral fixa

A barra lateral fixa deve conter, inicialmente, as seguintes áreas principais:

- Dashboard
- Mapa de Aprendizagem
- Lições
- Desafios Práticos

### 2.2 Tela principal de alto nível

A aplicação deve ser organizada no seguinte formato:

1. Sidebar fixa
2. Main content area
3. Painel contextual opcional (somente quando necessário)
4. Área de conteúdo principal com cards, listagens e módulos

### 2.3 Estrutura do fluxo de navegação

A navegação não deve funcionar como um formulário linear de respostas. O usuário pode decidir a ordem da exploração, respeitando apenas a lógica visual da trilha.

#### Navegação principal

- Dashboard: hub central
- Mapa de Aprendizagem: visão geral da trilha e dos pontos de progressão
- Lições: conteúdo didático principal
- Desafios Práticos: caixa de entrada de tickets e problemas

#### Navegação complementar

As áreas complementares podem existir como telas ou módulos acessados por atalhos no dashboard ou em menus específicos, mas não precisam formar uma sequência obrigatória.

Exemplos de áreas complementares:

- Arsenal de Ferramentas
- Cheatsheet / Guia de Referência
- Topologia Visual & Redes
- Perfil / Skill Tree
- Glossário
- Caderno de Anotações
- Configurações
- Monitor de Segurança

---

## 3. ESTRUTURA DAS TELAS

A seguir está a arquitetura recomendada das telas para a primeira implementação, baseada no briefing confirmado.

### 3.1 Dashboard

#### Objetivo

Servir como hub central da aplicação, concentrando atalhos, progresso e indicação das próximas ações.

#### Função visual principal

O dashboard deve dar sensação de entrada para o mundo do projeto, com foco em:

- continuidade do estudo;
- avanço rápido;
- visibilidade geral de progresso;
- acesso às principais áreas;
- lembretes visuais de próximos passos.

#### Componentes principais do Dashboard

- Cabeçalho com título e saudação
- Card principal de continuidade
- Cards de atalhos para:
  - Mapa de Aprendizagem
  - Lições
  - Desafios Práticos
  - Arsenal
  - Comparador Windows vs Linux
- Resumo de progresso geral
- Lista de próximos módulos ou lições
- Bloco de chamados disponíveis
- Bloco de conquistas ou marcos recentes
- Bloco de stats rápidas

#### Estrutura recomendada do Dashboard

- Top bar interna
- Grid de cards grandes
- Seção de destaque principal
- Seção de atalhos
- Seção de progresso
- Seção de atividades em andamento
- Seção de novidades ou marcos

#### Observações importantes

- O dashboard deve funcionar como centro navegacional.
- O dashboard não precisa ser uma tela sobrecarregada.
- Deve ter visual clean, com cards grandes e espaço generoso.

---

### 3.2 Mapa de Aprendizagem

#### Objetivo

Apresentar visualmente a trilha de aprendizagem, com o sistema de módulos principais (`|`) e atividades de fixação (`o`).

#### Estrutura visual

A tela deve representar uma árvore/trilha com:

- nós principais (`|`) como marcos de lições;
- nós de apoio (`o`) como atividades de revisão e fixação;
- caminhos maiores de progressão;
- possibilidades de avanço conforme o aluno explora os módulos.

#### Componentes principais do Mapa

- Cabeçalho da trilha
- Área central com visual de árvore ou mapa vertical
- Nós principais com estado de desbloqueio
- Nós de fixação conectados à lição principal
- Indicadores visuais de completude
- Evidências de próximos desbloqueios
- Tooltips ou labels de contexto

#### Regras visuais recomendadas

- Os nós principais devem ser mais visíveis e mais fortes visualmente.
- Os nós `o` devem aparecer como atividades complementares.
- O mapa pode ter uma parte principal linear e outra ramificada.
- O usuário pode seguir a trilha na ordem que quiser, mas a interface deve sugerir caminhos.

#### Importante

A estrutura de `|` e `o` foi confirmada como parte central da identidade pedagógica da aplicação. Ela deve aparecer de forma evidente neste mapa.

---

### 3.3 Lições

#### Objetivo

Apresentar o conteúdo de ensino de forma amigável, organizada e visualmente clara.

#### Estrutura recomendada

- Cabeçalho da lição
- Bloco de objetivo da unidade
- Exposição do conceito principal
- Área de exemplos
- Blocos de comandos ou conceitos técnicos
- Mini exercícios ou interações visuais
- CTA de avanço ou de continuidade

#### Componentes principais da tela de lição

- Header da lição
- Card de objetivo
- Card de conteúdo principal
- Card de “o que você vai aprender”
- Blocos de referência técnica
- Cards de comando ou sintaxe
- Seção de revisão rápida
- Botões de ação (continuar, revisar, abrir ajuda)

#### Regras visuais recomendadas

- A tela deve ter cards grandes e espaço generoso.
- Conceitos técnicos devem aparecer com boa legibilidade.
- O terminal visual pode aparecer dentro da própria lição como referência, sem funcionamento real.

#### Observação

A tela de lições deve permanecer genérica por enquanto, conforme confirmado. Isso significa que, no momento, não é necessário definir tipos específicos de exercícios na interface.

---

### 3.4 Desafios Práticos / Chamados

#### Objetivo

Representar o ambiente de problemas estilo while True: learn(), em que o aluno recebe um chamado, analisa o cenário e resolve a situação visualmente.

#### Estrutura visual sugerida

- Lista de chamados/emails/tickets
- Painel de detalhe do chamado
- Área de briefing do problema
- Área de terminal simulado
- Área de instruções de resolução
- Área de resposta ou resolução

#### Componentes principais

- Lista lateral ou painel de tickets
- Card de chamado em destaque
- Título do problema
- Contexto do incidente ou cenário
- Tags ou categorias do chamado
- Terminal visual embutido
- Botões de ação: enviar resposta, revisar, solicitar dica, marcar como resolvido
- Painel de status do chamado

#### Dinâmica visual confirmada

- O chamado pode ter múltiplos critérios de resolução dependendo do exercício.
- O sistema deve permitir a conclusão por:
  - comando correto;
  - localização de um arquivo/flag;
  - resposta de conclusão;
  - combinação de etapas.
- A tela deve parecer uma caixa de entrada de chamados, sem implementar comando real.

#### Regras de UI

- O terminal visual deve ser parte do design, mas não funcional.
- O painel pode ter diferentes estados:
  - novo chamado;
  - em análise;
  - resolvido;
  - chamado especial;
  - chamado opcional.

---

### 3.5 Arsenal de Ferramentas

#### Objetivo

Disponibilizar uma enciclopédia visual das ferramentas do Kali e de uso essencial do Linux.

#### Componentes principais

- Lista de ferramentas por categoria
- Cards com nome da ferramenta
- Descrição curta
- Sintaxe básica
- Status de desbloqueio
- Botão para abrir ficha detalhada

#### Estrutura de card

- Nome da ferramenta
- Categoria
- Descrição resumida
- Exemplo visual de uso
- Estado: bloqueado / desbloqueado / disponível

#### Observação

Essa parte foi sugerida como feature complementar e pode entrar no backlog de telas secundárias.

---

### 3.6 Cheatsheet e Guia de Referência Rápida

#### Objetivo

Servir como consulta visual rápida durante o estudo.

#### Componentes principais

- Categorias por assunto
- Tabelas comparativas
- Lista de comandos essenciais
- Seções de navegação, permissões, redes e processos
- Exemplos curtos e diretos

#### Estrutura sugerida

- Busca rápida por tema
- Seção por categoria
- Tabela visual com comandos e utilidade
- Sugestões de uso

#### Observação

Pode ser implementado como uma tela secundária ou como um painel contextual acionado por meio de atalhos.

---

### 3.7 Topologia Visual / Laboratório de Redes

#### Objetivo

Representar visualmente nós de rede em um laboratório de estudos.

#### Componentes principais

- Mapa gráfico de máquinas
- Nós de rede com rótulos
- Coneções visualmente claras
- Informações rápidas por nó
- Estado de cada entidade

#### Estrutura visual

- Máquina local
- Roteador
- Firewall
- Servidor alvo
- Outros nós conforme o exercício

#### Observação

Foi sugerido como feature complementar e não é obrigatório para a primeira fase.

---

### 3.8 Perfil e Skill Tree

#### Objetivo

Exibir a evolução do aluno e as habilidades adquiridas.

#### Componentes principais

- Perfil do aluno
- Patente atual
- Estatísticas do usuário
- Árvore de habilidades
- Team atual
- Badges e conquistas
- Status geral de progresso

#### Estrutura da skill tree

- Ramos principais
- Habilidades por categoria
- Níveis de domínio
- Conexões entre habilidades
- Ativação por progresso

#### Observação

O Team deve começar como Novato / Indefinido e ser escolhido conforme o aluno evolui nos fundamentos.

---

### 3.9 Caderno de Erros e Revisão Espaçada

#### Objetivo

Reunir comandos errados e reforçar a fixação.

#### Componentes principais

- Lista de erros registrados
- Comandos e contextos
- Sugestões de revisão
- Possibilidade de reabrir exercícios relacionados

#### Observação

Feature complementar, útil para reforço pedagógico.

---

### 3.10 Glossário e Central de Anotações

#### Objetivo

Ser um espaço de consulta e memorização de conceitos.

#### Componentes principais

- Glossário por conceito
- Lista de termos importantes
- Bloco de notas pessoal
- Tags de conteúdo

#### Observação

Essa área é relevante mas pode ser implementada depois do núcleo da aplicação.

---

### 3.11 Configurações e Segurança

#### Objetivo

Controlar o ambiente visual e a experiência da interface.

#### Componentes principais

- Ajustes de fontes
- Tamanho de letra
- Esquema visual do terminal
- Preferências de UI
- Histórico ou controle do tutor, se futuramente houver

#### Observação

O monitor de segurança e auditoria foi mencionado como feature complementar e pode ocorrer em um nível posterior.

---

## 4. COMPONENTES PRINCIPAIS DO SISTEMA

Abaixo estão os componentes principais que devem existir na interface, com suas funções e regras visuais.

### 4.1 Sidebar

#### Função

Controlar a navegação principal entre as áreas essenciais.

#### Elementos

- Ícones ou rótulos
- Destaque do item ativo
- Botões de navegação
- Área inferior com estado do usuário ou acesso a configurações

#### Regras visuais

- Lateral fixa
- Visual dark
- Destaque visual para o item ativo
- Espaçamento generoso

---

### 4.2 Header interno

#### Função

Exibir contexto da tela atual, ações rápidas e informações relevantes.

#### Elementos

- Título da seção
- Busca opcional
- Botões de ação
- Indicadores de progresso ou status

---

### 4.3 Card principal

#### Função

Servir como base da grande maioria dos blocos da interface.

#### Características

- Fundo escuro
- Borda suave
- Elevação visual leve
- Espaçamento interno generoso
- Possibilidade de destaque visual

#### Uso recomendado

- lições
- módulos
- desafios
- atalhos
- status
- progresso

---

### 4.4 Cards de lição

#### Função

Representar cada bloco de conteúdo didático.

#### Elementos

- título
- resumo
- categoria
- tempo estimado
- estado de progresso
- botão de acesso

---

### 4.5 Cards de desafio

#### Função

Representar cada chamado/ticket/prática.

#### Elementos

- título do chamado
- categoria
- nível de dificuldade
- prioridade
- resumo do cenário
- botão de abrir

---

### 4.6 Terminal visual

#### Função

Sinalizar visualmente uma experiência de terminal sem implementar execução real.

#### Elementos

- fundo preto/escuro
- prompt visual
- linhas monoespaçadas
- destaque para comandos e caminhos
- caixa de saída

#### Regras

- Deve ser visualmente identificável como terminal.
- Não deve realizar lógica de execução real.
- Deve ser usado em chamados e na tela de lições quando houver necessidade de contexto.

---

### 4.7 Tutor IA retrátil

#### Função

Disponibilizar ajuda momentânea quando o usuário desejar.

#### Estrutura

- painel lateral retrátil
- pode abrir sob demanda
- não precisa ocupar espaço fixo
- pode receber contexto do que o usuário está lendo

#### Regras

- Não deve ser parte da navegação principal.
- Não deve ser obrigatório.
- Deve servir como auxílio pontual e discreto.

---

### 4.8 Badge e estados

#### Função

Representar nível, status, progresso e conquistas.

#### Exemplos

- bloqueado
- desbloqueado
- concluído
- especial
- opcional
- retoque de revisão

---

### 4.9 Progress bar e indicadores

#### Função

Dar sensação de avanço e organização dos módulos.

#### Elementos

- progresso horizontal
- indicadores por seção
- percentual
- estado de completude

---

## 5. ESTRUTURA DE TELA POR ÁREA

### 5.1 Dashboard

#### Estrutura esperada

- Header
- Card principal de continuidade
- Grid de atalhos
- Session summary
- Atividades recentes
- Próximos passos

#### Componentes principais

- Hero card
- Quick access cards
- Progress panel
- Recent card list
- Highlights section

---

### 5.2 Mapa de Aprendizagem

#### Estrutura esperada

- Header
- Área central da trilha
- Nós principais
- Nós secundários
- Conexões visuais
- Indicadores de estado

#### Componentes principais

- Tree canvas
- Node markers
- Link connectors
- Level indicators
- Module cards
- Lock/unlock states

---

### 5.3 Lições

#### Estrutura esperada

- Header da lição
- Conteúdo principal
- Referência técnica
- Exemplo visual
- Botões de ação

#### Componentes principais

- Lesson intro card
- Learning body panel
- Example panel
- Technical notes
- CTA area

---

### 5.4 Desafios Práticos

#### Estrutura esperada

- Header da seção
- Lista de chamados
- Painel do chamado em destaque
- Terminal visual
- Blocos de status e solução

#### Componentes principais

- Ticket list
- Ticket details
- Scenario board
- Terminal preview
- Resolve actions

---

### 5.5 Arsenal

#### Estrutura esperada

- Header
- Filtros por categoria
- Grid de ferramentas
- Fichas rápidas
- Acesso a detalhes

#### Componentes principais

- Category chips
- Tool cards
- Tool detail drawer

---

### 5.6 Skill Tree / Perfil

#### Estrutura esperada

- Header
- Perfil do usuário
- Team selection context
- Skill tree panel
- Badges and stats

#### Componentes principais

- User profile card
- Team badge
- Level panel
- Skill tree visual
- Achievement list

---

## 6. CONTEÚDO DE UI E COMPONENTES QUE NÃO DEVEM SER IMPLEMENTADOS AGORA

A seguir estão áreas citadas pelo usuário e que devem ser tratadas como backlog ou como contexto, não como requisito obrigatório da primeira UI.

### 6.1 O que não deve entrar na primeira entrega

- lógica real de terminal
- comandos executáveis
- lógica funcional do tutor IA
- persistência real de memória do tutor
- simulação real de segurança
- execução de uso de ferramentas reais
- integração com `llama.cpp`
- autenticação ou multiusuário
- dados reais de usuários

### 6.2 O que pode existir apenas visualmente

- terminal simulado
- painel retrátil de ajuda
- cards de tarefa em andamento
- botões com estados e feedback visual
- feedback de progressão visual
- mas sem lógica funcional real por trás

### 6.3 O que pode entrar no backlog

- Arsenal completo
- Cheatsheet completo
- Topologia visual
- Glossário e caderno de anotações
- Configurações avançadas
- Segurança e auditoria
- Tutor com histórico
- Skill tree completo com progressão
- Mural de chamados especiais
- Histórico de chamados resolvidos
- CTF local

---

## 7. DICIONÁRIO DE ESTADOS VISUAIS

A seguir estão os estados visuais que devem ser suportados de forma consistente em toda a interface.

### 7.1 Estados de módulo

- bloqueado
- disponível
- em andamento
- concluído
- revisado
- especial
- opcional

### 7.2 Estados de chamado

- novo
- lido
- em análise
- resolvido
- ignorado
- especial

### 7.3 Estados de item do mapa

- principal
- de fixação
- desbloqueado
- bloqueado
- concluído

### 7.4 Estados de equipe / team

- indefinido
- em seleção
- escolhido
- em evolução

---

## 8. DIRETRIZES DE DESIGN VISUAL

### 8.1 Estilo geral

A interface deve combinar:

- Duolingo: cards grandes, progressão visual, sensação de recompensa, espaçamento amigável;
- while True: learn(): atmosfera técnica, desafios e ambiente de suporte/incident response;
- Kali/Linux: referências visuais marcantes, mas sem reprodução literal da UI do Kali.

### 8.2 Modo de cor

- dark mode somente;
- paleta dark profunda;
- azul elétrico e verde esmeralda como principais acentos;
- terminal em fundo muito escuro;
- contraste alto para leitura.

### 8.3 Espaçamento e densidade

- cards grandes e mais espaçosos;
- mais ar para leitura e foco;
- layout desktop com aproveitamento horizontal.

### 8.4 Conversão visual da identidade

A GUI deve transmitir visualmente:

- capacidade técnica;
- aprendizagem estruturada;
- ambiente de exploração;
- progresso claro;
- segurança/cyber context;
- sensação de amigabilidade.

---

## 9. DIRETRIZES DE NAVEGAÇÃO

### 9.1 Navegação principal

A navegação principal deve ser:

- fixa;
- clara;
- fácil de entender;
- orientada ao usuário;
- sem exigir um formulário de sequência rígida.

### 9.2 Dashboard como hub

O dashboard deve funcionar como porta de entrada e como ponto central para:

- continuidade;
- atalhos;
- resumo;
- próximos passos;
- acesse rápido às áreas do projeto.

### 9.3 Mapa de aprendizagem com liberdade de percurso

O mapa deve permitir:

- explorar módulos de diferentes formas;
- seguir trilha principal ou atividades de fixação;
- aprender visualmente a estrutura de progressão;
- sentir que a escolha do usuário importa.

---

## 10. MAPEAMENTO DE TELAS COM COMPONENTES PRINCIPAIS

### 10.1 Dashboard

- Sidebar
- Header interno
- Hero card
- Quick access cards
- Progress summary
- Recent activity
- Help shortcut area

### 10.2 Mapa de Aprendizagem

- Tree canvas
- Node markers
- Link connectors
- Level indicators
- Module cards
- Lock/unlock states

### 10.3 Lições

- Lesson header
- Concept card
- Example card
- Notes area
- CTA panel

### 10.4 Chamados / Desafios

- Ticket list
- Ticket detail panel
- Scenario board
- Terminal preview
- Submission area

### 10.5 Arsenal

- Category chips
- Tool cards
- Detail panel
- Unlock status

### 10.6 Perfil / Skill Tree

- Profile card
- Team badge
- Skill graph
- Badge list
- Stats panel

---

## 11. RECOMENDAÇÃO DE IMPLEMENTAÇÃO EM CAMADAS

A primeira fase de implementação deve seguir esta ordem:

### Fase 1 — Esqueleto estrutural

- Sidebar fixa
- Dashboard
- Mapa de Aprendizagem
- Lições
- Desafios Práticos

### Fase 2 — Componentização visual

- cards
- badges
- progress bars
- buttons
- terminal style panel
- tutor panel

### Fase 3 — Conteúdo de apoio

- arsenal
- cheatsheet
- glossário
- topologia visual
- caderno de erros

### Fase 4 — Backlog funcional

- tutor IA de verdade
- terminal real
- lógica de persistência
- monitor de segurança
- histórico de chamados
- CTF local

---

## 12. CRITÉRIOS DE CONCLUSÃO DA PRIMEIRA IMPLEMENTAÇÃO

A implementação da estrutura inicial pode ser considerada concluída quando:

1. as quatro áreas principais existirem e forem navegáveis;
2. o dashboard funcionar como hub central;
3. o mapa de aprendizagem estiver visualmente presente;
4. o conceito `|` e `o` estiver claramente representado;
5. a tela de chamados estiver visualmente destacada;
6. o tutor IA aparecer apenas como painel retrátil de apoio momentâneo;
7. a interface manter visual dark, com cards grandes e identidade Kali/tech equilibrada;
8. não houver navegação linear forçada de telas;
9. a aplicação parecer um conteúdo de app, e não um desktop fake;
10. todas as telas forem consistentes com o design system definido.

---

## 13. CONCLUSÃO

Este documento consolida a estrutura da interface e a arquitetura recomendada para a primeira implementação do RootPath, com foco na experiência visual e operacional da aplicação como app desktop educacional em dark mode.

O que foi confirmado e deve orientar a implementação:

- mistura entre Duolingo e while True: learn();
- dark mode;
- identidade Kali/Linux forte, equilibrada;
- dashboard como hub;
- barra lateral fixa;
- mapa de aprendizagem com `|` e `o`;
- desafios práticos com chamados;
- terminal visual embutido;
- tutor IA apenas como ajuda momentânea;
- ausência de sequência rígida de telas;
- ausência de desktop fake.

O que permanece como backlog ou melhoria posterior:

- arsenal completo;
- cheatsheet avançado;
- topologia visual;
- glossário e anotações;
- perfil avançado;
- skill tree completa;
- tutor IA funcional;
- monitor de segurança;
- CTF local;
- história de chamados e lógica real.

---

## 14. RESUMO EXECUTIVO PARA IMPLEMENTAÇÃO

### 14.1 Confirmado

- App desktop em dark mode
- Barra lateral fixa
- Dashboard, Mapa, Lições, Chamados/Desafios
- Cards grandes e visual amigável
- Identidade Kali/Linux em força equilibrada
- Mapa de aprendizagem com `|` e `o`
- Tutor IA apenas como painel retrátil e momentâneo
- Sem sequência rígida de telas
- Sem desktop fake

### 14.2 Futuro / backlog

- Arsenal completo
- Cheatsheet e guia de referência
- Topologia visual
- Perfil e skill tree avançados
- Glossário e caderno
- Tutoria IA funcional real
- Segurança e auditoria
- Histórico de chamados
- CTF local

### 14.3 Primeiro objetivo de implementação

Implementar a estrutura base da interface com foco em:

- arquitetura de telas;
- componentes principais;
- navegação lateral;
- dashboard hub;
- mapa de aprendizagem;
- lições;
- desafios práticos;
- identidade visual do projeto.

---

## 15. ANEXO A — MODELO DE ESTRUTURA DE TELAS (VISUAL)

A seguir, um esquema conceitual de navegação que pode ser usado como referência no desenvolvimento.

```
[ Sidebar Fixa ]
  - Dashboard
  - Mapa de Aprendizagem
  - Lições
  - Desafios Práticos
  - (opcional) Arsenal
  - (opcional) Perfil
  - (opcional) Configurações

[ Conteúdo Principal ]
  Dashboard
    - Hero card
    - Atalhos
    - Progresso
    - Atividades recentes

  Mapa de Aprendizagem
    - Tronco principal
    - Nó | principal
    - Nó o de fixação
    - Conexões visuais

  Lições
    - Conteúdo principal
    - Exemplo visual
    - CTA

  Desafios Práticos
    - Lista de tickets
    - Detalhe do ticket
    - Terminal visual
    - Botões de ação
```

---

## 16. ANEXO B — MATRIZ DE COMPONENTES POR TELA

| Tela | Componentes essenciais | Estado atual |
|------|------------------------|-------------|
| Dashboard | Hero card, atalhos, progresso, Atividades recentes | obrigatório |
| Mapa | árvore, nós, estados, conexões | obrigatório |
| Lições | header, conteúdo, exemplos, CTA | obrigatório |
| Chamados | lista, detalhe, terminal visual, ações | obrigatório |
| Arsenal | cards, categorias, detalhes | complementar |
| Perfil | perfil, skill tree, badges | complementar |
| Glossário | termos, notas, busca | complementar |
| Configurações | ajustes visuais, preferências | complementar |

---

## 17. ANEXO C — MATRIZ DE RESTRIÇÕES

### Items que devem permanecer fora do escopo visual atual

- comandos reais;
- terminal funcional;
- tutor operacional;
- integração com modelos locais;
- lógica de persistência real;
- ctf local funcional;
- monitor de segurança funcional;
- histórico de chamados real;
- especializações de equipe em execução real.

### Items que devem ser representados visualmente apenas

- terminal embutido;
- cards de progresso;
- painel de ajuda retrátil;
- badges e trophy states;
- skill tree visual;
- efeitos de desbloqueio.

---

## 18. ANEXO D — CHECKLIST DE VALIDAÇÃO VISUAL

Antes de considerar a interface implementada, validar:

- [ ] sidebar fixa presente;
- [ ] dashboard como hub central;
- [ ] mapa com `|` e `o` visíveis;
- [ ] lições com cards grandes e content clarity;
- [ ] desafios práticos com caixa de chamados;
- [ ] dark mode consistente;
- [ ] visual Kali/Linux forte, sem duplicar a UI do Kali;
- [ ] tutor como painel retrátil e momentâneo;
- [ ] ausência de desktop fake;
- [ ] composição desktop respeitando espaçamento e leitura.

---

## 19. ANEXO E — DADOS QUE PODEM SER USADOS COMO BASE DE CONTEXTO FUTURO

Este anexo reúne elementos que não foram confirmados como obrigatórios, mas que podem orientar o desenvolvimento futuro.

### 19.1 Teams

- Red Team
- Blue Team
- Purple Team
- White Team
- Yellow Team
- Green Team
- Orange Team

### 19.2 Papéis e especializações

- SOC
- Threat Hunter
- Pentester
- Bug Bounty
- DFIR
- Incident Responder
- Threat Intelligence

### 19.3 Patentes sugeridas

- Script Kiddie
- Operador Linux
- Analista Júnior
- SysAdmin
- Especialista de Segurança

### 19.4 Ferramentas citadas

- Nmap
- Wireshark
- Metasploit
- John the Ripper
- Hydra
- Nikto

### 19.5 Conceitos educativos citados

- Kernel
- Shell
- GUI
- `pwd`
- `ls -la`
- `cd`
- permissões
- `chmod`
- `chown`
- `sudo`
- `su`
- `ps`
- `top`
- `ping`
- `ip a`
- `ss`
- `netstat`

---

## 20. ANEXO F — O QUE A IMPLEMENTAÇÃO DEVE EVITAR

- não transformar a interface em formulário linear;
- não criar sequência obrigatória de resposta;
- não inserir logicamente execução de comandos reais;
- não assumir que o tutor deve ser permanente;
- não exagerar em referências visuais que tornem a UI confusa;
- não transformar o app em um mock de desktop do sistema operacional;
- não saturar a tela com excesso de informações;
- não usar elemento de UI sem função clara no contexto pedagógico.

---

## 21. ANEXO G — PLANO DE IMPLEMENTAÇÃO RECOMENDADO

### 21.1 Prioridade 1

Estruturar a arquitetura de telas e componentes principais.

### 21.2 Prioridade 2

Implementar os componentes visuais repetíveis.

### 21.3 Prioridade 3

Envolver o conteúdo das telas e do dashboard.

### 21.4 Prioridade 4

Adicionar áreas secundárias e backlog.

### 21.5 Prioridade 5

Refinar detalhes visuais e micro-interações.

---

## 22. ANEXO H — MENSAGEM DE ALINHAMENTO FINAL

A base do projeto ficou suficientemente clara para começar a implementação da interface visual com segurança e sem extrapolar o escopo.

O que foi confirmado:

- mistura entre Duolingo e while True: learn();
- dark mode;
- identidade Kali/Linux forte, equilibrada;
- dashboard como hub;
- barra lateral fixa;
- mapa de aprendizagem com `|` e `o`;
- desafios práticos com chamados;
- terminal visual embutido;
- tutor IA apenas como ajuda momentânea;
- ausência de sequência rígida de telas;
- ausência de desktop fake.

A partir daqui, a implementação deve focar em estrutura de telas, componente de UI e organização visual, deixando a lógica funcional para fases posteriores.

---

## 23. ANEXO I — DICIONÁRIO DE TELAS E PADRÕES (EXPANSÃO OPERACIONAL)

### 23.1 Visão geral das telas obrigatórias

1. Dashboard
2. Mapa de Aprendizagem
3. Lições
4. Desafios Práticos

### 23.2 Padrões de layout esperados

- área principal central
- sidebar à esquerda
- cards com borda leve
- espaçamento uniforme
- elementos de progresso consistentes
- contraste alto

### 23.3 Padrões de interação visual

- hover em cards
- destaque do item ativo na sidebar
- feedback ao selecionar um módulo
- estado visual de módulos desbloqueados e bloqueados
- botões com estilo de ação clara

### 23.4 Padrões de informação

- títulos em destaque
- descrições auxiliares em texto médio
- tags por status
- badges por nível e categoria

---

## 24. ANEXO J — ROTEIRO DE VALIDAÇÃO DE UI

### 24.1 Validação de arquitetura

- [ ] a navegação principal está clara
- [ ] a ordem de uso não é forçada
- [ ] o dashboard funciona como hub
- [ ] o mapa representa a trilha de aprendizagem
- [ ] os chamados aparecem como queue/ticket board

### 24.2 Validação visual

- [ ] o dark mode foi mantido
- [ ] os cards são grandes e confortáveis
- [ ] o visual lembra Kali/Linux sem imitar a UI oficial
- [ ] os destaques visuais ficam claros
- [ ] os elementos técnicos têm boa legibilidade

### 24.3 Validação de consistência

- [ ] todos os componentes compartilham linguagem visual
- [ ] os estados estão previstos e consistentes
- [ ] as telas futuras são facilmente encaixáveis na estrutura atual

---

## 25. ANEXO K — BACKLOG VISUAL POR PRIORIDADE

### Prioridade A — obrigatório para a primeira fase

- Dashboard
- Mapa de Aprendizagem
- Lições
- Desafios Práticos
- Sidebar fixa
- Tutor IA retrátil visual

### Prioridade B — complementar

- Arsenal de Ferramentas
- Cheatsheet
- Perfil e Skill Tree
- Glossário
- Caderno de Erros

### Prioridade C — futuro

- Topologia Visual
- Historia de chamados resolvidos
- CTF local
- Tutor IA funcional
- Monitor de segurança

---

## 26. ANEXO L — MENSAGENS DE CONTEXTO PARA A IMPLEMENTAÇÃO

### 26.1 Mensagem principal

A aplicação deve ser implementada como uma interface educativa em dark mode, com visual híbrido entre Duolingo e cyber/terminal, mantendo a experiência amigável, detalhada e progressiva.

### 26.2 Mensagem de restrição

A implementação visual não deve incluir lógica funcional de comandos, execução real, tutor IA operacional, coleta real de dados ou comportamento de sistema.

### 26.3 Mensagem de navegação

A navegação deve ser aberta e livre. O usuário decide a ordem de uso, mas a interface deve sugerir uma trilha clara de aprendizagem.

---

## 27. ANEXO M — DECISÕES CONFIRMADAS PELO USUÁRIO

### 27.1 Plataforma

- app desktop
- conteúdo da aplicação, sem desktop fake

### 27.2 Idioma

- português

### 27.3 Estilo visual

- mistura dos dois universos
- Duolingo + while True / cyber

### 27.4 Público

- apenas o usuário por enquanto

### 27.5 Nome

- o nome será definido pela IA da conversa anterior e não deverá ser presumido agora

### 27.6 Escopo visual

- Dashboard
- Mapa de Aprendizagem
- Lições
- Desafios Práticos

### 27.7 Gamificação

- por enquanto, não é prioridade central do escopo visual

### 27.8 Progressão

- estrutura pedagógica ainda não definida em profundidade

### 27.9 Metaprompt

- único metaprompt detalhado

### 27.10 Limite do escopo

- UI/UX visual somente
- sem código, sem lógica funcional e sem implementação real

---

## 28. ANEXO N — CHECKLIST FINAL DE ALINHAMENTO

- [ ] as decisões confirmadas foram preservadas
- [ ] não houve invenção de requisitos não autorizados
- [ ] a estrutura visual foi organizada por telas
- [ ] os componentes principais foram listados
- [ ] o backlog foi separado do escopo atual
- [ ] a navegação foi definida como aberta e não linear
- [ ] a interface ficou consistente com o briefing

---

## 29. ANEXO O — GLOSSÁRIO DE TERMOS DO PROJETO

- RootPath: nome do projeto
- Dashboard: hub central
- Mapa de Aprendizagem: trilha visual
- Lições: conteúdo didático
- Desafios Práticos: chamados e problemas
- `|`: lição principal
- `o`: atividade de fixação
- Dark mode: modo visual principal
- Tutor IA: painel retrátil de apoio
- Terminal visual: estrutura UI, sem execução real

---

## 30. ANEXO P — NOTA FINAL PARA O DESENVOLVIMENTO

A implementação da interface deve seguir esta lógica:

1. primeiro, estruturar bem as telas e os componentes;
2. depois, aplicar o design system visual;
3. em seguida, validar consistência e navegabilidade;
4. por fim, ir expandindo para áreas complementares conforme backlog.

O foco inicial não é a lógica funcional, mas a clareza visual, a sensação de progressão, a experiência pedagógica e a identidade do produto.

---

## 31. ANEXO Q — MATRIZ DE IMPACTO DE DECISÕES

### 31.1 Decisão: Barra lateral fixa

Impacto: melhora a navegação e a familiaridade da interface.

### 31.2 Decisão: Dashboard como hub

Impacto: facilita a descoberta e o acesso rápido às áreas.

### 31.3 Decisão: Mapa com `|` e `o`

Impacto: reforça a identidade pedagógica do projeto.

### 31.4 Decisão: Chamados em caixa de entrada

Impacto: conecta a proposta ao estilo while True: learn().

### 31.5 Decisão: Tutor IA retrátil

Impacto: mantém a ajuda disponível sem ocupar espaço fixo.

### 31.6 Decisão: Sem desktop fake

Impacto: mantém a interface limpa e focada no app.

### 31.7 Decisão: Dark mode only

Impacto: reforça a identidade cyber/tech.

### 31.8 Decisão: Árvore de aprendizagem aberta

Impacto: preserva a liberdade de percurso do usuário.

---

## 32. ANEXO R — ESCOPOS DE IMPLEMENTAÇÃO POR ETAPA

### Etapa 1 — Estrutura base

- sidebar
- dashboard
- mapa
- lições
- desafios práticos

### Etapa 2 — Componentes visuais

- cards
- botões
- badges
- progressbars
- listas e estados

### Etapa 3 — Conteúdo visual complementar

- arsenal
- cheatsheet
- perfil/skill tree
- glossário

### Etapa 4 — Refinamento visual

- micro-interações
- ajustes de espaçamento
- sombras e bordas
- consistência de tipografia

### Etapa 5 — Backlog futuro

- tutor funcional
- terminal real
- lógica de persistência
- histórico e CTF

---

## 33. ANEXO S — DIRETRIZES DE MODELAÇÃO DAS TELAS

### 33.1 Norte visual

- app desktop interpretado como interface interna do produto
- composição ampla e legível
- foco em progressão
- cards com grande apelo visual

### 33.2 Norte pedagógico

- conteúdo curto e estruturado
- encadeamento visual entre lições e fixação
- caminhos visuais claros
- informação acessível

### 33.3 Norte de exploração

- permitir a escolha do usuário
- sugerir caminhos, não mandar por ordem fixa
- fomentar curiosidade e continuidade

---

## 34. ANEXO T — MATRIZ DE COMPONENTES E ESTADOS

### 34.1 Componente: Card de módulo

- estado: bloqueado
- estado: disponível
- estado: em andamento
- estado: concluído

### 34.2 Componente: Card de chamado

- estado: novo
- estado: em análise
- estado: resolvido
- estado: especial

### 34.3 Componente: Perfil

- estado: indefinido
- estado: em evolução
- estado: escolhido

### 34.4 Componente: Terminal visual

- estado: em espera
- estado: em destaque
- estado: em uso de contexto

---

## 35. ANEXO U — RESUMO DE O QUE FOI DECIDIDO E O QUE FICOU FORA

### Decidido

- interface dark mode
- visual híbrido Duolingo + cyber
- inspiração Kali/Linux, sem reprodução literal
- sidebar fixa
- dashboard como hub
- mapa com `|` e `o`
- chamados práticos
- tutor IA retrátil visual
- sem sequência linear rígida
- sem desktop fake

### Não decidido ou ainda futuro

- detalhamento pedagógico completo
- gamificação avançada
- nome definitivo do projeto
- skill tree completa
- arsenal detalhado
- tutor funcional
- lógica de persistência
- terminal real

---

## 36. ANEXO V — PROPOSTA DE IMPLEMENTAÇÃO DO PRIMEIRO BLOCO

### Primeiro bloco de trabalho

1. Sidebar fixa
2. Dashboard
3. Mapa de Aprendizagem
4. Lições
5. Desafios Práticos
6. Tutor IA retrátil visual
7. Terminal visual embutido
8. Estados gerais de progresso

### Resultado esperado

Uma interface visual inicial do RootPath com navegação clara, identidade forte e sensação de progressão, sem lógica operacional real.

---

## 37. ANEXO W — PONTOS DE CONTROLE

A cada ciclo de implementação, validar:

- estrutura visual respeitada
- cards e estados consistentes
- navegação livre
- painel retrátil do tutor presente quando necessário
- dark mode e identidade visual mantidos
- backlog separado corretamente

---

## 38. ANEXO X — FEED DE DECISÕES OPERACIONAIS

### Decisão 1

A interface não deve parecer um formulário de sequência, e sim um app livre para explorar.

### Decisão 2

O tutor IA é uma ajuda momentânea e não deve atravessar a navegação principal.

### Decisão 3

O banco visual da aplicação deve ter uma forte referência a Kali, mas uma identidade própria.

### Decisão 4

Os chamados devem ser representados como uma caixa de entrada/ticket de problemas.

### Decisão 5

O mapa de lições deve ter estrutura de `|` e `o` evidenciada.

---

## 39. ANEXO Y — DEFINIÇÃO DE OBRIGATÓRIO X COMPLEMENTAR

### Obrigatório

- Dashboard
- Mapa
- Lições
- Chamados
- Sidebar fixa
- Dark mode
- Terminal visual
- Tutor retrátil

### Complementar

- Arsenal
- Cheatsheet
- Perfil/Skill Tree
- Glossário
- Topologia
- Configurações
- Monitor de segurança

---

## 40. ANEXO Z — CONCLUSÃO FINAL DO DOCUMENTO

Este plano foi reestruturado para refletir a visão do projeto sem assumir itens não confirmados. O objetivo principal da fase atual é construir uma base visual sólida para o RootPath, com navegação clara, identidade dark cyber, cards amigáveis, mapa pedagógico de módulos e chamados práticos.

A partir desta base, os próximos passos podem evoluir com segurança para áreas mais avançadas como perfil, skill tree, arsenal, tutor IA funcional, topologia visual e backlog completo.

---
EOF
