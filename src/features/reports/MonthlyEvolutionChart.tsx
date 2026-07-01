import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { Transaction } from '../../types/transaction';

interface MonthlyEvolutionChartProps {
  transactions: Transaction[];
}

const MonthlyEvolutionChart = ({ transactions }: MonthlyEvolutionChartProps) => {
  const monthlyData = transactions.reduce((acc, t) => {
    const date = new Date(t.transaction_date);
    const month = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
    const existing = acc.find(item => item.month === month);
    
    if (existing) {
      if (t.type === 'income') existing.income += t.value;
      else existing.expense += t.value;
    } else {
      acc.push({
        month,
        income: t.type === 'income' ? t.value : 0,
        expense: t.type === 'expense' ? t.value : 0,
      });
    }
    return acc;
  }, [] as Array<{ month: string; income: number; expense: number }>).sort((a, b) => a.month.localeCompare(b.month));

  const dataWithBalance = monthlyData.map(item => ({
    ...item,
    balance: item.income - item.expense,
  }));

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
      <h3 className="text-xl font-bold text-slate-800 mb-6">Evolução Mensal do Saldo</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dataWithBalance}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
            <Legend />
            <Line type="monotone" dataKey="balance" stroke="#8884d8" name="Saldo" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
            <Line type="monotone" dataKey="income" stroke="#10b981" name="Receitas" strokeWidth={2} dot={{ r: 4 }} />
            <Line type="monotone" dataKey="expense" stroke="#f43f5e" name="Despesas" strokeWidth={2} dot={{ r: 4 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default MonthlyEvolutionChart;
