import { supabase } from '../lib/supabase';
import type { Transaction, CreateTransaction, UpdateTransaction } from '../types/transaction';

// Mock data for development without Supabase
const mockTransactions: Transaction[] = [
  {
    id: '1',
    type: 'income',
    value: 5000,
    category: 'Salário',
    description: 'Salário mensal',
    payment_method: 'Transferência',
    transaction_date: new Date().toISOString().split('T')[0],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
  {
    id: '2',
    type: 'expense',
    value: 1200,
    category: 'Moradia',
    description: 'Aluguel apartamento',
    payment_method: 'Boleto',
    transaction_date: new Date().toISOString().split('T')[0],
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  },
];

const useMockData = !import.meta.env.VITE_SUPABASE_URL || import.meta.env.VITE_SUPABASE_URL === 'your-supabase-url';

// Função auxiliar para obter o usuário atual
const getCurrentUserId = async (): Promise<string | null> => {
  if (useMockData) return null;
  const { data } = await supabase.auth.getUser();
  return data.user?.id || null;
};

export const getAll = async (): Promise<Transaction[]> => {
  if (useMockData) {
    return mockTransactions;
  }

  const { data, error } = await supabase
    .from('transactions')
    .select('*')
    .order('transaction_date', { ascending: false });

  if (error) throw error;
  return data as Transaction[];
};

export const create = async (transaction: CreateTransaction): Promise<Transaction> => {
  if (useMockData) {
    const newTransaction: Transaction = {
      ...transaction,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    } as Transaction;
    mockTransactions.unshift(newTransaction);
    return newTransaction;
  }

  const userId = await getCurrentUserId();
  if (!userId) {
    throw new Error('Usuário não autenticado');
  }

  const { data, error } = await supabase
    .from('transactions')
    .insert([{ ...transaction, user_id: userId }])
    .select()
    .single();

  if (error) throw error;
  return data as Transaction;
};

export const update = async (id: string, transaction: UpdateTransaction): Promise<Transaction> => {
  if (useMockData) {
    const index = mockTransactions.findIndex(t => t.id === id);
    if (index !== -1) {
      mockTransactions[index] = {
        ...mockTransactions[index],
        ...transaction,
        updated_at: new Date().toISOString(),
      };
      return mockTransactions[index];
    }
    throw new Error('Transaction not found');
  }

  const { data, error } = await supabase
    .from('transactions')
    .update({ ...transaction, updated_at: new Date().toISOString() })
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data as Transaction;
};

export const deleteTransaction = async (id: string): Promise<void> => {
  if (useMockData) {
    const index = mockTransactions.findIndex(t => t.id === id);
    if (index !== -1) {
      mockTransactions.splice(index, 1);
    }
    return;
  }

  const { error } = await supabase
    .from('transactions')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// Use deleteTransaction instead of delete to avoid conflict with reserved keyword
export { deleteTransaction as delete };
