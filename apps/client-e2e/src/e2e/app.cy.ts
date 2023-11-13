import { getAppName, getLoginBtn } from '../support/app.po';

describe('client-e2e', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should not login without credentials', () => {
    getLoginBtn().click();
    cy.get('#username-helper-text').contains('Please enter a username');
    cy.get('#password-helper-text').contains('Please enter a password');
  });

  it('should not login with only one credential', () => {
    cy.get('#username').type('someeusername');
    getLoginBtn().click();
    cy.get('#password-helper-text').contains('Please enter a password');
  });

  it('should login', () => {
    cy.login('test@something.com', 'myPassword');
    getAppName().contains(/HR Acuity Messenger/);
    cy.logout();
  });
});
