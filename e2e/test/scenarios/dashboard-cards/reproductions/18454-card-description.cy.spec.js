<<<<<<<< HEAD:e2e/test/scenarios/dashboard/reproductions/18454-card-description.cy.spec.js
import { restore, visitDashboard } from "e2e/support/helpers";

import { SAMPLE_DATABASE } from "e2e/support/cypress_sample_database";
========
import { SAMPLE_DATABASE } from "e2e/support/cypress_sample_database";
import { restore, visitDashboard } from "e2e/support/helpers";
>>>>>>>> 46c668b1e56576d67994febf129fb5cb34d3851d:e2e/test/scenarios/dashboard-cards/reproductions/18454-card-description.cy.spec.js

const { PRODUCTS, PRODUCTS_ID } = SAMPLE_DATABASE;

const CARD_DESCRIPTION = "CARD_DESCRIPTION";

const questionDetails = {
  name: "18454 Question",
  description: CARD_DESCRIPTION,
  query: {
    "source-table": PRODUCTS_ID,
    aggregation: [["count"]],
    breakout: [["field", PRODUCTS.CATEGORY, null]],
  },
  display: "line",
};

describe("issue 18454", () => {
  beforeEach(() => {
    restore();
    cy.signInAsAdmin();

    cy.createQuestionAndDashboard({ questionDetails }).then(
      ({ body: { id, card_id, dashboard_id } }) => {
        visitDashboard(dashboard_id);
      },
    );
  });

  it("should show card descriptions (metabase#18454)", () => {
    cy.get(".DashCard").realHover();
    cy.get(".DashCard").within(() => {
      cy.icon("info").trigger("mouseenter", { force: true });
    });
    // eslint-disable-next-line no-unscoped-text-selectors -- deprecated usage
    cy.findByText(CARD_DESCRIPTION);
  });
});