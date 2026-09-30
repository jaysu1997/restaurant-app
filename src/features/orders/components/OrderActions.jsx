import styled, { css } from "styled-components";
import { hoverStyles } from "../../../style/helpers";
import Button from "../../../components/button/Button";
import { SquarePen, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { useState } from "react";
import useDeleteOrder from "../../../hooks/data/orders/useDeleteOrder";
import ConfirmDelete from "../../../components/ConfirmDelete";
import {
  formatDateTime,
  formatPickupNumber,
} from "../../../utils/orderHelpers";

const StyledOrderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

const EditButton = styled(Link)`
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  height: 3.6rem;
  color: #6b7280;
  font-size: 1.3rem;
  font-weight: 500;

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }

  ${hoverStyles(css`
    color: #3b82f6;
  `)}

  @media (max-width: 50em) {
    span {
      display: none;
    }
  }
`;

const DeleteButton = styled(Button)`
  height: 3.6rem;
  padding: 0;
  font-size: 1.3rem;
  color: #b91c1c;

  ${hoverStyles(css`
    color: #dc2626;
  `)}

  @media (max-width: 50em) {
    span {
      display: none;
    }
  }
`;

function OrderActions({ orderData }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const deleteMutation = useDeleteOrder();
  const isCompleted = orderData.status === "已完成";

  return (
    <>
      <StyledOrderActions>
        {!isCompleted && (
          <EditButton
            to={`/orders/${orderData.id}/edit`}
            aria-label="編輯訂單"
            title="編輯訂單"
          >
            <SquarePen />
            <span>編輯</span>
          </EditButton>
        )}

        <DeleteButton
          $variant="plain"
          onClick={() => setIsDeleteModalOpen(true)}
          aria-label="刪除訂單"
          title="刪除訂單"
        >
          <Trash2 />
          <span>刪除</span>
        </DeleteButton>
      </StyledOrderActions>

      {isDeleteModalOpen && (
        <ConfirmDelete
          onClose={() => setIsDeleteModalOpen(false)}
          deleteMutation={deleteMutation}
          data={orderData}
          render={() => (
            <p>
              請確認是否要刪除
              <strong>{`取餐號碼${formatPickupNumber(
                orderData.pickupNumber,
              )}`}</strong>
              &#8203;&nbsp;(
              {formatDateTime(orderData.createdAt)})？
            </p>
          )}
        />
      )}
    </>
  );
}

export default OrderActions;
