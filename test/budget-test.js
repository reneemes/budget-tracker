import { expect } from 'chai';
import Budget from '../class/budget.js';

describe('constructor', function() {
  let user;

  beforeEach(function() {
    user = new Budget(
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
  });

  it('should initialize a budget object', function() {
    expect(user.userName).to.equal('Jane');
  });

  it('should calculate the total budget', function() {
    expect(user.calculateTotalBudget()).to.equal('2495.80');
    expect(user.totalIncome).to.equal(4630.8);
    expect(user.totalExpenses).to.equal(2135);
  });

  it('should add income to the user', function() {
    expect(user.income).to.deep.equal(
      {
        income1: {
          description: 'Full-Time Job',
          amount: 2115.38
        },
        income2: {
          description: 'Weekend Job',
          amount: 200.02
        }
      }
    );
    user.addIncome('Dog Walking', 100.00);
    expect(user.income).to.deep.equal(
      {
        income1: {
          description: 'Full-Time Job',
          amount: 2115.38
        },
        income2: {
          description: 'Weekend Job',
          amount: 200.02
        },
        income3: {
          description: 'Dog Walking',
          amount: 100.00
        }
      }
    );
  });

  it('should add expenses to the user', function() {
    expect(user.expenses).to.deep.equal(
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
    user.addExpense('Hair Cut', 40.00);
    expect(user.expenses).to.deep.equal(
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
        },
        expense4: {
          description: 'Hair Cut',
          amount: 40.00
        }
      }
    );
  });

  // Sad Path Tests:
  // Income
  it('sad path - handles a negative income amount', function() {
    user.addIncome('negative amount', -100.00);
    expect(user.income).to.deep.equal(
      {
        income1: {
          description: 'Full-Time Job',
          amount: 2115.38
        },
        income2: {
          description: 'Weekend Job',
          amount: 200.02
        }
      }
    );
  });

  it('sad path - handles no income description', function() {
    user.addIncome('', 100.00);
    expect(user.income).to.deep.equal(
      {
        income1: {
          description: 'Full-Time Job',
          amount: 2115.38
        },
        income2: {
          description: 'Weekend Job',
          amount: 200.02
        }
      }
    );
  });

  // Expenses
  it('sad path - handles a negative expense amount', function() {
    user.addExpense('negative amount', -100.00);
    expect(user.expenses).to.deep.equal(
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
  });

  it('sad path - handles no expense description', function() {
    user.addExpense('', 100.00);
    expect(user.expenses).to.deep.equal(
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
  });

});