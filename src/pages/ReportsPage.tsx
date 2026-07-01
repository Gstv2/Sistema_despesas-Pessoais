import { useTransactions } from '../hooks/useTransactions';
import CategoryPieChart from '../features/reports/CategoryPieChart';
import IncomeExpenseBarChart from '../features/reports/IncomeExpenseBarChart';
import MonthlyEvolutionChart from '../features/reports/MonthlyEvolutionChart';

const ReportsPage = () => {
  const { transactions, loading } = useTransactions();

  if (loading) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Relatórios</h1>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Relatórios</h1>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryPieChart transactions={transactions} />
        <IncomeExpenseBarChart transactions={transactions} />
      </div>
      <div className="grid grid-cols-1">
        <MonthlyEvolutionChart transactions={transactions} />
      </div>
    </div>
  );
};

export default ReportsPage;
