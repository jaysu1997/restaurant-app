import styled from "styled-components";
import { useState } from "react";
import { GoKebabHorizontal, GoEye, GoPencil, GoTrash } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "../../ui-old/ConfirmDelete";
import {
  formatCreatedTime,
  formatPickupNumber,
} from "../../utils/orderHelpers";
import useDeleteOrder from "../../hooks/data/orders/useDeleteOrder";
import DropdownMenu from "../../ui-old/DropdownMenu";

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

function OrderDropdownMenu({ orderData, isOpenMenu, setIsOpenMenu }) {
  const { mutate, isPending } = useDeleteOrder();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const navigate = useNavigate();

  const { id, pickupNumber, createdTime } = orderData;

  function handleToggle(e) {
    e.stopPropagation();
    setIsOpenMenu((isOpenMenu) => (isOpenMenu === id ? false : id));
  }

  const itemsConfig = [
    {
      name: "檢視訂單",
      icon: GoEye,
      handleClick: () => navigate(`/order/${id}`),
    },
    {
      name: "編輯訂單",
      icon: GoPencil,
      handleClick: () => navigate(`/order/${id}/edit`),
    },
    {
      name: "刪除訂單",
      icon: GoTrash,
      handleClick: () => setIsOpenModal(true),
    },
  ];

  return (
    <>
      <DropdownMenu
        itemsConfig={itemsConfig}
        open={isOpenMenu === id}
        setIsOpenMenu={setIsOpenMenu}
        isOpenMenu={isOpenMenu}
      >
        <ToggleButton
          $isActive={isOpenMenu === id}
          onClick={(e) => handleToggle(e)}
        >
          <GoKebabHorizontal size={20} strokeWidth={0.4} />
        </ToggleButton>
      </DropdownMenu>

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
