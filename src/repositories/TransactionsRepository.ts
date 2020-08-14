import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
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
    const { income, outcome } = this.transactions.reduce((acummulator: Balance, transactions: Transaction) => {

      if(transactions.type === 'income'){
        acummulator.income += transactions.value
      } else if ((transactions.type === 'outcome')) {
        acummulator.outcome += transactions.value
      }

      return acummulator
    }, {
      income: 0,
      outcome: 0,
      total: 0
    })

    const total = income - outcome
    return { income, outcome, total}
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transationModel = new Transaction({ title, value, type })
      this.transactions.push(transationModel)
    return transationModel
  }
}

export default TransactionsRepository;
