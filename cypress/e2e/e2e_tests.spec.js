describe('Finance Tracker E2E Tests', () => {
    beforeEach(() => {
      cy.visit('/');
    });
  
    it('should navigate through main sections', () => {
      cy.get('nav').contains('Income').click();
      cy.url().should('include', '/income');
      cy.get('h1').should('contain', 'Income');
  
      cy.get('nav').contains('Expenses').click();
      cy.url().should('include', '/expenses');
      cy.get('h1').should('contain', 'Expenses');
  
      cy.get('nav').contains('Savings').click();
      cy.url().should('include', '/savings');
      cy.get('h1').should('contain', 'Savings');
  
      cy.get('nav').contains('Investments').click();
      cy.url().should('include', '/investments');
      cy.get('h1').should('contain', 'Investments');
    });
  
    it('should interact with the savings tracker', () => {
      cy.get('nav').contains('Savings').click();
      cy.get('input[type="number"]').clear().type('1000');
      cy.contains('button', 'Add').click();
      cy.get('.total-savings').should('contain', '$1,000.00');
  
      cy.get('input[type="number"]').clear().type('500');
      cy.contains('button', 'Subtract').click();
      cy.get('.total-savings').should('contain', '$500.00');
    });
  
    it('should add and remove an expense', () => {
      cy.get('nav').contains('Expenses').click();
      cy.contains('button', 'Add Expense').click();
  
      cy.get('input[name="title"]').type('Grocery Shopping');
      cy.get('input[name="amount"]').type('150.50');
      cy.get('select[name="category"]').select('Food');
      cy.contains('button', 'Save').click();
  
      cy.contains('Grocery Shopping').should('be.visible');
      cy.contains('$150.50').should('be.visible');
  
      cy.contains('Grocery Shopping').parent().find('button').contains('Delete').click();
      cy.contains('Grocery Shopping').should('not.exist');
    });
  
    it('should add and update an income entry', () => {
      cy.get('nav').contains('Income').click();
      cy.contains('button', 'Add Income').click();
  
      cy.get('input[name="source"]').type('Freelance Work');
      cy.get('input[name="amount"]').type('1000');
      cy.contains('button', 'Save').click();
  
      cy.contains('Freelance Work').should('be.visible');
      cy.contains('$1,000.00').should('be.visible');
  
      cy.contains('Freelance Work').click();
      cy.get('input[name="amount"]').clear().type('1200');
      cy.contains('button', 'Update').click();
  
      cy.contains('Freelance Work').should('be.visible');
      cy.contains('$1,200.00').should('be.visible');
    });
  
    it('should set and track a savings goal', () => {
      cy.get('nav').contains('Goals').click();
      cy.contains('button', 'Add Goal').click();
  
      cy.get('input[name="title"]').type('Emergency Fund');
      cy.get('input[name="targetAmount"]').type('5000');
      cy.get('input[name="currentAmount"]').type('1000');
      cy.get('input[name="targetDate"]').type('2023-12-31');
      cy.contains('button', 'Save').click();
  
      cy.contains('Emergency Fund').should('be.visible');
      cy.contains('$1,000.00 / $5,000.00').should('be.visible');
      cy.get('.progress-bar').should('have.attr', 'style', 'width: 20%');
    });
  
    it('should generate and display a basic report', () => {
      cy.get('nav').contains('Reports').click();
      cy.get('select[name="reportType"]').select('Monthly Overview');
      cy.get('input[name="month"]').type('2023-07');
      cy.contains('button', 'Generate Report').click();
  
      cy.get('.report-container').should('be.visible');
      cy.get('.total-income').should('contain', 'Total Income:');
      cy.get('.total-expenses').should('contain', 'Total Expenses:');
      cy.get('.net-savings').should('contain', 'Net Savings:');
    });
  });