const login = () => {
  cy.request(`${Cypress.env("backendUrl")}/json/logininfo`).then((data) => {
    if (!data.body?.id)
      cy.request("POST", `${Cypress.env("backendUrl")}/auth/try`, {
        id: "test-id",
        name: "test-id-name",
        sid: "test-id-sid",
      });

    cy.visit("/");
    const btn = cy
      .get('[data-cy="agreement-bottom"]')
      .children()
      .eq(0)
      .children()
      .eq(0)
      .click({ force: true });
  });
};

export default login;
