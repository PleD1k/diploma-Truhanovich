import '@shelex/cypress-allure-plugin';
import HomePage from "../support/pages/HomePage";

describe("UI тесты навигации и футера onliner.by", () => {
  const homePage = new HomePage();
  

  beforeEach(() => {
    homePage.visit();
    homePage.acceptCookies();
  });

  it("Checking the footer and links to social networks", () => {
    homePage.getFooter().should("be.visible");
    homePage.getTelegramLink().should("have.attr", "href").and("include", "t.me");
    homePage.getVkLink().should("have.attr", "href").and("include", "vk.com");
    homePage.getInstagramLink().should("have.attr", "href").and("include", "instagram.com");
  });
});
