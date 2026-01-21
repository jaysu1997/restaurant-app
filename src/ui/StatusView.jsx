import styled from "styled-components";
import Description from "./Description";

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
`;

const Img = styled.div`
  max-width: 28rem;

  svg {
    width: 100%;
    height: auto;
  }
`;

function StatusView({ minHeight, img, heading, description, children }) {
  return (
    <StyledStatusView className="fadeIn" $minHeight={minHeight}>
      <Img>{img}</Img>
      <h2>{heading}</h2>
      <Description>{description}</Description>
      {children}
    </StyledStatusView>
  );
}

export default StatusView;
