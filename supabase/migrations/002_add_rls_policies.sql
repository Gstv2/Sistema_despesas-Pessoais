-- 002_add_rls_policies.sql
-- Políticas de Row Level Security para a tabela de transações

-- Política para permitir a leitura de todas as transações (ajuste conforme necessidade)
CREATE POLICY "Enable read access for all users" ON transactions
    FOR SELECT USING (true);

-- Política para permitir a criação de transações
CREATE POLICY "Enable insert access for all users" ON transactions
    FOR INSERT WITH CHECK (true);

-- Política para permitir a atualização de transações
CREATE POLICY "Enable update access for all users" ON transactions
    FOR UPDATE USING (true) WITH CHECK (true);

-- Política para permitir a exclusão de transações
CREATE POLICY "Enable delete access for all users" ON transactions
    FOR DELETE USING (true);
