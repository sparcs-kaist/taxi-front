/// <reference types="cypress" />
import "cypress-react-selector";

import login from "../utils/login";

const TAXI_PURPLE = "rgb(110, 54, 120)";

const SEARCH_TEXT = "검색";
const ADD_ROOM_TEXT = "방 개설";
const MY_ROOM_TEXT = "내 방";
const MY_PAGE_TEXT = "마이 페이지";

const navigationTexts = [
  SEARCH_TEXT,
  ADD_ROOM_TEXT,
  MY_ROOM_TEXT,
  MY_PAGE_TEXT,
];

const checkTabColors = (selectedTab) => {
  // selected tab should be purple
  cy.get("#navigation a")
    .contains(selectedTab)
    .should("have.css", "color")
    .and("eq", TAXI_PURPLE);

  // other tabs should not be purple
  for (let text of navigationTexts) {
    if (text !== selectedTab) {
      cy.get("#navigation a")
        .contains(text)
        .should("have.css", "color")
        .and("not.eq", TAXI_PURPLE);
    }
  }
};

describe("Navigation bar functionallity test", () => {
  beforeEach(() => {
    login();
    cy.waitForReact();
  });

  it("Search tab", () => {
    cy.get("#navigation").contains(SEARCH_TEXT).click();
    checkTabColors(SEARCH_TEXT);
    cy.url().should("eq", Cypress.config().baseUrl + "/search"); // check by URL
    cy.react("Title").should("contain.text", "방 검색하기"); // check by title text
  });

  it("Add room tab", () => {
    cy.get("#navigation").contains(ADD_ROOM_TEXT).click();
    checkTabColors(ADD_ROOM_TEXT);
    cy.url().should("eq", Cypress.config().baseUrl + "/addroom");
    cy.react("Title").should("contain.text", "방 개설하기");
  });

  it("My room tab", () => {
    cy.get("#navigation").contains(MY_ROOM_TEXT).click();
    checkTabColors(MY_ROOM_TEXT);
    cy.url().should("eq", Cypress.config().baseUrl + "/myroom");
    cy.react("Title").should("contain.text", "내 방 리스트");
  });

  it("My page tab", () => {
    cy.get("#navigation").contains(MY_PAGE_TEXT).click();
    checkTabColors(MY_PAGE_TEXT);
    cy.url().should("eq", Cypress.config().baseUrl + "/mypage");
    cy.react("Title").should("contain.text", "마이 페이지");
  });
});
