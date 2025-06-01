// 訂單詳情頁面中的訂購餐點列表
import {
  summarizeMealChoices,
  calculateOrderSummary,
} from "../../utils/orderHelpers";
import { FiMinus } from "react-icons/fi";
import { GoTrash, GoPencil } from "react-icons/go";
import Button from "../../ui/Button";
import styled from "styled-components";
import { useState } from "react";
import { useOrder } from "../../context/OrderContext";
import OrderForm from "../../ui/OrderForm/OrderForm";

const OrderDishesList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const OrderDishRow = styled.li`
  display: grid;
  grid-template-columns: ${(props) =>
    props.$isEdit
      ? "2.6rem minmax(0px, 1fr) minmax(0px, 1fr) minmax(0px, 1fr) minmax(0px, 0.5fr) minmax(0px, 0.5fr)"
      : "minmax(0px, 1fr) minmax(0px, 1fr) minmax(0px, 1fr) minmax(0px, 0.5fr) minmax(0px, 0.5fr)"};

  column-gap: 1rem;
  padding: 1rem;
  overflow-wrap: break-word;

  &:first-child {
    background-color: #e7e5e4;
    border-radius: 6px;
    font-size: 1.4rem;
    font-weight: 400;
  }

  &:not(:first-child):not(:last-child) {
    min-height: 8.1rem;
    border-bottom: 1px solid #dcdcdc;
  }

  &:last-child {
    display: flex;
    margin-left: auto;
    font-size: 1.8rem;
    font-weight: 600;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

function OrderDishes({ dishData, isEdit }) {
  const { totalQuantity, totalCost } = calculateOrderSummary(dishData);

  return (
    <OrderDishesList>
      <OrderDishRow $isEdit={isEdit}>
        {isEdit && <span aria-hidden="true"></span>}
        <span>名稱</span>
        <span>細項</span>
        <span>備註</span>
        <span>份量</span>
        <span>小計</span>
      </OrderDishRow>

      {dishData.map((dish) => (
        <OrderDishItem dishData={dish} isEdit={isEdit} key={dish.uniqueId} />
      ))}

      <OrderDishRow>
        <span>總計：</span>
        <span>共{totalQuantity}份</span>
        <span>/</span>
        <span className="emphasize">$ {totalCost}</span>
      </OrderDishRow>
    </OrderDishesList>
  );
}

function OrderDishItem({ dishData, isEdit }) {
  return (
    <OrderDishRow $isEdit={isEdit}>
      {isEdit && <OrderEditButton dishData={dishData} />}
      <span>{dishData.name}</span>
      <span>{summarizeMealChoices(dishData) || <FiMinus />}</span>
      <span>{dishData.note || <FiMinus />}</span>
      <span>{dishData.servings}份</span>
      <span>$ {dishData.itemTotalPrice * dishData.servings}</span>
    </OrderDishRow>
  );
}

function OrderEditButton({ dishData }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { dispatch } = useOrder();

  return (
    <>
      <ButtonGroup>
        <Button $buttonStyle="remove" onClick={() => setIsOpenModal(dishData)}>
          <GoPencil />
        </Button>
        <Button
          $buttonStyle="remove"
          onClick={() =>
            dispatch({
              type: "order/removeDish",
              payload: dishData.uniqueId,
            })
          }
        >
          <GoTrash />
        </Button>
      </ButtonGroup>

      {isOpenModal && (
        <OrderForm
          dishData={isOpenModal}
          onCloseModal={() => setIsOpenModal(false)}
          isEdit={true}
        />
      )}
    </>
  );
}

export default OrderDishes;
