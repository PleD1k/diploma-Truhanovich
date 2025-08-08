class ProductPage {
  constructor() {
    this.locators = {
      addToCartButton: "a.product-aside__button_cart",
      recommendedSidebarClose: "div.product-recommended__sidebar-close",
      cartCounter: "div.auth-bar__counter",
    };
  }

  addFirstProductToCart() {
    cy.get(this.locators.addToCartButton, { timeout: 15000 }).first().click();
  }

  closeRecommendedSidebar() {
    cy.get(this.locators.recommendedSidebarClose, { timeout: 15000 }).first().click();
  }

  getCartCounter() {
    return cy.get(this.locators.cartCounter, { timeout: 10000 });
  }
}

export default ProductPage;
