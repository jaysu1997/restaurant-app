import styled from "styled-components";
import { useRef, useState } from "react";
import { FiMoreHorizontal, FiEye, FiEdit2, FiTrash } from "react-icons/fi";
import { GoKebabHorizontal, GoEye, GoPencil, GoTrash } from "react-icons/go";
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
  position: absolute;
  top: ${(props) => props.$position}px;
  right: 0;
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

    // 根據<Menu />展開後是否會超出視窗可是範圍來決定Y軸定位
    const idealBottom = toggleRect.bottom + spacing + menuHeight;
    const shouldOpenUpward = idealBottom > window.innerHeight;

    setPosition(
      shouldOpenUpward
        ? -spacing - menuHeight
        : toggleRef.current.offsetHeight + spacing
    );
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
          <GoKebabHorizontal size={20} strokeWidth={0.4} />
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
                <GoEye size={16} strokeWidth={0.4} />
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
                <GoPencil size={16} strokeWidth={0.4} />
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
                <GoTrash size={16} strokeWidth={0.4} />
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
