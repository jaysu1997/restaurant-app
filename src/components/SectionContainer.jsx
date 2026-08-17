// 這個可能需要改動設計(標題大小、padding、footer...)
import styled from "styled-components";
import { Plus } from "lucide-react";
import TextButton from "./button/TextButton";
import FormActions from "./FormActions";
import Description from "./Description";

const Section = styled.section`
  background-color: #fff;
  border: 1px solid #e5e7eb;
  padding: 2.4rem;
  border-radius: 6px;
  height: fit-content;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4rem;
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

// 通用 section ui 元件
function SectionContainer({
  header,
  onSubmit,
  onReset,
  isDirty,
  isProcessing,
  appendButton,
  children,
}) {
  const { title, icon, description } = header || {};
  // 檢查是否需要用到form還是純展示
  const isForm = Boolean(onSubmit);

  return (
    <Section>
      <Container
        as={isForm ? "form" : "div"}
        onSubmit={isForm ? onSubmit : undefined}
      >
        {header && (
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

        {isForm && (
          <FormActions
            onCancel={onReset}
            isProcessing={isProcessing}
            submitDisabled={!isDirty || isProcessing}
            cancelDisabled={!isDirty || isProcessing}
          />
        )}
      </Container>
    </Section>
  );
}

export default SectionContainer;
