
# Contracts: Transactions

## Create Transaction

**Request**:
```typescript
{
  type: 'income' | 'expense';
  value: number;
  category: 'Alimentação' | 'Transporte' | 'Moradia' | 'Saúde' | 'Educação' | 'Lazer' | 'Salário' | 'Investimentos' | 'Outros';
  description?: string;
  payment_method?: string;
  transaction_date: Date;
}
```

**Response**:
```typescript
{
  id: string;
  type: 'income' | 'expense';
  value: number;
  category: string;
  description?: string;
  payment_method?: string;
  transaction_date: Date;
  created_at: Date;
  updated_at: Date;
}
```

## Update Transaction

**Request**:
```typescript
{
  type?: 'income' | 'expense';
  value?: number;
  category?: string;
  description?: string;
  payment_method?: string;
  transaction_date?: Date;
}
```

**Response**:
```typescript
{
  id: string;
  type: 'income' | 'expense';
  value: number;
  category: string;
  description?: string;
  payment_method?: string;
  transaction_date: Date;
  created_at: Date;
  updated_at: Date;
}
```

## Delete Transaction

**Response**:
```typescript
{
  success: boolean;
}
```

## Get Transactions

**Query Parameters**:
```typescript
{
  start_date?: Date;
  end_date?: Date;
  category?: string;
  type?: 'income' | 'expense';
  payment_method?: string;
}
```

**Response**:
```typescript
[
  {
    id: string;
    type: 'income' | 'expense';
    value: number;
    category: string;
    description?: string;
    payment_method?: string;
    transaction_date: Date;
    created_at: Date;
    updated_at: Date;
  }
]
```

