/// <reference types="cypress" />

import "cypress-react-selector";

const urls = ["/search", "/addroom", "/myroom", "mypage"];

describe("Notgg authenticated user test", () => {
  it("Block user not logged in", async () => {
    for (let url of urls) {
      cy.visit(url)
        .wait(1000)
        .url()
        .should("not.eq", Cypress.config().baseUrl + url)
        .should("contain", "login");
    }
  });
});
