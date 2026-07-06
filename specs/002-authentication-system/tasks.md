
# Tasks: Sistema de Autenticação

**Input**: Design documents from `specs/002-authentication-system/`

**Prerequisites**: plan.md (required), spec.md (required), research.md, data-model.md, quickstart.md

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

**Purpose**: Feature structure initialization and base files

- [X] T001 Create auth feature directory structure (src/features/auth/components, src/features/auth/hooks, src/features/auth/pages, src/features/auth/services, src/features/auth/validators)
- [X] T002 [P] Create auth types in src/types/auth.ts

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Core auth infrastructure that MUST be complete before ANY user story can be implemented

**⚠️ CRITICAL**: No user story work can begin until this phase is complete

- [X] T003 Create Zod validation schemas for auth forms (signup, login, forgot-password) in src/features/auth/validators/authValidators.ts
- [X] T004 [P] Create auth service (encapsulating Supabase Auth calls) in src/features/auth/services/authService.ts
- [X] T005 Create useAuth hook (managing user session, login, logout, password reset) in src/features/auth/hooks/useAuth.ts
- [X] T006 Create AuthContext provider to wrap the app in src/features/auth/hooks/AuthContext.tsx
- [X] T007 Create ProtectedRoute component for route protection in src/features/auth/components/ProtectedRoute.tsx

**Checkpoint**: Foundation ready - user story implementation can now begin in parallel

---

## Phase 3: User Story 1 - Criar Conta (Priority: P1) 🎯 MVP

**Goal**: Permitir ao usuário criar uma conta com nome, email e senha

**Independent Test**: Pode ser testado completamente ao acessar a página de cadastro, preencher os dados e verificar se a conta é criada e o usuário é redirecionado para o dashboard

### Implementation for User Story 1

- [X] T008 [P] [US1] Create SignUp page in src/features/auth/pages/SignUpPage.tsx
- [X] T009 [P] [US1] Create SignUp form component in src/features/auth/components/SignUpForm.tsx
- [X] T010 [US1] Add SignUp route to src/routes/index.tsx
- [X] T011 [US1] Add validation using Zod and React Hook Form to SignUpForm
- [X] T012 [US1] Integrate SignUpForm with authService and useAuth
- [X] T013 [US1] Add error handling and success messages to SignUpPage

**Checkpoint**: At this point, User Story 1 should be fully functional and testable independently

---

## Phase 4: User Story 2 - Fazer Login (Priority: P1)

**Goal**: Permitir ao usuário fazer login com email e senha

**Independent Test**: Pode ser testado ao acessar a página de login, inserir credenciais válidas e verificar acesso às páginas protegidas

### Implementation for User Story 2

- [X] T014 [P] [US2] Create Login page in src/features/auth/pages/LoginPage.tsx
- [X] T015 [P] [US2] Create Login form component in src/features/auth/components/LoginForm.tsx
- [X] T016 [US2] Add Login route to src/routes/index.tsx (as default route for unauthenticated users)
- [X] T017 [US2] Add validation using Zod and React Hook Form to LoginForm
- [X] T018 [US2] Integrate LoginForm with authService and useAuth
- [X] T019 [US2] Add error handling and success messages to LoginPage

**Checkpoint**: At this point, User Stories 1 AND 2 should both work independently

---

## Phase 5: User Story 3 - Manter Sessão Autenticada (Priority: P1)

**Goal**: Permitir que o usuário permaneça logado após atualizar a página ou fechar o navegador

**Independent Test**: Pode ser testado ao fazer login, atualizar a página e verificar que o usuário permanece autenticado

### Implementation for User Story 3

- [X] T020 [P] [US3] Update useAuth hook to initialize session from Supabase on app load
- [X] T021 [US3] Add loading state to AuthContext while initializing session
- [X] T022 [US3] Update ProtectedRoute to handle loading state
- [X] T023 [US3] Wrap entire app with AuthContext in src/App.tsx

**Checkpoint**: All user stories should now be independently functional

---

## Phase 6: User Story 4 - Fazer Logout (Priority: P2)

**Goal**: Permitir ao usuário encerrar sua sessão

**Independent Test**: Pode ser testado ao clicar no botão de logout e verificar que o usuário é redirecionado para a página de login

### Implementation for User Story 4

- [X] T024 [P] [US4] Add logout button to Navbar component in src/components/layout/Navbar.tsx
- [X] T025 [US4] Integrate logout button with useAuth hook
- [X] T026 [US4] Add confirmation dialog for logout (optional but recommended)
- [X] T027 [US4] Verify that after logout, user cannot access protected routes

---

## Phase 7: User Story 5 - Recuperar Senha (Priority: P2)

**Goal**: Permitir ao usuário solicitar redefinição de senha via email

**Independent Test**: Pode ser testado ao acessar a página de recuperação de senha, inserir email e verificar que um link é enviado

### Implementation for User Story 5

- [X] T028 [P] [US5] Create ForgotPassword page in src/features/auth/pages/ForgotPasswordPage.tsx
- [X] T029 [P] [US5] Create ForgotPassword form component in src/features/auth/components/ForgotPasswordForm.tsx
- [X] T030 [US5] Add ForgotPassword route to src/routes/index.tsx
- [X] T031 [US5] Add validation using Zod and React Hook Form to ForgotPasswordForm
- [X] T032 [US5] Integrate ForgotPasswordForm with authService
- [X] T033 [US5] Add success message after password reset request is sent

---

## Phase 8: Polish &amp; Cross-Cutting Concerns

**Purpose**: Improvements that affect multiple user stories

- [X] T034 [P] Add responsive design to all auth pages and components
- [X] T035 [P] Update existing pages (Dashboard, Income, Expense, History, Reports) to use ProtectedRoute
- [X] T036 [P] Add loading states to all auth operations
- [X] T037 [P] Add consistent error handling to all auth pages
- [X] T038 Update Navbar to display authenticated user's name/email
- [X] T039 Run quickstart.md validation
- [X] T040 Code cleanup and refactoring
- [X] T041 Verify RLS policies on transactions table are correctly restricting access by user_id

---

## Dependencies &amp; Execution Order

### Phase Dependencies

- **Setup (Phase 1)**: No dependencies - can start immediately
- **Foundational (Phase 2)**: Depends on Setup completion - BLOCKS all user stories
- **User Stories (Phase 3+)**: All depend on Foundational phase completion
  - User stories can then proceed in parallel (if staffed)
  - Or sequentially in priority order (P1 → P2 → P3)
- **Polish (Final Phase)**: Depends on all desired user stories being complete

### User Story Dependencies

- **User Story 1 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 2 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 3 (P1)**: Can start after Foundational (Phase 2) - No dependencies on other stories
- **User Story 4 (P2)**: Can start after Foundational (Phase 2) - Depends on US2 (login)
- **User Story 5 (P2)**: Can start after Foundational (Phase 2) - No dependencies on other stories

### Within Each User Story

- Types and validators before components
- Components before pages
- Core implementation before integration
- Story complete before moving to next priority

### Parallel Opportunities

- All Setup tasks marked [P] can run in parallel
- All Foundational tasks marked [P] can run in parallel (within Phase 2)
- Once Foundational phase completes, User Stories 1, 2, 3 can start in parallel (if team capacity allows)
- User Stories 4 and 5 can start after Foundational, but US4 should wait for US2 to complete
- Different user stories can be worked on in parallel by different team members

---

## Parallel Example: User Stories 1 &amp; 2

```bash
# Launch all tasks for User Stories 1 &amp; 2 together after Foundational phase:
Task: "Create SignUp page in src/features/auth/pages/SignUpPage.tsx"
Task: "Create SignUp form component in src/features/auth/components/SignUpForm.tsx"
Task: "Create Login page in src/features/auth/pages/LoginPage.tsx"
Task: "Create Login form component in src/features/auth/components/LoginForm.tsx"
```

---

## Implementation Strategy

### MVP First (User Stories 1, 2, 3 Only)

1. Complete Phase 1: Setup
2. Complete Phase 2: Foundational (CRITICAL - blocks all stories)
3. Complete Phase 3: User Story 1
4. Complete Phase 4: User Story 2
5. Complete Phase 5: User Story 3
6. **STOP and VALIDATE**: Test User Stories 1, 2, 3 independently
7. Deploy/demo if ready (MVP!)

### Incremental Delivery

1. Complete Setup + Foundational → Foundation ready
2. Add User Story 1 → Test independently → Deploy/Demo
3. Add User Story 2 → Test independently → Deploy/Demo
4. Add User Story 3 → Test independently → Deploy/Demo
5. Add User Story 4 → Test independently → Deploy/Demo
6. Add User Story 5 → Test independently → Deploy/Demo
7. Each story adds value without breaking previous stories

### Parallel Team Strategy

With multiple developers:
1. Team completes Setup + Foundational together
2. Once Foundational is done:
   - Developer A: User Story 1
   - Developer B: User Story 2
   - Developer C: User Story 3
3. User Stories 4 and 5 can start after Foundational is complete
4. Stories complete and integrate independently

---

## Notes

- [P] tasks = different files, no dependencies
- [Story] label maps task to specific user story for traceability
- Each user story should be independently completable and testable
- Commit after each task or logical group
- Stop at any checkpoint to validate story independently
- Avoid: vague tasks, same file conflicts, cross-story dependencies that break independence
