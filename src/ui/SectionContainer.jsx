import styled from "styled-components";
import ContentContainer from "./ContentContainer";
import Description from "./Description";
import ButtonSubmit from "./ButtonSubmit";
import ButtonCancel from "./ButtonCancel";
import Button from "./Button";
import { Plus } from "lucide-react";

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 4rem;
  font-size: 1.4rem;

  label {
    color: #525252;
    font-weight: 500;
  }
`;

const SectionHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const Header = styled.header`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  svg {
    color: #6b7280;
    width: 2rem;
    height: 2rem;
    flex-shrink: 0;
  }
`;

const Title = styled.h3`
  font-size: 2.2rem;
  font-weight: 700;
  color: #292929;
`;

const Icon = styled.div`
  width: 2rem;
  height: 2rem;
  flex-shrink: 0;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const ButtonGroup = styled.footer`
  display: flex;
  justify-content: flex-start;
  gap: 2.4rem;
`;

// 設定section ui
function SectionContainer({
  title,
  icon,
  description,
  form = {},
  appendButton,
  children,
}) {
  const { formId, handleReset, isDirty, isProcessing } = form;

  return (
    <ContentContainer>
      <Section>
        {title && (
          <SectionHeader>
            <Header>
              <Title>{title}</Title>
              <Icon>{icon}</Icon>
            </Header>
            {description && <Description>{description}</Description>}
          </SectionHeader>
        )}

        <Content>
          {children}

          {appendButton && (
            <Button $variant="text" onClick={appendButton.actionFn}>
              <Plus />
              {appendButton.label}
            </Button>
          )}
        </Content>

        {formId && (
          <ButtonGroup>
            <ButtonSubmit
              form={formId}
              isProcessing={isProcessing}
              disabled={!isDirty || isProcessing}
            />

            <ButtonCancel
              onClick={handleReset}
              disabled={!isDirty || isProcessing}
            />
          </ButtonGroup>
        )}
      </Section>
    </ContentContainer>
  );
}

export default SectionContainer;
