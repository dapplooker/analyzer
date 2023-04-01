import React from "react";
import { CollectionId, User } from "metabase-types/api";
import NewItemButton from "../NewItemButton";
import ProfileLink from "../ProfileLink";
import SearchBar from "../SearchBar";
import CollectionBreadcrumbs from "../../containers/CollectionBreadcrumbs";
import QuestionLineage from "../../containers/QuestionLineage";
import AppBarLogo from "./AppBarLogo";
import {
  AppBarLeftContainer,
  AppBarRightContainer,
  AppBarRoot,
  AppBarInfoContainer,
  AppBarProfileLinkContainer,
} from "./AppBarLarge.styled";

export interface AppBarLargeProps {
  currentUser: User;
  collectionId?: CollectionId;
  isNavBarOpen?: boolean;
  isNavBarEnabled?: boolean;
  isSearchVisible?: boolean;
  isNewButtonVisible?: boolean;
  isProfileLinkVisible?: boolean;
  isCollectionPathVisible?: boolean;
  isQuestionLineageVisible?: boolean;
  onToggleNavbar: () => void;
  onLogout: () => void;
}

const DappLookerHeaderLinks = (): JSX.Element => {
  const DAPPLOOKER_DISCOVER_LINK = "https://dapplooker.com/browse/dashboards?sort=popular";
  const DAPPLOOKER_MYPROJECT_LINK = "https://dapplooker.com/user/dashboard";
  const ANALYZER_BROWSE_DATA_LINK = "https://analytics.dapplooker.com/browse/2";

  const anchorTagStyle = {
    color: "#4C5773",
    fontWeight: 700,
    minwidth: "fit-content",
  }

  const changeTextColorOnHover = (e:any) => {
    e.target.style.color = "#509ee3";
  }

  const resetTextColor = (e:any) => {
    e.target.style.color = anchorTagStyle.color;
  }

  return (
    <>
      <a
        href={DAPPLOOKER_DISCOVER_LINK}
        onMouseEnter={changeTextColorOnHover}
        onMouseLeave={resetTextColor}
        style={anchorTagStyle}>Discover</a>
      <a
        href={DAPPLOOKER_MYPROJECT_LINK}
        onMouseEnter={changeTextColorOnHover}
        onMouseLeave={resetTextColor}
        style={anchorTagStyle}>My Dashboard</a>
      <a
        href={ANALYZER_BROWSE_DATA_LINK}
        onMouseEnter={changeTextColorOnHover}
        onMouseLeave={resetTextColor}
        style={anchorTagStyle}>Browse Data</a>
    </>
  )
}

const AppBarLarge = ({
  currentUser,
  collectionId,
  isNavBarOpen,
  isNavBarEnabled,
  isSearchVisible,
  isNewButtonVisible,
  isProfileLinkVisible,
  isCollectionPathVisible,
  isQuestionLineageVisible,
  onToggleNavbar,
  onLogout,
}: AppBarLargeProps): JSX.Element => {
  const isNavBarVisible = isNavBarOpen && isNavBarEnabled;

  return (
    <AppBarRoot isNavBarOpen={isNavBarVisible}>
      <AppBarLeftContainer isNavBarEnabled={isNavBarEnabled}>
        <AppBarLogo
          isNavBarOpen={isNavBarVisible}
          isNavBarEnabled={isNavBarEnabled}
          onToggleClick={onToggleNavbar}
        />
        <AppBarInfoContainer
          isVisible={!isNavBarVisible || isQuestionLineageVisible}
        >
          {isQuestionLineageVisible ? (
            <QuestionLineage />
          ) : isCollectionPathVisible ? (
            <CollectionBreadcrumbs />
          ) : null}
        </AppBarInfoContainer>
      </AppBarLeftContainer>
      {(isSearchVisible || isNewButtonVisible || isProfileLinkVisible) && (
        <AppBarRightContainer>
          <DappLookerHeaderLinks />
          {isSearchVisible && <SearchBar />}
          {isNewButtonVisible && <NewItemButton collectionId={collectionId} />}
          {isProfileLinkVisible && (
            <AppBarProfileLinkContainer>
              <ProfileLink user={currentUser} onLogout={onLogout} />
            </AppBarProfileLinkContainer>
          )}
        </AppBarRightContainer>
      )}
    </AppBarRoot>
  );
};

export default AppBarLarge;
