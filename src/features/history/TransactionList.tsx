import type { Transaction } from '../../types/transaction';
import { formatCurrency, formatDate } from '../../utils/formatters';
import { Edit2, Trash2, TrendingUp, TrendingDown, Tag, Calendar, CreditCard } from 'lucide-react';

export interface FilterOptions {
  type?: 'income' | 'expense' | '';
  category?: string;
  startDate?: string;
  endDate?: string;
  paymentMethod?: string;
}

interface TransactionListProps {
  transactions: Transaction[];
  loading?: boolean;
  onEdit?: (transaction: Transaction) => void;
  onDelete?: (id: string) => void;
}

const TransactionList = ({ transactions, loading, onEdit, onDelete }: TransactionListProps) => {
  if (loading) {
    return (
      <div className="flex items-center justify-center p-12 bg-white rounded-3xl shadow-xl border border-slate-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 shadow-lg">
        <div className="bg-violet-50 inline-flex p-4 rounded-full mb-4">
          <Tag className="text-violet-300" size={40} />
        </div>
        <h3 className="text-xl font-semibold text-slate-700 mb-2">Nenhuma transação encontrada</h3>
        <p className="text-slate-500">Tente ajustar os filtros para ver mais resultados</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {transactions.map((transaction) => (
        <div
          key={transaction.id}
          className="group flex flex-col md:flex-row items-start md:items-center justify-between p-5 bg-white rounded-2xl border border-slate-100 shadow-lg hover:shadow-2xl transition-all duration-300"
        >
          <div className="flex items-start gap-4 mb-3 md:mb-0">
            <div className={`p-3 rounded-xl shrink-0 ${
              transaction.type === 'income' 
                ? 'bg-emerald-100' 
                : 'bg-rose-100'
            }`}>
              {transaction.type === 'income' ? (
                <TrendingUp className="text-emerald-600" size={20} />
              ) : (
                <TrendingDown className="text-rose-600" size={20} />
              )}
            </div>
            
            <div>
              <h4 className="font-semibold text-slate-800">
                {transaction.description || transaction.category}
              </h4>
              <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-slate-500">
                <div className="flex items-center gap-1">
                  <Tag size={14} />
                  <span className="font-medium">{transaction.category}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar size={14} />
                  <span>{formatDate(transaction.transactionDate)}</span>
                </div>
                {transaction.paymentMethod && (
                  <div className="flex items-center gap-1">
                    <CreditCard size={14} />
                    <span>{transaction.paymentMethod}</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <span className={`text-2xl font-extrabold flex-1 md:flex-none ${
              transaction.type === 'income' ? 'text-emerald-600' : 'text-rose-600'
            }`}>
              {transaction.type === 'income' ? '+ ' : '- '}
              {formatCurrency(transaction.value)}
            </span>
            
            {onEdit && (
              <button
                onClick={() => onEdit(transaction)}
                className="p-2 rounded-xl bg-slate-200 hover:bg-blue-100 hover:text-blue-600 text-slate-600 transition-colors"
              >
                <Edit2 size={18} />
              </button>
            )}
            
            {onDelete && (
              <button
                onClick={() => onDelete(transaction.id)}
                className="p-2 rounded-xl bg-slate-200 hover:bg-rose-100 hover:text-rose-600 text-slate-600 transition-colors"
              >
                <Trash2 size={18} />
              </button>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TransactionList;
