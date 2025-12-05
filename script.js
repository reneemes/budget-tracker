import Budget from './class/budget.js';

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

const addIncomeSec = document.querySelector('.add-property__income');
const addExpenseSec = document.querySelector('.add-property__expense');

const welcomeText = document.querySelector('.welcome__title');
const formSelectBtn = document.querySelectorAll('.btn-sec__btn');
const budgetSection = document.querySelector('.welcome__budget');

const incomeDescription = document.querySelector('#income-description');
const incomeAmount = document.querySelector('#income-amount');

const expenseDescription = document.querySelector('#expense-description');
const expenseAmount = document.querySelector('#expense-amount');

const incomeSubmitBtn = document.querySelector('.add-property__income--btn');
const expenseSubmitBtn = document.querySelector('.add-property__expense--btn');

const colors = ['#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6', '#3498db'];

welcomeText.textContent = `Welcome ${user.userName}`;
budgetSection.insertAdjacentHTML('afterbegin', `
  <p class='welcome__budget--text'>Your current budget:</p>
  <p class='welcome__budget--total'>$${user.calculateTotalBudget()}</p>
`);
updatePieChart();


formSelectBtn.forEach(btn => {
  btn.addEventListener('click', function() {
    formSelectBtn.forEach(b => {
      b.classList.remove('btn-sec__btn--selected');
    });
    this.classList.add('btn-sec__btn--selected');

    const choice = btn.dataset.type;
    displayFormSec(choice);
  });
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

incomeSubmitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let amount = Number(incomeAmount.value);
  user.addIncome(incomeDescription.value, amount);
  console.log(user.income);
  updateBudgetDisplay();
  updatePieChart();
})

expenseSubmitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let amount = Number(expenseAmount.value);
  user.addExpense(expenseDescription.value, amount);
  console.log(user.expenses);
  updateBudgetDisplay();
  updatePieChart();
})

function updateBudgetDisplay() {
  const total = user.calculateTotalBudget();
  const budgetEl = document.querySelector('.welcome__budget--total');
  budgetEl.textContent = `$${total}`;
}

// Chart Logic
function getExpensePercentages() {
  const expenses = Object.values(user.expenses);
  const total = expenses.reduce((acc, e) => {
    return acc = acc + e;
  }, 0);

  return expenses.map(e => ({
    description: e.description,
    amount: e.amount,
    percent: total === 0 ? 0 : (e.amount / total) * 100
  }));
}

function updatePieChart() {
  const sections = getExpensePercentages();
  const chart = document.querySelector('.welcome__chart');

  let gradient = 'conic-gradient(';
  let currentStart = 0;

  sections.forEach((sec, index) => {
    const end = currentStart + sec.percent;
    const color = colors[index % colors.length];

    gradient += `${color} ${currentStart}% ${end}%,`;
    currentStart = end;
  });

  // remove last comma & close
  gradient = gradient.slice(0, -1) + ')';

  chart.style.background = gradient;
}

// Table Logic

