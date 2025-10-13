import styled from "styled-components";
import ContentContainer from "../ui/ContentContainer";

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  font-size: 1.4rem;
`;

const FormHeading = styled.header`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  h3 {
    font-size: 2rem;
  }

  p {
    color: #797f87;
  }
`;

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  gap: 2rem;
`;

const SubmitButton = styled.button`
  background-color: #2563eb;
  color: #fff;
  padding: 0.6rem 1.8rem;
  border-radius: 4px;
  font-weight: 500;
`;

const CancelButton = styled(SubmitButton)`
  color: #333;
  background-color: #eee;
`;

function SettingFormSection({
  title = "",
  description = "",
  handleSubmit,
  handleReset,
  isDirty,
  children,
}) {
  return (
    <ContentContainer>
      <Form onSubmit={handleSubmit}>
        <FormHeading>
          <h3>{title}</h3>
          <p>{description}</p>
        </FormHeading>

        {children}

        <Footer>
          <SubmitButton disabled={!isDirty}>儲存</SubmitButton>
          <CancelButton type="button" onClick={handleReset} disabled={!isDirty}>
            取消
          </CancelButton>
        </Footer>
      </Form>
    </ContentContainer>
  );
}

export default SettingFormSection;
