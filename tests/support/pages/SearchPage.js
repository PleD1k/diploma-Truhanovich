import "cypress-iframe";

class SearchPage {
  constructor() {
    this.locators = {
      searchInput: "#fast-search input",
      searchIframe: "iframe.modal-iframe",
      productTitleLink: "a.product-card__title-link, a.product__title-link",
    };
  }

  enterSearchQuery(term) {
    cy.get(this.locators.searchInput, { timeout: 20000 })
      .should("be.visible")
      .should("not.be.disabled")
      .click()
      .invoke("val", term);
    cy.wait(1000);
  }

  waitForSearchResults(term) {
    cy.get("body").then(($body) => {
      const hasIframe = $body.find(this.locators.searchIframe).length > 0;

      if (hasIframe) {
        cy.frameLoaded(this.locators.searchIframe);
        cy.iframe(this.locators.searchIframe)
          .find(this.locators.productTitleLink)
          .contains(term)
          .should("exist");
      } else {
        cy.get(this.locators.searchInput).type("{enter}");
        cy.intercept("GET", "**/search*").as("searchResults");
        cy.wait("@searchResults", { timeout: 20000 });
        cy.get(this.locators.productTitleLink)
          .contains(term)
          .should("exist");
      }
    });
  }

  openProductFromResults(term) {
    cy.get("body").then(($body) => {
      const hasIframe = $body.find(this.locators.searchIframe).length > 0;

      if (hasIframe) {
        cy.iframe(this.locators.searchIframe)
          .find(this.locators.productTitleLink)
          .contains(term)
          .first()
          .click({ force: true });
      } else {
        cy.get(this.locators.productTitleLink)
          .contains(term)
          .first()
          .click();
      }
    });
  }

  searchProduct(term) {
    this.enterSearchQuery(term);
  }
}

export default SearchPage;
