
# Research: Sistema de Autenticação

## Decision 1: Utilizar @supabase/supabase-js para autenticação

**Rationale**: O projeto já utiliza @supabase/supabase-js como cliente para integração com o Supabase (incluindo operações no banco de dados). Reutilizar a mesma biblioteca para autenticação evita dependências adicionais, mantém a consistência do código e aproveita a integração nativa com o Supabase Auth.

**Alternativas Consideradas**:
- Implementar autenticação customizada com JWT: Requeriria muito mais código, manutenção e gerenciamento de tokens manualmente, violando o princípio da simplicidade.
- Utilizar outra biblioteca de autenticação (ex.: Firebase Auth): Não faz sentido, já que o projeto já usa o Supabase como BaaS.

## Decision 2: Gerenciamento de sessão com hook useAuth

**Rationale**: Criar um hook customizado `useAuth` encapsula toda a lógica de autenticação (login, logout, estado do usuário, recuperação de senha, verificação de sessão) em um único local, seguindo o princípio da responsabilidade única e facilitando a reutilização em toda a aplicação.

**Alternativas Consideradas**:
- Gerenciar estado diretamente em componentes: Violaria DRY e dificultaria a manutenção.
- Usar Context API diretamente sem hook: Menos legível e mais verboso.

## Decision 3: Proteção de rotas com componente ProtectedRoute

**Rationale**: Criar um componente de alta ordem `ProtectedRoute` (ou um wrapper) que verifica se o usuário está autenticado antes de renderizar a página protegida, redirecionando para a página de login caso contrário. Essa é uma abordagem padrão no ecossistema React Router DOM.

**Alternativas Consideradas**:
- Verificar autenticação em cada página: Duplicaria código e violaria DRY.

## Decision 4: Persistência de sessão padrão do Supabase

**Rationale**: O Supabase Auth já implementa persistência de sessão nativamente (utilizando localStorage ou IndexedDB) por padrão, com duração configurável no painel do Supabase (recomendado: 7 dias). Isso evita a necessidade de implementar persistência customizada.

**Alternativas Consideradas**:
- Persistência customizada com localStorage: Não necessário, já que o Supabase já oferece essa funcionalidade.

## Decision 5: Validação de formulários com Zod + React Hook Form

**Rationale**: O projeto já utiliza Zod e React Hook Form para validação de outros formulários (despesas, receitas). Reutilizar a mesma stack garante consistência e evita a introdução de novas dependências.

**Alternativas Consideradas**:
- Validação manual: Mais propensa a erros, menos legível.
- Outras bibliotecas (ex.: Formik): Não necessárias, já que o projeto já usa React Hook Form + Zod.

