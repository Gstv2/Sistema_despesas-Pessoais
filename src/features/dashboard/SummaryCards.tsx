import { DollarSign, TrendingUp, TrendingDown, List } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface SummaryCardsProps {
  totalIncome: number;
  totalExpenses: number;
  totalTransactions: number;
}

const SummaryCards = ({ totalIncome, totalExpenses, totalTransactions }: SummaryCardsProps) => {
  const balance = totalIncome - totalExpenses;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Saldo</p>
            <p className={`text-2xl font-bold mt-1">{formatCurrency(balance)}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <DollarSign className="text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Receitas</p>
            <p className="text-2xl font-bold text-green-600 mt-1">+{formatCurrency(totalIncome)}</p>
          </div>
          <div className="bg-green-100 p-3 rounded-full">
            <TrendingUp className="text-green-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Despesas</p>
            <p className="text-2xl font-bold text-red-600 mt-1">-{formatCurrency(totalExpenses)}</p>
          </div>
          <div className="bg-red-100 p-3 rounded-full">
            <TrendingDown className="text-red-600" />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Movimentações</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{totalTransactions}</p>
          </div>
          <div className="bg-blue-100 p-3 rounded-full">
            <List className="text-blue-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCards;
