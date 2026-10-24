// 這個可能需要改動設計(標題大小、padding、footer...)
import styled from "styled-components";
import Description from "./Description";
import FormActions from "./FormActions";
import TextButton from "./button/TextButton";

const StyledSectionContainer = styled.section`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const Container = styled.div`
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
`;

const InsideHeader = styled.header`
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

const OutsideHeader = styled.header`
  padding: 0.4rem;
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  h3 {
    font-weight: 600;
    font-size: 1.8rem;
  }
`;

const Title = styled.h2`
  color: var(--color-text-strong);
  font-size: var(--font-size-base);
`;

const AppendButtonWrapper = styled.div`
  padding: 2.4rem;
`;

const Footer = styled.footer`
  border-top: 1px solid #f3f4f6;
  padding: 0 2.4rem;
  height: 7.2rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

// 通用 section ui 元件
function SectionContainer({
  title,
  icon,
  description,
  headerPlacement,
  onReset,
  isProcessing,
  isDirty,
  onSubmit,
  appendButton,
  children,
}) {
  const isForm = Boolean(onSubmit);

  return (
    <StyledSectionContainer>
      {headerPlacement === "outside" && (
        <OutsideHeader>
          <h3>{title}</h3>

          {description && <Description>{description}</Description>}
        </OutsideHeader>
      )}

      <Container as={isForm ? "form" : "div"} onSubmit={onSubmit}>
        {headerPlacement === "inside" && (
          <InsideHeader>
            {icon}
            <Title>{title}</Title>
          </InsideHeader>
        )}

        {children}

        {appendButton && (
          <AppendButtonWrapper>
            <TextButton onClick={appendButton.actionFn}>
              {appendButton.label}
            </TextButton>
          </AppendButtonWrapper>
        )}

        {isForm && (
          <Footer>
            <FormActions
              onCancel={onReset}
              isProcessing={isProcessing}
              submitDisabled={!isDirty || isProcessing}
              cancelDisabled={!isDirty || isProcessing}
            />
          </Footer>
        )}
      </Container>
    </StyledSectionContainer>
  );
}

export default SectionContainer;
