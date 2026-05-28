import styled, { css } from "styled-components";
import Button from "./Button";

const iconVariant = {
  ghost: css`
    padding: 0.6rem;
    height: 2.6rem;

    & svg {
      width: 1.4rem;
      height: 1.4rem;
    }
  `,
  plain: css`
    width: 2rem;
    height: 3.8rem;
    padding: 0;

    & svg {
      width: 2rem;
      height: 2rem;
    }

    &:not(:disabled):hover {
      color: #dc2626;
    }
  `,
};

const IconButton = styled(Button)`
  ${({ $variant }) => iconVariant[$variant || "ghost"]}
`;

export default IconButton;
