import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import IncomeForm from '../features/income/IncomeForm';
import IncomeList from '../features/income/IncomeList';
import { transactionService } from '../services/transactionService';
import ErrorMessage from '../components/ui/ErrorMessage';
import type { Transaction, CreateTransaction, UpdateTransaction } from '../types/transaction';

const IncomePage = () => {
  const [incomes, setIncomes] = useState<Transaction[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadIncomes();
  }, []);

  const loadIncomes = async () => {
    try {
      setError(null);
      const data = await transactionService.getAll();
      setIncomes(data.filter(t => t.type === 'income'));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao carregar as receitas');
      console.error('Error loading incomes:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateIncome = async (data: CreateTransaction) => {
    try {
      setError(null);
      await transactionService.create({ ...data, type: 'income' });
      await loadIncomes();
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao criar a receita');
      console.error('Error creating income:', err);
    }
  };

  const handleEditIncome = async (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleUpdateIncome = async (data: UpdateTransaction) => {
    if (!editingTransaction) return;
    try {
      setError(null);
      await transactionService.update(editingTransaction.id, data);
      await loadIncomes();
      setShowForm(false);
      setEditingTransaction(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao atualizar a receita');
      console.error('Error updating income:', err);
    }
  };

  const handleDeleteIncome = async (id: string) => {
    if (!confirm('Deseja excluir esta receita?')) return;
    try {
      setError(null);
      await transactionService.delete(id);
      await loadIncomes();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao excluir a receita');
      console.error('Error deleting income:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Receitas</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Nova Receita</span>
        </button>
      </div>

      {error && <ErrorMessage message={error} />}

      {showForm && (
        <IncomeForm
          transaction={editingTransaction || undefined}
          onSubmit={editingTransaction ? handleUpdateIncome : handleCreateIncome}
          onCancel={() => {
            setShowForm(false);
            setEditingTransaction(null);
          }}
        />
      )}

      {loading ? (
        <div className="text-center py-12">Carregando...</div>
      ) : (
        <IncomeList
          incomes={incomes}
          onEdit={handleEditIncome}
          onDelete={handleDeleteIncome}
        />
      )}
    </div>
  );
};

export default IncomePage;
