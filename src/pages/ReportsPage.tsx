import CategoryPieChart from '../features/reports/CategoryPieChart';
import IncomeExpenseBarChart from '../features/reports/IncomeExpenseBarChart';
import MonthlyEvolutionChart from '../features/reports/MonthlyEvolutionChart';
import { useTransactions } from '../hooks/useTransactions';
import { ErrorMessage } from '../components/ui/ErrorMessage';

const ReportsPage = () => {
  const { transactions, error, refresh } = useTransactions();

  if (error) {
    return (
      <div className="p-4 md:p-8">
        <ErrorMessage message={error} onRetry={refresh} />
      </div>
    );
  }

  return (
    <div className="p-4 md:p-8 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Relatórios</h1>
        <p className="text-slate-500">Análise visual das suas finanças</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <CategoryPieChart transactions={transactions} />
        <IncomeExpenseBarChart transactions={transactions} />
      </div>
      <MonthlyEvolutionChart transactions={transactions} />
    </div>
  );
};

export default ReportsPage;
