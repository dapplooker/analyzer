import React, { ReactNode, useEffect } from "react";
import { t } from "ttag";
import cx from "classnames";
import CopyWidget from "metabase/components/CopyWidget";

import { Description, PublicLinkHeader } from "./SharingPane.styled";

import { APIResponseDescription } from "./DappLookerChartAPIPane.styled";

type Resource = {
  dashboard?: number;
  question?: number;
  public_uuid?: string;
};

type Extension = string | null;

interface DappLookerChartAPIPaneProps {
  resource: Resource;
  onGetChartApi: () => void;
  getChartApiEndPoint: (resource: Resource, extension?: Extension) => void;
}

export default function DappLookerChartAPIPane({
  resource,
  onGetChartApi,
  getChartApiEndPoint,
}: DappLookerChartAPIPaneProps) {
  useEffect(() => {
    onGetChartApi();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="pt2 ml-auto mr-auto" style={{ maxWidth: 736 }}>
      <SharingOption
        className={cx("border-bottom", {
          disabled: !resource.public_uuid,
        })}
        // illustration={
        //   <IconContainer>
        //     <Icon name="link" size={32} />
        //   </IconContainer>
        // }
      >
        <PublicLinkHeader>{t`Get an API endpoint out of your Chart`}</PublicLinkHeader>
        <Description className="mb2">
          {t`Copy the API endpoint(/s), to use it and get the results in your desired format.`}
          <br />
          {t`Need help? Get your`}
          <a
            href="https://github.com/dapplooker/dapplooker-sdk"
            target="_blank"
            rel="noreferrer"
            style={{
              margin: "0 4px",
              textDecoration: "underline",
              color: "orange",
            }}
          >
            {t`API Key`}
          </a>
          {t`or Check API`}
          <a
            href="https://github.com/dapplooker/dapplooker-sdk"
            target="_blank"
            rel="noreferrer"
            style={{
              marginLeft: "4px",
              textDecoration: "underline",
              color: "orange",
            }}
          >
            {t`Documentation`}
          </a>
        </Description>

        <div
          style={{
            marginBottom: 35,
            marginTop: 16,
          }}
        >
          <APIResponseDescription>{t`Copy Chart UUID`}</APIResponseDescription>
          <CopyWidget value={resource.public_uuid} />

          <APIResponseDescription>
            {t`Results in JSON format`}
          </APIResponseDescription>
          <CopyWidget value={getChartApiEndPoint(resource, "json")} />

          <APIResponseDescription>
            {t`Results in CSV format`}
          </APIResponseDescription>
          <CopyWidget value={getChartApiEndPoint(resource, "csv")} />

          <APIResponseDescription>
            {t`Results in XLSX format`}
          </APIResponseDescription>
          <CopyWidget value={getChartApiEndPoint(resource, "xlsx")} />
        </div>
        <a
          href="https://github.com/dapplooker/dapplooker-sdk"
          target="_blank"
          rel="noreferrer"
          style={{
            padding: 10,
            borderRadius: 5,
            color: "white",
            background: "#509EE3",
          }}
        >
          {t`Open API documentation`}
        </a>
        <a
          href="https://dapplooker.com/user/api"
          target="_blank"
          rel="noreferrer"
          style={{
            marginLeft: 10,
            padding: 10,
            background: "#f1f1f1",
            borderRadius: 5,
          }}
        >
          {t`Generate New API Key`}
        </a>
      </SharingOption>
    </div>
  );
}

interface SharingOptionProps {
  className: string;
  onClick?: () => void;
  // illustration: ReactNode;
  children: ReactNode;
}

function SharingOption({
  className,
  onClick,
  // illustration,
  children,
}: SharingOptionProps) {
  return (
    <div
      className={cx("pt1 pb4 mb3 flex align-start justify-center", className)}
      onClick={onClick}
    >
      {/* {illustration} */}
      <div className="ml2">{children}</div>
    </div>
  );
}
