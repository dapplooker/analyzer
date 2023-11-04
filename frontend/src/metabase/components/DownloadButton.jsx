/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { t } from "ttag";

import { color } from "metabase/lib/colors";
import { extractQueryParams } from "metabase/lib/urls";

import Icon from "metabase/components/Icon";
import Label from "metabase/components/type/Label";
import { saveChartImage } from "metabase/visualizations/lib/save-chart-image";
import { getCardKey } from "metabase/visualizations/lib/utils";
import { FormButton } from "./DownloadButton.styled";

function colorForType(type) {
  switch (type) {
    case "csv":
      return color("filter");
    case "xlsx":
      return color("summarize");
    case "json":
      return color("bg-dark");
    case "png":
      return color("accent0");
    default:
      return color("brand");
  }
}

const retrieveFilename = ({ res, type }) => {
  const contentDispositionHeader = res.headers.get("Content-Disposition") || "";
  const contentDisposition = decodeURIComponent(contentDispositionHeader);
  const match = contentDisposition.match(/filename="(?<fileName>.+)"/);
  const fileName =
    match?.groups?.fileName ||
    `query_result_${new Date().toISOString()}.${type}`;

  return fileName;
};

const checkApiIsFromDappLooker = url => {
  let isValidApi = false;
  const validators = ["http://localhost:4001/", "https://dapplooker.com/"];

  for (let index = 0; index < validators.length; index++) {
    const element = validators[index];

    if (url.includes(element)) {
      isValidApi = true;
    }
  }
  return isValidApi;
};

const handleSubmit = async (
  e,
  {
    method,
    url,
    type,
    card,
    onDownloadStart,
    onDownloadResolved,
    onDownloadRejected,
  },
) => {
  e.preventDefault();

  onDownloadStart();

  const formData = new URLSearchParams(new FormData(e.target));

  let options = { method };
  if (method === `POST`) {
    options.body = formData;
  } else if (method === `GET`) {
    options.query = formData.toString();
  }

  const requestUrl =
    method === `POST` || checkApiIsFromDappLooker(url)
      ? url
      : url + "?" + options.query;

  if (checkApiIsFromDappLooker) {
    options = { ...options, responseType: "blob" };
  }

  fetch(requestUrl, options)
    .then(async res => {
      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      // retrieves the filename from the response header and parses it into query_result[DATE TIME].extension
      let fileName = retrieveFilename({ res, type });

      if (!fileName && checkApiIsFromDappLooker(url)) {
        fileName = getFileName(card);
      }

      // create a pseudo-link to trigger the download
      const link = document.createElement(`a`);
      link.href = url;
      link.setAttribute(`download`, fileName);
      document.body.appendChild(link);
      link.click();
      URL.revokeObjectURL(url);
      link.remove();

      onDownloadResolved();
    })
    .catch(() => onDownloadRejected());
};

export const DownloadButtonBase = ({ format, onClick, ...rest }) => {
  return (
    <FormButton
      className="hover-parent hover--inherit"
      onClick={onClick}
      {...rest}
    >
      <Icon name={format} size={32} mr={1} color={colorForType(format)} />
      <Label my={0}>.{format}</Label>
    </FormButton>
  );
};

const getFileName = card =>
  `${card.name ?? t`New question`}-${new Date().toLocaleString()}.png`;

export const SaveAsPngButton = ({ card, onSave, hideWaterMark }) => {
  const handleSave = async () => {
    const cardNodeSelector = `[data-card-key='${getCardKey(card)}']`;
    const name = getFileName(card);
    let isShowWatermark = true;
    if (card?.creator_details) {
      isShowWatermark =
        card.creator_details.login_attributes.isPaidSubscription === false;
    } else {
      isShowWatermark = hideWaterMark === false;
    }
    await saveChartImage(cardNodeSelector, name, card.id, isShowWatermark);
    onSave?.();
  };

  return <DownloadButtonBase onClick={handleSave} format="png" />;
};

export const DownloadButton = ({
  children,
  method,
  url,
  params,
  card,
  extensions,
  onDownloadStart,
  onDownloadResolved,
  onDownloadRejected,
  ...props
}) => (
  <div>
    <form
      onSubmit={e =>
        handleSubmit(e, {
          method,
          url,
          type: children,
          card: card,
          onDownloadStart,
          onDownloadResolved,
          onDownloadRejected,
        })
      }
    >
      {params && extractQueryParams(params).map(getInput)}
      <DownloadButtonBase
        format={children}
        onClick={e => {
          if (window.OSX) {
            // prevent form from being submitted normally
            e.preventDefault();
            // download using the API provided by the OS X app
            window.OSX.download(method, url, params, extensions);
          }
        }}
        {...props}
      />
    </form>
  </div>
);

const getInput = ([name, value]) => (
  <input key={name} type="hidden" name={name} value={value} />
);

DownloadButton.propTypes = {
  url: PropTypes.string.isRequired,
  method: PropTypes.string,
  params: PropTypes.object,
  extensions: PropTypes.array,
  onDownloadStart: PropTypes.func,
  onDownloadResolved: PropTypes.func,
  onDownloadRejected: PropTypes.func,
};

DownloadButton.defaultProps = {
  method: "POST",
  params: {},
  extensions: [],
};
