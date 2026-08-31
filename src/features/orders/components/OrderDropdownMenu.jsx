// ok
import styled, { css } from "styled-components";
import { useState } from "react";
import { useNavigate } from "react-router";
import ConfirmDelete from "../../../components/ConfirmDelete";
import {
  formatDateTime,
  formatPickupNumber,
} from "../../../utils/orderHelpers";
import useDeleteOrder from "../../../hooks/data/orders/useDeleteOrder";
import DropdownMenu from "../../../components/DropdownMenu";
import { Ellipsis, Trash2, SquarePen, Eye } from "lucide-react";
import { hoverStyles } from "../../../style/helpers";

const ToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  height: 3rem;
  width: 3rem;
  background-color: ${({ $isActive }) =>
    $isActive ? "#e5e7eb" : "transparent"};

  svg {
    width: 2rem;
    height: 2rem;
  }

  ${hoverStyles(css`
    background-color: #e5e7eb;
  `)}
`;

function OrderDropdownMenu({ orderData, openMenuId, setOpenMenuId }) {
  const navigate = useNavigate();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const deleteMutation = useDeleteOrder();

  const { id, pickupNumber, createdAt, status } = orderData;
  const isFinished = status === "已完成";

  const actions = [
    {
      name: "檢視訂單",
      icon: Eye,
      handleClick: () => navigate(`/orders/${id}`),
      hidden: false,
    },
    {
      name: "編輯訂單",
      icon: SquarePen,
      handleClick: () => navigate(`/orders/${id}/edit`),
      hidden: isFinished,
    },
    {
      name: "刪除訂單",
      icon: Trash2,
      handleClick: () => setIsDeleteModalOpen(true),
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

      {isDeleteModalOpen && (
        <ConfirmDelete
          onClose={() => setIsDeleteModalOpen(false)}
          deleteMutation={deleteMutation}
          data={orderData}
          render={() => (
            <p>
              請確認是否要刪除
              <strong>
                {" "}
                {`取餐號碼 ${formatPickupNumber(pickupNumber)}`}{" "}
              </strong>
              ({formatDateTime(createdAt)})?
            </p>
          )}
        />
      )}
    </>
  );
}

export default OrderDropdownMenu;
