
# Research: Sistema de Controle de Despesas Pessoais

## Decisões Tecnológicas

### Front-end: React + Vite + TypeScript + Tailwind CSS

**Decision**: Utilizar React com Vite como build tool, TypeScript para tipagem e Tailwind CSS para estilos.

**Rationale**: Vite oferece inicialização rápida, HMR performante e configuração minimalista. TypeScript garante segurança de tipo e melhor manutenção. Tailwind CSS permite estilização rápida e responsiva com classes utilitárias, alinhando-se com o princípio de simplicidade.

**Alternatives considered**:
- Next.js: Desnecessário para MVP sem SSR.
- Create React App: Mais lento que Vite.
- SASS/SCSS: Mais verboso que Tailwind CSS.

### Backend (BaaS): Supabase

**Decision**: Utilizar Supabase como backend-as-a-service com PostgreSQL.

**Rationale**: Supabase oferece banco de dados PostgreSQL, autenticação (para versões futuras), RLS (Row Level Security) e cliente JavaScript fácil de usar, alinhando-se com os requisitos de simplicidade e segurança.

**Alternatives considered**:
- Firebase: Supabase é open source e usa PostgreSQL, mais familiar para muitos desenvolvedores.
- Node.js + Express: Mais trabalho para configurar do que um BaaS para MVP.

### Gerenciamento de Estado: React Hooks → Context API → Zustand

**Decision**: Iniciar com React Hooks, evoluir para Context API se necessário e Zustand futuramente.

**Rationale**: Evita over-engineering no MVP. React Hooks são suficientes para estado local, Context API pode ser usado para estado global simples e Zustand para estado mais complexo, alinhando-se com o princípio de simplicidade.

**Alternatives considered**:
- Redux: Muito boilerplate para MVP.
- Jotai: Semelhante a Zustand, mas Zustand tem maior adoção.

### Validação: Zod

**Decision**: Utilizar Zod para validação de dados.

**Rationale**: Zod é uma biblioteca de validação de schema TypeScript-first, integra-se bem com React Hook Form e garante dados confiáveis, alinhando-se com o princípio de dados confiáveis.

**Alternatives considered**:
- Yup: Menos integração nativa com TypeScript.
- Validação manual: Mais propenso a erros.

### Formulários: React Hook Form

**Decision**: Utilizar React Hook Form para gerenciamento de formulários.

**Rationale**: React Hook Form é performante, fácil de usar e integra-se bem com Zod, alinhando-se com o princípio de simplicidade.

**Alternatives considered**:
- Formik: Mais verbose que React Hook Form.
- Formulários nativos: Menos funcionalidades.

### Gráficos: Recharts

**Decision**: Utilizar Recharts para gráficos.

**Rationale**: Recharts é uma biblioteca de gráficos para React, fácil de usar e customizável, alinhando-se com o princípio de simplicidade.

**Alternatives considered**:
- Chart.js: Recharts é mais integrado com React.
- D3.js: Muito complexo para MVP.

### Ícones: Lucide React

**Decision**: Utilizar Lucide React para ícones.

**Rationale**: Lucide React oferece ícones bonitos, consistentes e de fácil uso, alinhando-se com o princípio de simplicidade.

**Alternatives considered**:
- React Icons: Mais opções, mas Lucide tem estilo mais consistente.
- Ícones customizados: Mais trabalho para criar.

