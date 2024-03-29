import { css } from "@emotion/react";
import styled from "@emotion/styled";
import Icon from "metabase/components/Icon";
import { color } from "metabase/lib/colors";
import LoadingSpinner from "metabase/components/LoadingSpinner";

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

export const DownloadIcon = styled(Icon)`
  color: ${color("text-medium")};

  &:hover {
    color: ${color("brand")};
    cursor: pointer;
  }
`;
