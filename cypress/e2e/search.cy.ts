/// <reference types="cypress" />

import "cypress-react-selector";
import login from "../utils/login";

const TEST_DATETIME = new Date();
const TEST_ROOM_NAME =
  "test room " + TEST_DATETIME.toLocaleTimeString().replace(/:/g, "_");
let createdRoomId: null | number = null;

describe("Create room tests", () => {
  before(() => {
    login();
    cy.request("GET", "http://localhost:4000/rooms/removeAllRoom");
  });

  it("Create room", () => {
    cy.intercept("POST", "http://localhost:4000/rooms/create", (req) => {
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
    cy.react("PopupInput").filter(":visible").contains("갤러리아").click();
    cy.react("PopupInput").filter(":visible").contains("선택하기").click();

    cy.contains("도착지").click();
    cy.react("PopupInput").filter(":visible").contains("택시승강장").click();
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
});
