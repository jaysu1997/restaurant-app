import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *{
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

  body{
    font-family: "Noto Sans TC", sans-serif;
    font-optical-sizing: auto;
    font-weight: 500;
    font-size: 1.6rem; 
    color: #1f2937;
    position: relative;

    background-color: #f8fafc;  
    min-height: 100dvh;
  }

  img{
    max-width: 100%;
  }
`;

export default GlobalStyles;
