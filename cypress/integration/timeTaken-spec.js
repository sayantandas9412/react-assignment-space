describe("Time Taken field is working properly", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  it("The Time Taken is updated properly", () => {
    cy.get(".time-container h2").should("contain", 0);
    cy.get("#AAA1111").select("Donlon");
    cy.get(".option-input").eq(0).click();
    cy.get(".time-container h2").should("contain", 50);
  });

  it("The Time Taken is updated properly after all selections are completed", () => {
    cy.get("#AAA1111").select("Donlon");
    cy.get(".option-input").eq(0).click();
    cy.get("#BBB2222").select("Enchai");
    cy.get(".option-input").eq(1).click();
    cy.get("#CCC3333").select("Jebing");
    cy.get(".option-input").eq(2).click();
    cy.get("#DDD4444").select("Sapir");
    cy.get(".option-input").eq(3).click();
    cy.get(".time-container h2").should("contain", 200);
  });

  it("the time taken field is displayed on the results page correctly", () => {
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
    cy.get(".time-container h2").should("contain", 200);
  });
});
