import styled from "styled-components";
import Caption from "./Caption";

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

const ButtonGroup = styled.footer`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;
  justify-content: center;
`;

// 狀態ui(404、error)
function StatusView({ minHeight, img, heading, caption, action }) {
  return (
    <StyledStatusView className="fadeIn" $minHeight={minHeight}>
      <Img>{img}</Img>
      <h2>{heading}</h2>
      <Caption>{caption}</Caption>
      <ButtonGroup>{action}</ButtonGroup>
    </StyledStatusView>
  );
}

export default StatusView;
