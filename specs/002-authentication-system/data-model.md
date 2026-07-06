
# Data Model: Sistema de Autenticação

## Entidades

### Usuário (Supabase Auth)
A entidade de usuário é gerenciada diretamente pelo Supabase Auth, sem necessidade de tabela customizada.

**Atributos (disponíveis via Supabase Auth)**:
- `id`: UUID único do usuário (gerado pelo Supabase)
- `email`: Email do usuário (único, validado)
- `email_confirmed_at`: Data de confirmação do email
- `created_at`: Data de criação da conta
- `last_sign_in_at`: Data do último login
- `user_metadata`: Metadados do usuário (incluindo `name` para o nome completo)

### Sessão (Supabase Auth)
A sessão é gerenciada nativamente pelo Supabase Auth, com tokens JWT (access_token e refresh_token) armazenados de forma segura.

## Relações com outras entidades

### Transações (tabela existente)
A tabela `transactions` (já existente) possui uma coluna `user_id` que referencia o `id` do usuário no Supabase Auth. As políticas RLS (Row Level Security) já estão configuradas para garantir que cada usuário visualize apenas suas próprias transações.

**Colunas relevantes em transactions**:
- `user_id`: UUID, referência para `auth.users.id`
- RLS: Políticas de SELECT, INSERT, UPDATE, DELETE restritas ao usuário autenticado

## Validações
- **Cadastro**: Nome (obrigatório), email (formato válido, único), senha (mínimo 6 caracteres, confirmação de senha)
- **Login**: Email (formato válido), senha (obrigatória)
- **Recuperação de senha**: Email (formato válido, existente no sistema)

