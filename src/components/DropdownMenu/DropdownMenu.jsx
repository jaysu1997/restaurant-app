import { useEffect, useRef } from "react";
import styled from "styled-components";
import useClickOutside from "../../hooks/ui/useClickOutside";
import useRestoreFocus from "../../hooks/ui/useRestoreFocus";

const Wrapper = styled.div`
  position: relative;
  margin-left: auto;
`;

const MenuContainer = styled.ul`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  width: min(16rem, calc(100dvw - 2rem));
  background-color: var(--color-surface);
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--color-border-subtle);
  border-radius: var(--radius-md);
  padding: var(--space-2) 0;
  display: flex;
  flex-direction: column;
  z-index: 2;
`;

// 下拉按鈕菜單元件
function DropdownMenu({ trigger, onClose, isOpen, children }) {
  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, isOpen, onClose);
  useRestoreFocus(onClose, isOpen);

  return (
    <Wrapper ref={wrapperRef}>
      {trigger}
      {isOpen && <MenuContainer>{children}</MenuContainer>}
    </Wrapper>
  );
}

export default DropdownMenu;
