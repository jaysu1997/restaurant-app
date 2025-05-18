import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";

import { useState } from "react";
import ConfirmDelete from "../../ui/ConfirmDelete";
import useDeleteOrder from "./useDeleteOrder";
import useUpdateOrder from "./useUpdateOrder";
import { scrollToTop } from "../../utils/scrollToTop";
import {
  formatCreatedTime,
  formatPickupNumber,
} from "../../utils/orderHelpers";

const Footer = styled.footer`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 2rem;
`;

const Button = styled.button`
  padding: 0.8rem 1.8rem;
  font-size: 1.6rem;
  font-weight: 600;
  border-radius: 6px;

  background-color: ${(props) => props.$bgColor};
  color: ${(props) => props.$fontColor};

  &:hover {
    background-color: ${(props) => props.$hoverBgColor};
  }
`;

function OrderOperation({ orderData, isEdit, handleSubmit, disabeldSubmit }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { mutate, isPending } = useDeleteOrder();
  const { orderId } = useParams();
  const navigate = useNavigate();

  return (
    <>
      <Footer>
        {isEdit ? (
          <Button
            $bgColor="#059669"
            $fontColor="#fff"
            $hoverBgColor="#047857"
            disabled={disabeldSubmit}
            onClick={() => {
              handleSubmit();
              navigate(`/order-edit/${orderId}`);
              scrollToTop();
            }}
          >
            儲存
          </Button>
        ) : (
          <Button
            $bgColor="#059669"
            $fontColor="#fff"
            $hoverBgColor="#047857"
            onClick={() => {
              navigate(`/order-edit/${orderId}`, { replace: true });
              scrollToTop();
            }}
          >
            編輯
          </Button>
        )}
        <Button
          $bgColor="#dc2626"
          $fontColor="#fff"
          $hoverBgColor="#b91c1c"
          onClick={() => setIsOpenModal(true)}
        >
          刪除
        </Button>
        {isEdit ? (
          <Button
            $bgColor="#e7e5e4"
            $fontColor="#333"
            $hoverBgColor="#d6d3d1"
            onClick={() => navigate(`/order/${orderId}`, { replace: true })}
          >
            取消更新
          </Button>
        ) : (
          <Button
            $bgColor="#e7e5e4"
            $fontColor="#333"
            $hoverBgColor="#d6d3d1"
            onClick={() => navigate(-1)}
          >
            返回列表
          </Button>
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
