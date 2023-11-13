export const getMessages = () => cy.get('ul > li');

export const createMessage = () => {
  cy.get('#create-message textarea').first().type('Test message');
  cy.get('#create-message button[type="submit"]').click();
}

export const deleteMessage = () => {
  cy.get('ul > li').first().find('button').last().click();
}
