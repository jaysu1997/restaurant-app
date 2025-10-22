// 按鈕中的 Loading 動畫
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

const ButtonSpinner = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  &::before {
    content: "";
    height: 1.8rem;
    width: 1.8rem;
    border: 3px solid rgba(255, 255, 255, 0.6);
    border-top-color: white;
    border-radius: 50%;
    animation: ${spin} 0.8s linear infinite;
  }
`;

export default ButtonSpinner;
