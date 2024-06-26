/* eslint-disable react/prop-types */
import React, { Component } from "react";
import { connect } from "react-redux";
import { t } from "ttag";

import Icon from "metabase/components/Icon";
import Link from "metabase/core/components/Link";
import ModalContent from "metabase/components/ModalContent";
import DashboardPicker from "metabase/containers/DashboardPicker";

import * as Urls from "metabase/lib/urls";

import CreateDashboardModal from "metabase/dashboard/containers/CreateDashboardModal";

import { LinkContent } from "./AddToDashSelectDashModal.styled";

function mapStateToProps(state) {
  return {
    dashboards: state.entities.dashboards,
  };
}

class AddToDashSelectDashModal extends Component {
  state = {
    shouldCreateDashboard: false,
  };

  navigateToDashboard = dashboard => {
    const { card, onChangeLocation } = this.props;

    onChangeLocation(
      Urls.dashboard(dashboard, {
        editMode: true,
        addCardWithId: card.id,
      }),
    );
  };

  onDashboardSelected = dashboardId => {
    const dashboard = this.props.dashboards[dashboardId];
    this.navigateToDashboard(dashboard);
  };

  render() {
    if (this.state.shouldCreateDashboard) {
      return (
        <CreateDashboardModal
          collectionId={this.props.card.collection_id}
          onCreate={this.navigateToDashboard}
          onClose={() => this.setState({ shouldCreateDashboard: false })}
        />
      );
    } else {
      return (
        <ModalContent
          id="AddToDashSelectDashModal"
          title={t`Add this chart to a dashboard`}
          onClose={this.props.onClose}
        >
          <Link
            mt={1}
            onClick={() => this.setState({ shouldCreateDashboard: true })}
          >
            <LinkContent>
              <Icon name="add" mx={1} bordered />
              <h4>{t`Create a new dashboard`}</h4>
            </LinkContent>
          </Link>
          <DashboardPicker onChange={this.onDashboardSelected} />
          <Link
            mt={1}
            onClick={() => this.setState({ shouldCreateDashboard: true })}
          >
            <LinkContent>
              <Icon name="add" mx={1} bordered />
              <h4>{t`Create a new dashboard`}</h4>
            </LinkContent>
          </Link>
        </ModalContent>
      );
    }
  }
}

export default connect(mapStateToProps)(AddToDashSelectDashModal);
