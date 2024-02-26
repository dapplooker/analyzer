/* eslint-disable react/prop-types */
import React, { useState } from "react";
import PropTypes from "prop-types";
import styled from "@emotion/styled";

import { t } from "ttag";

import cx from "classnames";
import { canSavePng } from "metabase/visualizations";
import PopoverWithTrigger from "metabase/components/PopoverWithTrigger";
import Icon from "metabase/components/Icon";
import LoadingSpinner from "metabase/components/LoadingSpinner";
import {
  DownloadButtonWrapper,
  SaveAsPngButtonWrapper,
} from "metabase/components/DownloadButton";
import Tooltip from "metabase/core/components/Tooltip";
import { PLUGIN_FEATURE_LEVEL_PERMISSIONS } from "metabase/plugins";
import * as Urls from "metabase/lib/urls";
import { getDownloadButtonParams } from "./utils";

import {
  WidgetFormat,
  WidgetHeader,
  WidgetMessage,
  WidgetRoot,
} from "./QueryDownloadWidget.styled";

const EXPORT_FORMATS = Urls.exportFormats;

const getLimitedDownloadSizeText = result =>
  PLUGIN_FEATURE_LEVEL_PERMISSIONS.getDownloadWidgetMessageOverride(result) ??
  t`The maximum download size is 1 million rows.`;

const QueryDownloadWidget = ({
  className,
  classNameClose,
  card,
  result,
  uuid,
  token,
  dashcardId,
  dashboardId,
  icon,
  iconSize = 23,
  params,
  visualizationSettings,
  hideWaterMark,
  bordered,
}) => {
  const [status, setStatus] = useState(`idle`);

  return (
    <PopoverWithTrigger
      triggerElement={() => renderIcon({ icon, status, iconSize, bordered })}
      triggerClasses={cx(className, "text-brand-hover")}
      triggerClassesClose={classNameClose}
      disabled={status === `pending` ? true : null}
      horizontalAttachments={["center", "right", "left"]}
    >
      {({ onClose: closePopover }) => (
        <WidgetRoot
          isExpanded={result.data && result.data.rows_truncated != null}
        >
          <WidgetHeader>
            <h4>{t`Download full results`}</h4>
          </WidgetHeader>
          {result.data != null && result.data.rows_truncated != null && (
            <WidgetMessage>
              <p>{t`Your answer has a large number of rows so it could take a while to download.`}</p>
              <p>{getLimitedDownloadSizeText(result)}</p>
            </WidgetMessage>
          )}
          <div>
            <>
              {EXPORT_FORMATS.map(type => (
                <WidgetFormat key={type}>
                  <DownloadButtonWrapper
                    {...getDownloadButtonParams({
                      type,
                      params,
                      card,
                      visualizationSettings,
                      result,
                      uuid,
                      token,
                      dashcardId,
                      dashboardId,
                    })}
                    extensions={[type]}
                    onDownloadStart={() => {
                      setStatus("pending");
                      closePopover();
                    }}
                    onDownloadResolved={() => setStatus("resolved")}
                    onDownloadRejected={() => setStatus("rejected")}
                  >
                    {type}
                  </DownloadButtonWrapper>
                </WidgetFormat>
              ))}
              {canSavePng(card.display) ? (
                <SaveAsPngButtonWrapper
                  card={card}
                  onSave={closePopover}
                  hideWaterMark={hideWaterMark}
                />
              ) : null}
            </>
          </div>
        </WidgetRoot>
      )}
    </PopoverWithTrigger>
  );
};

const LOADER_SCALE_FACTOR = 0.9;

const renderIcon = ({ icon, status, iconSize, bordered }) => {
  if ([`idle`, `resolved`, `rejected`].includes(status)) {
    return (
      <Tooltip tooltip={t`Download full results`}>
        {bordered === true ? (
          <BorderIcon
            className="px1 py1"
            data-testid="download-button"
            title={t`Download this data`}
            name={icon}
            size={iconSize}
          />
        ) : (
          <Icon
            className="px1 py1"
            data-testid="download-button"
            title={t`Download this data`}
            name={icon}
            size={iconSize}
          />
        )}
      </Tooltip>
    );
  } else if (status === "pending") {
    return (
      <Tooltip tooltip={t`Downloading…`}>
        {bordered === true ? (
          <BorderLoadingSpinner size={iconSize * LOADER_SCALE_FACTOR} />
        ) : (
          <LoadingSpinner size={iconSize * LOADER_SCALE_FACTOR} />
        )}
      </Tooltip>
    );
  } else {
    throw new Error(`Unknown download status: ${status}`);
  }
};

const BorderIcon = styled(Icon)`
  padding: 0.6rem 1.25rem;
  background: transparent;
  border: 1px solid rgb(242, 236, 236);
  border-radius: 6px;

  &:hover {
    background-color: #509ee357;
    border-color: #c7dae3;
  }
`;

const BorderLoadingSpinner = styled(LoadingSpinner)`
  padding: 0.6rem 1.25rem;
  background: transparent;
  border: 1px solid rgb(242, 236, 236);
  border-radius: 6px;

  &:hover {
    background-color: #509ee357;
    border-color: #c7dae3;
  }
`;

QueryDownloadWidget.propTypes = {
  card: PropTypes.object,
  result: PropTypes.object,
  uuid: PropTypes.string,
  icon: PropTypes.string,
  params: PropTypes.object,
  className: PropTypes.string,
  classNameClose: PropTypes.string,
  visualizationSettings: PropTypes.object,
};

QueryDownloadWidget.defaultProps = {
  result: {},
  icon: "download",
  params: {},
};

QueryDownloadWidget.shouldRender = ({ result, isResultDirty }) =>
  !isResultDirty &&
  result &&
  !result.error &&
  PLUGIN_FEATURE_LEVEL_PERMISSIONS.canDownloadResults(result);

export default QueryDownloadWidget;
