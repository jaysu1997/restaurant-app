import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { useState } from "react";
import ConfirmDelete from "../../ui/ConfirmDelete";
import {
  formatCreatedTime,
  formatPickupNumber,
} from "../../utils/orderHelpers";
import useDeleteOrder from "../../hooks/data/orders/useDeleteOrder";
import Button from "../../ui/Button";
import ButtonSubmit from "../../ui/ButtonSubmit";
import { SquarePen, Trash2 } from "lucide-react";

const Footer = styled.footer`
  grid-column: 1;
  display: flex;
  align-items: center;
  gap: 2rem;

  & > div {
    margin-left: auto;
  }
`;

function OrderOperation({
  orderData,
  isEdit,
  handleSubmit,
  disabeldSubmit,
  isUpdating,
}) {
  const { status } = orderData;
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const deleteMutation = useDeleteOrder();

  return (
    <>
      <Footer>
        {isEdit && (
          <ButtonSubmit
            isProcessing={isUpdating}
            disabled={disabeldSubmit || isUpdating}
            onClick={() => handleSubmit()}
          />
        )}

        {!isEdit && status !== "已完成" && (
          <Button
            $variant="secondary"
            onClick={() => navigate(`/order/${orderId}/edit`)}
          >
            <SquarePen />
            編輯
          </Button>
        )}

        <Button
          $variant="outline"
          onClick={() => {
            navigate(-1);
          }}
          disabled={isUpdating}
        >
          {isEdit ? "取消" : "返回"}
        </Button>

        {!isEdit && status !== "已完成" && (
          <div>
            <Button $variant="danger" onClick={() => setIsOpenModal(true)}>
              <Trash2 />
              刪除
            </Button>
          </div>
        )}
      </Footer>

      {isOpenModal && (
        <ConfirmDelete
          setIsOpenModal={setIsOpenModal}
          deleteMutation={deleteMutation}
          data={orderData}
          showRelatedData={false}
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

export default OrderOperation;
