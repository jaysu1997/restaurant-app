import styled, { css } from "styled-components";

const StyledFormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  min-width: 0px;

  & > label {
    width: fit-content;
  }
`;

const MetaText = styled.p`
  padding-left: 0.9rem;
  font-size: 1.3rem;
  min-height: 2rem;
  transition:
    color 0.2s ease,
    opacity 0.2s ease;

  ${({ $error }) =>
    $error
      ? css`
          color: #ff3333;
          font-weight: 500;
        `
      : css`
          color: #8a8a8a;
          font-weight: 400;
        `}

  @media (max-width: 500px) {
    min-height: auto;
  }
`;

// label + field + hint + error message
function FormFieldLayout({ label, id, error, hint, children }) {
  const message = error?.message || hint || "";

  return (
    <StyledFormField>
      {label && <label htmlFor={id}>{label}</label>}
      {children}
      <MetaText $error={!!error}>{message}</MetaText>
    </StyledFormField>
  );
}

export default FormFieldLayout;
