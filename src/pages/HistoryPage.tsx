import { useNavigate } from 'react-router-dom';
import FilterForm from '../features/history/FilterForm';
import TransactionList from '../features/history/TransactionList';
import { useTransactions } from '../hooks/useTransactions';
import * as transactionService from '../services/transactionService';
import type { Transaction } from '../types/transaction';
import { ErrorMessage } from '../components/ui/ErrorMessage';

const HistoryPage = () => {
  const navigate = useNavigate();
  const { transactions, loading, error, applyFilters, refresh } = useTransactions();

  const handleClear = () => {
    applyFilters({});
  };

  const handleEdit = (transaction: Transaction) => {
    if (transaction.type === 'income') {
      navigate(`/income?edit=${transaction.id}`);
    } else {
      navigate(`/expenses?edit=${transaction.id}`);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente excluir esta transação?')) return;
    try {
      await transactionService.delete(id);
      await refresh();
    } catch (err) {
      console.error(err);
    }
  };

  if (error) {
    return (
      <div className="p-4 md:p-8">
        <ErrorMessage message={error} onRetry={refresh} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Histórico</h1>
        <p className="text-slate-500">Veja e filtre suas transações</p>
      </div>
      
      <FilterForm onFilter={applyFilters} onClear={handleClear} />
      <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
        <h3 className="text-xl font-bold text-slate-800 mb-6">Transações</h3>
        <TransactionList
          transactions={transactions}
          loading={loading}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
};

export default HistoryPage;
