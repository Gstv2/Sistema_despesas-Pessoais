import { useSearchParams, useNavigate } from 'react-router-dom';
import ExpenseForm from '../features/expenses/ExpenseForm';
import ExpenseList from '../features/expenses/ExpenseList';
import { useTransactions } from '../hooks/useTransactions';
import * as transactionService from '../services/transactionService';
import type { CreateTransaction, Transaction } from '../types/transaction';
import { ErrorMessage } from '../components/ui/ErrorMessage';

const ExpensePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { transactions, loading, error, refresh } = useTransactions();
  
  const editId = searchParams.get('edit');
  const expenseTransactions = transactions.filter(t => t.type === 'expense');
  const editingTransaction = editId 
    ? transactions.find(t => t.id === editId) 
    : undefined;

  const handleSuccess = async (data: CreateTransaction) => {
    try {
      if (editId && editingTransaction) {
        await transactionService.update(editId, { ...data, type: 'expense' });
      } else {
        await transactionService.create({ ...data, type: 'expense' });
      }
      await refresh();
      navigate('/expenses');
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (transaction: Transaction) => {
    navigate(`/expenses?edit=${transaction.id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente excluir essa despesa?')) return;
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
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Despesas</h1>
        <p className="text-slate-500">Gerencie suas despesas pessoais</p>
      </div>
      
      <ExpenseForm onSuccess={handleSuccess} initialData={editingTransaction} />
      <ExpenseList
        expenses={expenseTransactions}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default ExpensePage;
