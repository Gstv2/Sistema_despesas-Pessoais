import { useForm, Controller, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTransactionSchema } from '../../lib/validators';
import type { CreateTransaction, TransactionCategory, Transaction } from '../../types/transaction';
import { Plus, Save } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';

const categories: TransactionCategory[] = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Saúde',
  'Educação',
  'Lazer',
  'Outros',
];

interface ExpenseFormProps {
  onSuccess: (data: CreateTransaction) => void;
  initialData?: Transaction;
}

const ExpenseForm = ({ onSuccess, initialData }: ExpenseFormProps) => {
  const [searchParams] = useSearchParams();
  const editId = searchParams.get('edit');

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CreateTransaction>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: initialData ? {
      value: initialData.value,
      category: initialData.category,
      description: initialData.description,
      payment_method: initialData.payment_method,
      transaction_date: initialData.transaction_date,
    } : {
      type: 'expense',
      category: 'Outros',
      description: '',
      payment_method: '',
      transaction_date: new Date().toISOString().split('T')[0],
    },
  });

  const onSubmit: SubmitHandler<CreateTransaction> = async (data) => {
    try {
      const transactionData = { ...data, type: 'expense' };
      onSuccess(transactionData as CreateTransaction);
      reset();
    } catch (error) {
      console.error('Error submitting expense:', error);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-xl border border-slate-100">
      <div className="flex items-center gap-3 mb-8">
        <div className="bg-rose-100 p-3 rounded-2xl">
          <Plus className="text-rose-600" size={24} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-slate-800">
            {editId ? 'Editar Despesa' : 'Nova Despesa'}
          </h2>
          <p className="text-slate-500 text-sm">Registro de gastos pessoais</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Value */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Valor (R$)</label>
            <Controller
              name="value"
              control={control}
              render={({ field: { onChange, name } }) => (
                <input
                  type="number"
                  placeholder="0.00"
                  name={name}
                  onChange={(e) =>
                    onChange(e.target.value === "" ? undefined : Number(e.target.value))
                  }
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                />
              )}
            />
            {errors.value && <p className="text-sm text-rose-500 font-medium">{errors.value.message}</p>}
          </div>

          {/* Category */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Categoria</label>
            <Controller
              name="category"
              control={control}
              render={({ field }) => (
                <select
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                  {...field}
                >
                  {categories.map((category) => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              )}
            />
          </div>

          {/* Date */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Data</label>
            <Controller
              name="transaction_date"
              control={control}
              render={({ field }) => (
                <input
                  type="date"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                  {...field}
                />
              )}
            />
          </div>

          {/* Payment Method */}
          <div className="space-y-2">
            <label className="text-sm font-semibold text-slate-700">Forma de Pagamento</label>
            <Controller
              name="payment_method"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="Ex: Cartão de crédito"
                  className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all"
                  {...field}
                />
              )}
            />
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Descrição</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <textarea
                placeholder="Descreva essa despesa..."
                rows={3}
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-rose-500 focus:border-rose-500 outline-none transition-all resize-none"
                {...field}
              />
            )}
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full md:w-auto flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-rose-500 to-pink-600 text-white font-semibold rounded-2xl hover:from-rose-600 hover:to-pink-700 focus:ring-4 focus:ring-rose-200 transition-all disabled:opacity-70"
        >
          <Save size={20} />
          {isSubmitting ? 'Salvando...' : 'Salvar Despesa'}
        </button>
      </form>
    </div>
  );
};

export default ExpenseForm;
