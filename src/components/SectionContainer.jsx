// 這個可能需要改動設計(標題大小、padding、footer...)
import styled from "styled-components";
import Description from "./Description";

const Container = styled.section`
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: var(--space-3);
  height: 6.4rem;
  padding: var(--space-4) var(--space-6);
  border-bottom: 1px solid var(--color-surface-subtle);

  & > svg {
    width: 2rem;
    height: 2rem;
    color: var(--color-text-muted);
  }
`;

const Title = styled.h2`
  color: var(--color-text-strong);
  font-size: var(--font-size-base);
`;

const DescriptionWrapper = styled.div`
  padding: var(--space-6) var(--space-6) 0;
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
