import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Icon from "metabase/components/Icon";
import LoadingSpinner from "metabase/components/LoadingSpinner";

export interface WidgetRootProps {
  isExpanded?: boolean;
}

export const WidgetRoot = styled.div<WidgetRootProps>`
  padding: 1rem;
  width: ${props => (props.isExpanded ? "300px" : "260px")};
`;

export const WidgetHeader = styled.div`
  padding: 0.5rem;
`;

export const WidgetMessage = styled.div`
  padding: 0 0.5rem;
`;

export const WidgetFormat = styled.div`
  width: 100%;
`;

const BorderedBase = css`
  padding: 0.6rem 1.25rem;
  background: transparent;
  border: 1px solid rgb(242, 236, 236);
  border-radius: 6px;

  &:hover {
    background-color: #509ee357;
    border-color: #c7dae3;
  }
`;

export const BorderedDownloadIcon = styled(Icon)`
  ${BorderedBase}
`;

export const BorderedLoadingSpinner = styled(LoadingSpinner)`
  ${BorderedBase}
`;
