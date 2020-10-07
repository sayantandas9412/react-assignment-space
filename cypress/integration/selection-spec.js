describe("Able to select planets and vehicles", () => {
  beforeEach(() => {
    cy.visit("/");
    cy.get("#AAA1111").select("Donlon");
  });

  it("after selecting a planet selection is disabled for that destination", () => {
    cy.get("#AAA1111").should("be.disabled");
  });

  it("after selecting vehicle, all vehicle options for that planet is disabled", () => {
    cy.get(".option-input").first().click();
    cy.get(".option-input").should("be.disabled");
  });

  it("the number of vehicles available changes on selecting a vehicle", () => {
    cy.get("label#AAA1111").first().should("contain", 2);
    cy.get(".option-input").first().click();
    cy.get("label#AAA1111").first().should("contain", 1);
  });

  it("alert shown when vehicle is not selected for particular planet", () => {
    cy.get(".planet-selection").eq(1).click();

    cy.get(".customAlert h3").should("be.visible");
  });

  it("alert is removed on clicking button OK", () => {
    cy.get(".planet-selection").eq(1).click();
    cy.get(".customAlert button").click();
    cy.get(".customAlert h3").should("not.be.visible");
  });

  it("selected planet option is disabled on next selection ", () => {
    cy.get("#BBB2222 option").eq(1).should("be.disabled");
  });
});
