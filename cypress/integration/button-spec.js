describe("the find falcone button and the Reset button is disabled and enabled properly", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("Find Falcone button is disabled untill all the planets and vehicles are selected", () => {
    cy.get(".button-findFalcone").should("be.disabled");
    cy.get("#AAA1111").select("Donlon");
    cy.get(".option-input").eq(0).click();
    cy.get("#BBB2222").select("Enchai");
    cy.get(".option-input").eq(1).click();
    cy.get("#CCC3333").select("Jebing");
    cy.get(".option-input").eq(2).click();
    cy.get("#DDD4444").select("Sapir");
    cy.get(".option-input").eq(3).click();
    cy.get(".button-findFalcone").should("not.be.disabled");
  });

  it("the reset button is enabled only when a planet is selected", () => {
    cy.get(".reset-button").should("not.exist");
    cy.get("#AAA1111").select("Donlon");
    cy.get(".reset-button").should("exist");
  });

  it("the reset button is not present on result page", () => {
    cy.visit("/error");
    cy.get(".reset-button").should("not.exist");
  });
});

describe("The Start Again button on Result page is working properly", () => {
  it("The Start Again button is working properly", () => {
    cy.visit("/result");
    cy.get(".result-container").should("exist");
    cy.get(".button-startAgain").click();
    cy.get(".result-container").should("not.exist");
  });
});
