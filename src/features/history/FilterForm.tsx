import { Controller, useForm } from 'react-hook-form';
import type { FilterOptions } from './TransactionList';
import { Filter, X } from 'lucide-react';

interface FilterFormProps {
  onFilter: (filters: FilterOptions) => void;
  onClear: () => void;
}

const FilterForm = ({ onFilter, onClear }: FilterFormProps) => {
  const { control, handleSubmit, reset } = useForm<FilterOptions>();

  const categories = [
    'Alimentação',
    'Transporte',
    'Moradia',
    'Saúde',
    'Educação',
    'Lazer',
    'Salário',
    'Investimentos',
    'Outros',
  ];

  const onSubmit = (data: FilterOptions) => {
    onFilter(data);
  };

  const handleClear = () => {
    reset();
    onClear();
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl border border-slate-100">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="bg-violet-100 p-3 rounded-2xl">
            <Filter className="text-violet-600" size={24} />
          </div>
          <h3 className="text-xl font-bold text-slate-800">Filtros</h3>
        </div>
        <button
          onClick={handleClear}
          className="flex items-center gap-2 text-sm text-slate-500 hover:text-slate-700 transition-colors"
        >
          <X size={16} />
          Limpar
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Type */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Tipo</label>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <select
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
                {...field}
              >
                <option value="">Todos</option>
                <option value="income">Receitas</option>
                <option value="expense">Despesas</option>
              </select>
            )}
          />
        </div>

        {/* Category */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Categoria</label>
          <Controller
            name="category"
            control={control}
            render={({ field }) => (
              <select
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
                {...field}
              >
                <option value="">Todas</option>
                {categories.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            )}
          />
        </div>

        {/* Start Date */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Data Inicial</label>
          <Controller
            name="startDate"
            control={control}
            render={({ field }) => (
              <input
                type="date"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
                {...field}
              />
            )}
          />
        </div>

        {/* End Date */}
        <div className="space-y-2">
          <label className="text-sm font-semibold text-slate-700">Data Final</label>
          <Controller
            name="endDate"
            control={control}
            render={({ field }) => (
              <input
                type="date"
                className="w-full px-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-violet-500 focus:border-violet-500 outline-none transition-all"
                {...field}
              />
            )}
          />
        </div>
      </form>

      <div className="mt-6 flex justify-end">
        <button
          type="submit"
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-violet-500 to-purple-600 text-white font-semibold rounded-2xl hover:from-violet-600 hover:to-purple-700 focus:ring-4 focus:ring-violet-200 transition-all"
        >
          <Filter size={18} />
          Aplicar Filtros
        </button>
      </div>
    </div>
  );
};

export default FilterForm;
