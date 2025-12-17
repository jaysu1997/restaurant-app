import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ConfirmDelete from "../../ui-old/ConfirmDelete";
import {
  formatCreatedTime,
  formatPickupNumber,
} from "../../utils/orderHelpers";
import useDeleteOrder from "../../hooks/data/orders/useDeleteOrder";
import DropdownMenu from "../../ui-old/DropdownMenu";
import { Ellipsis, Trash2, SquarePen, Eye } from "lucide-react";

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
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
      icon: Eye,
      handleClick: () => navigate(`/order/${id}`),
    },
    {
      name: "編輯訂單",
      icon: SquarePen,
      handleClick: () => navigate(`/order/${id}/edit`),
    },
    {
      name: "刪除訂單",
      icon: Trash2,
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
          <Ellipsis size={20} strokeWidth={2.4} />
        </ToggleButton>
      </DropdownMenu>

      {isOpenModal && (
        <ConfirmDelete
          onCloseModal={() => setIsOpenModal(false)}
          handleDelete={mutate}
          isDeleting={isPending}
          data={orderData}
          showRelatedData={false}
          render={() => (
            <p>
              請確認是否要刪除
              <strong>{`取餐號碼${formatPickupNumber(pickupNumber)}`}</strong>
              &#8203;&nbsp;(
              {formatCreatedTime(createdTime)})，此操作無法復原。
            </p>
          )}
        />
      )}
    </>
  );
}

export default OrderDropdownMenu;
