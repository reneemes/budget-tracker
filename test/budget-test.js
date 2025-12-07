import { expect } from 'chai';
import Budget from '../src/class/budget.js';

describe('constructor', function() {
  let user;

  beforeEach(function() {
    user = new Budget(
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
          id: 1,
          description: 'Full-Time Job',
          amount: 2115.38
        },
        income2: {
          id: 2,
          description: 'Weekend Job',
          amount: 200.02
        }
      }
    );
    user.addIncome('Dog Walking', 100.00);
    expect(user.income).to.deep.equal(
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
        },
        income3: {
          id: 3,
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
    user.addExpense('Hair Cut', 40.00);
    expect(user.expenses).to.deep.equal(
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
        },
        expense4: {
          id: 4,
          description: 'Hair Cut',
          amount: 40.00
        }
      }
    );
  });

  it('should edit an existing income', function() {
    user.editIncome(2, {description: 'Dog Sitting'});
    expect(user.income).to.deep.equal(
      {
        income1: {
          id: 1,
          description: 'Full-Time Job',
          amount: 2115.38
        },
        income2: {
          id: 2,
          description: 'Dog Sitting',
          amount: 200.02
        }
      }
    )
  });

  it('should edit an existing expense', function() {
    user.editExpense(1, {amount: 1410.25});
    expect(user.expenses).to.deep.equal(
      {
        expense1: {
          id: 1,
          description: 'Rent',
          amount: 1410.25,
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
    )
  });

  it('should delete an existing income', function() {
    user.deleteIncome(2);
    expect(user.income).to.deep.equal(
      {
        income1: {
          id: 1,
          description: 'Full-Time Job',
          amount: 2115.38
        }
      }
    )
  });

  it('should delete an existing expense', function() {
    user.deleteExpense(2);
    expect(user.expenses).to.deep.equal(
      {
        expense1: {
          id: 1,
          description: 'Rent',
          amount: 1509.25,
        },
        expense3: {
          id: 3,
          description: 'Groceries',
          amount: 520.25
        }
      }
    )
  });

  // Sad Path Tests:
  // Income
  it('sad path - handles a negative income amount', function() {
    user.addIncome('negative amount', -100.00);
    expect(user.income).to.deep.equal(
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
      }
    );
  });

  it('sad path - handles no income description', function() {
    user.addIncome('', 100.00);
    expect(user.income).to.deep.equal(
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
      }
    );
  });

  // Expenses
  it('sad path - handles a negative expense amount', function() {
    user.addExpense('negative amount', -100.00);
    expect(user.expenses).to.deep.equal(
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
  });

  it('sad path - handles no expense description', function() {
    user.addExpense('', 100.00);
    expect(user.expenses).to.deep.equal(
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
  });

});