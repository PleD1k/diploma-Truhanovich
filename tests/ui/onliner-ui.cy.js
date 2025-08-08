import '@shelex/cypress-allure-plugin';
import HomePage from "../../src/support/pages/HomePage";
import LoginPage from "../../src/support/pages/LoginPage";
import SearchPage from "../../src/support/pages/SearchPage";

describe("UI тесты для сайта onliner.by", () => {
  const homePage = new HomePage();
  const loginPage = new LoginPage();
  const searchPage = new SearchPage();

  beforeEach(() => {
    homePage.visit();
    homePage.acceptCookies();
  });

  context("Positive scenarios", () => {
    it("Product search and go to the page with title verification", () => {
      searchPage.searchProduct("MacBook");
      searchPage.openProductFromResults("MacBook");

      cy.origin("https://catalog.onliner.by", () => {
        cy.get(".catalog-masthead__title", { timeout: 15000 }).should(
          "contain.text",
          "Ноутбук Apple MacBook Air"
        );
      });
    });

    it("Proceed to checkout and check the header", () => {
      searchPage.searchProduct("Наушники");
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

    it("Switching to vacuum from image and URL verification", () => {
      cy.origin("https://catalog.onliner.by", () => {
        cy.visit("/");
        cy.get('img.catalog-form__image[alt="Пылесосы"]', {
          timeout: 15000,
        }).click({ force: true });
        cy.url().should("include", "/vacuumcleaner");
      });
    });

    it("Checking the footer and links to social networks", () => {
      homePage.getFooter().should("be.visible");
      homePage.getTelegramLink().should("have.attr", "href").and("include", "t.me");
      homePage.getVkLink().should("have.attr", "href").and("include", "vk.com");
      homePage.getInstagramLink().should("have.attr", "href").and("include", "instagram.com");
    });
  });

  context("Negative scenarios", () => {
    it("Incorrect login and correct password shows an error", () => {
      homePage.openLoginForm();

      loginPage.fillLogin("неверный_логин");
      loginPage.fillPassword(Cypress.env('LOGIN_PASSWORD'));
      loginPage.submit();

      loginPage.getLoginError().should("contain.text", "Неверный логин или пароль");
    });

    it("A correct login and an incorrect password shows an error", () => {
      homePage.openLoginForm();

      loginPage.fillLogin(Cypress.env('LOGIN_USERNAME'));
      loginPage.fillPassword("wrong_password");
      loginPage.submit();

      loginPage.getLoginError().should("contain.text", "Неверный логин или пароль");
    });

    it("Empty login and password fields do not allow you to log in", () => {
      homePage.openLoginForm();

      cy.get(LoginPage.locators.submitLoginButton).click();
      loginPage.getLoginError().should("exist");
    });
  });
});
