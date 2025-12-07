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
    if (description == '') {return 'Income description cannot be blank'};
    if (amount <= 0) {return 'Amount cannot be zero or negative'};

    let incomeLength = Object.keys(this.income).length + 1
    let keyName = `income${incomeLength}`;

    this.income[keyName] = {
      id: incomeLength,
      description: description,
      amount: amount
    };
    return this.income;
  }

  addExpense(description, amount) {
    if (description == '') {return 'Expense description cannot be blank'};
    if (amount <= 0) {return 'Amount cannot be zero or negative'};

    let expensesLength = Object.keys(this.expenses).length + 1
    let keyName = `expense${expensesLength}`;

    this.expenses[keyName] = {
      id: expensesLength,
      description: description,
      amount: amount
    };
    return this.expenses;
  }

  editIncome(id, {description = null, amount = null} = {}) {
    let x = this.income[`income${id}`];

    if (description !== null) x.description = description;
    if (amount !== null) x.amount = amount;
    
    return x;
  }

  editExpense(id, {description = null, amount = null} = {}) {
    let x = this.expenses[`expense${id}`];

    if (description !== null) x.description = description;
    if (amount !== null) x.amount = amount;
    
    return x;
  }

  deleteIncome(id) {
    delete this.income[`income${id}`];
  }

  deleteExpense(id) {
    delete this.expenses[`expense${id}`];
  }

  #addUpIncome() {
    let incomeTotal = Object.values(this.income).reduce((acc, val) => {
      return acc = acc + val.amount;
    }, 0);
    this.totalIncome = incomeTotal;
  }

  #addUpExpenses() {
    let expenseTotal = Object.values(this.expenses).reduce((acc, val) => {
      return acc = acc + val.amount;
    }, 0);
    this.totalExpenses = expenseTotal;
  }

}

export default Budget;