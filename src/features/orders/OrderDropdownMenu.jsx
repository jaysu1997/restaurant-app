import styled from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router";
import ConfirmDelete from "../../ui/ConfirmDelete";
import {
  formatCreatedTime,
  formatPickupNumber,
} from "../../utils/orderHelpers";
import useDeleteOrder from "../../hooks/data/orders/useDeleteOrder";
import DropdownMenu from "../../ui/DropdownMenu";
import { Ellipsis, Trash2, SquarePen, Eye } from "lucide-react";

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  height: 2.8rem;
  width: 2.8rem;
  background-color: ${({ $isActive }) =>
    $isActive ? "#e5e7eb" : "transparent"};

  & svg {
    width: 2rem;
    height: 2rem;
  }

  &:hover {
    background-color: #e5e7eb;
  }
`;

function OrderDropdownMenu({ orderData, openMenuId, setOpenMenuId }) {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(null);
  const deleteMutation = useDeleteOrder();

  const { id, pickupNumber, createdAt, status } = orderData;
  const isFinished = status === "已完成";

  const actions = [
    {
      name: "檢視訂單",
      icon: Eye,
      handleClick: () => navigate(`/order/${id}`),
      hidden: false,
    },
    {
      name: "編輯訂單",
      icon: SquarePen,
      handleClick: () => navigate(`/order/${id}/edit`),
      hidden: isFinished,
    },
    {
      name: "刪除訂單",
      icon: Trash2,
      handleClick: () => setIsOpen(true),
      hidden: isFinished,
    },
  ];

  return (
    <>
      <DropdownMenu
        items={actions}
        isOpen={openMenuId === id}
        onClose={() => setOpenMenuId(null)}
      >
        <ToggleButton
          $isActive={openMenuId === id}
          onClick={() => {
            setOpenMenuId((isOpenMenu) => (isOpenMenu === id ? null : id));
          }}
        >
          <Ellipsis strokeWidth={2.4} />
        </ToggleButton>
      </DropdownMenu>

      {isOpen && (
        <ConfirmDelete
          setIsOpenModal={setIsOpen}
          deleteMutation={deleteMutation}
          data={orderData}
          showRelatedData={false}
          render={() => (
            <p>
              請確認是否要刪除
              <strong> {`取餐號碼${formatPickupNumber(pickupNumber)}`} </strong>
              ({formatCreatedTime(createdAt)})?
            </p>
          )}
        />
      )}
    </>
  );
}

export default OrderDropdownMenu;
