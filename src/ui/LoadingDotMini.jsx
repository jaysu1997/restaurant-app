import styled, { keyframes } from "styled-components";

const dotsAnimation = keyframes`
0%  {box-shadow: 1.6rem 0 #bfdbfe, -1.6rem 0 rgba(191, 219, 254, 0.25);background: #bfdbfe }
    33% {box-shadow: 1.6rem 0 #bfdbfe, -1.6rem 0 rgba(191, 219, 254, 0.25);background: rgba(191, 219, 254, 0.25)}
    66% {box-shadow: 1.6rem 0 rgba(191, 219, 254, 0.25),-1.6rem 0 #bfdbfe; background: rgba(191, 219, 254, 0.25)}
    100%{box-shadow: 1.6rem 0 rgba(191, 219, 254, 0.25),-1.6rem 0 #bfdbfe; background: #bfdbfe }
`;

const LoadingDotMini = styled.div`
  width: 1rem;
  aspect-ratio: 1;
  border-radius: 50%;
  margin: 1.2rem;

  animation: ${dotsAnimation} 1s infinite linear alternate;
`;

export default LoadingDotMini;
