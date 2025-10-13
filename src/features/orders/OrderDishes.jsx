// 訂單詳情頁面中的訂購餐點列表
import {
  summarizeMealChoices,
  calculateOrderSummary,
} from "../../utils/orderHelpers";
import { FiMinus } from "react-icons/fi";
import { GoTrash, GoPencil } from "react-icons/go";
import Button from "../../ui-old/Button";
import styled from "styled-components";
import { useState } from "react";
import { useOrder } from "../../context/OrderContext";
import OrderForm from "../../ui-old/OrderForm/OrderForm";

const OrderDishesList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const OrderDishRow = styled.li`
  display: grid;
  grid-template-columns: ${(props) => `
    ${props.$isEdit ? "2.6rem " : ""}
    minmax(0px, 1fr)
    minmax(0px, 1fr)
    minmax(0px, 1fr)
    minmax(0px, 0.5fr)
    minmax(0px, 0.5fr)
  `};

  column-gap: 1rem;
  padding: 1rem;
  overflow-wrap: break-word;

  &:first-child {
    background-color: #e7e5e4;
    border-radius: 6px;
    font-size: 1.4rem;
    font-weight: 400;
  }

  &:not(:first-child) {
    min-height: 8.1rem;
    border-bottom: 1px solid #dcdcdc;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const OrderSummary = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 1.8rem;
  font-weight: 600;
  padding: 1rem;
  column-gap: 1rem;
`;

function OrderDishes({ dishData, isEdit }) {
  const { totalServings, totalPrice } = calculateOrderSummary(dishData);

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
        <OrderDishRow $isEdit={isEdit} key={dish.uniqueId}>
          {isEdit && <OrderEditButton dishData={dish} />}
          <span>{dish.name}</span>
          <span>{summarizeMealChoices(dish) || <FiMinus />}</span>
          <span>{dish.note || <FiMinus />}</span>
          <span>{dish.servings}份</span>
          <span>$ {dish.itemTotalPrice * dish.servings}</span>
        </OrderDishRow>
      ))}

      <OrderSummary>
        <span>總計：</span>
        <span>{totalServings} 份餐點</span>
        <span>,</span>
        <span className="emphasize">${totalPrice}</span>
      </OrderSummary>
    </OrderDishesList>
  );
}

function OrderEditButton({ dishData }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { dispatch } = useOrder();

  return (
    <>
      <ButtonGroup>
        <Button $buttonStyle="remove" onClick={() => setIsOpenModal(dishData)}>
          <GoPencil strokeWidth={0.6} />
        </Button>
        <Button
          $buttonStyle="remove"
          onClick={() =>
            dispatch({
              type: "dishes/removeDish",
              payload: dishData.uniqueId,
            })
          }
        >
          <GoTrash strokeWidth={0.6} />
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
