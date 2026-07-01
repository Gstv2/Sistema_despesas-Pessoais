import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { Transaction } from '../../types/transaction';

interface MonthlyEvolutionChartProps {
  transactions: Transaction[];
}

const MonthlyEvolutionChart = ({ transactions }: MonthlyEvolutionChartProps) => {
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
        balance: t.type === 'income' ? t.value : -t.value,
      });
    }
    return acc;
  }, [] as { month: string; name: string; income: number; expense: number; balance: number }[]);

  // Calculate cumulative balance
  let cumulativeBalance = 0;
  const dataWithBalance = monthlyData
    .sort((a, b) => a.month.localeCompare(b.month))
    .map(item => {
      cumulativeBalance += item.income - item.expense;
      return { ...item, balance: cumulativeBalance };
    });

  if (dataWithBalance.length === 0) {
    return (
      <div className="bg-white p-6 rounded-lg shadow-md text-center">
        <p className="text-gray-500">Nenhuma movimentação para exibir</p>
      </div>
    );
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-bold mb-4">Evolução do Saldo</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={dataWithBalance}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip formatter={(value) => `R$ ${Number(value).toFixed(2)}`} />
          <Legend />
          <Line type="monotone" dataKey="balance" stroke="#8884d8" name="Saldo" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyEvolutionChart;
