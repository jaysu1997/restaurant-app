import styled, { css } from "styled-components";
import RequiredMark from "./RequiredMark";
import Label from "./Label";

const StyledFormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  min-width: 0px;
`;

const MetaText = styled.p`
  padding-left: 0.8rem;
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
          color: #9ca3af;
          font-weight: 400;
        `}
`;

// label + field + hint + error message
function FormFieldLayout({
  label,
  id,
  error,
  hint,
  required = false,
  children,
}) {
  const message = error?.message || hint || "";

  return (
    <StyledFormField>
      {label && (
        <Label htmlFor={id}>
          {label}
          {required && <RequiredMark />}
        </Label>
      )}
      {children}
      <MetaText $error={!!error}>{message}</MetaText>
    </StyledFormField>
  );
}

export default FormFieldLayout;
