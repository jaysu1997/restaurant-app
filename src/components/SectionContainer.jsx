// 這個可能需要改動設計(標題大小、padding、footer...)
import styled from "styled-components";
import Description from "./Description";

const Container = styled.section`
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  height: 6.4rem;
  padding: 1.6rem 2.4rem;
  border-bottom: 1px solid #f3f4f6;

  & > svg {
    width: 2rem;
    height: 2rem;
    color: #6b7280;
  }
`;

const Title = styled.h2`
  color: #111827;
  font-size: 1.6rem;
`;

const DescriptionWrapper = styled.div`
  padding: 2.4rem 2.4rem 0;
`;

// 通用 section ui 元件
function SectionContainer({ header, icon, description, children }) {
  return (
    <Container>
      {header && (
        <Header>
          {icon}
          <Title>{header}</Title>
        </Header>
      )}

      {description && (
        <DescriptionWrapper>
          <Description>{description}</Description>
        </DescriptionWrapper>
      )}

      {children}
    </Container>
  );
}

export default SectionContainer;
