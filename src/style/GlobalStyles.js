import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }

  *:disabled {
    cursor: not-allowed;
  } 
  
  html {
    font-size: 62.5%;    
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
    resize: none;
    height: 6.4rem;
    border: 1px solid #cacaca;
    border-radius: 5px;
    padding: 0.3rem 0.6rem;
    font-size: 1.4rem;
    line-height: 1.4;
  }

  input {
    outline: none;
    border: none;
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

.emphasize{
    color: #dc2626;
  }
`;

export default GlobalStyles;
