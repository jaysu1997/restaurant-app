import styled from "styled-components";
import ContentContainer from "./ContentContainer";
import Description from "./Description";
import { Plus } from "lucide-react";
import SubmitButton from "../components/button/SubmitButton";
import Button from "../components/button/Button";
import TextButton from "../components/button/TextButton";

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
            <TextButton onClick={appendButton.actionFn}>
              <Plus />
              {appendButton.label}
            </TextButton>
          )}
        </Content>

        {formId && (
          <ButtonGroup>
            <SubmitButton
              form={formId}
              isProcessing={isProcessing}
              disabled={disabled}
            />

            <Button
              $variant="outline"
              onClick={handleReset}
              disabled={disabled}
            >
              取消
            </Button>
          </ButtonGroup>
        )}
      </Section>
    </ContentContainer>
  );
}

export default SectionContainer;
