
# Data Model: Sistema de Controle de Despesas Pessoais

## Entidade: Transaction

Representa uma transação financeira (receita ou despesa).

### Campos

| Campo               | Tipo       | Descrição                                      | Validação                                  |
|---------------------|------------|------------------------------------------------|--------------------------------------------|
| id                  | UUID       | Identificador único da transação               | Obrigatório, gerado automaticamente        |
| type                | String     | Tipo da transação ("income" ou "expense")      | Obrigatório, enum: income, expense         |
| value               | Number     | Valor da transação                             | Obrigatório, maior que 0                   |
| category            | String     | Categoria da transação                         | Obrigatório, enum: Alimentação, Transporte, Moradia, Saúde, Educação, Lazer, Salário, Investimentos, Outros |
| description         | String     | Descrição da transação                         | Opcional                                   |
| payment_method      | String     | Forma de pagamento/recebimento                 | Opcional                                   |
| transaction_date    | Date       | Data da transação                              | Obrigatório                                |
| created_at          | Timestamp  | Data de criação                                | Obrigatório, gerado automaticamente        |
| updated_at          | Timestamp  | Data de última atualização                     | Obrigatório, gerado automaticamente        |

### Relacionamentos

Nenhum relacionamento no MVP (sem autenticação de usuários).

### Regras de Negócio

- O valor da transação deve ser maior que 0.
- A data da transação não pode ser futura (opcional, dependendo da regra de negócio).
- A categoria deve ser uma das predefinidas.

