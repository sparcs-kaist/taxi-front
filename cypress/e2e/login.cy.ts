/// <reference types="cypress" />
import "cypress-react-selector";

const urls = ["/search", "/addroom", "/myroom", "mypage"];

describe("Not authenticated user test", () => {
  it("Block user not logged in", () => {
    for (let url of urls) {
      cy.visit(url)
        .url()
        .should("not.eq", Cypress.config().baseUrl + url)
        .should("contain", "login");
    }
  });
});
