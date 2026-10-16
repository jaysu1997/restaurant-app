import styled, { css } from "styled-components";
import Button from "./Button";
import { hoverStyles } from "../../style/helpers";
import { Plus } from "lucide-react";

const StyledTextButton = styled(Button)`
  color: var(--color-brand);
  padding: var(--space-1-5) var(--space-2);
  border-radius: var(--radius-sm);
  height: 3.6rem;
  width: fit-content;

  ${hoverStyles(css`
    background-color: var(--color-brand-subtle);
  `)}
`;

function TextButton({ children, onClick, disabled }) {
  return (
    <StyledTextButton $variant="plain" onClick={onClick} disabled={disabled}>
      <Plus />
      {children}
    </StyledTextButton>
  );
}

export default TextButton;
