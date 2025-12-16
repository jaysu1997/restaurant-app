import styled, { css } from "styled-components";

const variant = {
  primary: css`
    color: #fff;
    background-color: #2563eb;

    &:not(:disabled):hover {
      background-color: #1d4ed8;
    }
  `,
  secondary: css`
    color: #3b82f6;
    background-color: #fff;
    border-color: #3b82f6;

    &:not(:disabled):hover {
      background-color: #3b82f6;
      color: #fff;
    }
  `,
  tertiary: css`
    color: #3b82f6 !important;
    background-color: #eff6ff;

    &:not(:disabled):hover {
      background-color: #dbeafe;
    }
  `,
  outline: css`
    color: #374151;
    background-color: #fff;
    border-color: #d1d5db;

    &:not(:disabled):hover {
      background-color: #f9fafb;
    }
  `,
  danger: css`
    color: #fff;
    background-color: #dc2626;

    &:not(:disabled):hover {
      background-color: #b91c1c;
    }
  `,
  text: css`
    color: #2563eb;
    padding: 0.6rem 0.8rem;
    border-radius: 4px;
    background-color: #fff;

    &:not(:disabled):hover {
      background-color: #eff6ff;
    }
  `,
  ghost: css`
    color: #4b5563;
    padding: 0.6rem;

    &:not(:disabled):hover {
      background-color: #f3f4f6;
    }
  `,
  plain: css`
    width: 2rem;
    height: 3.8rem;
    padding: 0;
    border-width: 0px;
    color: #6b7280;

    &:not(:disabled):hover {
      color: ${({ $hoverColor }) => ($hoverColor ? $hoverColor : "#dc2626")};
    }
  `,
};

const Button = styled.button.attrs((props) => ({
  type: props.type || "button",
}))`
  cursor: pointer;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;

  font-size: 1.4rem;
  font-weight: 500;
  border: 1px solid transparent;
  padding: 0.8rem 2rem;

  transition: background-color 0.2s;

  width: ${({ $isFullWidth }) => ($isFullWidth ? "100%" : "max-content")};
  min-width: max-content;
  border-radius: 999px;

  &:disabled {
    cursor: not-allowed;
  }

  /* 載入中顯示動畫 */
  & > span {
    visibility: ${({ $isLoading }) => ($isLoading ? "hidden" : "visible")};
  }

  ${({ $variant = "primary" }) => variant[$variant]}
`;

export default Button;
