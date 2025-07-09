import * as styled from "styled-components";

export const GlobalStyles = styled.createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    scrollbar-width: thin;
  }

  *:disabled {
    cursor: not-allowed;
  }

  html {
    font-size: 62.5%;
    scrollbar-gutter: stable;
    scrollbar-width: auto;
  }

  body {
    font-family: "Noto Sans TC", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-size: 1.6rem;
    color: #1f2937;
    background-color: #f9fafb;
    min-height: 100dvh;
  }

  img {
    max-width: 100%;
  }

  button {
    cursor: pointer;
    background-color: transparent;
    border: none;
    transition: all 0.3s;

    &:disabled {
      opacity: 0.5;
    }
  }

  li {
    list-style: none;
  }

  textarea {
    width: 100%;
    resize: none;
    min-height: 6.4rem;
    border: 1px solid #cacaca;
    border-radius: 6px;
    padding: 0.3rem 0.6rem;
    font-size: 1.4rem;
    line-height: 1.4;
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

  /* 移除number input的預設上下按鈕 */
  /* 適用於 Chrome、Edge、Opera */
  input[type="number"]::-webkit-inner-spin-button,
  input[type="number"]::-webkit-outer-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  /* 適用於 Firefox */
  input[type="number"] {
    -moz-appearance: textfield;
  }

  /* 將input auto-fill時預設的淡藍色背景改成全白 */
  input:-webkit-autofill {
    -webkit-box-shadow: 0 0 0 1000px white inset !important;
    box-shadow: 0 0 0 1000px white inset !important;
    -webkit-text-fill-color: inherit !important;
  }

  .emphasize {
    color: #dc2626;
  }
`;
