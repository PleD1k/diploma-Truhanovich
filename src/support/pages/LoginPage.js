class LoginPage {
  static locators = {
    loginInput: 'input[placeholder="Ник или e-mail"]',
    passwordInput: 'input[placeholder="Пароль"]',
    submitLoginButton: "button.auth-button_primary",
    loginErrorMsg: ".auth-form__description_error",
  };

  fillLogin(value) {
    cy.get(LoginPage.locators.loginInput).clear().type(value);
  }

  fillPassword(value) {
    cy.get(LoginPage.locators.passwordInput).clear().type(value);
  }

  submit() {
    cy.get(LoginPage.locators.submitLoginButton).click();
  }

  getLoginError() {
    return cy.get(LoginPage.locators.loginErrorMsg, { timeout: 10000 });
  }
}

export default LoginPage;
