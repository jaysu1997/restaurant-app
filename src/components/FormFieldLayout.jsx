import styled, { css } from "styled-components";

const StyledFormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  min-width: 0px;
`;

const Label = styled.label`
  width: fit-content;
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
          color: #dc2626;
          font-weight: 500;
        `
      : css`
          color: #8a8a8a;
          font-weight: 400;
        `}
`;

// label + field + hint + error message
function FormFieldLayout({ label, id, error, hint, children }) {
  const message = error?.message || hint || "";

  return (
    <StyledFormField>
      {label && <Label htmlFor={id}>{label}</Label>}
      {children}
      <MetaText $error={!!error}>{message}</MetaText>
    </StyledFormField>
  );
}

export default FormFieldLayout;
