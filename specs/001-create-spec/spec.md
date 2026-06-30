
# Feature Specification: Sistema de Controle de Despesas Pessoais

**Feature Branch**: `001-create-spec`

**Created**: 2026-06-30

**Status**: Draft

**Input**: User description: Use Skill: speckit-specify # Specify.md # Especificação do Projeto ## Nome do Projeto Sistema de Controle de Despesas Pessoais --- # Visão Geral O Sistema de Controle de Despesas Pessoais tem como objetivo ajudar usuários a registrar, organizar e analisar suas finanças de forma simples e intuitiva. O sistema permitirá acompanhar receitas, despesas, categorias de gastos e fornecer indicadores financeiros para auxiliar na tomada de decisões. --- # Problema Muitas pessoas não possuem controle sobre seus gastos diários, utilizando anotações em papel, planilhas ou simplesmente confiando na memória. Isso dificulta: - acompanhar para onde o dinheiro está indo; - manter um orçamento; - identificar gastos excessivos; - planejar objetivos financeiros. O projeto busca resolver esse problema oferecendo uma plataforma centralizada para gerenciamento financeiro. --- # Público-alvo - Estudantes; - Trabalhadores; - Famílias; - Autônomos; - Qualquer pessoa que deseje controlar suas finanças pessoais. --- # Objetivos ## Objetivo Geral Desenvolver um sistema web para gerenciamento financeiro pessoal. ## Objetivos Específicos - Registrar receitas. - Registrar despesas. - Organizar movimentações por categorias. - Consultar histórico financeiro. - Calcular saldo automaticamente. - Exibir relatórios. - Gerar gráficos. - Auxiliar no acompanhamento do orçamento. --- # Funcionalidades (MVP) ## Cadastro de Receitas O usuário poderá cadastrar: - valor; - descrição; - categoria; - data; - forma de recebimento. --- ## Cadastro de Despesas O usuário poderá cadastrar: - valor; - descrição; - categoria; - data; - forma de pagamento. --- ## Categorias O sistema deverá possuir categorias como: - Alimentação - Transporte - Moradia - Saúde - Educação - Lazer - Salário - Investimentos - Outros --- ## Dashboard O sistema deverá apresentar: - saldo atual; - total de receitas; - total de despesas; - quantidade de movimentações. --- ## Histórico Permitir visualizar todas as movimentações. Filtros desejados: - período; - categoria; - tipo; - forma de pagamento. --- ## Relatórios O sistema deverá gerar: - resumo mensal; - despesas por categoria; - receitas por categoria; - evolução do saldo. --- ## Gráficos O sistema deverá possuir: - gráfico de pizza para categorias; - gráfico de barras para receitas x despesas; - gráfico de evolução mensal. --- # Requisitos Funcionais RF01 — Cadastrar receita. RF02 — Editar receita. RF03 — Excluir receita. RF04 — Cadastrar despesa. RF05 — Editar despesa. RF06 — Excluir despesa. RF07 — Consultar histórico. RF08 — Filtrar movimentações. RF09 — Calcular saldo automaticamente. RF10 — Gerar gráficos. RF11 — Gerar relatórios. --- # Requisitos Não Funcionais RNF01 — Interface simples. RNF02 — Layout responsivo. RNF03 — Tempo de resposta inferior a 2 segundos nas operações comuns. RNF04 — Código organizado conforme a Constitution. RNF05 — Arquitetura preparada para expansão. RNF06 — Dados validados antes de serem armazenados. --- # Escopo da Primeira Versão (MVP) A primeira versão deverá conter apenas: - Cadastro de receitas; - Cadastro de despesas; - Categorias; - Histórico; - Dashboard; - Saldo automático. Funcionalidades como autenticação, metas financeiras, notificações e integração bancária ficarão para versões futuras. --- # Critérios de Aceitação O sistema será considerado funcional quando o usuário conseguir: 1. Registrar receitas. 2. Registrar despesas. 3. Editar movimentações. 4. Excluir movimentações. 5. Consultar histórico. 6. Visualizar o saldo atualizado. 7. Filtrar registros. 8. Acompanhar receitas e despesas em um dashboard. --- # Fora do Escopo (Nesta Fase) - Login de usuários. - Sincronização com bancos. - Importação de extratos. - Compartilhamento de contas. - Aplicativo mobile. - Inteligência artificial para previsão de gastos. - Notificações automáticas. Essas funcionalidades poderão ser adicionadas em versões futuras. --- # Critério de Sucesso O projeto será considerado bem-sucedido quando permitir que qualquer usuário registre suas movimentações financeiras e obtenha uma visão clara de sua situação financeira por meio de uma interface simples, organizada e confiável.

## User Scenarios & Testing

### User Story 1 - Registrar Receitas e Despesas (Priority: P1)

Como usuário, quero cadastrar minhas receitas e despesas para manter o controle das minhas finanças.

**Why this priority**: Esta é a funcionalidade principal do sistema, sem ela o sistema não tem valor.

**Independent Test**: Pode ser testada completamente ao cadastrando uma receita e uma despesa e verificando se são armazenadas corretamente.

**Acceptance Scenarios**:

1. **Given** que o usuário está na tela de cadastro de receita, **When** ele preenche os dados válidos e salva, **Then** a receita é registrada com sucesso.
2. **Given** que o usuário está na tela de cadastro de despesa, **When** ele preenche os dados válidos e salva, **Then** a despesa é registrada com sucesso.
3. **Given** que o usuário tenta cadastrar uma receita com valor negativo, **When** ele tenta salvar, **Then** o sistema exibe uma mensagem de erro.

---

### User Story 2 - Visualizar Dashboard com Saldo e Resumo (Priority: P1)

Como usuário, quero ver um dashboard com saldo atual, total de receitas e despesas para ter uma visão rápida da minha situação financeira.

**Why this priority**: É essencial para o usuário entender sua situação financeira de forma rápida.

**Independent Test**: Pode ser testado ao verificar se o dashboard exibe os valores corretos após cadastrar receitas e despesas.

**Acceptance Scenarios**:

1. **Given** que o usuário tem receitas e despesas cadastradas, **When** ele acessa o dashboard, **Then** o sistema exibe o saldo atual, total de receitas e total de despesas.

---

### User Story 3 - Consultar e Filtrar Histórico (Priority: P2)

Como usuário, quero consultar o histórico de movimentações e filtrar por período, categoria e tipo para encontrar registros específicos.

**Why this priority**: Ajuda o usuário a analisar seus gastos de forma organizada.

**Independent Test**: Pode ser testado ao aplicar filtros e verificando se apenas os registros correspondentes são exibidos.

**Acceptance Scenarios**:

1. **Given** que o usuário tem movimentações cadastradas, **When** ele filtra por período, **Then** apenas as movimentações do período são exibidas.
2. **Given** que o usuário tem movimentações cadastradas, **When** ele filtra por categoria, **Then** apenas as movimentações da categoria são exibidas.

---

### Edge Cases

- O que acontece quando o usuário tenta cadastrar uma movimentação com data futura?
- Como o sistema lida com valores zero?
- O que acontece quando não há movimentações cadastradas?

## Requirements

### Functional Requirements

- **FR-001**: Sistema DEVE permitir que o usuário cadastrar receitas com valor, descrição, categoria, data e forma de recebimento.
- **FR-002**: Sistema DEVE permitir que o usuário edite receitas cadastradas.
- **FR-003**: Sistema DEVE permitir que o usuário exclua receitas cadastradas.
- **FR-004**: Sistema DEVE permitir que o usuário cadastrar despesas com valor, descrição, descrição, categoria, data e forma de pagamento.
- **FR-005**: Sistema DEVE permitir que o usuário edite despesas cadastradas.
- **FR-006**: Sistema DEVE permitir que o usuário exclua despesas cadastradas.
- **FR-007**: Sistema DEVE exibir o histórico de todas as movimentações.
- **FR-008**: Sistema DEVE permitir que o usuário filtre movimentações por período, categoria, tipo e forma de pagamento.
- **FR-009**: Sistema DEVE calcular o saldo automaticamente com base nas receitas e despesas cadastradas.
- **FR-010**: Sistema DEVE exibir um dashboard com saldo atual, total de receitas, total de despesas e quantidade de movimentações.

### Key Entities

- **Receita**: Representa uma entrada de dinheiro, com atributos: valor, descrição, categoria, data, forma de recebimento.
- **Despesa**: Representa uma saída de dinheiro, com atributos: valor, descrição, categoria, data, forma de pagamento.
- **Categoria**: Representa uma classificação para movimentações, com atributos: nome.
- **Movimentação**: Representa uma transação financeira (receita ou despesa), com atributos: tipo, valor, descrição, categoria, data, forma de pagamento/recebimento.

## Success Criteria

### Measurable Outcomes

- **SC-001**: O usuário consegue cadastrar uma receita ou despesa em menos de 30 segundos.
- **SC-002**: O dashboard exibe os valores atualizados em menos de 2 segundos após cadastrar uma movimentação.
- **SC-003**: 90% dos usuários conseguem consultar e filtrar o histórico de movimentações com sucesso na primeira tentativa.
- **SC-004**: O sistema calcula o saldo automaticamente e sem erros em 100% dos casos.

## Assumptions

- O usuário tem acesso a um navegador web e conexão com a internet.
- O sistema armazena os dados de forma segura.
- As categorias padrão são suficientes para a maioria dos usuários.
- Não há autenticação de usuários nesta fase.

