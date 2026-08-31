import styled, { css } from "styled-components";
import Button from "./Button";
import { hoverStyles } from "../../style/helpers";
import { Plus } from "lucide-react";

const StyledTextButton = styled(Button).attrs({ $variant: "plain" })`
  color: #2563eb;
  padding: 0.6rem 0.8rem;
  border-radius: 4px;
  height: 3.6rem;
  width: fit-content;

  ${hoverStyles(css`
    background-color: #eff6ff;
  `)}
`;

function TextButton({ children, onClick, disabled }) {
  return (
    <StyledTextButton onClick={onClick} disabled={disabled}>
      <Plus />
      {children}
    </StyledTextButton>
  );
}

export default TextButton;
