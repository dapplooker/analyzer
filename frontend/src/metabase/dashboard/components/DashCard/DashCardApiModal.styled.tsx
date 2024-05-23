import styled from "@emotion/styled";
import { color } from "metabase/lib/colors";

interface CardApiContainerProps {
  isNightMode: boolean;
}

export const CardApiContainer = styled.div<CardApiContainerProps>`
  width: 600px;
  background-color: ${({ isNightMode }) =>
    isNightMode ? color("dapplooker-color-bg-dark") : "white"};
  border: 1px solid
    ${({ isNightMode }) =>
      isNightMode ? color("dapplooker-modal-border") : "white"};
  border-radius: 0.5rem;
  position: relative;
  @media (max-width: 640px) {
    width: auto;
  }
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

interface DescriptionLinkProps {
  isNightMode: boolean;
}
export const DescriptionLink = styled.a<DescriptionLinkProps>`
  margin: 0 4px;
  text-decoration: underline;
  color: ${({ isNightMode }) => (isNightMode ? "#009cea" : "orange")};
`;
