import styled from "styled-components";

const StyledFormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0px;

  & > label {
    width: fit-content;
  }
`;

const ErrorMessage = styled.p`
  color: #ff3333;
  font-size: 1.3rem;
  font-weight: 500;
  min-height: 2rem;
`;

// label + field + error message
function FormFieldLayout({ label, id, error, children }) {
  return (
    <StyledFormField>
      {label && <label htmlFor={id}>{label}</label>}
      {children}
      <ErrorMessage>{error?.message}</ErrorMessage>
    </StyledFormField>
  );
}

export default FormFieldLayout;
