import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { FiMoreHorizontal, FiEye, FiEdit2, FiTrash } from "react-icons/fi";
import { createPortal } from "react-dom";

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #666;
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
  position: absolute;
  top: ${(props) => props.$position.y}px;
  right: ${(props) => props.$position.x}px;
  background: white;
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
  z-index: 1;
`;

const MenuItem = styled.li`
  padding: 0.2rem 0.4rem;
  width: 16rem;

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

function OrderDropdownMenu() {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState(null);
  const menuRef = useRef(null);

  // 點擊菜單外部時關閉菜單
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <>
      <ToggleButton
        ref={menuRef}
        onClick={() => {
          setIsOpen((isOpen) => !isOpen);
          const rect = menuRef.current.getBoundingClientRect();

          setPosition({
            x: document.documentElement.clientWidth - rect.x - rect.width,
            y: window.scrollY + rect.bottom + 6,
          });
        }}
      >
        <FiMoreHorizontal />
      </ToggleButton>

      {isOpen &&
        createPortal(
          <Menu $isOpen={isOpen} $position={position}>
            <MenuItem onClick={() => console.log("檢視")}>
              <button>
                <FiEye />
                <span>檢視</span>
              </button>
            </MenuItem>
            <MenuItem onClick={() => console.log("編輯")}>
              <button>
                <FiEdit2 />
                <span>編輯</span>
              </button>
            </MenuItem>
            <MenuItem onClick={() => console.log("刪除")}>
              <button>
                <FiTrash />
                <span>刪除</span>
              </button>
            </MenuItem>
          </Menu>,
          document.body
        )}
    </>
  );
}

export default OrderDropdownMenu;
