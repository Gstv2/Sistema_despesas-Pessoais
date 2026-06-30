
# Tasks: Sistema de Controle de Despesas Pessoais

**Input**: Design documents from `specs/001-create-spec/`

**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, contracts/transactions.md, quickstart.md

**Tests**: Tests are OPTIONAL for the first version (per plan.md)

**Organization**: Tasks are grouped by user story to enable independent implementation and testing of each story.

## Format: `[ID] [P?] [Story] Description`

- **[P]**: Can run in parallel (different files, no dependencies)
- **[Story]**: Which user story this task belongs to (e.g., US1, US2, US3)
- Include exact file paths in descriptions

## Path Conventions

- **Single project**: `src/` at repository root
- Paths shown below follow plan.md structure

---

## Phase 1: Setup (Shared Infrastructure)

**Purpose**: Project initialization and basic structure

- [ ] T001 Configure project dependencies (install React, Vite, TypeScript, Tailwind CSS, React Router DOM, Zod, React Hook Form, Supabase, Recharts, Lucide React)
- [ ] T002 [P] Initialize project structure (create src/assets, src/components, src/features, src/hooks, src/lib, src/pages, src/routes, src/services, src/types, src/utils directories)
- [ ] T003 [P] Configure Tailwind CSS in vite.config.ts and index.css
- [ ] T004 [P] Create .env.local with Supabase URL and anon key
- [ ] T005 [P] Configure ESLint and Prettier
- [ ] T006 [P] Initialize Supabase client in src/lib/supabase.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [ ] T007 Create Transaction types in src/types/transaction.ts
- [ ] T008 [P] Create Zod schema for Transaction validation in src/lib/validators.ts
- [ ] T009 [P] Create Supabase service for Transaction CRUD in src/services/transactionService.ts
- [ ] T010 Create basic layout components (Navbar, Sidebar) in src/components/layout/
- [ ] T011 Configure React Router DOM routes in src/routes/index.tsx
- [ ] T012 Create utility functions (currency formatter, date formatter) in src/utils/

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Registrar Receitas e Despesas (Priority: P1) 🎯 MVP

**Goal**: Permitir ao usuário cadastrar, editar e excluir receitas e despesas

**Independent Test**: Pode ser testado completamente ao cadastrar uma receita e uma despesa e verificar se são armazenadas e exibidas corretamente

### Implementation for User Story 1

- [ ] T013 [P] [US1] Create Income feature components (IncomeForm, IncomeList) in src/features/income/
- [ ] T014 [P] [US1] Create Expense feature components (ExpenseForm, ExpenseList) in src/features/expenses/
- [ ] T015 [P] [US1] Create Income page in src/pages/IncomePage.tsx
- [ ] T016 [P] [US1] Create Expense page in src/pages/ExpensePage.tsx
- [ ] T017 [US1] Integrate Income and Expense pages with routes in src/routes/index.tsx
- [ ] T018 [US1] Add validation using Zod and React Hook Form to forms
- [ ] T019 [US1] Implement create, edit, and delete functionality using transactionService

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Visualizar Dashboard com Saldo e Resumo (Priority: P1)

**Goal**: Permitir ao usuário ver um dashboard com saldo atual, total de receitas, total de despesas e quantidade de movimentações

**Independent Test**: Pode ser testado ao verificar se o dashboard exibe os valores corretos após cadastrar receitas e despesas

### Implementation for User Story 2

- [ ] T020 [P] [US2] Create Dashboard feature components (SummaryCards) in src/features/dashboard/
- [ ] T021 [P] [US2] Create Dashboard page in src/pages/DashboardPage.tsx
- [ ] T022 [US2] Integrate Dashboard page with routes in src/routes/index.tsx
- [ ] T023 [US2] Implement calculation of total income, total expenses, and balance in src/hooks/useDashboard.ts
- [ ] T024 [US2] Display SummaryCards on DashboardPage with calculated values

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Consultar e Filtrar Histórico (Priority: P2)

**Goal**: Permitir ao usuário consultar o histórico de movimentações e filtrar por período, categoria, tipo e forma de pagamento

**Independent Test**: Pode ser testado ao aplicar filtros e verificando se apenas as movimentações correspondentes são exibidas

### Implementation for User Story 3

- [ ] T025 [P] [US3] Create History feature components (TransactionList, FilterForm) in src/features/history/
- [ ] T026 [P] [US3] Create History page in src/pages/HistoryPage.tsx
- [ ] T027 [US3] Integrate History page with routes in src/routes/index.tsx
- [ ] T028 [US3] Implement filtering logic in src/hooks/useTransactions.ts
- [ ] T029 [US3] Add FilterForm to HistoryPage and connect to filtering logic

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - Visualizar Gráficos (Priority: P3)

**Goal**: Permitir ao usuário visualizar gráficos de despesas por categoria, receitas vs despesas e evolução mensal

**Independent Test**: Pode ser testado ao cadastrar movimentações e verificar se os gráficos são exibidos corretamente

### Implementation for User Story 4

- [ ] T030 [P] [US4] Create Reports feature components (CategoryPieChart, IncomeExpenseBarChart, MonthlyEvolutionChart) in src/features/reports/
- [ ] T031 [P] [US4] Create Reports page in src/pages/ReportsPage.tsx
- [ ] T032 [US4] Integrate Reports page with routes in src/routes/index.tsx
- [ ] T033 [US4] Implement data preparation for charts in src/hooks/useReports.ts
- [ ] T034 [US4] Display charts on ReportsPage using Recharts

---

## Phase 7: Polish & Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [ ] T035 [P] Add responsive design to all pages and components
- [ ] T036 Add loading states to async operations
- [ ] T037 [P] Add error handling to all pages and components
- [ ] T038 [P] Update App.tsx to use layout components
- [ ] T039 Run quickstart.md validation
- [ ] T040 Code cleanup and refactoring

---

## Dependencies & Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - May use transactionService from US1 but should be independently testable
- **User Story 3 (P2)**: Can start after Foundational (Phase 2) - May use transactionService from US1 but should be independently testable
- **User Story 4 (P3)**: Can start after Foundational (Phase 2) - May use transactionService from US1 but should be independently testable

### Within Each User Story

- Types and validators before components
- Components before pages
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, all user stories can start in parallel (if team capacity allows)
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Story 1

```bash
# Launch all components for User Story 1 together:
Task: "Create Income feature components (IncomeForm, IncomeList) in src/features/income/"
Task: "Create Expense feature components (ExpenseForm, ExpenseList) in src/features/expenses/"
Task: "Create Income page in src/pages/IncomePage.tsx"
Task: "Create Expense page in src/pages/ExpensePage.tsx"
```

---

## Implementation Strategy

### MVP First (User Story 1 and 2 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. Complete Phase 4: User Story 2
5. **STOP and VALIDATE**: Test User Stories 1 and 2 independently
6. Deploy/demo if ready (MVP!)

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:

1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
   - Developer D: User Story 4
3. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence

