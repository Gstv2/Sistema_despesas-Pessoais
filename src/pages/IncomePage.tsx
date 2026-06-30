import { useEffect, useState } from 'react';
import { Plus } from 'lucide-react';
import IncomeForm from '../features/income/IncomeForm';
import IncomeList from '../features/income/IncomeList';
import { transactionService } from '../services/transactionService';
import type { Transaction, CreateTransaction, UpdateTransaction } from '../types/transaction';

const IncomePage = () => {
  const [incomes, setIncomes] = useState<Transaction[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState<Transaction | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIncomes();
  }, []);

  const loadIncomes = async () => {
    try {
      const data = await transactionService.getAll();
      setIncomes(data.filter(t => t.type === 'income'));
    } catch (error) {
      console.error('Error loading incomes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateIncome = async (data: CreateTransaction) => {
    try {
      await transactionService.create({ ...data, type: 'income' });
      await loadIncomes();
      setShowForm(false);
    } catch (error) {
      console.error('Error creating income:', error);
    }
  };

  const handleEditIncome = async (transaction: Transaction) => {
    setEditingTransaction(transaction);
    setShowForm(true);
  };

  const handleUpdateIncome = async (data: UpdateTransaction) => {
    if (!editingTransaction) return;
    try {
      await transactionService.update(editingTransaction.id, data);
      await loadIncomes();
      setShowForm(false);
      setEditingTransaction(null);
    } catch (error) {
      console.error('Error updating income:', error);
    }
  };

  const handleDeleteIncome = async (id: string) => {
    if (!confirm('Deseja excluir esta receita?')) return;
    try {
      await transactionService.delete(id);
      await loadIncomes();
    } catch (error) {
      console.error('Error deleting income:', error);
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

      {showForm && (
        <IncomeForm
          transaction={editingTransaction}
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
