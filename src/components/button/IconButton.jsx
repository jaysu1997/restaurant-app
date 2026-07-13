import styled, { css } from "styled-components";
import Button from "./Button";
import { hoverStyles } from "../../style/helpers";

const sizeStyles = {
  sm: css`
    height: 2.6rem;
    padding: 0.6rem;

    svg {
      width: 1.4rem;
      height: 1.4rem;
    }
  `,
  md: css`
    width: 2rem;
    height: 3.8rem;
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
