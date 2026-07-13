// ok
import { useRef } from "react";
import styled, { css } from "styled-components";
import useClickOutside from "../hooks/ui/useClickOutside";
import { hoverStyles } from "../style/helpers";

const Wrapper = styled.div`
  position: relative;
  margin-left: auto;
`;

const MenuContainer = styled.ul`
  position: absolute;
  top: calc(100% + 6px);
  right: 0;
  background-color: #fff;
  box-shadow: 0px 0px 32px rgba(0, 0, 0, 0.1);
  border: 1px solid #e3e5e7;
  border-radius: 6px;
  padding: 0.8rem 0;
  display: flex;
  flex-direction: column;
  z-index: 2;
`;

const MenuItem = styled.li`
  width: 16rem;

  ${hoverStyles(css`
    background-color: #f3f4f6;
  `)}

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
function DropdownMenu({ items, onClose, isOpen, children }) {
  const wrapperRef = useRef(null);
  useClickOutside(wrapperRef, isOpen, onClose);

  return (
    <Wrapper ref={wrapperRef}>
      {children}
      {isOpen && (
        <MenuContainer>
          {items
            .filter((item) => !item.hidden)
            .map((item) => {
              const { name, handleClick, icon: Icon } = item;

              return (
                <MenuItem key={name}>
                  <button
                    onClick={() => {
                      handleClick();
                      onClose();
                    }}
                  >
                    <Icon />
                    <span>{name}</span>
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
