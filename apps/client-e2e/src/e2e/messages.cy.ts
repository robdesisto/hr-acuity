import { createMessage, deleteMessage, getMessages } from '../support/messages.po';

let initialMessageCount: number;

describe('client-e2e', () => {
  beforeEach(() => {
    cy.visit('/');
    cy.login('test@something.com', 'myPassword');
  });

  afterEach(() => {
    cy.logout();
  });

  it('should load the messages', () => {
    getMessages().then(items => {
      initialMessageCount = Cypress.$(items).length;
      expect(initialMessageCount).gte(0);
    });
  });

  it('should add a message', () => {
    createMessage();
    getMessages().its('length').should('be.gt', initialMessageCount);
  });

  it('should delete a message', () => {
    deleteMessage();
    getMessages().its('length').should('eq', initialMessageCount);
  });
});
