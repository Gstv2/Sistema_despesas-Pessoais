export type TransactionType = 'income' | 'expense';

export type TransactionCategory =
  | 'Alimentação'
  | 'Transporte'
  | 'Moradia'
  | 'Saúde'
  | 'Educação'
  | 'Lazer'
  | 'Salário'
  | 'Investimentos'
  | 'Outros';

export interface Transaction {
  id: string;
  type: TransactionType;
  value: number;
  category: TransactionCategory;
  description?: string;
  payment_method?: string;
  transaction_date: Date;
  created_at: Date;
  updated_at: Date;
}

export interface CreateTransaction {
  type: TransactionType;
  value: number;
  category: TransactionCategory;
  description?: string;
  payment_method?: string;
  transaction_date: Date;
}

export interface UpdateTransaction {
  type?: TransactionType;
  value?: number;
  category?: TransactionCategory;
  description?: string;
  payment_method?: string;
  transaction_date?: Date;
}
