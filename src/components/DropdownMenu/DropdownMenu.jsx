// ok
import { useRef } from "react";
import styled from "styled-components";
import useClickOutside from "../../hooks/ui/useClickOutside";

const Wrapper = styled.div`
  position: relative;
  margin-left: auto;
`;

const MenuContainer = styled.ul`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  width: min(16rem, calc(100dvw - 2rem));
  background-color: #fff;
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid #e3e5e7;
  border-radius: 6px;
  padding: 0.8rem 0;
  display: flex;
  flex-direction: column;
  z-index: 2;
`;

// 下拉按鈕菜單元件
function DropdownMenu({ trigger, onClose, isOpen, children }) {
  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, isOpen, onClose);

  return (
    <Wrapper ref={wrapperRef}>
      {trigger}
      {isOpen && <MenuContainer>{children}</MenuContainer>}
    </Wrapper>
  );
}

export default DropdownMenu;
