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
    overflow-y: scroll;
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

  img {
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
    flex-shrink: 0;
  }

  .icon-md {
    width: 1.6rem;
    height: 1.6rem;
    flex-shrink: 0;
  }

  .icon-lg {
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
  }

  .icon-xl {
    width: 2.4rem;
    height: 2.4rem;
    flex-shrink: 0;
  }

  .emphasize {
    color: #dc2626;
  }

  /* 淡入動畫 */
  .fadeIn {
    animation: fadeIn 0.3s ease forwards;
  }

  /* 原本是用translateY，但是在append新欄位時會造成圖層問題，然導致剛新增欄位後展開daypicker，會看到按鈕浮在daypicker之上，所以改用margin-top */
  @keyframes fadeIn {
    from {
      opacity: 0;
      margin-top: -30px;
    }
    to {
      opacity: 1;
      margin-top: 0;
    }
  }
`;
