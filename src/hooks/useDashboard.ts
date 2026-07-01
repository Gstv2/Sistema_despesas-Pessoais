import type { Transaction } from '../types/transaction';

export const useDashboard = (transactions: Transaction[]) => {
  const totalIncome = transactions
    .filter(t => t.type === 'income')
    .reduce((sum, t) => sum + t.value, 0);

  const totalExpenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((sum, t) => sum + t.value, 0);

  const totalTransactions = transactions.length;

  return {
    totalIncome,
    totalExpenses,
    totalTransactions,
  };
};
