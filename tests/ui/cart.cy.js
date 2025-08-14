import '@shelex/cypress-allure-plugin';
import HomePage from "../support/pages/HomePage";
import SearchPage from "../support/pages/SearchPage";

describe("UI тесты корзины и оформления заказа onliner.by", () => {
  const searchPage = new SearchPage();
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.visit();
    homePage.acceptCookies();
  });

  it("Proceed to checkout and check the header", () => {
    searchPage.enterSearchQuery("Наушники");
    searchPage.waitForSearchResults("Наушники");
    searchPage.openProductFromResults("Наушники");

    cy.origin("https://catalog.onliner.by", () => {
      class CatalogPage {
        addFirstProductToCart() {
          cy.get("a.product-aside__button_cart", { timeout: 15000 }).first().click();
        }
        closeRecommendedSidebar() {
          cy.get("div.product-recommended__sidebar-close", { timeout: 15000 }).first().click();
        }
        getCartCounter() {
          return cy.get("div.auth-bar__counter", { timeout: 10000 });
        }
      }
      const catalogPage = new CatalogPage();

      catalogPage.addFirstProductToCart();
      catalogPage.closeRecommendedSidebar();
      catalogPage.getCartCounter()
        .invoke("text")
        .then(txt => {
          expect(Number(txt.trim())).to.be.greaterThan(0);
        });
    });

    cy.origin("https://cart.onliner.by", () => {
      class CartPage {
        clickCheckoutButton() {
          cy.get("a.button-style.button-style_small.cart-form__button.button-style_primary", { timeout: 15000 }).click();
        }
        checkOrderPageTitle() {
          cy.get(".cart-form__title.cart-form__title_base.cart-form__title_nocondensed.cart-form__title_condensed-other", { timeout: 15000 })
            .should("contain.text", "Оформление заказа");
        }
      }
      const cartPage = new CartPage();
      
      cy.on("uncaught:exception", () => false);
      cy.visit("https://cart.onliner.by");
      cartPage.clickCheckoutButton();
      cy.url().should("eq", "https://cart.onliner.by/order");
      cartPage.checkOrderPageTitle();
    });
  });
});
