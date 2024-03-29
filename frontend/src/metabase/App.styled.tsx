import styled from "@emotion/styled";

import { color } from "metabase/lib/colors";

export const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const AppContentContainer = styled.div<{
  isAdminApp: boolean;
}>`
  flex-grow: 1;
  display: flex;
  flex-direction: ${props => (props.isAdminApp ? "column" : "row")};
  position: relative;
  overflow: hidden;
  /* background-color: ${props =>
    color(props.isAdminApp ? "bg-white" : "content")}; */
  background-color: ${props => (props.isAdminApp ? color("bg-white") : "#f3f8fd")};

  @media print {
    height: 100%;
    overflow: visible !important;
  }
`;

export const AppContent = styled.main`
  width: 100%;
  height: 100%;
  overflow: auto;

  @media print {
    overflow: visible !important;
  }
`;
