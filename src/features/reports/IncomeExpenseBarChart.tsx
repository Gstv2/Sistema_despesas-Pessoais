import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { Transaction } from '../../types/transaction';

interface IncomeExpenseBarChartProps {
  transactions: Transaction[];
}

const IncomeExpenseBarChart = ({ transactions }: IncomeExpenseBarChartProps) => {
  const monthlyData = transactions.reduce((acc, t) => {
    const date = new Date(t.transaction_date);
    const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const monthName = date.toLocaleDateString('pt-BR', { month: 'short', year: 'numeric' });

    const existing = acc.find(item => item.month === monthKey);
    if (existing) {
      if (t.type === 'income') {
        existing.income += t.value;
      } else {
        existing.expense += t.value;
      }
    } else {
      acc.push({
        month: monthKey,
        name: monthName,
        income: t.type === 'income' ? t.value : 0,
        expense: t.type === 'expense' ? t.value : 0,
      });
    }
    return acc;
  }, [] as { month: string; name: string; income: number; expense: number }[]);

  monthlyData.sort((a, b) => a.month.localeCompare(b.month));

  if (monthlyData.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">Nenhuma movimentação para exibir</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Receitas vs Despesas</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={monthlyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `R$ ${Number(value).toFixed(2)}`} />
          <Legend />
          <Bar dataKey="income" fill="#10b981" name="Receitas" />
          <Bar dataKey="expense" fill="#ef4444" name="Despesas" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeExpenseBarChart;
