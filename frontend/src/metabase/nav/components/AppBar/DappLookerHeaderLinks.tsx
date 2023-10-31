import React from "react";

const DappLookerHeaderLinks = (): JSX.Element => {
  const DAPPLOOKER_MYCREATION_LINK =
    "https://dapplooker.com/my-creation/dashboard";
  const DAPPLOOKER_MYPROJECT_LINK = "https://dapplooker.com/user/dashboard";
  const ANALYZER_BROWSE_DATA_LINK = "https://analytics.dapplooker.com/browse/2";

  const MYCREATION_NEW_BADGE_DATE = new Date("2023-11-12");

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
      <a
        href={DAPPLOOKER_MYCREATION_LINK}
        onMouseEnter={changeTextColorOnHover}
        onMouseLeave={resetTextColor}
        style={anchorTagStyle}
      >
        My Dashboard
      </a>
      <a
        href={DAPPLOOKER_MYPROJECT_LINK}
        onMouseEnter={changeTextColorOnHover}
        onMouseLeave={resetTextColor}
        style={anchorTagStyle}
      >
        My Creation
        {isNewBadge(MYCREATION_NEW_BADGE_DATE) && (
          <img
            style={newBadgeStyle}
            src={`app/assets/img/new-badge-header.svg`}
            alt="new badge"
          />
        )}
      </a>
      <a
        href={ANALYZER_BROWSE_DATA_LINK}
        onMouseEnter={changeTextColorOnHover}
        onMouseLeave={resetTextColor}
        style={anchorTagStyle}
      >
        Browse Data
      </a>
    </>
  );
};

export default DappLookerHeaderLinks;
