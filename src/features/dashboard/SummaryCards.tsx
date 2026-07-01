import { DollarSign, TrendingUp, TrendingDown, List } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';

interface SummaryCardsProps {
  totalIncome: number;
  totalExpenses: number;
  totalTransactions: number;
}

const SummaryCards = ({ totalIncome, totalExpenses, totalTransactions }: SummaryCardsProps) => {
  const balance = totalIncome - totalExpenses;

  const cards = [
    {
      title: 'Saldo',
      value: formatCurrency(balance),
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-600',
      textColor: 'text-emerald-600',
      bgIcon: 'bg-emerald-100',
    },
    {
      title: 'Receitas',
      value: `+${formatCurrency(totalIncome)}`,
      icon: TrendingUp,
      color: 'from-blue-500 to-indigo-600',
      textColor: 'text-blue-600',
      bgIcon: 'bg-blue-100',
    },
    {
      title: 'Despesas',
      value: `-${formatCurrency(totalExpenses)}`,
      icon: TrendingDown,
      color: 'from-rose-500 to-pink-600',
      textColor: 'text-rose-600',
      bgIcon: 'bg-rose-100',
    },
    {
      title: 'Movimentações',
      value: totalTransactions,
      icon: List,
      color: 'from-violet-500 to-purple-600',
      textColor: 'text-violet-600',
      bgIcon: 'bg-violet-100',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
      {cards.map((card, index) => {
        const Icon = card.icon;
        return (
          <div 
            key={index}
            className="group bg-white rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-slate-100"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-500 mb-1 group-hover:text-slate-600 transition-colors">
                  {card.title}
                </p>
                <p className={`text-2xl md:text-3xl font-extrabold tracking-tight ${card.textColor}`}>
                  {card.value}
                </p>
              </div>
              <div className={`${card.bgIcon} p-4 rounded-2xl group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={card.textColor} size={32} />
              </div>
            </div>
            <div className={`mt-4 h-1 rounded-full bg-gradient-to-r ${card.color} opacity-50 group-hover:opacity-100 transition-opacity`}></div>
          </div>
        );
      })}
    </div>
  );
};

export default SummaryCards;
