import { Home, DollarSign, TrendingUp, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-gray-50 border-r border-gray-200 p-4">
      <div className="space-y-4">
        <Link
          to="/"
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
        >
          <Home size={20} />
          <span>Dashboard</span>
        </Link>
        <Link
          to="/income"
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
        >
          <DollarSign size={20} />
          <span>Receitas</span>
        </Link>
        <Link
          to="/expenses"
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
        >
          <TrendingUp size={20} />
          <span>Despesas</span>
        </Link>
        <Link
          to="/history"
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
        >
          <FileText size={20} />
          <span>Histórico</span>
        </Link>
        <Link
          to="/reports"
          className="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-100 text-gray-700"
        >
          <FileText size={20} />
          <span>Relatórios</span>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
