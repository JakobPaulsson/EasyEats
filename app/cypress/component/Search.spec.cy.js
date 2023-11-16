/// <reference types="cypress" />
import Search from "@components/Search/Search";
import React from "react";

describe("Search", () => {
  it("Searches", () => {
    cy.mount(<Search />);
    cy.contains("count: 0").click();
  });
});
