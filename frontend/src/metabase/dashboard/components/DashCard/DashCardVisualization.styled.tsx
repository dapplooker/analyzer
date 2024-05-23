import styled from "@emotion/styled";
import Button, { ButtonProps } from "metabase/core/components/Button";
import QueryDownloadWidget from "metabase/query_builder/components/QueryDownloadWidget";
import { lighten, color, alpha } from "metabase/lib/colors";

export const CardDownloadWidget = styled(QueryDownloadWidget)`
  display: block;
  color: ${lighten("text-light", 0.1)};
  margin: 0 0 0 0.5rem;

  &:hover {
    color: ${color("brand")};
  }
`;
const getDefaultColor = () => color("brand");

interface CardApiWidgetProps extends ButtonProps {
  active?: boolean;
  isNightMode?: boolean;
}

export const CardApiWidget = styled(Button)<CardApiWidgetProps>`
  opacity: ${({ active }) => (active ? "1" : "0")};
  font-size: 0.75rem;
  padding: 0.25rem 0.625rem;
  border-radius: 1rem;
  color: ${({ active, isNightMode }) =>
    isNightMode
      ? active
        ? color("text-medium")
        : color("text-light")
      : active
      ? "white"
      : color("text-dark")};

  background-color: ${({ active, color = getDefaultColor(), isNightMode }) =>
    isNightMode
      ? active
        ? "#03000c"
        : "transparent"
      : active
      ? color
      : "transparent"};

  border-color: ${({ isNightMode }) =>
    isNightMode ? color("black") : color("border")};

  &:hover {
    background-color: ${({ color = getDefaultColor() }) => alpha(color, 0.15)};
    color: ${({ color }) => color};
    border-color: ${({ isNightMode }) =>
      isNightMode ? color("black") : color("border")};
  }

  transition: background 300ms linear, border 300ms linear, opacity 200ms;
  > .Icon {
    opacity: 0.6;
  }
  .Card:hover & {
    opacity: 1;
  }
  @media (prefers-reduced-motion) {
    transition: none;
  }
`;
