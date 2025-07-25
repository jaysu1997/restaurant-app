import styled from "styled-components";

const StyledSettingFormSection = styled.form`
  background: #fff;
  border: 1px solid #dfdfdf;
  border-radius: 6px;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
`;

const Wrapper = styled.section`
  display: grid;
  grid-template-columns: 32rem 1fr;
  padding: 3.2rem;
  column-gap: 4rem;
  row-gap: 2rem;
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
  border-top: 1px solid #dfdfdf;
  padding: 1.6rem 3.2rem;
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
    <StyledSettingFormSection onSubmit={handleSubmit}>
      <Wrapper>
        <FormHeading>
          <h3>{title}</h3>
          <p>{description}</p>
        </FormHeading>
        {children}
      </Wrapper>
      <Footer>
        <SubmitButton disabled={false}>儲存</SubmitButton>
        <CancelButton type="button" onClick={handleReset} disabled={!isDirty}>
          取消
        </CancelButton>
      </Footer>
    </StyledSettingFormSection>
  );
}

export default SettingFormSection;
