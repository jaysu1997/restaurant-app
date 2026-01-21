// 訂單詳情頁面中的訂購餐點列表
import {
  summarizeMealChoices,
  calculateOrderSummary,
} from "../../utils/orderHelpers";
import { Pencil, Trash2 } from "lucide-react";
import styled from "styled-components";
import { useState } from "react";
import { useOrder } from "../../context/OrderContext";
import OrderForm from "../../ui-old/OrderForm/OrderForm";
import MiniMenu from "./MiniMenu";
import Button from "../../ui/Button";

const OrderDishesList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const OrderDishRow = styled.li`
  display: grid;
  grid-template-columns: 1.2fr repeat(2, minmax(5.6rem, 0.4fr)) 5.6rem;
  gap: 1.2rem;
  padding: 1rem;

  overflow-wrap: break-word;
  border-bottom: 1px solid #dcdcdc;
  min-height: 8rem;

  &:first-child {
    background-color: #e7e5e4;
    border-radius: 6px;
    font-weight: 500;
    font-size: 1.4rem;
    border: none;
    min-height: 0;
  }

  .dishName {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-weight: 600;
  }

  @media (max-width: 35em) {
    grid-template-columns: minmax(0px, 1fr) auto;

    &:first-child > span:not(:first-child) {
      display: none;
    }

    .dishPrice {
      justify-self: end;
      white-space: nowrap;
    }
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: end;
  gap: 0.2rem;

  @media (max-width: 35em) {
    grid-row: 1;
    grid-column: 2;
  }
`;

const OrderSummary = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 600;
  padding: 1rem 0;
  gap: 1rem;
  flex-wrap: wrap;

  & > div {
    display: inline-flex;
    gap: 1rem;
    align-items: center;
    margin-left: auto;
  }
`;

const ItemMeta = styled.div`
  grid-row: 2;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-weight: 400;
  font-size: 1.4rem;

  .dishNote {
    color: #6b7280;
  }

  @media (max-width: 35em) {
    grid-column: 1 / -1;
  }
`;

function OrderDishes({ dishes, isEdit }) {
  const { totalServings, totalPrice } = calculateOrderSummary(dishes);

  return (
    <OrderDishesList>
      <OrderDishRow>
        <span>訂購餐點</span>
        <span>數量</span>
        <span>金額</span>
      </OrderDishRow>

      {dishes.map((dish) => (
        <OrderDishRow key={dish.uniqueId}>
          <span className="dishName">{dish.name}</span>
          <ItemMeta>
            {dish.customize.length !== 0 && <p>{summarizeMealChoices(dish)}</p>}
            {dish.note && <p className="dishNote">{`" ${dish.note} "`}</p>}
          </ItemMeta>

          <span>{dish.servings} 份</span>
          <span className="emphasize dishPrice">
            $ {dish.itemTotalPrice * dish.servings}
          </span>
          {isEdit && <OrderEditButton dish={dish} />}
        </OrderDishRow>
      ))}

      <OrderSummary>
        {isEdit && <MiniMenu />}
        <div>
          <span>總計：</span>
          <span>共 {totalServings} 份</span>
          <span>,</span>
          <span className="emphasize">$ {totalPrice}</span>
        </div>
      </OrderSummary>
    </OrderDishesList>
  );
}

function OrderEditButton({ dish }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { dispatch } = useOrder();

  return (
    <>
      <ButtonGroup>
        <Button $variant="ghost" onClick={() => setIsOpenModal(dish)}>
          <Pencil />
        </Button>
        <Button
          $variant="ghost"
          onClick={() =>
            dispatch({
              type: "dishes/removeDish",
              payload: dish.uniqueId,
            })
          }
        >
          <Trash2 />
        </Button>
      </ButtonGroup>

      {isOpenModal && (
        <OrderForm
          orderDish={isOpenModal}
          onCloseModal={() => setIsOpenModal(false)}
          isEdit={true}
        />
      )}
    </>
  );
}

export default OrderDishes;
