import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import ExpenseForm from '../features/expenses/ExpenseForm';
import ExpenseList from '../features/expenses/ExpenseList';
import { transactionService } from '../services/transactionService';
import ErrorMessage from '../components/ui/ErrorMessage';
import type { Transaction, CreateTransaction, UpdateTransaction } from '../types/transaction';

const ExpensePage = () => {
  const [expenses, setExpenses] = useState<Transaction[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadExpenses();
  }, []);

  const loadExpenses = async () => {
    try {
      setError(null);
      const data = await transactionService.getAll();
      setExpenses(data.filter(t => t.type === 'expense'));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao carregar as despesas');
      console.error('Error loading expenses:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateExpense = async (data: CreateTransaction) => {
    try {
      setError(null);
      await transactionService.create({ ...data, type: 'expense' });
      await loadExpenses();
      setShowForm(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao criar a despesa');
      console.error('Error creating expense:', err);
    }
  };

  const handleEditExpense = async (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleUpdateExpense = async (data: UpdateTransaction) => {
    if (!editingTransaction) return;
    try {
      setError(null);
      await transactionService.update(editingTransaction.id, data);
      await loadExpenses();
      setShowForm(false);
      setEditingTransaction(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao atualizar a despesa');
      console.error('Error updating expense:', err);
    }
  };

  const handleDeleteExpense = async (id: string) => {
    if (!confirm('Deseja excluir esta despesa?')) return;
    try {
      setError(null);
      await transactionService.delete(id);
      await loadExpenses();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Ocorreu um erro ao excluir a despesa');
      console.error('Error deleting expense:', err);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-800">Despesas</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 flex items-center space-x-2"
        >
          <Plus size={20} />
          <span>Nova Despesa</span>
        </button>
      </div>

      {error && <ErrorMessage message={error} />}

      {showForm && (
        <ExpenseForm
          transaction={editingTransaction || undefined}
          onSubmit={editingTransaction ? handleUpdateExpense : handleCreateExpense}
          onCancel={() => {
            setShowForm(false);
            setEditingTransaction(null);
          }}
        />
      )}

      {loading ? (
        <div className="text-center py-12">Carregando...</div>
      ) : (
        <ExpenseList
          expenses={expenses}
          onEdit={handleEditExpense}
          onDelete={handleDeleteExpense}
        />
      )}
    </div>
  );
};

export default ExpensePage;
