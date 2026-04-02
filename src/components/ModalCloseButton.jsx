import styled from "styled-components";
import { X } from "lucide-react";

const StyledCloseButton = styled.button`
  width: 2.8rem;
  height: 2.8rem;
  color: #000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  flex-shrink: 0;

  & svg {
    width: 1.6rem;
    height: 1.6rem;
  }

  &::before {
    content: "";
    position: absolute;
    inset: 0;
    border: 1px solid #374151;
    border-radius: 50%;
    transition: all 0.3s;
  }

  &:hover::before {
    transform: scale(1.1);
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.1);
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
