import { useSearchParams, useNavigate } from 'react-router-dom';
import IncomeForm from '../features/income/IncomeForm';
import IncomeList from '../features/income/IncomeList';
import { useTransactions } from '../hooks/useTransactions';
import * as transactionService from '../services/transactionService';
import type { CreateTransaction, Transaction } from '../types/transaction';
import { ErrorMessage } from '../components/ui/ErrorMessage';

const IncomePage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { transactions, loading, error, refresh } = useTransactions();
  
  const editId = searchParams.get('edit');
  const incomeTransactions = transactions.filter(t => t.type === 'income');
  const editingTransaction = editId 
    ? transactions.find(t => t.id === editId) 
    : undefined;

  const handleSuccess = async (data: CreateTransaction) => {
    try {
      if (editId && editingTransaction) {
        await transactionService.update(editId, { ...data, type: 'income' });
      } else {
        await transactionService.create({ ...data, type: 'income' });
      }
      await refresh();
      navigate('/income');
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (transaction: Transaction) => {
    navigate(`/income?edit=${transaction.id}`);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Deseja realmente excluir essa receita?')) return;
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
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Receitas</h1>
        <p className="text-slate-500">Gerencie suas receitas pessoais</p>
      </div>
      
      <IncomeForm onSuccess={handleSuccess} initialData={editingTransaction} />
      <IncomeList
        incomes={incomeTransactions}
        loading={loading}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default IncomePage;
