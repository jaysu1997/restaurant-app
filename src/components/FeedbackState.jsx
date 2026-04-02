// ok
import Description from "../ui/Description";
import styled, { keyframes } from "styled-components";

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

const StyledFeedbackState = styled.div`
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

  img {
    width: 100%;
    height: auto;
  }
`;

function FeedbackState({
  minHeight = "100%",
  illustration,
  heading,
  description,
  children,
}) {
  return (
    <StyledFeedbackState $minHeight={minHeight}>
      <Illustration>{illustration}</Illustration>
      <h2>{heading}</h2>
      <Description>{description}</Description>
      {children}
    </StyledFeedbackState>
  );
}

export default FeedbackState;
