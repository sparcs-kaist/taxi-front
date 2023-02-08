const login = () => {
  cy.request(`${Cypress.env("backendUrl")}/logininfo`).then((data) => {
    if (!data.body?.id)
      cy.request("POST", `${Cypress.env("backendUrl")}/auth/try`, {
        id: "test-id",
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
