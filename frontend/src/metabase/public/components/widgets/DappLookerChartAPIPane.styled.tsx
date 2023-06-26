import styled from "@emotion/styled";
import { color } from "metabase/lib/colors";

export const IconContainer = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border: 1px solid ${color("border")};
  border-radius: 0.5rem;
  box-shadow: 0 2px 2px ${color("shadow")};
  display: grid;
  place-items: center;
`;

interface DescriptionProps {
    enableMouseEvents?: boolean;
}
export const APIResponseDescription = styled.p<DescriptionProps>`
  margin-top: 0;
  line-height: 1.5;
  ${({ enableMouseEvents }) => enableMouseEvents && "pointer-events: initial"};
  margin-bottom: 6px;
  color: #495573;
  font-weight: 700;
`;