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

const incomeTable = document.querySelector('.income-list__table');
const expenseTable = document.querySelector('.expense-list__table');

// const colors = ['#e74c3c', '#2ecc71', '#f1c40f', '#9b59b6', '#3498db'];
function populateData() {

  welcomeText.textContent = `Welcome ${user.userName}`;
  budgetSection.insertAdjacentHTML('afterbegin', `
    <p class='welcome__budget--text'>Your current budget:</p>
    <p class='welcome__budget--total'>$${user.calculateTotalBudget()}</p>
    `);
    // updatePieChart();
    
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
}

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
  // updatePieChart();
})

expenseSubmitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let amount = Number(expenseAmount.value);
  user.addExpense(expenseDescription.value, amount);
  console.log(user.expenses);
  updateBudgetDisplay();
  // updatePieChart();
})

function updateBudgetDisplay() {
  const total = user.calculateTotalBudget();
  const budgetEl = document.querySelector('.welcome__budget--total');
  budgetEl.textContent = `$${total}`;
}

const editBtn = document.querySelectorAll('.edit-btn');
const deleteBtn = document.querySelectorAll('.delete-btn');
// Table Logic
function setupTableRows() {
  const incomeVal = Object.values(user.income);
  incomeVal.forEach(income => {
    incomeTable.insertAdjacentHTML('beforeend', `
      <tr class='income-list__table--tr' id='${income.id}'>
        <td class='income-list__table--td'>${income.description}</td>
        <td class='income-list__table--td'>$${income.amount.toFixed(2)}</td>
        <td><button class='edit-btn'>✎ Edit</button> <button class='delete-btn'>Delete</button></td>
      </tr>
    `);
  })

  const expenseVal = Object.values(user.expenses);
  expenseVal.forEach(expense => {
    expenseTable.insertAdjacentHTML('beforeend', `
      <tr class='expense-list__table--tr' id='${expense.id}'>
        <td class='expense-list__table--td'>${expense.description}</td>
        <td class='expense-list__table--td'>$${expense.amount.toFixed(2)}</td>
        <td><button class='edit-btn'>✎ Edit</button> <button class='delete-btn'>Delete</button></td>
      </tr>
    `);
  })
}

// Attach the eventListener after the table row populates
incomeTable.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit-btn')) {
    const row = e.target.closest('tr');
    const id = row.id;
    console.log('Edit income:', id);
    user.editIncome(id, {});
  }

  if (e.target.classList.contains('delete-btn')) {
    const row = e.target.closest('tr');
    const id = row.id;
    console.log('Delete expense:', id);
  }
});

expenseTable.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit-btn')) {
    const row = e.target.closest('tr');
    const id = row.id;
    console.log('Edit expense:', id);
    user.editExpense(id, {})
  }

  if (e.target.classList.contains('delete-btn')) {
    const row = e.target.closest('tr');
    const id = row.id;
    console.log('Delete expense:', id);
  }
});


document.addEventListener('DOMContentLoaded', () => {
  populateData();
  setupTableRows();
});
