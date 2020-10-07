describe("the result section is displayed properly", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it.only("Clicking on Find Falcone after all the selections and then the Find button", () => {
    cy.get("#AAA1111").select("Donlon");
    cy.get(".option-input").eq(0).click();
    cy.get("#BBB2222").select("Enchai");
    cy.get(".option-input").eq(1).click();
    cy.get("#CCC3333").select("Jebing");
    cy.get(".option-input").eq(2).click();
    cy.get("#DDD4444").select("Sapir");
    cy.get(".option-input").eq(3).click();
    cy.get(".button-findFalcone").click();
    cy.get(".customAlert button").click();
    cy.get(".result-container").should("exist");
  });
});
