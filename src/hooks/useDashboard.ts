import { useState, useEffect } from 'react';
import { transactionService } from '../services/transactionService';
import type { Transaction } from '../types/transaction';

export const useDashboard = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTransactions();
  }, []);

  const loadTransactions = async () => {
    try {
      const data = await transactionService.getAll();
      setTransactions(data);
    } catch (error) {
      console.error('Error loading transactions:', error);
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
    refresh: loadTransactions,
  };
};
