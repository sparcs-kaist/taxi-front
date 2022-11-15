const login = () => {
  cy.request("POST", `${Cypress.env("backendUrl")}/auth/try`, {
    id: "test-id",
    name: "test-id-name",
    sid: "test-id-sid",
  });

  cy.visit("/").wait(1000);
  cy.get('[data-cy="agreement-bottom"]')
    .contains("동의")
    .click({ force: true });
};

export default login;
