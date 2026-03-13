// ok
import { useRef } from "react";
import styled from "styled-components";
import useClickOutside from "../hooks/ui/useClickOutside";

const Wrapper = styled.div`
  position: relative;
`;

const MenuContainer = styled.ul`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  background: #fff;
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid #e3e5e7;
  border-radius: 6px;
  padding: 0.8rem 0;
  display: flex;
  flex-direction: column;
  z-index: 1;
`;

const MenuItem = styled.li`
  width: 16rem;

  &:hover {
    background: #f0f0f0;
  }

  button {
    width: 100%;
    padding: 1rem 2rem;
    gap: 1rem;
    display: flex;
    align-items: center;
    font-weight: 400;
    font-size: 1.4rem;
  }

  svg {
    width: 1.8rem;
    height: 1.8rem;
  }
`;

// 下拉按鈕菜單元件
function DropdownMenu({ itemsConfig, onClose, isOpen, children }) {
  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, isOpen, onClose);

  return (
    <Wrapper ref={wrapperRef}>
      {children}
      {isOpen && (
        <MenuContainer>
          {itemsConfig
            .filter((item) => !item.hidden)
            .map((item) => {
              const Icon = item.icon;

              return (
                <MenuItem key={item.name}>
                  <button
                    onClick={() => {
                      item.handleClick();
                      onClose();
                    }}
                  >
                    <Icon />
                    <span>{item.name}</span>
                  </button>
                </MenuItem>
              );
            })}
        </MenuContainer>
      )}
    </Wrapper>
  );
}

export default DropdownMenu;
