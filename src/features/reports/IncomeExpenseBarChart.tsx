import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { Transaction } from '../../types/transaction';

interface IncomeExpenseBarChartProps {
  transactions: Transaction[];
}

const IncomeExpenseBarChart = ({ transactions }: IncomeExpenseBarChartProps) => {
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

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
      <h3 className="text-xl font-bold text-slate-800 mb-6">Receitas vs Despesas</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={monthlyData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip formatter={(value: number) => `R$ ${value.toFixed(2)}`} />
            <Legend />
            <Bar dataKey="income" fill="#10b981" name="Receitas" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" fill="#f43f5e" name="Despesas" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default IncomeExpenseBarChart;
