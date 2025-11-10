import * as styled from "styled-components";

// focus-visiable需要設定

// color
// #fff
// #dfdfdf
// #ddd
// #ccc
// #6b7280

// #fecaca
// #f87171
// #f43f5e
// #ff3333
// #dc2626

// focus color
// #2684ff

// shadow
// rgba(0, 0, 0, 0.04)

// border-radius
// 4px
// 6px
// 999px
// 50%

export const GlobalStyles = styled.createGlobalStyle`
  /* :root {
    --color-white: #fff;
  } */

  /* 預設所有容器用細滾動條 */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  *:disabled {
    cursor: not-allowed;
  }

  /* 頁面主滾動條用正常寬度 */
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
    font: inherit; /* 或者 font-family: inherit; */
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

  /* 後續或許可以針對button、input這些很常使用的tag進行總整理，把一些通用樣式設定寫在此處或是通用component中 */
  /* 或許需要修改 */
  button {
    cursor: pointer;
    border: none;
    background-color: transparent;

    &:disabled {
      opacity: 0.5;
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

  .emphasize {
    color: #dc2626;
  }

  /* 淡入動畫 */
  .fadeIn {
    opacity: 0;
    animation: fadeIn 0.3s ease forwards;
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-30px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;
