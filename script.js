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

const incomeSubmitBtn = document.querySelector('.add-property__income--btn');
const expenseSubmitBtn = document.querySelector('.add-property__expense--btn');

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

function displayFormSec(choice) {
  if (choice === 'income') {
    addIncomeSec.classList.remove('hidden');
    addExpenseSec.classList.add('hidden');
  } else {
    addIncomeSec.classList.add('hidden');
    addExpenseSec.classList.remove('hidden');
  }
}
