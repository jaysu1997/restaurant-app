// 訂單詳情頁面中的訂購餐點列表
import {
  summarizeMealChoices,
  calculateOrderSummary,
} from "../../utils/orderHelpers";
import { Pencil, Trash2, Minus } from "lucide-react";
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
  grid-template-rows: 2.6rem;
  grid-template-columns:
    minmax(0px, 1fr) minmax(0px, 1fr) minmax(5rem, 0.5fr)
    minmax(6rem, 0.5fr)
    5.4rem;

  gap: 1rem;
  padding: 1rem;

  font-weight: 600;
  overflow-wrap: break-word;
  border-bottom: 1px solid #dcdcdc;

  &:first-child {
    grid-template-rows: auto;
    background-color: #e7e5e4;
    border-radius: 6px;
    font-weight: 400;
    font-size: 1.4rem;
    border: none;
  }

  [data-value="餐點"] {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  [data-value="項目"] {
    grid-row: 2;
  }

  [data-value="備註"] {
    grid-row: 1 / 3;
    grid-column: 2;
  }

  [data-value="金額"] {
    color: #dc2626;
  }

  @media (max-width: 30em) {
    grid-template-columns: minmax(0px, 1fr) auto;

    &:first-child > span:not(:first-child) {
      display: none;
    }

    [data-value="項目"] {
      grid-row: 2;
      grid-column: 1 / -1;
    }

    [data-value="備註"] {
      grid-row: 3;
      grid-column: 1 / -1;

      svg {
        display: none;
      }
    }

    [data-value="數量"] {
      grid-row: 4;
      grid-column: 1;
    }

    [data-value="金額"] {
      grid-row: 4;
      grid-column: 2;
      justify-self: end;
      white-space: nowrap;
    }
  }
`;

const Customize = styled.p`
  font-weight: 400;
  font-size: 1.4rem;
`;

const ButtonGroup = styled.div`
  display: flex;
  justify-content: end;
  gap: 0.2rem;
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

function OrderDishes({ dishData, isEdit }) {
  const { totalServings, totalPrice } = calculateOrderSummary(dishData);

  return (
    <OrderDishesList>
      <OrderDishRow>
        <span>訂購餐點</span>
        <span>備註</span>
        <span>數量</span>
        <span>金額</span>
      </OrderDishRow>

      {dishData.map((dish) => (
        <OrderDishRow key={dish.uniqueId}>
          <span data-value="餐點">{dish.name}</span>
          <Customize data-value="項目">{summarizeMealChoices(dish)}</Customize>
          <Customize data-value="備註">
            {dish.note ? `" ${dish.note} "` : <Minus size={14} />}
          </Customize>
          <span data-value="數量">{dish.servings} 份</span>
          <span data-value="金額">$ {dish.itemTotalPrice * dish.servings}</span>
          {isEdit && <OrderEditButton dishData={dish} />}
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

function OrderEditButton({ dishData }) {
  const [isOpenModal, setIsOpenModal] = useState(false);
  const { dispatch } = useOrder();

  return (
    <>
      <ButtonGroup data-value="操作">
        <Button $variant="ghost" onClick={() => setIsOpenModal(dishData)}>
          <Pencil size={14} />
        </Button>
        <Button
          $variant="ghost"
          onClick={() =>
            dispatch({
              type: "dishes/removeDish",
              payload: dishData.uniqueId,
            })
          }
        >
          <Trash2 size={14} />
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
