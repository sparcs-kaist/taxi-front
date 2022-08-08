/// <reference types="cypress" />

import "cypress-react-selector";
import login from "../utils/login";

describe("Mypage functionallity test", () => {
  beforeEach(() => {
    login();
    cy.visit("/mypage");
    cy.waitForReact();
  });

  it("Terms of use should be shown", () => {
    cy.contains("사용 약관 및 개인정보 보호 규칙").click();
    cy.react("PopupPolicy").should("be.visible");
  });

  it("People who made should be shown", () => {
    cy.contains("만든 사람들").click();
    cy.react("PopupSparcs").should("be.visible");
  });

  it("User should be moved to login page when logout", () => {
    cy.contains("로그아웃").click();
    cy.url().should("eq", Cypress.config().baseUrl + "/login");
  });
});
