class Budget {
  constructor(userName, income, expenses) {
    this.userName = userName;
    this.income = income;
    this.expenses = expenses;
    this.totalBudget = 0;
    this.totalIncome = 0;
    this.totalExpenses = 0;
  }

  calculateTotalBudget() {
    this.#addUpIncome();
    this.#addUpExpenses();

    this.totalBudget = this.totalIncome - this.totalExpenses;
    return this.totalBudget;
  }

  addIncome(description, amount) {
    let incomeLength = Object.keys(this.income).length + 1
    let keyName = `income${incomeLength}`;

    this.income[keyName] = {
      description: description,
      amount: amount
    };
    return this.income;
  }

  addExpense(description, amount) {
    let expensesLength = Object.keys(this.expenses).length + 1
    let keyName = `expense${expensesLength}`;

    this.expenses[keyName] = {
      description: description,
      amount: amount
    };
    return this.expenses;
  }

  #addUpIncome() {
    let incomeTotal = Object.values(this.income).reduce((acc, val) => {
      return acc = acc + val.amount;
    }, 0);
    this.totalIncome = incomeTotal * 2;
  }

  #addUpExpenses() {
    let expenseTotal = Object.values(this.expenses).reduce((acc, val) => {
      return acc = acc + val.amount;
    }, 0);
    this.totalExpenses = expenseTotal;
  }
}

const user = new Budget(
  'Renee',
  {
    income1: {
      description: 'Full-Time Job',
      amount: 2115.38
    },
    income2: {
      description: 'Weekend Job',
      amount: 200.02
    }
  },
  {
    expense1: {
      description: 'Rent',
      amount: 1509.25,
    },
    expense2: {
      description: 'Utilities',
      amount: 105.50
    },
    expense3: {
      description: 'Groceries',
      amount: 520.25
    }
  }
);

console.log('UserName: ', user.userName);
console.log('income: ', user.income);
console.log('calculate total budget: ', user.calculateTotalBudget());
user.calculateTotalBudget();
console.log('total income: ', user.totalIncome);
console.log('total expenses: ', user.totalExpenses);
user.addIncome('Dog Walking', 100.00);
user.addIncome('House Sitting', 150.00);
console.log('expenses: ', user.expenses);
user.addExpense('Hair Cut', 40.00);
console.log('expenses: ', user.expenses);