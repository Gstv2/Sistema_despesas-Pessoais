import { useState } from 'react';
import FilterForm from '../features/history/FilterForm';
import TransactionList from '../features/history/TransactionList';
import { useTransactions } from '../hooks/useTransactions';
import { transactionService } from '../services/transactionService';
import ErrorMessage from '../components/ui/ErrorMessage';
import type { Transaction } from '../types/transaction';

const HistoryPage = () => {
  const { transactions, loading, error, applyFilters, refresh } = useTransactions();
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja excluir esta movimentação?')) return;
    try {
      await transactionService.delete(id);
      await refresh();
    } catch (error) {
      console.error('Error deleting transaction:', error);
    }
  };

  const handleEdit = (transaction: Transaction) => {
    setEditingTransaction(transaction);
    // Redirect to the respective page for editing
    if (transaction.type === 'income') {
      window.location.href = `/income?edit=${transaction.id}`;
    } else {
      window.location.href = `/expenses?edit=${transaction.id}`;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Histórico</h1>
      {error && <ErrorMessage message={error} />}
      <FilterForm onFilter={applyFilters} />

      {loading ? (
        <div className="text-center py-12">Carregando...</div>
      ) : (
        <TransactionList
          transactions={transactions}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default HistoryPage;
