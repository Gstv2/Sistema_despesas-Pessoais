import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createTransactionSchema } from '../../lib/validators';
import type { CreateTransaction, TransactionCategory, Transaction } from '../../types/transaction';

interface ExpenseFormProps {
  onSubmit: (data: CreateTransaction) => void;
  onCancel?: () => void;
  transaction?: Transaction;
}

const categories: TransactionCategory[] = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Saúde',
  'Educação',
  'Lazer',
  'Outros',
];

const ExpenseForm = ({ onSubmit, onCancel, transaction }: ExpenseFormProps) => {
  const { control, handleSubmit, reset, formState: { errors } } = useForm<CreateTransaction>({
    resolver: zodResolver(createTransactionSchema),
    defaultValues: transaction ? {
      type: transaction.type,
      value: transaction.value,
      category: transaction.category,
      description: transaction.description,
      payment_method: transaction.payment_method,
      transaction_date: transaction.transaction_date,
    } : {
      type: 'expense',
      category: 'Alimentação',
      transaction_date: new Date(),
    },
  });

  const onSubmitHandler = (data: CreateTransaction) => {
    onSubmit(data);
    reset();
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-xl font-bold mb-4">Nova Despesa</h2>
      <form onSubmit={handleSubmit(onSubmitHandler)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Valor</label>
          <Controller
            name="value"
            control={control}
            render={({ field }) => (
              <input
                type="number"
                step="0.01"
                {...field}
                onChange={(e) => field.onChange(parseFloat(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="0.00"
              />
            )}
          />
          {errors.value && <p className="text-red-500 text-sm mt-1">{errors.value.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Descrição</label>
          <Controller
            name="description"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Descrição da despesa"
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <select {...field} className="w-full border border-gray-300 rounded-md px-3 py-2">
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Forma de Pagamento</label>
          <Controller
            name="payment_method"
            control={control}
            render={({ field }) => (
              <input
                type="text"
                {...field}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
                placeholder="Ex: Cartão, Dinheiro"
              />
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Data</label>
          <Controller
            name="transaction_date"
            control={control}
            render={({ field }) => (
              <input
                type="date"
                {...field}
                value={field.value.toISOString().split('T')[0]}
                onChange={(e) => field.onChange(new Date(e.target.value))}
                className="w-full border border-gray-300 rounded-md px-3 py-2"
              />
            )}
          />
        </div>

        <div className="flex space-x-4">
          <button type="submit" className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700">
            Salvar
          </button>
          {onCancel && (
            <button type="button" onClick={onCancel} className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400">
              Cancelar
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ExpenseForm;
