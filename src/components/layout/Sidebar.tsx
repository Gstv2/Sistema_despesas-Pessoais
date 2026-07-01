import { Home, TrendingUp, TrendingDown, History, BarChart3 } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

const Sidebar = () => {
  const location = useLocation();

  const navItems = [
    {
      path: '/',
      label: 'Dashboard',
      icon: Home,
    },
    {
      path: '/income',
      label: 'Receitas',
      icon: TrendingUp,
    },
    {
      path: '/expenses',
      label: 'Despesas',
      icon: TrendingDown,
    },
    {
      path: '/history',
      label: 'Histórico',
      icon: History,
    },
    {
      path: '/reports',
      label: 'Relatórios',
      icon: BarChart3,
    },
  ];

  return (
    <div className="w-full md:w-72 bg-white min-h-screen pt-4">
      <nav className="px-4 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-5 py-4 rounded-2xl transition-all duration-300 ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg shadow-blue-200'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }`}
            >
              <Icon size={22} />
              <span className="font-semibold">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Sidebar;
