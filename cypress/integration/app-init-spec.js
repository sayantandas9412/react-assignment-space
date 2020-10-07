import planets from "../fixtures/planets.json";
import vehicles from "../fixtures/vehicles.json";

describe("App initialization", () => {
  it("loads planets on page load", () => {
    cy.request("https://findfalcone.herokuapp.com/planets").should(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length(planets.length);
      }
    );
    cy.visit("/");
    cy.get("#AAA1111 .planet-option").should("have.length", planets.length);
  });

  it("loads vehicles on page load", () => {
    cy.request("https://findfalcone.herokuapp.com/vehicles").should(
      (response) => {
        expect(response.status).to.eq(200);
        expect(response.body).to.have.length(vehicles.length);
      }
    );
    cy.visit("/");
    cy.get("label#AAA1111").should("have.length", vehicles.length);
  });

  it("displays an error message on failure", () => {
    // cy.server();
    // cy.route({
    //   url: "https://findfalcone.herokuapp.com/planets",
    //   method: "GET",
    //   delay: 5000,
    //   status: 422,
    //   response: {},
    // });
    // cy.request("https://findfalcone.herokuapp.com/vehicle").then((response) =>
    //   console.log(response).catch((error) => console.log(error))
    // );

    cy.visit("/error");
    cy.get("#AAA1111 .planet-option").should("not.exist");
    cy.get("label#AAA1111").should("not.exist");
    cy.get(".error-container h1").should("exist");
  });
});
