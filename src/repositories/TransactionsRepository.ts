import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    return this.transactions.reduce(
      (b, { value, type }) => {
        const balance = b;
        balance[type] += value;
        balance.total = b.income - b.outcome;

        return balance;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );
  }

  public exceedsBalance(value: number): boolean {
    const { total } = this.getBalance();
    return value > total;
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });
    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
