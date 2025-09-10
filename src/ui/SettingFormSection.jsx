import styled from "styled-components";

// 這個外框或許可以變成一個通用ui元件
const StyledSettingSection = styled.section`
  background: #fff;
  border: 1px solid #dfdfdf;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  padding: 2.4rem;
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
  justify-content: flex-start;
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
    <StyledSettingSection>
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
    </StyledSettingSection>
  );
}

export default SettingFormSection;
