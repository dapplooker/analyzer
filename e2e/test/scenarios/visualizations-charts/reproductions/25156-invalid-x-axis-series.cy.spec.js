<<<<<<<< HEAD:e2e/test/scenarios/visualizations/reproductions/25156-invalid-x-axis-series.cy.spec.js
import { restore } from "e2e/support/helpers";
import { SAMPLE_DATABASE } from "e2e/support/cypress_sample_database";
========
import { SAMPLE_DATABASE } from "e2e/support/cypress_sample_database";
import { restore } from "e2e/support/helpers";
>>>>>>>> 46c668b1e56576d67994febf129fb5cb34d3851d:e2e/test/scenarios/visualizations-charts/reproductions/25156-invalid-x-axis-series.cy.spec.js

const { REVIEWS, REVIEWS_ID } = SAMPLE_DATABASE;

const questionDetails = {
  name: "25156",
  query: {
    "source-table": REVIEWS_ID,
    aggregation: [["count"]],
    breakout: [
      ["field", REVIEWS.CREATED_AT, { "temporal-unit": "year" }],
      ["field", REVIEWS.RATING, null],
    ],
  },
  display: "bar",
  visualization_settings: {
    "graph.dimensions": ["CREATED_AT", "RATING"],
    "graph.metrics": ["count"],
    "graph.x_axis.scale": "linear",
  },
};

describe.skip("issue 25156", () => {
  beforeEach(() => {
    restore();
    cy.signInAsAdmin();
  });

  it("should handle invalid x-axis scale (metabase#25156)", () => {
    cy.createQuestion(questionDetails, { visitQuestion: true });

    cy.get(".bar").should("have.length.at.least", 20);
    cy.get(".x.axis .tick")
      .should("contain", "2022")
      .and("contain", "2023")
      .and("contain", "2023")
      .and("contain", "2024")
      .and("contain", "2025");
  });
});
