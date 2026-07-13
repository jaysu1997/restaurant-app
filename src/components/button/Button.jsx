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
    color: #3b82f6;
    background-color: #eff6ff;

    ${hoverStyles(css`
      background-color: #dbeafe;
    `)}
  `,
  outline: css`
    color: #374151;
    background-color: #fff;
    border-color: #d1d5db;

    ${hoverStyles(css`
      background-color: #f9fafb;
    `)}
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
  position: ${({ $isProcessing }) => ($isProcessing ? "relative" : "static")};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;

  font-size: 1.4rem;
  font-weight: 500;
  border: 1px solid transparent;
  padding: 0.8rem 2rem;

  transition:
    color 0.2s,
    background-color 0.2s;
  height: 4rem;
  width: ${({ $isFullWidth }) => ($isFullWidth ? "100%" : "max-content")};
  border-radius: ${({ $isFullWidth }) => ($isFullWidth ? "6px" : "999px")};
  min-width: max-content;

  &:disabled {
    cursor: not-allowed;
  }

  & svg {
    width: ${({ $iconSize }) => ($iconSize ? $iconSize : "1.6rem")};
    height: ${({ $iconSize }) => ($iconSize ? $iconSize : "1.6rem")};
  }

  /* 載入中顯示動畫 */
  & > span {
    visibility: ${({ $isProcessing }) =>
      $isProcessing ? "hidden" : "visible"};
  }

  ${({ $variant }) => variant[$variant || "primary"]}
`;

export default Button;
