import '@shelex/cypress-allure-plugin';
import HomePage from "../support/pages/HomePage";
import LoginPage from "../support/pages/LoginPage";

describe("UI тесты авторизации onliner.by", () => {
  const homePage = new HomePage();
  const loginPage = new LoginPage();

  beforeEach(() => {
    homePage.visit();
    homePage.acceptCookies();
  });

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
