describe("Cypress", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("is working", () => {
    expect(true).to.equal(true);
  });

  it("focuses on the select on load", () => {
    cy.focused().should("have.class", "selection");
  });

  it("able to select the planets", () => {
    cy.get("#AAA1111").select("Donlon");
  });
});
