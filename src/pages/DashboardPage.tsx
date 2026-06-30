import { useDashboard } from '../hooks/useDashboard';
import SummaryCards from '../features/dashboard/SummaryCards';

const DashboardPage = () => {
  const { totalIncome, totalExpenses, totalTransactions, loading } = useDashboard();

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
      <SummaryCards
        totalIncome={totalIncome}
        totalExpenses={totalExpenses}
        totalTransactions={totalTransactions}
      />
    </div>
  );
};

export default DashboardPage;
