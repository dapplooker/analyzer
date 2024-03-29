<<<<<<<< HEAD:e2e/test/scenarios/visualizations/reproductions/11249-add-more-series-no-columns.cy.spec.js
import { restore, visitQuestionAdhoc } from "e2e/support/helpers";
import { SAMPLE_DATABASE } from "e2e/support/cypress_sample_database";
========
import { SAMPLE_DATABASE } from "e2e/support/cypress_sample_database";
import { restore, visitQuestionAdhoc } from "e2e/support/helpers";
>>>>>>>> 46c668b1e56576d67994febf129fb5cb34d3851d:e2e/test/scenarios/visualizations-tabular/reproductions/11249-add-more-series-no-columns.cy.spec.js

const { ORDERS, ORDERS_ID } = SAMPLE_DATABASE;

const questionDetails = {
  name: "13960",
  display: "line",
  dataset_query: {
    type: "query",
    database: 1,
    query: {
      "source-table": ORDERS_ID,
      aggregation: [["count"], ["avg", ["field", ORDERS.TOTAL, null]]],
      breakout: [["field", ORDERS.CREATED_AT, { "temporal-unit": "month" }]],
    },
  },
  visualization_settings: {
    "graph.dimensions": ["CREATED_AT"],
    "graph.metrics": ["avg"],
  },
};

describe("issue 11249", () => {
  beforeEach(() => {
    restore();
    cy.signInAsAdmin();
  });

  it("should not allow adding more series when all columns are used (metabase#11249)", () => {
    visitQuestionAdhoc(questionDetails);

    cy.findByTestId("viz-settings-button").click();

    cy.findByTestId("sidebar-left").within(() => {
      cy.findByText("Data").click();
      cy.findByText("Count").should("not.exist");

      cy.findByText("Add another series").click();
      cy.findByText("Count").should("be.visible");
      cy.findByText("Add another series").should("not.exist");
    });
  });
});
