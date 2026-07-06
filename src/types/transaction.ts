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
  user_id?: string;
  type: TransactionType;
  value: number;
  category: TransactionCategory;
  description?: string;
  payment_method?: string;
  transaction_date: string;
  created_at: string;
  updated_at: string;
}

export interface CreateTransaction {
  type?: TransactionType;
  value: number;
  category: TransactionCategory;
  description?: string;
  payment_method?: string;
  transaction_date: string;
  user_id?: string;
}

export interface UpdateTransaction {
  type?: TransactionType;
  value?: number;
  category?: TransactionCategory;
  description?: string;
  payment_method?: string;
  transaction_date?: string;
}
