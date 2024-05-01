import React from "react";
import { t } from "ttag";
import CopyWidget from "metabase/components/CopyWidget";
import * as Urls from "metabase/lib/urls";
import Modal from "metabase/components/Modal";
import Icon from "metabase/components/Icon";

import {
  Description,
  DescriptionLink,
  PublicLinkHeader,
  CardApiContainer,
} from "./DashCardApiModal.styled";

interface DashCardApiModalProps {
  chartPublicUuid: string;
  isModalOpen: boolean;
  isNightMode: boolean;
  handleToggleModal: () => void;
}

export default function DashCardApiModal({
  isModalOpen,
  handleToggleModal,
  chartPublicUuid,
  isNightMode,
}: DashCardApiModalProps) {
  const getCardApiEndPoint = (chartPublicUuid: string, extension: string) => {
    return Urls.chartApiEndPoint(chartPublicUuid, extension);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handleToggleModal}
      className="small m2"
      isNightMode
    >
      <CardApiContainer isNightMode={isNightMode}>
        <div className="m4">
          <Icon
            className="text-light text-medium-hover cursor-pointer p2 absolute"
            style={{ right: 0, top: 0 }}
            name="close"
            size={24}
            onClick={handleToggleModal}
          />
          <PublicLinkHeader>{t`JSON-API Endpoint`}</PublicLinkHeader>
          <Description isNightMode={isNightMode}>
            {t`Copy the API endpoint to get JSON data.`}
          </Description>
          <div>
            <CopyWidget
              style={{ marginBottom: "0.5rem" }}
              readOnly={true}
              value={getCardApiEndPoint(chartPublicUuid, "json")}
            />
          </div>
          <Description isNightMode={isNightMode}>
            {t`Need help? Get your`}
            <DescriptionLink
              href="https://github.com/dapplooker/dapplooker-sdk"
              target="_blank"
              rel="noreferrer"
              isNightMode={isNightMode}
            >
              {t`API Key`}
            </DescriptionLink>
            {t`or Check API`}
            <DescriptionLink
              href="https://github.com/dapplooker/dapplooker-sdk"
              target="_blank"
              rel="noreferrer"
              isNightMode={isNightMode}
            >
              {t`Documentation`}
            </DescriptionLink>
          </Description>
        </div>
      </CardApiContainer>
    </Modal>
  );
}
