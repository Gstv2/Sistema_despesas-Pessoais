import { Home, DollarSign, TrendingUp, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">
          Sistema de Controle de Despesas
        </h1>
        <div className="flex space-x-4">
          <Link
            to="/"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <Home size={20} />
            <span>Dashboard</span>
          </Link>
          <Link
            to="/income"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <DollarSign size={20} />
            <span>Receitas</span>
          </Link>
          <Link
            to="/expenses"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <TrendingUp size={20} />
            <span>Despesas</span>
          </Link>
          <Link
            to="/history"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <FileText size={20} />
            <span>Histórico</span>
          </Link>
          <Link
            to="/reports"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          >
            <FileText size={20} />
            <span>Relatórios</span>
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
