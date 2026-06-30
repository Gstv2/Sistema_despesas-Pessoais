import { supabase } from '../lib/supabase';
import type {
  Transaction,
  CreateTransaction,
  UpdateTransaction,
} from '../types/transaction';

export const transactionService = {
  async getAll(): Promise<Transaction[]> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .order('transaction_date', { ascending: false });

    if (error) throw error;

    return data?.map(
      (item) =>
        ({
          ...item,
          transaction_date: new Date(item.transaction_date),
          created_at: new Date(item.created_at),
          updated_at: new Date(item.updated_at),
        } as Transaction)
    );
  },

  async getById(id: string): Promise<Transaction> {
    const { data, error } = await supabase
      .from('transactions')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;

    return {
      ...data,
      transaction_date: new Date(data.transaction_date),
      created_at: new Date(data.created_at),
      updated_at: new Date(data.updated_at),
    } as Transaction;
  },

  async create(transaction: CreateTransaction): Promise<Transaction> {
    const { data, error } = await supabase
      .from('transactions')
      .insert(transaction)
      .select('*')
      .single();

    if (error) throw error;

    return {
      ...data,
      transaction_date: new Date(data.transaction_date),
      created_at: new Date(data.created_at),
      updated_at: new Date(data.updated_at),
    } as Transaction;
  },

  async update(id: string, transaction: UpdateTransaction): Promise<Transaction> {
    const { data, error } = await supabase
      .from('transactions')
      .update(transaction)
      .eq('id', id)
      .select('*')
      .single();

    if (error) throw error;

    return {
      ...data,
      transaction_date: new Date(data.transaction_date),
      created_at: new Date(data.created_at),
      updated_at: new Date(data.updated_at),
    } as Transaction;
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },
};
