import { z } from 'zod';

const transactionCategories = [
  'Alimentação',
  'Transporte',
  'Moradia',
  'Saúde',
  'Educação',
  'Lazer',
  'Salário',
  'Investimentos',
  'Outros',
] as const;

export const createTransactionSchema = z.object({
  value: z.number().positive('O valor deve ser maior que zero'),
  category: z.enum(transactionCategories, {
    required_error: 'Por favor, selecione uma categoria',
  }),
  description: z.string().optional(),
  payment_method: z.string().optional(),
  transaction_date: z.string(),
});
