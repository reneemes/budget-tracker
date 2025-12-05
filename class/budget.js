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
    return this.totalBudget.toFixed(2);
  }

  addIncome(description, amount) {
    if (amount <= 0) {return 'Cannot add a negative amount'};
    if (description == '') {return 'Income description cannot be blank'};

    let incomeLength = Object.keys(this.income).length + 1
    let keyName = `income${incomeLength}`;

    this.income[keyName] = {
      description: description,
      amount: amount
    };
    return this.income;
  }

  addExpense(description, amount) {
    if (amount <= 0) {return 'Cannot add a negative amount'};
    if (description == '') {return 'Income description cannot be blank'};

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

// module.exports = Budget;
export default Budget;