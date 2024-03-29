import { css } from "@emotion/react";
import styled from "@emotion/styled";

import { color } from "metabase/lib/colors";
import { FullWidthContainer } from "metabase/styled-components/layout/FullWidthContainer";
import {
  breakpointMinSmall,
  breakpointMinLarge,
  breakpointMinMedium,
  space,
  breakpointMaxSmall,
} from "metabase/styled-components/theme";

export const Root = styled.div<{
  hasScroll: boolean;
  isBordered?: boolean;
  fullPageView: boolean;
}>`
  display: flex;
  flex-direction: column;

  ${props =>
    props.fullPageView &&
    css`
      height: 100vh;
    `}

  ${props =>
    props.hasScroll &&
    css`
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    `}

  ${props =>
    props.isBordered &&
    css`
      border: 1px solid ${color("border")};
      border-radius: 0px;
      box-shadow: 0 2px 2px ${color("shadow")};
    `}
`;

export const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  position: relative;
  background-color: #f3f8fd;
`;

export const Header = styled.header<{ isNotInIframe: boolean }>`
  display: flex;
  flex-direction: column;
  /* padding: 0.5rem */
  padding: ${props => (props.isNotInIframe ? "0.5rem" : "0px 0.5rem")};

  ${breakpointMinSmall} {
    /* padding: 1rem; */
    padding: ${props => (props.isNotInIframe ? "1rem" : "0px 1rem")};
  }

  ${breakpointMinLarge} {
    /* padding: 1.5rem; */
    padding: ${props => (props.isNotInIframe ? "1.5rem" : "0px 1.5rem")};
  }
`;



export const TitleAndDescriptionContainer = styled(FullWidthContainer)`
  margin-top: 0.5rem;

  ${breakpointMinSmall} {
    margin-top: 1rem;
  }

  ${breakpointMinLarge} {
    margin-top: 1.5rem;
  }
`;

export const DashboardTabsContainer = styled(FullWidthContainer)`
  ${breakpointMaxSmall} {
    padding-left: 0;
    padding-right: 0;
  }
`;

export const Separator = styled.div`
  border-bottom: 1px solid ${color("border")};
`;

export const Body = styled.main<{ isNightTheme: boolean }>`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
  width: 100%;
  position: relative;
  background-color: ${props =>
    props.isNightTheme
      ? color("dapplooker-color-bg-dark")
      : color("dapplooker-color-bg-light")};
`;

export const ActionButtonsContainer = styled.div`
  color: ${color("text-medium")};
  margin-left: auto;
`;

export type FooterVariant = "default" | "large";

const footerVariantStyles = {
  default: css`
    border-top: 1px solid ${color("border")};
  `,
  large: css`
    justify-content: center;
    align-items: center;
    margin-bottom: 2rem;

    ${ActionButtonsContainer} {
      display: none;
    }
  `,
};

function getParameterPanelBackgroundColor(theme?: string) {
  if (theme === "night") {
    return color("bg-black");
  }
  if (theme === "transparent") {
    return "transparent";
  }
  return color("white");
}

function getParameterPanelBorderColor(theme?: string) {
  if (theme === "night") {
    return color("bg-dark");
  }
  if (theme === "transparent") {
    return "transparent";
  }
  return color("border");
}

export const ParametersWidgetContainer = styled(FullWidthContainer)<{
  embedFrameTheme?: string;
  hasScroll: boolean;
  isSticky: boolean;
}>`
  padding-top: ${space(1)};
  padding-bottom: ${space(1)};

  ${props =>
    props.hasScroll &&
    css`
      border-bottom: 1px solid
        ${getParameterPanelBorderColor(props.embedFrameTheme)};
    `}

  ${props =>
    props.isSticky &&
    css`
      position: sticky;
      top: 0;
      left: 0;
      width: 100%;
      z-index: 3;

      background-color: ${getParameterPanelBackgroundColor(
        props.embedFrameTheme,
      )};
    `}
`;

export const Footer = styled.footer<{ variant: FooterVariant; isNotInIframe: boolean;}>`
  display: flex;
  flex-shrink: 0;
  align-items: center;

  ${props => footerVariantStyles[props.variant]}

  /* padding: 0.5rem; */
  padding: ${props => (props.isNotInIframe ? "0.5rem" : "1rem")};

  ${breakpointMinMedium} {
    /* padding: 1rem; */
    padding: ${props => (props.isNotInIframe ? "1rem" : "2rem")};
  }

  ${breakpointMinLarge} {
    /* padding: 1.5rem; */
    padding: ${props => (props.isNotInIframe ? "1.5rem" : "3rem")};
  }
`;
