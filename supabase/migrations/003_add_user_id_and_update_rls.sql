
-- 003_add_user_id_and_update_rls.sql
-- Adiciona coluna user_id à tabela transactions e atualiza políticas RLS

-- 1. Adiciona coluna user_id (UUID) à tabela transactions
ALTER TABLE transactions
ADD COLUMN user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE;

-- 2. Cria índice para user_id para melhorar desempenho
CREATE INDEX idx_transactions_user_id ON transactions(user_id);

-- 3. Remove políticas antigas
DROP POLICY IF EXISTS "Enable read access for all users" ON transactions;
DROP POLICY IF EXISTS "Enable insert access for all users" ON transactions;
DROP POLICY IF EXISTS "Enable update access for all users" ON transactions;
DROP POLICY IF EXISTS "Enable delete access for all users" ON transactions;

-- 4. Cria novas políticas RLS que restringem acesso por usuário
CREATE POLICY "Users can view their own transactions" ON transactions
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own transactions" ON transactions
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own transactions" ON transactions
    FOR UPDATE USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own transactions" ON transactions
    FOR DELETE USING (auth.uid() = user_id);
