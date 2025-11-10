import styled, { css } from "styled-components";

const type = {
  primary: css`
    color: #fff;
    background-color: #2563eb;

    &:not(:disabled):hover {
      background-color: #1d4ed8;
    }
  `,
  secondary: css`
    background-color: #fff;
    border: 1px solid #d1d5db;
    color: #374151;

    &:not(:disabled):hover {
      background-color: #f9fafb;
    }
  `,
  tertiary: css`
    color: #3b82f6 !important;
    background-color: #eff6ff;

    &:not(:disabled):hover {
      background-color: #dbeafe;
    }
  `,
  danger: css`
    color: #fff;
    background-color: #dc2626;

    &:not(:disabled):hover {
      background-color: #b91c1c;
    }
  `,
  text: css``,
  ghost: css``,
};

const size = {
  sm: css`
    width: fit-content;
  `,
  xl: css`
    width: 100%;
  `,
};

const rounded = {
  sm: css`
    border-radius: 4px;
  `,
  md: css`
    border-radius: 6px;
  `,
  full: css`
    border-radius: 999px;
  `,
};

const Button = styled.button`
  cursor: pointer;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.6rem;
  flex-shrink: 0;

  font-size: 1.4rem;
  font-weight: 500;
  border: 1px solid transparent;
  padding: 0.8rem 2rem;

  transition: background-color 0.2s;

  height: fit-content;

  & > span {
    visibility: ${({ $isLoading }) => ($isLoading ? "hidden" : "visible")};
  }

  ${({ $type }) => type[$type]}
  ${({ $size }) => size[$size]}
  ${({ $rounded }) => rounded[$rounded]} /* @container (width < 12rem) {
    span {
      display: none;
    }
  } */
`;

export default Button;
