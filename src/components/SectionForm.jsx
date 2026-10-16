import styled from "styled-components";
import TextButton from "./button/TextButton";
import FormActions from "./FormActions";

const Form = styled.form`
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
  padding: var(--space-9) var(--space-6);
`;

const AppendButtonContainer = styled.div`
  margin-top: var(--space-6);
`;

const Footer = styled.footer`
  border-top: 1px solid var(--color-surface-subtle);
  padding: 0 var(--space-6);
  height: 7.2rem;
  display: flex;
  align-items: center;
  justify-content: flex-end;
`;

function SectionForm({
  children,
  onReset,
  isProcessing,
  isDirty,
  appendButton,
  onSubmit,
}) {
  return (
    <Form onSubmit={onSubmit}>
      <Content>
        {children}

        {appendButton && (
          <AppendButtonContainer>
            <TextButton onClick={appendButton.actionFn}>
              {appendButton.label}
            </TextButton>
          </AppendButtonContainer>
        )}
      </Content>

      <Footer>
        <FormActions
          onCancel={onReset}
          isProcessing={isProcessing}
          submitDisabled={!isDirty || isProcessing}
          cancelDisabled={!isDirty || isProcessing}
        />
      </Footer>
    </Form>
  );
}

export default SectionForm;
