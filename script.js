import Budget from './class/budget.js';

const user = new Budget(
  'Jane',
  {
    income1: {
      id: 1,
      description: 'Full-Time Job',
      amount: 2115.38
    },
    income2: {
      id: 2,
      description: 'Weekend Job',
      amount: 200.02
    }
  },
  {
    expense1: {
      id: 1,
      description: 'Rent',
      amount: 1509.25,
    },
    expense2: {
      id: 2,
      description: 'Utilities',
      amount: 105.50
    },
    expense3: {
      id: 3,
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

function populateData() {
  budgetSection.innerHTML = '';

  welcomeText.textContent = `Welcome ${user.userName}`;
  budgetSection.insertAdjacentHTML('afterbegin', `
    <p class='welcome__budget--text'>Your current budget:</p>
    <p class='welcome__budget--total'>$${user.calculateTotalBudget()}</p>
    `);
    
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
  setupTableRows();
})

expenseSubmitBtn.addEventListener('click', (e) => {
  e.preventDefault();
  let amount = Number(expenseAmount.value);
  user.addExpense(expenseDescription.value, amount);
  console.log(user.expenses);
  updateBudgetDisplay();
  setupTableRows();
})

function updateBudgetDisplay() {
  const total = user.calculateTotalBudget();
  const budgetEl = document.querySelector('.welcome__budget--total');
  budgetEl.textContent = `$${total}`;
}

// Table Logic
function setupTableRows() {
  incomeTable.innerHTML = '';
  expenseTable.innerHTML = '';

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
    console.log(expense)
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
    editTableCell(row, id, 'income');
  }

  if (e.target.classList.contains('delete-btn')) {
    const row = e.target.closest('tr');
    const id = row.id;
    row.remove();
    user.deleteIncome(id);
  }

  populateData();
});

expenseTable.addEventListener('click', (e) => {
  if (e.target.classList.contains('edit-btn')) {
    const row = e.target.closest('tr');
    const id = row.id;
    editTableCell(row, id, 'expense');
  }

  if (e.target.classList.contains('delete-btn')) {
    const row = e.target.closest('tr');
    const id = row.id;
    row.remove();
    user.deleteExpense(id);
  }

  populateData();
});

function editTableCell(tableRow, id, type) {
  if (tableRow.classList.contains('editing')) return;
  tableRow.classList.add('editing');

  const [descriptionCell, amountCell] = tableRow.querySelectorAll('td');

  const originalDescription = descriptionCell.textContent.trim();
  const originalAmount = amountCell.textContent.replace('$', '').trim();

  const inputDes = document.createElement('input');
  const inputAmount = document.createElement('input');

  inputDes.type = 'text';
  inputAmount.type = 'text';
  inputAmount.inputMode = 'decimal';

  inputDes.value = originalDescription;
  inputAmount.value = originalAmount;

  descriptionCell.innerHTML = '';
  descriptionCell.appendChild(inputDes);

  amountCell.innerHTML = '';
  amountCell.appendChild(inputAmount);

  inputDes.focus();

  function handleEnter(e) {
    if (e.key === 'Enter') {
      e.preventDefault();

      const data = {
        description: inputDes.value,
        amount: parseFloat(inputAmount.value)
      }

      if (type === 'income') {
        user.editIncome(id, data);
      } else if (type === 'expense') {
        user.editExpense(id, data);
      }
      
      descriptionCell.textContent = inputDes.value;
      amountCell.textContent = `$${parseFloat(inputAmount.value).toFixed(2)}`;
      tableRow.classList.remove('editing');
      populateData();
    }
  }

  inputDes.addEventListener('keydown', handleEnter);
  inputAmount.addEventListener('keydown', handleEnter);
}

document.addEventListener('DOMContentLoaded', () => {
  populateData();
  setupTableRows();
});
