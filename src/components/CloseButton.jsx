import styled, { css } from "styled-components";
import { X } from "lucide-react";
import { hoverStyles } from "../style/helpers";

// 或許filter的close button也可以使用這個的?但是縮小版本?
const StyledCloseButton = styled.button`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  width: 3.6rem;
  height: 3.6rem;
  border-radius: 50%;
  color: var(--color-text-slate-muted);
  background-color: transparent;
  transition: all 0.18s ease;

  svg {
    width: 2rem;
    height: 2rem;
  }

  ${hoverStyles(css`
    color: var(--color-text-slate-strong);
    background-color: var(--color-surface-subtle);
  `)}

  &:active {
    transform: scale(0.95);
  }
`;

// 可能要考慮到處都需要加上ariaLabel?
function CloseButton({ className, onClose, ariaLabel = "關閉" }) {
  return (
    <StyledCloseButton
      className={className}
      type="button"
      onClick={onClose}
      aria-label={ariaLabel}
    >
      <X />
    </StyledCloseButton>
  );
}

export default CloseButton;
