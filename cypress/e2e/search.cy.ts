/// <reference types="cypress" />
import "cypress-react-selector";

import login from "../utils/login";

const TEST_DATETIME = new Date();
const TEST_ROOM_NAME =
  "test room " + TEST_DATETIME.toLocaleTimeString().replace(/:/g, "_");
const CREATE_ROOM_INFO = {
  from: "갤러리아",
  to: "택시승강장",
};
let createdRoomId: null | number = null;

describe("Create room tests", () => {
  before(() => {
    login();
    cy.request("GET", `${Cypress.env("backendUrl")}/rooms/removeAllRoom`);
  });

  it("Create room", () => {
    cy.intercept("POST", `${Cypress.env("backendUrl")}/rooms/create`, (req) => {
      req.continue((res) => {
        expect(res.statusCode).to.eq(200);
        console.log("Room created: ", res.body._id);
        createdRoomId = res.body._id;
      });
    }).as("createRoom");

    login();
    cy.waitForReact();

    cy.contains("방 개설").click();

    cy.contains("출발지").click();
    cy.react("PopupInput")
      .filter(":visible")
      .contains(CREATE_ROOM_INFO.from)
      .click();
    cy.react("PopupInput").filter(":visible").contains("선택하기").click();

    cy.contains("도착지").click();
    cy.react("PopupInput")
      .filter(":visible")
      .contains(CREATE_ROOM_INFO.to)
      .click();
    cy.react("PopupInput").filter(":visible").contains("선택하기").click();

    cy.react("DatePicker")
      .get(".datepicker-week")
      .children()
      .contains(TEST_DATETIME.getDate())
      .click();

    cy.react("OptionName").get("input").type(TEST_ROOM_NAME);

    cy.contains("시간 :").siblings().filter(".BTNC").first().click();
    cy.react("PopupInput")
      .filter(":visible")
      .contains(/^시$/)
      .prev()
      .contains(/^23$/)
      .click();
    cy.react("PopupInput")
      .filter(":visible")
      .contains(/^분$/)
      .prev()
      .contains(/^50$/)
      .click();
    cy.react("PopupInput").filter(":visible").contains("선택하기").click();

    cy.contains(/.+월.+일.+시.+분.+방 개설하기/).click();
    cy.wait("@createRoom");
  });

  it("Check created room at my room", () => {
    expect(createdRoomId).to.not.null;

    login();
    cy.visit("/myroom");
    cy.waitForReact();

    cy.react("Room").contains(TEST_ROOM_NAME).should("exist");
  });

  it("Check created room at search by name", () => {
    login();
    cy.visit("/search");
    cy.waitForReact();

    cy.contains("장소").click();

    cy.contains("출발지").click();
    cy.react("PopupInput")
      .filter(":visible")
      .contains(CREATE_ROOM_INFO.from)
      .click();
    cy.react("PopupInput").filter(":visible").contains("선택하기").click();

    cy.contains("도착지").click();
    cy.react("PopupInput")
      .filter(":visible")
      .contains(CREATE_ROOM_INFO.to)
      .click();
    cy.react("PopupInput").filter(":visible").contains("선택하기").click();

    cy.contains("어떤 조건").siblings().contains("방 검색하기").click();

    cy.react("Room").contains(TEST_ROOM_NAME).should("exist");
  });
});
