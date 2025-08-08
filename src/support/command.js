import 'cypress-iframe';
import '@shelex/cypress-allure-plugin';

Cypress.Commands.add('acceptCookies', () => {
  return cy.get('a#submit-button, button#submit-button', { timeout: 30000, log: false })
    .then($btn => {
      if ($btn.length && $btn.is(':visible')) {
        return cy.wrap($btn.first()).click();
      }
      cy.log('Cookie-banner не найден или уже закрыт, продолжаем');
      return Cypress.Promise.resolve();
    })
    .then(() => cy.document().its('readyState').should('eq', 'complete').wait(1000));
});
