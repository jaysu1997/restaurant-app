import styled, { css } from "styled-components";
import RequiredMark from "./RequiredMark";
import Label from "./Label";

const StyledFormField = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-1-5);
  min-width: 0px;
`;

const MetaText = styled.p`
  padding-left: var(--space-2);
  font-size: 1.3rem;
  min-height: 2rem;
  transition:
    color 0.2s ease,
    opacity 0.2s ease;

  ${({ $error }) =>
    $error
      ? css`
          color: var(--color-danger);
          font-weight: var(--font-weight-medium);
        `
      : css`
          color: var(--color-text-placeholder);
          font-weight: var(--font-weight-regular);
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
