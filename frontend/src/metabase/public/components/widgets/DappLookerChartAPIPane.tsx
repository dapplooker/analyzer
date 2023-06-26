import React, { ReactNode, useEffect } from "react";
import { t } from "ttag";
import cx from "classnames";
import Icon from "metabase/components/Icon";
import CopyWidget from "metabase/components/CopyWidget";

import {
    Description,
    PublicLinkHeader,
} from "./SharingPane.styled";

import {
    IconContainer,
    APIResponseDescription,
} from "./DappLookerChartAPIPane.styled";

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
    }, [])

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
                    {t`Copy the API endpoint(/s), to use it and get the results in your desired format. For more details visit our`}
                    <a
                        href="https://github.com/dapplooker/dapplooker-sdk"
                        target="_blank"
                        style={{
                            marginLeft: 4,
                            color: "orange",
                        }}>
                        {t`documentation`}
                    </a>
                </Description>
                <div
                    style={{
                        marginBottom: 35,
                        marginTop: 25,
                    }}
                >
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
            className={cx("pt1 pb4 mb3 flex align-start", className)}
            onClick={onClick}
        >
            {/* {illustration} */}
            <div className="ml2">{children}</div>
        </div>
    );
}
