import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import ConfirmDelete from "../../ui-old/ConfirmDelete";
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

function OrderOperation({ orderData, isEdit, handleSubmit, disabeldSubmit }) {
  const { orderId } = useParams();
  const navigate = useNavigate();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { mutate, isPending } = useDeleteOrder();

  return (
    <>
      <Footer>
        {isEdit ? (
          <ButtonSubmit
            isLoading={disabeldSubmit}
            disabled={disabeldSubmit}
            onClick={() => handleSubmit()}
          />
        ) : (
          <Button
            $variant="secondary"
            onClick={() => navigate(`/order/${orderId}/edit`)}
          >
            <SquarePen size={16} />
            編輯
          </Button>
        )}

        <Button
          $variant="outline"
          onClick={() => {
            navigate(-1);
          }}
        >
          {isEdit ? "取消" : "返回"}
        </Button>

        {!isEdit && (
          <div>
            <Button $variant="danger" onClick={() => setIsOpenModal(true)}>
              <Trash2 size={16} />
              刪除
            </Button>
          </div>
        )}
      </Footer>

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
              <strong>{`取餐號碼${formatPickupNumber(
                orderData.pickupNumber
              )}`}</strong>
              &#8203;&nbsp;(
              {formatCreatedTime(orderData.createdTime)}) 。
            </p>
          )}
        />
      )}
    </>
  );
}

export default OrderOperation;
