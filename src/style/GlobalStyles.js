import * as styled from "styled-components";

// focus-visiable需要設定
// focus color
// #2684ff

// space

// color

// shadow

// border-radius

export const GlobalStyles = styled.createGlobalStyle`
  /* :root {
    --color-white: #fff;
  } */

  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  html {
    font-size: 62.5%;
    scrollbar-gutter: stable;
  }

  body {
    font-family: "Noto Sans TC", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 1.5;
    color: #1f2937;
    background-color: #f9fafb;
    min-height: 100dvh;

    overflow-y: scroll;
    padding-right: 0px !important;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-weight: 700;
  }

  input,
  textarea,
  select,
  button {
    font: inherit;
  }

  img,
  svg {
    display: block;
    max-width: 100%;
  }

  li {
    list-style: none;
  }

  a {
    text-decoration: none;
  }

  button {
    cursor: pointer;
    border: none;
    background-color: transparent;

    &:disabled {
      opacity: 0.5;
      cursor: default;
    }
  }

  svg {
    flex-shrink: 0;
  }

  input {
    outline: none;
    border: none;
  }

  /* 覆蓋會自動以本地系統顏色(windows色彩)為勾選顏色的小問題 */
  input[type="radio"]:checked,
  input[type="checkbox"]:checked {
    accent-color: #2563eb;
  }

  .icon-sm {
    width: 1.4rem;
    height: 1.4rem;
  }

  .icon-md {
    width: 1.6rem;
    height: 1.6rem;
  }

  .icon-lg {
    width: 2rem;
    height: 2rem;
  }

  .icon-xl {
    width: 2.4rem;
    height: 2.4rem;
  }
`;
