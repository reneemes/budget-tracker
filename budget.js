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

module.exports = Budget;

const user = new Budget(
  'Jane',
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

const addIncomeSec = document.querySelector('.main__add-property--income');
const addExpenseSec = document.querySelector('.main__add-property--expense');

const formSelectBtn = document.querySelectorAll('.form__btn');

formSelectBtn.forEach( btn => {
  btn.addEventListener('click', function() {
    formSelectBtn.forEach( b => {
      b.classList.remove('form__btn--selected');
    })
    this.classList.add('form__btn--selected');
  })
});

function displayFormSec(choice) {
  if (choice === 'income') {
    addIncomeSec.classList.remove('hidden');
    addExpenseSec.classList.add('hidden');
  } else {
    addIncomeSec.classList.add('hidden');
    addExpenseSec.classList.remove('hidden');
  }
}