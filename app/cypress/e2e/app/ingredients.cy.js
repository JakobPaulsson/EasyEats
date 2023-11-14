/// <reference types="cypress" />

// Tests usage of the ingredients page.

describe("Using the ingredients page", () => {
  beforeEach(() => {
    cy.visit("localhost:3000");
  });
  it("Navigates to the ingredients page", () => {
    cy.get("[data-cy=Ingredients]").click();
    cy.url().should("include", "/ingredients");
  });

  it("Inputting a new ingredient", () => {
    cy.visit("localhost:3000/ingredients");

    cy.get("[data-cy=addIngredient]").should("have.value", "");
    cy.get("[data-cy=addIngredient]").click().type("milk{downArrow}{enter}");
    cy.get("[data-cy=addIngredient]")
      .find("input")
      .should("have.value", "milk");

    // We should not be able to add a new ingredient with an invalid amount.
    cy.get("[data-cy=addButton]").click();
    cy.get("[data-cy=inventory]").should("have.length", 0);

    // We should not be able to add a new ingredient with an invalid unit.
    cy.get("[data-cy=addAmount]").should("have.value", "");
    cy.get("[data-cy=addAmount]").click().type("123");
    cy.get("[data-cy=addButton]").click();
    cy.get("[data-cy=inventory]").should("have.length", 0);

    // We should be able to add a new ingredient with a valid amount and unit.
    cy.get("[data-cy=addAmount]").should("have.value", "");
    cy.get("[data-cy=addAmount]").click().type("123");
    cy.get("[data-cy=addUnit]").click();
    cy.get("ul>li").contains("gram").click();
    cy.get("[data-cy=addButton]").click();
    cy.get("[data-cy=inventory]").should("have.length", 1);
    cy.get("[data-cy=addIngredient]").should("have.value", "");
  });
});