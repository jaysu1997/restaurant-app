import styled, { css } from "styled-components";
import Button from "./Button";
import { hoverStyles } from "../../style/helpers";

const sizeStyles = {
  sm: css`
    width: 2.4rem;
    height: 2.4rem;
    padding: 0;

    svg {
      width: 1.6rem;
      height: 1.6rem;
    }
  `,
  md: css`
    width: 2rem;
    height: 4.2rem;
    padding: 0;

    svg {
      width: 2rem;
      height: 2rem;
    }
  `,
};

const hoverColorStyles = {
  blue: css`
    ${hoverStyles(css`
      color: #2563eb;
    `)}
  `,
  red: css`
    ${hoverStyles(css`
      color: #dc2626;
    `)}
  `,
};

const IconButton = styled(Button).attrs({
  $variant: "plain",
})`
  ${({ $size = "md" }) => sizeStyles[$size]}
  ${({ $hoverColor = "red" }) => hoverColorStyles[$hoverColor]}
`;

export default IconButton;
