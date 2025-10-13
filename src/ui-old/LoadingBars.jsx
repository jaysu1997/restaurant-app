// LoadingBars.js
import styled, { keyframes } from "styled-components";

const wave = keyframes`
  0% { transform: scaleY(0.4); }
  50% { transform: scaleY(1); }
  100% { transform: scaleY(0.4); }
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-width: 32rem;
  min-height: 10rem;
  gap: 0.6rem; /* 柱子間距 */
`;

const Bar = styled.div`
  width: 8px; /* 柱子寬度，可調整 */
  height: 40px; /* 柱子最大高度 */
  background-color: #374151; /* 淡藍色 */
  border-radius: 4px;
  animation: ${wave} 0.6s infinite ease-in-out;
  animation-delay: ${({ $delay }) => $delay};
  transform-origin: bottom;
`;

function LoadingBars() {
  return (
    <Wrapper>
      <Bar $delay="0s" />
      <Bar $delay="0.15s" />
      <Bar $delay="0.3s" />
    </Wrapper>
  );
}

export default LoadingBars;
