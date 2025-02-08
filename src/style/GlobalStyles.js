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
    position: relative;
    /* background-color: #f9fafb; */
    background-color: #ffffff;
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
    -webkit-appearance: none; /* 隱藏按鈕 */
    margin: 0; /* 移除額外的預設邊距 */
  }

/* 適用於 Firefox */
  input[type="number"] {
    -moz-appearance: textfield; /* 讓 Firefox 的 number 表現為普通文字框 */
  }

  /* 消除input autocomplete的淡藍色背景 */
  input:is(:-webkit-autofill, :autofill) {
    -webkit-box-shadow: 0 0 0 1000px white inset;
    box-shadow: 0 0 0 1000px white inset;
    -webkit-text-fill-color: #000; /* 設置文字顏色 */
  }
`;

export default GlobalStyles;
