import styled from "styled-components";
import TextButton from "./button/TextButton";
import FormActions from "./FormActions";

const Form = styled.form`
  width: 100%;
`;

const Content = styled.div`
  width: 100%;
  padding: 3.6rem 2.4rem;
`;

const AppendButtonContainer = styled.div`
  margin-top: 2.4rem;
`;

const Footer = styled.footer`
  border-top: 1px solid #f3f4f6;
  padding: 0 2.4rem;
  height: 7.2rem;
  display: flex;
  align-items: center;
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
