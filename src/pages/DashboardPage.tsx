import SummaryCards from '../features/dashboard/SummaryCards';
import { useTransactions } from '../hooks/useTransactions';
import { useDashboard } from '../hooks/useDashboard';
import { ErrorMessage } from '../components/ui/ErrorMessage';

const DashboardPage = () => {
  const { transactions, error, refresh } = useTransactions();
  const { totalIncome, totalExpenses, totalTransactions } = useDashboard(transactions);

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
        <h1 className="text-3xl font-extrabold text-slate-800 mb-2">Dashboard</h1>
        <p className="text-slate-500">Visão geral das suas finanças pessoais</p>
      </div>
      
      <SummaryCards
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        totalTransactions={totalTransactions}
      />
    </div>
  );
};

export default DashboardPage;
