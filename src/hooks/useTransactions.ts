import { useState, useEffect } from 'react';
import type { Transaction } from '../types/transaction';
import type { FilterOptions } from '../features/history/TransactionList';
import * as transactionService from '../services/transactionService';

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<FilterOptions>({});

  const loadTransactions = async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await transactionService.getAll();
      setTransactions(data);
    } catch (err) {
      setError('Erro ao carregar transações');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  const applyFilters = (newFilters: FilterOptions) => {
    setFilters(newFilters);
  };

  const filteredTransactions = transactions.filter(transaction => {
    if (filters.type && transaction.type !== filters.type) return false;
    if (filters.category && transaction.category !== filters.category) return false;
    if (filters.startDate && new Date(transaction.transaction_date) < new Date(filters.startDate)) return false;
    if (filters.endDate && new Date(transaction.transaction_date) > new Date(filters.endDate)) return false;
    if (filters.payment_method && !transaction.payment_method?.includes(filters.payment_method)) return false;
    return true;
  });

  return {
    transactions: filteredTransactions,
    loading,
    error,
    applyFilters,
    refresh: loadTransactions,
  };
};
