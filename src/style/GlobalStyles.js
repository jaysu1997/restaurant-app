import { createGlobalStyle } from "styled-components";

const GlobalStyles = createGlobalStyle`
  *{
    box-sizing: border-box;
    padding: 0;
    margin: 0;

    /* Hide scrollbar for Firefox */
    scrollbar-width: none;
  }

  /* Hide scrollbar for IE and Edge */
  *::-ms-scrollbar {
    display: none;
  }

  /* Hide scrollbar for WebKit-based browsers (Chrome, Safari) */
  ::-webkit-scrollbar {
    display: none;
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

  .toast-class {
  transform: scale(1); /* 確保不因縮放產生模糊 */
  will-change: transform; /* 提高渲染優先級 */
  -webkit-font-smoothing: antialiased; /* 平滑字體 */
}

  /* body{
  margin: 0;
  overflow: auto;
  background-color: transparent;
  transition: .3s background-color;
}
::-webkit-scrollbar{
  background-color: transparent;
  width: 12px;
}
::-webkit-scrollbar-thumb{
  background-color: rgba(0,0,0,.5);
  border-radius: 8px;
  background-clip: content-box;
  border: 2px solid transparent;
}
body[scroll],
::-webkit-scrollbar-thumb:hover{
  transition: 0s;
  background-color: rgba(0,0,0,.5);
} */
`;

export default GlobalStyles;
