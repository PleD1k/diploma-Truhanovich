class HomePage {
  constructor() {
    this.locators = {
      searchInput: "#fast-search input",
      footer: ".footer-style__flex",
      telegramLink: 'a.footer-style__social-button_tg[href*="t.me"]',
      vkLink: 'a.footer-style__social-button_vk[href*="vk.com"]',
      instagramLink: 'a.footer-style__social-button_in[href*="instagram.com"]',
      headerUnderlay: ".header-style__underlay",
      loginLink: "a.header-style__link.header-style__link_primary",
    };
  }

  visit() {
    cy.visit("/");
  }

  acceptCookies() {
    cy.acceptCookies();
  }

  openLoginForm() {
    cy.get(this.locators.headerUnderlay, { timeout: 10000 })
      .should("be.visible")
      .click();

    cy.get(this.locators.loginLink, { timeout: 15000 })
      .contains("Войти")
      .click();

    cy.get('input[placeholder="Ник или e-mail"]', { timeout: 15000 }).should("be.visible");
  }

  getFooter() {
    return cy.get(this.locators.footer);
  }

  getTelegramLink() {
    return cy.get(this.locators.telegramLink);
  }

  getVkLink() {
    return cy.get(this.locators.vkLink);
  }

  getInstagramLink() {
    return cy.get(this.locators.instagramLink);
  }
}

export default HomePage;
