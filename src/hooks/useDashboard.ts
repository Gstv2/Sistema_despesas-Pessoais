import { useState, useEffect } from 'react';
import { transactionService } from '../services/transactionService';
import type { Transaction } from '../types/transaction';

export const useDashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      setError(null);
      const data = await transactionService.getAll();
      setTransactions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao carregar as movimentações');
      console.error('Error loading transactions:', err);
    } finally {
      setLoading(false);
    }
  };

  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.value, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.value, 0);

  return {
    transactions,
    totalIncome,
    totalExpenses,
    totalTransactions: transactions.length,
    loading,
    error,
    refresh: loadTransactions,
  };
};
