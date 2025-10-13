import styled from "styled-components";
import StandaloneLayout from "./StandaloneLayout";

const Img = styled.div`
  max-width: 24rem;

  svg {
    width: 100%;
    height: auto;
  }
`;

const Heading = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
`;

const Caption = styled.p`
  text-align: center;
  color: #6b7280;
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 1.6rem;
  padding: 1rem;
`;

function ErrorPageLayout({ icon, heading, caption, action }) {
  return (
    <StandaloneLayout>
      <Img>{icon}</Img>
      <Heading>{heading}</Heading>
      <Caption>{caption}</Caption>
      <ButtonGroup>{action}</ButtonGroup>
    </StandaloneLayout>
  );
}

export default ErrorPageLayout;
