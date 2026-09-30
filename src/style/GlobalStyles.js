import * as styled from "styled-components";

// focus-visiable需要設定
// focus color
// #2684ff

// 可參考的focus樣式設計
// &:focus-visible {
//   outline: 2px solid #93c5fd;
//   outline-offset: 2px;
//   border-radius: 2px;
// }

//  &:focus-visible {
//     outline: 3px solid rgba(37, 99, 235, 0.18);
//     outline-offset: 2px;
//   }

export const GlobalStyles = styled.createGlobalStyle`
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
    overflow-y: auto;
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

  input::placeholder,
  textarea::placeholder {
    color: #9ca3af;
    font-weight: 400;
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
    font: inherit;
    user-select: none;

    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
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

  /* 如果使用者在作業系統中設定「減少動畫」，網站就自動把動畫與轉場效果大幅降低 */
  @media (prefers-reduced-motion: reduce) {
    *,
    *::before,
    *::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
`;
