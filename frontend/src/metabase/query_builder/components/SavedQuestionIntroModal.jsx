/* eslint-disable react/prop-types */
import React, { Component } from "react";

import { t } from "ttag";
import Modal from "metabase/components/Modal";
import ModalContent from "metabase/components/ModalContent";

export default class SavedQuestionIntroModal extends Component {
  render() {
    const { question, isShowingNewbModal, onClose } = this.props;

    const isModel = question.isDataset();
    const title = isModel
      ? t`It's okay to play around with models`
      : t`It's okay to play around with saved questions`;
    const message = isModel
      ? t`You won't make any permanent changes to them unless you edit their query definition.`
      : t`You won't make any permanent changes to a saved question unless you click Save and choose to replace the original question.`;

    return (
      <Modal isOpen={this.props.isShowingNewbModal}>
        <ModalContent
          title={t`It's okay to play around with saved charts`}
          className="Modal-content text-centered py2"
        >
          <div className="px2 pb2 text-paragraph">
            {t`You won't make any permanent changes to a saved chart unless you click Save and choose to replace the original chart.`}
          </div>
          <div className="Form-actions flex justify-center py1">
            <button
              data-metabase-event="QueryBuilder;IntroModal"
              className="Button Button--primary"
              onClick={onClose}
            >
              {t`Okay`}
            </button>
          </div>
        </ModalContent>
      </Modal>
    );
  }
}
