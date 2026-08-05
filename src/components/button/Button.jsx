import styled, { css } from "styled-components";
import { hoverStyles } from "../../style/helpers";

const variant = {
  primary: css`
    color: #fff;
    background-color: #2563eb;

    ${hoverStyles(css`
      background-color: #1d4ed8;
    `)}
  `,
  secondary: css`
    color: #2563eb;
    background: #fff;
    border: 1px solid #dbe4f0;

    ${hoverStyles(css`
      background: #f8fbff;
      border-color: #93c5fd;
    `)}
  `,
  outline: css`
    color: #374151;
    background-color: #fff;
    border-color: #d1d5db;

    ${hoverStyles(css`
      background-color: #f9fafb;
    `)}

    &:disabled {
      background-color: #f9fafb;
    }
  `,
  danger: css`
    color: #fff;
    background-color: #dc2626;

    ${hoverStyles(css`
      background-color: #b91c1c;
    `)}
  `,
  ghost: css`
    color: #4b5563;
    border: none;
    padding: 0.6rem;
    height: 2.6rem;

    & svg {
      width: 1.4rem;
      height: 1.4rem;
    }

    ${hoverStyles(css`
      background-color: #f3f4f6;
    `)}
  `,
  plain: css`
    color: #6b7280;
    border: none;
  `,
};

const Button = styled.button.attrs((props) => ({
  type: props.type || "button",
}))`
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  font-size: 1.4rem;
  font-weight: 500;
  border: 1px solid transparent;
  border-radius: 999px;
  padding: 0.8rem 2rem;
  height: 4rem;
  min-width: max-content;

  transition:
    color 0.2s ease,
    background-color 0.2s ease,
    border-color 0.2s ease;

  &:disabled {
    cursor: not-allowed;
  }

  & svg {
    width: 1.6rem;
    height: 1.6rem;
  }

  ${({ $variant }) => variant[$variant || "primary"]}
`;

export default Button;
