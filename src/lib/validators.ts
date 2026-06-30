import { z } from 'zod';
import type { TransactionCategory, TransactionType } from '../types/transaction';

const transactionTypeSchema = z.enum(['income', 'expense']);

const transactionCategorySchema = z.enum([
  'Alimentação',
  'Transporte',
  'Moradia',
  'Saúde',
  'Educação',
  'Lazer',
  'Salário',
  'Investimentos',
  'Outros',
]);

export const createTransactionSchema = z.object({
  type: transactionTypeSchema,
  value: z.number().positive('Valor deve ser positivo'),
  category: transactionCategorySchema,
  description: z.string().optional(),
  payment_method: z.string().optional(),
  transaction_date: z.coerce.date(),
});

export const updateTransactionSchema = createTransactionSchema.partial();
