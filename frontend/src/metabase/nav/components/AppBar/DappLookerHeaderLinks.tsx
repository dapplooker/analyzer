import React from "react";
import styled from "@emotion/styled";

const LinkElement = styled.a`
  color: #4c5773;
  font-weight: 700;
  min-width: fit-content;
  position: relative;

  @media screen and (max-width: 1024px) {
    font-size: 12px;
    line-height: 14px;
    white-space: nowrap;
  }
`;

const NewBadgeImg = styled.img`
  position: absolute;
  top: -11px;
  right: -14px;

  @media screen and (max-width: 1024px) {
    width: 18px;
    height: 18px;
  }
`;

const DappLookerHeaderLinks = (): JSX.Element => {
  const DAPPLOOKER_MYCREATION_LINK =
    "https://dapplooker.com/my-creation/dashboard";
  const DAPPLOOKER_MYPROJECT_LINK = "https://dapplooker.com/user/dashboard";
  const ANALYZER_BROWSE_DATA_LINK = "https://analytics.dapplooker.com/browse/2";

  const MYCREATION_NEW_BADGE_EXPIRY_DATE = new Date("2023-11-12");

  const anchorTagStyle = {
    color: "#4C5773",
    fontWeight: 700,
    minwidth: "fit-content",
    position: "relative",
  } as React.CSSProperties;

  const newBadgeStyle = {
    position: "absolute",
    top: "-11px",
    right: "-14px",
  } as React.CSSProperties;

  const changeTextColorOnHover = (e: any) => {
    e.target.style.color = "#509ee3";
  };

  const resetTextColor = (e: any) => {
    e.target.style.color = anchorTagStyle.color;
  };

  const isNewBadge = (dateToCheck: Date): boolean => {
    const currentDate = new Date();
    return dateToCheck > currentDate;
  };

  return (
    <>
      {/* <a
        href={DAPPLOOKER_DISCOVER_LINK}
        onMouseEnter={changeTextColorOnHover}
        onMouseLeave={resetTextColor}
        style={anchorTagStyle}>Discover</a> */}
      <LinkElement
        href={DAPPLOOKER_MYCREATION_LINK}
        onMouseEnter={changeTextColorOnHover}
        onMouseLeave={resetTextColor}
        style={anchorTagStyle}
      >
        My Dashboard
      </LinkElement>
      <LinkElement
        href={DAPPLOOKER_MYPROJECT_LINK}
        onMouseEnter={changeTextColorOnHover}
        onMouseLeave={resetTextColor}
        style={anchorTagStyle}
      >
        My Creation
        {isNewBadge(MYCREATION_NEW_BADGE_EXPIRY_DATE) && (
          <NewBadgeImg
            style={newBadgeStyle}
            src={`app/assets/img/new-badge-header.svg`}
            alt="new badge"
          />
        )}
      </LinkElement>
      <LinkElement
        href={ANALYZER_BROWSE_DATA_LINK}
        onMouseEnter={changeTextColorOnHover}
        onMouseLeave={resetTextColor}
        style={anchorTagStyle}
      >
        Browse Data
      </LinkElement>
    </>
  );
};

export default DappLookerHeaderLinks;
