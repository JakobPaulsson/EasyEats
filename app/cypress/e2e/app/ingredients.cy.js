/// <reference types="cypress" />
// Tests usage of the ingredients page.
describe("Using the ingredients page", () => {
  beforeEach(() => {
    cy.visit("localhost:3000/ingredients");
  });
  it("Navigates to the ingredients page", () => {
    cy.get("[data-cy=Ingredients]").click();
    cy.url().should("include", "/ingredients");
  });

  it("Searching for an ingredient", () => {
    cy.get("[data-cy=addIngredient]").should("have.value", "");
    cy.get("[data-cy=addIngredient]").click();
    cy.get("[data-cy=addIngredient]").type("milk{downArrow}{enter}");
    cy.get("[data-cy=addIngredient]")
      .find("input")
      .should("have.value", "milk");
  })



  it("Should not be able to add ingredient to inventory with invalid amount and unit", () => {
    cy.get("[data-cy=addIngredient]").should("have.value", "");
    cy.get("[data-cy=addIngredient]").click();
    cy.get("[data-cy=addIngredient]").type("milk{downArrow}{enter}");
    cy.get("[data-cy=addButton]").click();

    cy.get("[data-cy=inventory]").should("have.length", 0).and('not.contain', 'NaN');

    })

  
  it("Should not be able to add ingredient to inventory with invalid unit", () => {  
    cy.get("[data-cy=addIngredient]").should("have.value", "");
    cy.get("[data-cy=addIngredient]").click();
    cy.get("[data-cy=addIngredient]").type("milk{downArrow}{enter}");
    cy.get("[data-cy=addButton]").click();

    cy.get("[data-cy=addAmount]").should("have.value", "");
    cy.get("[data-cy=addAmount]").click();
    cy.get("[data-cy=addAmount]").type("123");
    cy.get("[data-cy=addAmount]").find("input").should("have.value", 123);
    cy.get("[data-cy=addButton]").click();

    cy.get("[data-cy=inventory]").should("have.length", 0).and('not.contain', 'NaN');

    })


  it("Should be able to add ingredient to inventory with valid inputs", () => {  
    cy.get("[data-cy=addIngredient]").should("have.value", "");
    cy.get("[data-cy=addIngredient]").click();
    cy.get("[data-cy=addIngredient]").type("milk{downArrow}{enter}");
    cy.get("[data-cy=addAmount]").should("have.value", "");

    cy.get("[data-cy=addAmount]").click();
    cy.get("[data-cy=addAmount").type("123");
    cy.get("[data-cy=addAmount]").find("input").should("have.value", 123);

    cy.get("[data-cy=addUnit]").click();
    cy.get("ul>li").contains("gram").click();
    cy.get("[data-cy=addUnit]").find("input").should("have.value", 'gram');
    cy.get("[data-cy=addButton]").click();

    cy.get("[data-cy=inventory]").should("have.length", 1).and('not.contain', 'NaN');

    cy.get("[data-cy=addIngredient]")
      .find("input")
      .should("have.value", "");
    cy.get("[data-cy=addAmount]")
      .find("input")
      .should("have.value", "");
    cy.get("[data-cy=addUnit]")
      .find("input")
      .should("have.value", "");

    })
  });
