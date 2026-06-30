
# Quickstart: Sistema de Controle de Despesas Pessoais

## Pré-requisitos

- Node.js (versão LTS)
- npm ou yarn
- Conta no Supabase

## Instalação

1. Clone o repositório:
   ```bash
   git clone &lt;url-do-repositorio&gt;
   cd Sistema_despesas-Pessoais
   ```

2. Instale as dependências:
   ```bash
   npm install
   ```

3. Configure o Supabase:
   - Crie um projeto no Supabase
   - Copie as credenciais (URL e anon key)
   - Crie o arquivo `.env.local` na raiz do projeto:
     ```env
     VITE_SUPABASE_URL=&lt;sua-url-do-supabase&gt;
     VITE_SUPABASE_ANON_KEY=&lt;sua-anon-key&gt;
     ```

4. Crie a tabela `transactions` no Supabase:
   ```sql
   CREATE TABLE transactions (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     type TEXT NOT NULL CHECK (type IN ('income', 'expense')),
     value NUMERIC(10, 2) NOT NULL CHECK (value &gt; 0),
     category TEXT NOT NULL CHECK (category IN ('Alimentação', 'Transporte', 'Moradia', 'Saúde', 'Educação', 'Lazer', 'Salário', 'Investimentos', 'Outros')),
     description TEXT,
     payment_method TEXT,
     transaction_date DATE NOT NULL,
     created_at TIMESTAMPTZ DEFAULT NOW(),
     updated_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

5. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

## Uso Básico

1. Acesse a aplicação em http://localhost:5173
2. Cadastre receitas e despesas
3. Visualize o dashboard com os indicadores
4. Consulte e filtre o histórico de transações

