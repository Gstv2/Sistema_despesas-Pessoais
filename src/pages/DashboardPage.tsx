import { useDashboard } from '../hooks/useDashboard';
import SummaryCards from '../features/dashboard/SummaryCards';
import ErrorMessage from '../components/ui/ErrorMessage';

const DashboardPage = () => {
  const { totalIncome, totalExpenses, totalTransactions, loading, error } = useDashboard();

  if (loading) {
    return (
      <div className="text-center py-12">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Dashboard</h1>
        <p>Carregando...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
      {error && <ErrorMessage message={error} />}
      <SummaryCards
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        totalTransactions={totalTransactions}
      />
    </div>
  );
};

export default DashboardPage;
