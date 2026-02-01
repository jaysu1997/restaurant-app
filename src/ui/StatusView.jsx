import styled, { keyframes } from "styled-components";
import Description from "./Description";

const fadeIn = keyframes`
  from {
    opacity: 0;
    margin-top: -30px;
  }

  to {
    opacity: 1;
    margin-top: 0;
  }
`;

const StyledStatusView = styled.div`
  width: 100%;
  min-height: ${({ $minHeight }) => $minHeight || "100%"};
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3.2rem;
  padding: 3.6rem 1rem;
  text-align: center;
  animation: ${fadeIn} 0.3s ease forwards;
`;

const Illustration = styled.div`
  max-width: 28rem;

  svg {
    width: 100%;
    height: auto;
  }
`;

function StatusView({
  minHeight = "100%",
  img,
  heading,
  description,
  children,
}) {
  return (
    <StyledStatusView $minHeight={minHeight}>
      <Illustration>{img}</Illustration>
      <h2>{heading}</h2>
      <Description>{description}</Description>
      {children}
    </StyledStatusView>
  );
}

export default StatusView;
