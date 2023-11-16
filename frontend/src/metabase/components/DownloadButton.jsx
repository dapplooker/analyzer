/* eslint-disable react/prop-types */
import React from "react";
import PropTypes from "prop-types";
import { t } from "ttag";

import { connect } from "react-redux";
import { color } from "metabase/lib/colors";
import { extractQueryParams } from "metabase/lib/urls";

import Icon from "metabase/components/Icon";
import Label from "metabase/components/type/Label";
import { saveChartImage } from "metabase/visualizations/lib/save-chart-image";
import { getCardKey } from "metabase/visualizations/lib/utils";
import { getUser, getUserId } from "metabase/selectors/user";
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
  const fileName = match?.groups?.fileName;
  // || `query_result_${new Date().toISOString()}.${type}`;

  return fileName;
};

const checkApiIsFromDappLooker = url => {
  let isValidApi = false;
  const validators = ["http://dlooker.com:8080/", "https://dapplooker.com/"];

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
    coreUserId,
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

  let requestUrl =
    method === `POST` || checkApiIsFromDappLooker(url)
      ? url
      : url + "?" + options.query;

  if (checkApiIsFromDappLooker(url)) {
    requestUrl = requestUrl + `&coreUserId=${coreUserId}`;
    options = { ...options };
  }

  fetch(requestUrl, options)
    .then(async res => {
      const blobData = await res.blob();

      // This try-catch is used only to catch newResponse.json() error when getting response as Blob data
      try {
        const newResponse = new Response(blobData);
        const downloadResponse = (await newResponse?.json()) || undefined;
        if (
          downloadResponse?.success === false &&
          checkApiIsFromDappLooker(requestUrl)
        ) {
          // const keys = Object.keys(downloadResponse.errorData);
          // const errorMsg = downloadResponse.errorData[keys[0]];
          // console.log(errorMsg);
          onDownloadRejected();
          return;
        }
      } catch (error) {
        // console.error(error);
      }

      const url = URL.createObjectURL(blobData);

      // retrieves the filename from the response header and parses it into query_result[DATE TIME].extension
      let fileName = retrieveFilename({ res, type });

      if (!fileName && checkApiIsFromDappLooker(requestUrl)) {
        fileName = getFileName(card, type);
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
    .catch(error => {
      console.error("error", error);
      onDownloadRejected();
    });
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

const getFileName = (card, type) =>
  `${card.name ?? t`New question`}-${new Date().toLocaleString()}.${type}` ||
  `query_result_${new Date().toISOString()}.${type}`;

export const SaveAsPngButton = ({ card, onSave, hideWaterMark, ...props }) => {
  const handleSave = async () => {
    const cardNodeSelector = `[data-card-key='${getCardKey(card)}']`;
    const name = getFileName(card, "png");
    let isShowWatermark = true;
    if (card?.creator_details) {
      isShowWatermark =
        card.creator_details.login_attributes.isPaidSubscription === false;
    } else {
      isShowWatermark = hideWaterMark === false;
    }
    const coreUserId = props.currentUserId;
    await saveChartImage(
      cardNodeSelector,
      name,
      card.id,
      isShowWatermark,
      coreUserId,
    );
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
          coreUserId: props.currentUserId,
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

const mapStateToProps = (state, props) => ({
  currentUser: getUser(state),
  currentUserId: getUserId(state),
});

export const DownloadButtonWrapper = connect(mapStateToProps)(DownloadButton);

export const SaveAsPngButtonWrapper = connect(mapStateToProps)(SaveAsPngButton);

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
