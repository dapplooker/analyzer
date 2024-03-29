<<<<<<<< HEAD:e2e/test/scenarios/visualizations/reproductions/15353-pivot-settings-change-name-values.cy.spec.js
import { restore, sidebar } from "e2e/support/helpers";
import { SAMPLE_DATABASE } from "e2e/support/cypress_sample_database";
========
import { SAMPLE_DATABASE } from "e2e/support/cypress_sample_database";
import { restore, sidebar } from "e2e/support/helpers";
>>>>>>>> 46c668b1e56576d67994febf129fb5cb34d3851d:e2e/test/scenarios/visualizations-tabular/reproductions/15353-pivot-settings-change-name-values.cy.spec.js

const { ORDERS, ORDERS_ID } = SAMPLE_DATABASE;

const questionDetails = {
  name: "15353",
  query: {
    "source-table": ORDERS_ID,
    aggregation: [["count"]],
    breakout: [["field", ORDERS.CREATED_AT, { "temporal-unit": "year" }]],
  },
  display: "pivot",
};

describe("issue 15353", () => {
  beforeEach(() => {
    cy.intercept("POST", "/api/dataset/pivot").as("pivotDataset");

    restore();
    cy.signInAsAdmin();

    cy.createQuestion(questionDetails, { visitQuestion: true });
  });

  it("should be able to change field name used for values (metabase#15353)", () => {
    cy.findByTestId("viz-settings-button").click();
    sidebar()
      .contains("Count")
      .siblings("[data-testid$=settings-button]")
      .click();

    cy.findByDisplayValue("Count").type(" renamed").blur();

    cy.wait("@pivotDataset");

    cy.get(".Visualization").should("contain", "Count renamed");
  });
});
