// https://docs.cypress.io/api/introduction/api.html
import login from '../utils/login';

describe((new Date()).toString(), () => {
  it('Module mange', () => {
    login();

    cy.get('.item-list').last().click();
    cy.get('.item-list').last().click();

  });
});
