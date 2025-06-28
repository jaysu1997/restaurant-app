import styled from "styled-components";
import { useRef, useState } from "react";
import { FiMoreHorizontal, FiEye, FiEdit2, FiTrash } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "../../ui/ConfirmDelete";
import {
  formatCreatedTime,
  formatPickupNumber,
} from "../../utils/orderHelpers";
import useDeleteOrder from "../../hooks/data/orders/useDeleteOrder";

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
  background-color: ${(props) => (props.$isActive ? "#e5e7eb" : "transparent")};

  &:hover {
    background-color: #e5e7eb;
  }
`;

const Menu = styled.ul`
  position: fixed;
  top: ${(props) => props.$position.y}px;
  left: ${(props) => props.$position.x}px;

  background: #fff;
  box-shadow: 0px 4px 32px rgba(0, 0, 0, 0.2);
  border-radius: 6px;
  padding: 0.8rem 0;
  display: flex;
  flex-direction: column;
  visibility: ${(props) => (props.$isOpenMenu ? "visible" : "hidden")};
  transition: visibility 0.5s;
  z-index: 1;
`;

const MenuItem = styled.li`
  width: 14rem;

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
`;

function OrderDropdownMenu({
  orderData,
  isOpenMenu,
  setIsOpenMenu,
  activeMenuRef,
}) {
  const { mutate, isPending } = useDeleteOrder();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [position, setPosition] = useState(null);
  const toggleRef = useRef(null);
  const navigate = useNavigate();
  const { id, pickupNumber, createdTime } = orderData;

  function handleToggle(e) {
    e.stopPropagation();
    setIsOpenMenu((isOpenMenu) => (isOpenMenu === id ? false : id));

    const toggleRect = toggleRef.current.getBoundingClientRect();
    const menuHeight = 133;
    const spacing = 6;
    const MENU_WIDTH = 140;
    const TOGGLE_WIDTH = 28;

    // 判斷空間足夠，就顯示在下方，否則顯示在上方
    const showBelow =
      window.innerHeight - toggleRect.bottom > menuHeight + spacing;

    setPosition({
      x: toggleRect.left - MENU_WIDTH + TOGGLE_WIDTH,
      y: showBelow
        ? toggleRect.bottom + spacing
        : toggleRect.top - menuHeight - spacing,
    });
  }

  return (
    <>
      <MenuContainer>
        <ToggleButton
          ref={toggleRef}
          $isActive={isOpenMenu === id}
          onClick={(e) => {
            handleToggle(e);
          }}
        >
          <FiMoreHorizontal size={20} />
        </ToggleButton>

        {isOpenMenu === id && (
          <Menu
            ref={activeMenuRef}
            $isOpenMenu={isOpenMenu}
            $position={position}
          >
            <MenuItem>
              <button
                onClick={() => {
                  navigate(`/order/${id}`);
                  setIsOpenMenu(false);
                }}
              >
                <FiEye size={16} />
                <span>檢視訂單</span>
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => {
                  navigate(`/order-edit/${id}`);
                  setIsOpenMenu(false);
                }}
              >
                <FiEdit2 size={16} />
                <span>編輯訂單</span>
              </button>
            </MenuItem>
            <MenuItem>
              <button
                onClick={() => {
                  setIsOpenMenu(false);
                  setIsOpenModal(true);
                }}
              >
                <FiTrash size={16} />
                <span>刪除訂單</span>
              </button>
            </MenuItem>
          </Menu>
        )}
      </MenuContainer>

      {isOpenModal && (
        <ConfirmDelete
          onCloseModal={() => setIsOpenModal(false)}
          handleDelete={mutate}
          isDeleting={isPending}
          data={orderData}
          modalType="order"
          render={() => (
            <p>
              請確認是否要刪除
              <strong>{`取餐號碼${formatPickupNumber(pickupNumber)}`}</strong>
              &#8203;&nbsp;(
              {formatCreatedTime(createdTime)}) 。
            </p>
          )}
        />
      )}
    </>
  );
}

export default OrderDropdownMenu;
