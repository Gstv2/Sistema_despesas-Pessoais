import { Edit2, Trash2, TrendingDown, Tag, Calendar, CreditCard } from 'lucide-react';
import type { Transaction } from '../../types/transaction';
import { formatCurrency, formatDate } from '../../utils/formatters';

interface ExpenseListProps {
  expenses: Transaction[];
  onEdit: (transaction: Transaction) => void;
  onDelete: (id: string) => void;
  loading?: boolean;
}

const ExpenseList = ({ expenses, onEdit, onDelete, loading }: ExpenseListProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-rose-600"></div>
      </div>
    );
  }

  if (expenses.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-lg">
        <div className="bg-rose-50 inline-flex p-4 rounded-full mb-4">
          <TrendingDown className="text-rose-300" size={40} />
        </div>
        <h3 className="text-xl font-semibold text-slate-700 mb-2">Nenhuma despesa registrada</h3>
        <p className="text-slate-500">Comece a adicionar suas despesas pessoais</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
      <div className="flex items-center gap-3 mb-6">
        <div className="bg-rose-100 p-3 rounded-2xl">
          <TrendingDown className="text-rose-600" size={24} />
        </div>
        <h3 className="text-xl font-bold text-slate-800">Despesas Recentes</h3>
      </div>
      
      <div className="space-y-4">
        {expenses.map((expense) => (
          <div 
            key={expense.id}
            className="group flex flex-col md:flex-row items-start md:items-center justify-between p-4 md:p-5 rounded-2xl border border-slate-100 bg-slate-50 hover:bg-white hover:shadow-xl transition-all duration-300"
          >
            <div className="flex items-start gap-4 mb-3 md:mb-0">
              <div className="bg-rose-100 p-3 rounded-xl shrink-0">
                <Tag className="text-rose-600" size={20} />
              </div>
              <div>
                <h4 className="font-semibold text-slate-800">{expense.description || expense.category}</h4>
                <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-slate-500">
                  <div className="flex items-center gap-1">
                    <Tag size={14} />
                    <span className="font-medium">{expense.category}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span>{formatDate(expense.transaction_date)}</span>
                  </div>
                  {expense.payment_method && (
                    <div className="flex items-center gap-1">
                      <CreditCard size={14} />
                      <span>{expense.payment_method}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            <div className="flex items-center gap-3 w-full md:w-auto">
              <span className="text-2xl font-extrabold text-rose-600 flex-1 md:flex-none">
                - {formatCurrency(expense.value)}
              </span>
              <button
                onClick={() => onEdit(expense)}
                className="p-2 rounded-xl bg-slate-200 hover:bg-blue-100 hover:text-blue-600 text-slate-600 transition-colors"
              >
                <Edit2 size={18} />
              </button>
              <button
                onClick={() => onDelete(expense.id)}
                className="p-2 rounded-xl bg-slate-200 hover:bg-rose-100 hover:text-rose-600 text-slate-600 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExpenseList;
