import styled from "styled-components";
import {
  formatCreatedTime,
  formatPickupNumber,
} from "../../../utils/orderHelpers";
import { SquarePen, Trash2 } from "lucide-react";
import Button from "../../../components/button/Button";
import { useNavigate } from "react-router";
import OrderSection from "./OrderSection";
import { useState } from "react";
import useDeleteOrder from "../../../hooks/data/orders/useDeleteOrder";
import ConfirmDelete from "../../../ui/ConfirmDelete";

const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 2rem;
  margin-bottom: 3.2rem;
`;

const PickupNumber = styled.div`
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  width: fit-content;
  padding: 0.6rem 1.4rem;
  border-radius: 999px;
  background-color: #eef2ff;
  color: #4338ca;
  font-size: 1.8rem;
  font-weight: 700;
  letter-spacing: 0.036rem;
  box-shadow: inset 0 0 0 1px #c7d2fe;
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  flex-shrink: 0;
`;

const EditButton = styled(Button).attrs({ $variant: "ghost" })`
  height: 3.6rem;
  width: 7.2rem;
  padding: 0;
  color: #15803d;
  font-size: 1.3rem;

  &:not(:disabled):hover {
    background: #f0fdf4;
    color: #166534;
  }

  @media (max-width: 30em) {
    height: 3.2rem;
    width: 3.2rem;

    & > span {
      display: none;
    }
  }
`;

const DeleteButton = styled(EditButton)`
  color: #dc2626;

  &:not(:disabled):hover {
    background-color: #fef2f2;
    color: #b91c1c;
  }
`;

function OrderOverview({ orderData, isEdit, children }) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const deleteMutation = useDeleteOrder();
  const navigate = useNavigate();
  const { createdAt, orderUUID, pickupNumber, status } = orderData;
  const isCompleted = status === "已完成";

  return (
    <>
      <OrderSection>
        <Header>
          <PickupNumber>{formatPickupNumber(pickupNumber)}</PickupNumber>

          {!isEdit && !isCompleted && (
            <HeaderActions>
              <EditButton onClick={() => navigate("edit")}>
                <SquarePen />
                <span>編輯</span>
              </EditButton>

              <DeleteButton onClick={() => setIsDeleteModalOpen(true)}>
                <Trash2 />
                <span>刪除</span>
              </DeleteButton>
            </HeaderActions>
          )}
        </Header>

        <div>
          <label>建立時間：</label>
          <span>{formatCreatedTime(createdAt)}</span>
        </div>

        <div>
          <label>訂單編號：</label>
          <span>{orderUUID}</span>
        </div>

        {children}
      </OrderSection>

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
              {formatCreatedTime(orderData.createdAt)})？
            </p>
          )}
        />
      )}
    </>
  );
}

export default OrderOverview;
