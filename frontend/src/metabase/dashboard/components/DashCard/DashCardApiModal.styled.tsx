import styled from "@emotion/styled";
import { color } from "metabase/lib/colors";

interface CardApiContainerProps {
  isNightMode: boolean;
}

export const CardApiContainer = styled.div<CardApiContainerProps>`
  max-width: 550px;
  background-color: ${({ isNightMode }) =>
    isNightMode ? color("dapplooker-color-bg-dark") : "white"};
  border: 1px solid
    ${({ isNightMode }) =>
      isNightMode ? color("dapplooker-modal-border") : "white"};
  border-radius: 0.5rem;
  position: relative;
`;

export const PublicLinkHeader = styled.h2`
  font-size: 1.25rem;
  margin-bottom: 0.5rem;
  color: ${color("brand")};
`;

interface DescriptionProps {
  enableMouseEvents?: boolean;
  isNightMode: boolean;
}
export const Description = styled.p<DescriptionProps>`
  color: ${({ isNightMode }) =>
    isNightMode ? "white" : color("dapplooker-text-color")};
  margin-top: 0;
  margin-bottom: 0.5rem;
  line-height: 1.5;
  ${({ enableMouseEvents }) => enableMouseEvents && "pointer-events: initial"};
`;
