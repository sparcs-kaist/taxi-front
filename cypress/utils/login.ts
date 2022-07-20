const login = () => {
  cy.request("http://localhost:4000/json/logininfo").then((data) => {
    if (!data.body?.id)
      cy.request("POST", "http://localhost:4000/auth/try", { id: "test-id" });

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
