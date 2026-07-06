
# Quickstart: Sistema de Autenticação

## Pré-requisitos
- Projeto Supabase já configurado (com URL e anon key no .env)
- Supabase Auth ativado no painel do Supabase
- Políticas RLS já configuradas na tabela `transactions`

## Configuração
1. Verificar se as variáveis de ambiente `VITE_SUPABASE_URL` e `VITE_SUPABASE_ANON_KEY` estão definidas no arquivo `.env`
2. No painel do Supabase, habilitar o provedor de autenticação "Email"
3. (Opcional) Configurar o template de email para recuperação de senha no painel do Supabase

## Uso
### Fluxo de Cadastro
1. Acessar a página de cadastro (`/signup`)
2. Preencher nome, email e senha
3. Confirmar a senha
4. Submeter o formulário → conta criada e usuário redirecionado para o dashboard

### Fluxo de Login
1. Acessar a página de login (`/login`)
2. Preencher email e senha
3. Submeter o formulário → login realizado e usuário redirecionado para o dashboard

### Fluxo de Logout
1. Clicar no botão "Sair" na barra de navegação
2. Sessão encerrada e usuário redirecionado para a página de login

### Fluxo de Recuperação de Senha
1. Acessar a página de recuperação de senha (`/forgot-password`)
2. Preencher o email cadastrado
3. Submeter o formulário → email com link de redefinição enviado
4. Acessar o link no email → definir nova senha

