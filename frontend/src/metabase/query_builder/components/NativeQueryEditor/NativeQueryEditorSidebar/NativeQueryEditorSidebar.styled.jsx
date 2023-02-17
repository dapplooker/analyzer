import styled from "@emotion/styled";

import { space } from "metabase/styled-components/theme";

import RunButtonWithTooltip from "metabase/query_builder/components/RunButtonWithTooltip";

export const Container = styled.aside`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const RunButtonWithTooltipStyled = styled(RunButtonWithTooltip)`
  margin: ${space(2)};
  margin-top: auto;
  height: 40px;
  width: 40px;
`;
