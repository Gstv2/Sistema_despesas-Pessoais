import { useState, useEffect } from 'react';
import { transactionService } from '../services/transactionService';
import type { Transaction } from '../types/transaction';

interface FilterOptions {
  startDate: string;
  endDate: string;
  category: string;
  type: string;
  paymentMethod: string;
}

export const useTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadTransactions();
  }, []);

  useEffect(() => {
    setFilteredTransactions(transactions);
  }, [transactions]);

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

  const applyFilters = (filters: FilterOptions) => {
    let filtered = [...transactions];

    if (filters.startDate) {
      const startDate = new Date(filters.startDate);
      filtered = filtered.filter(t => new Date(t.transaction_date) >= startDate);
    }

    if (filters.endDate) {
      const endDate = new Date(filters.endDate);
      filtered = filtered.filter(t => new Date(t.transaction_date) <= endDate);
    }

    if (filters.category) {
      filtered = filtered.filter(t => t.category === filters.category);
    }

    if (filters.type) {
      filtered = filtered.filter(t => t.type === filters.type);
    }

    if (filters.paymentMethod) {
      filtered = filtered.filter(t =>
        t.payment_method?.toLowerCase().includes(filters.paymentMethod.toLowerCase())
      );
    }

    setFilteredTransactions(filtered);
  };

  return {
    transactions: filteredTransactions,
    loading,
    error,
    applyFilters,
    refresh: loadTransactions,
  };
};
