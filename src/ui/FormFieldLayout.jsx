import styled from "styled-components";

const StyledFormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;

  & > label {
    /* padding-left: 0.8rem; */
    width: fit-content;
  }
`;

const ErrorMessage = styled.p`
  color: #ff3333;
  padding-left: 0.8rem;
  font-size: 1.3rem;
  font-weight: 500;
  min-height: 2rem;
`;

// 通用 label input + error message ui
function FormFieldLayout({ label, id, errors, children }) {
  return (
    <StyledFormField>
      {label && <label htmlFor={id}>{label}</label>}
      {children}
      {errors !== false && <ErrorMessage>{errors?.message}</ErrorMessage>}
    </StyledFormField>
  );
}

export default FormFieldLayout;

{
  /* <FormFieldLayout label={label} id={id} errors={errors}></FormFieldLayout> */
}
