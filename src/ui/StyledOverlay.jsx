import styled from "styled-components";

const StyledOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 150;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(2px);
`;

export default StyledOverlay;
