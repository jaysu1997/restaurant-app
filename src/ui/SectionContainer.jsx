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
`;

const SectionHeader = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;

  & > svg {
    color: #6b7280;
    width: 2rem;
    height: 2rem;
  }
`;

const Title = styled.h3`
  font-size: 2.2rem;
  font-weight: 700;
  color: #292929;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
`;

const ButtonGroup = styled.footer`
  display: flex;
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
  const disabled = !isDirty || isProcessing;

  return (
    <ContentContainer>
      <Section>
        {title && (
          <SectionHeader>
            <TitleRow>
              <Title>{title}</Title>
              {icon}
            </TitleRow>
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
              disabled={disabled}
            />

            <ButtonCancel onClick={handleReset} disabled={disabled} />
          </ButtonGroup>
        )}
      </Section>
    </ContentContainer>
  );
}

export default SectionContainer;
