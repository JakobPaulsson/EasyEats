/// <reference types="cypress" />
// Tests usage of the ingredients page.
describe("Using the ingredients page", () => {
  before(() => {});
  beforeEach(() => {
    cy.viewport(1500, 800);
    cy.visit("localhost:3000/ingredients");
  });
  it("Navigates to the ingredients page", () => {
    cy.get("[data-cy=Ingredients]").click();
    cy.url().should("include", "/ingredients");
  });

  it("Searching for an ingredient", () => {
    cy.wait(500);
    cy.get("[data-cy=addIngredient]").should("have.value", "");
    cy.get("[data-cy=addIngredient]").click();
    cy.get("[data-cy=addIngredient]").type("milk{downArrow}{enter}");
    cy.get("[data-cy=addIngredient]")
      .find("input")
      .should("have.value", "milk");
  });

  it("Should not be able to add ingredient to inventory with invalid amount and unit", () => {
    cy.wait(500);
    cy.get("[data-cy=addIngredient]").should("have.value", "");
    cy.get("[data-cy=addIngredient]").click();
    cy.get("[data-cy=addIngredient]").type("milk{downArrow}{enter}");
    cy.get("[data-cy=addButton]").click();
    cy.get("[data-cy=OkButton]").should("exist");
    cy.wait(500);
  });

  it("Should not be able to add ingredient to inventory with invalid unit", () => {
    cy.wait(500);
    cy.get("[data-cy=addIngredient]").should("have.value", "");
    cy.get("[data-cy=addIngredient]").click();
    cy.get("[data-cy=addIngredient]").type("milk{downArrow}{enter}");

    cy.get("[data-cy=addAmount]").should("have.value", "");
    cy.get("[data-cy=addAmount]").click();
    cy.get("[data-cy=addAmount]").type("123");
    cy.get("[data-cy=addAmount]").find("input").should("have.value", 123);
    cy.get("[data-cy=addButton]").click();

    cy.get("[data-cy=OkButton]").should("exist");
    cy.wait(500);
  });

  it("Should be able to add ingredient to inventory with valid inputs", () => {
    cy.wait(500);
    cy.get("[data-cy=addIngredient]").should("have.value", "");
    cy.get("[data-cy=addIngredient]").click();
    cy.get("[data-cy=addIngredient]").type("milk{downArrow}{enter}");
    cy.get("[data-cy=addAmount]").should("have.value", "");

    cy.get("[data-cy=addAmount]").click();
    cy.get("[data-cy=addAmount").type("123");
    cy.get("[data-cy=addAmount]").find("input").should("have.value", 123);

    cy.get("[data-cy=addUnit]").click();
    cy.get("ul>li").contains("cup").click();
    cy.get("[data-cy=addUnit]").find("input").should("have.value", "cup");
    cy.get("[data-cy=addButton]").click();

    cy.get("[data-cy=inventory]").should("contain", "milk");
    cy.get("[data-cy=inventory]").should("contain", "29520");
    cy.get("[data-cy=inventory]").should("contain", "ml");

    cy.get("[data-cy=addIngredient]").find("input").should("have.value", "");
    cy.get("[data-cy=addAmount]").find("input").should("have.value", "");
    cy.get("[data-cy=addUnit]").find("input").should("have.value", "");
  });
});
