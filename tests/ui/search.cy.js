import '@shelex/cypress-allure-plugin';
import SearchPage from "../support/pages/SearchPage";
import HomePage from "../support/pages/HomePage";

describe("UI тесты поиска onliner.by", () => {
  const searchPage = new SearchPage();
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
    homePage.acceptCookies();
  });

  it("Product search and go to the page with title verification", () => {
    searchPage.enterSearchQuery("MacBook");
    searchPage.waitForSearchResults("MacBook");
    searchPage.openProductFromResults("MacBook");

    cy.origin("https://catalog.onliner.by", () => {
      cy.get(".catalog-masthead__title", { timeout: 15000 }).should(
        "contain.text",
        "Ноутбук Apple MacBook Air"
      );
    });
  });

  it("Switching to vacuum from image and URL verification", () => {
    cy.origin("https://catalog.onliner.by", () => {
      cy.visit("/");
      cy.get('img.catalog-form__image[alt="Пылесосы"]', {
        timeout: 15000,
      }).click({ force: true });
      cy.url().should("include", "/vacuumcleaner");
    });
  });
});
