import { useForm, Controller } from 'react-hook-form';

interface FilterFormProps {
  onFilter: (filters: FilterOptions) => void;
}

interface FilterOptions {
  startDate: string;
  endDate: string;
  category: string;
  type: string;
  paymentMethod: string;
}

const FilterForm = ({ onFilter }: FilterFormProps) => {
  const { control, handleSubmit, reset } = useForm<FilterOptions>({
    defaultValues: {
      startDate: '',
      endDate: '',
      category: '',
      type: '',
      paymentMethod: '',
    },
  });

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-lg font-bold mb-4">Filtrar Movimentações</h2>
      <form onSubmit={handleSubmit(onFilter)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Data Início</label>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => <input type="date" {...field} className="w-full border border-gray-300 rounded-md px-3 py-2" />}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Data Fim</label>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => <input type="date" {...field} className="w-full border border-gray-300 rounded-md px-3 py-2" />}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Categoria</label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <select {...field} className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option value="">Todas</option>
                <option value="Alimentação">Alimentação</option>
                <option value="Transporte">Transporte</option>
                <option value="Moradia">Moradia</option>
                <option value="Saúde">Saúde</option>
                <option value="Educação">Educação</option>
                <option value="Lazer">Lazer</option>
                <option value="Salário">Salário</option>
                <option value="Investimentos">Investimentos</option>
                <option value="Outros">Outros</option>
              </select>
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Tipo</label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <select {...field} className="w-full border border-gray-300 rounded-md px-3 py-2">
                <option value="">Todos</option>
                <option value="income">Receita</option>
                <option value="expense">Despesa</option>
              </select>
            )}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Forma de Pagamento</label>
          <Controller
            name="paymentMethod"
            control={control}
            render={({ field }) => <input type="text" {...field} className="w-full border border-gray-300 rounded-md px-3 py-2" placeholder="Buscar..." />}
          />
        </div>

        <div className="md:col-span-2 lg:col-span-3 xl:col-span-5 flex space-x-2">
          <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700">
            Filtrar
          </button>
          <button
            type="button"
            onClick={() => {
              reset();
              onFilter({ startDate: '', endDate: '', category: '', type: '', paymentMethod: '' });
            }}
            className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
          >
            Limpar
          </button>
        </div>
      </form>
    </div>
  );
};

export default FilterForm;
