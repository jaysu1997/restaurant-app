import styled from "styled-components";
import { useRef, useState } from "react";
import { FiMoreHorizontal, FiEye, FiEdit2, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const MenuContainer = styled.div`
  position: relative;
`;

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #333;
  border-radius: 6px;
  height: 2.8rem;
  width: 2.8rem;

  &:hover {
    background-color: #e5e7eb;
  }

  svg {
    height: 2rem;
    width: 2rem;
  }
`;

const Menu = styled.ul`
  position: fixed;
  top: ${(props) => props.$position.y}px;
  right: ${(props) => props.$position.x}px;
  background: #fff;
  box-shadow: 0px 4px 32px rgba(0, 0, 0, 0.1);
  border-radius: 6px;
  padding: 0.8rem 0;
  display: flex;
  flex-direction: column;
  opacity: ${(props) => (props.$isOpen ? 1 : 0)};
  visibility: ${(props) => (props.$isOpen ? "visible" : "hidden")};
  transform: scale(${(props) => (props.$isOpen ? 1 : 0.95)});
  transform-origin: top right;
  transition: opacity 0.2s ease, transform 0.2s ease, visibility 0.2s;
  z-index: 10;
`;

const MenuItem = styled.li`
  width: 16rem;
  z-index: 2;

  &:hover {
    background: #f0f0f0;
  }

  button {
    width: 100%;
    height: fit-content;
    padding: 1rem 2rem;
    gap: 1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

function OrderDropdownMenu({
  tableRef,
  orderId,
  isOpen,
  setIsOpen,
  activeMenuRef,
}) {
  const [position, setPosition] = useState(null);
  const toggleRef = useRef(null);
  const navigate = useNavigate();

  function handleToggle(e) {
    e.stopPropagation();
    setIsOpen((isOpen) => (isOpen === orderId ? false : orderId));

    const tableRect = tableRef.current.getBoundingClientRect();
    const toggleRect = toggleRef.current.getBoundingClientRect();

    // 預設展開位置在toggleButton的下方，若空間不足則改成上方
    setPosition({
      x: document.documentElement.clientWidth - toggleRect.x - toggleRect.width,
      y:
        tableRect.bottom > toggleRect.bottom + 133
          ? window.scrollY + toggleRect.bottom + 6
          : window.scrollY + toggleRect.top - 127 - 6,
    });
  }

  return (
    <MenuContainer>
      <ToggleButton
        ref={toggleRef}
        onClick={(e) => {
          handleToggle(e);
        }}
      >
        <FiMoreHorizontal />
      </ToggleButton>

      {isOpen === orderId && (
        <Menu ref={activeMenuRef} $isOpen={isOpen} $position={position}>
          <MenuItem>
            <button
              onClick={() => {
                navigate(`/order/${orderId}`);
                setIsOpen(false);
              }}
            >
              <FiEye />
              <span>檢視</span>
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={() => {
                console.log("編輯");
                setIsOpen(false);
              }}
            >
              <FiEdit2 />
              <span>編輯</span>
            </button>
          </MenuItem>
          <MenuItem>
            <button
              onClick={() => {
                console.log("刪除");
                setIsOpen(false);
              }}
            >
              <FiTrash />
              <span>刪除</span>
            </button>
          </MenuItem>
        </Menu>
      )}
    </MenuContainer>
  );
}

export default OrderDropdownMenu;
