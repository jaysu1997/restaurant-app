// ButtonSpinner.js
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const ButtonSpinner = styled.div`
  display: inline-block;
  height: 1.8rem;
  width: 1.8rem;
  border: 3px solid rgba(255, 255, 255, 0.6);
  border-top-color: white; /* 高亮部分 */
  border-radius: 50%;
  animation: ${spin} 0.8s linear infinite;
  vertical-align: middle;
`;

export default ButtonSpinner;
