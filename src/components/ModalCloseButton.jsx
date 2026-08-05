import styled, { css } from "styled-components";
import { X } from "lucide-react";
import { hoverStyles } from "../style/helpers";

const StyledCloseButton = styled.button`
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
  transition: all 0.18s ease;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }

  ${hoverStyles(css`
    background-color: #f3f4f6;
  `)}

  &:active {
    transform: scale(0.95);
  }
`;

function ModalCloseButton({ onClose }) {
  return (
    <StyledCloseButton onClick={onClose}>
      <X />
    </StyledCloseButton>
  );
}

export default ModalCloseButton;
