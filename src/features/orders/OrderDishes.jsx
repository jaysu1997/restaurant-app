// 訂單詳情頁面中的訂購餐點列表
import {
  summarizeMealChoices,
  calculateOrderSummary,
} from "../../utils/orderHelpers";
import styled from "styled-components";
import MiniMenu from "./MiniMenu";
import OrderItemActions from "../../ui/OrderItemActions";
import Button from "../../ui/Button";
import { useState } from "react";
import { Plus } from "lucide-react";
import Price from "../../components/Price";

const OrderDishesList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const OrderDishRow = styled.li`
  display: grid;
  grid-template-columns: 1.2fr repeat(2, minmax(5.4rem, 0.4fr)) 5.6rem;
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

  .itemName {
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

    .itemServings {
      grid-row: 3;
      justify-self: end;
    }

    .itemPrice {
      grid-row: 3;
      white-space: nowrap;
    }
  }
`;

const OrderSummary = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 1.8rem;
  font-weight: 500;
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

  .itemNote {
    color: #6b7280;
  }

  @media (max-width: 35em) {
    grid-column: 1 / -1;
  }
`;

function OrderDishes({ items, isEdit }) {
  const [isOpen, setIsOpen] = useState(false);
  const { totalServings, totalPrice } = calculateOrderSummary(items);

  return (
    <OrderDishesList>
      <OrderDishRow>
        <span>訂購餐點</span>
        <span>金額</span>
        <span>數量</span>
      </OrderDishRow>

      {items.map((item) => (
        <OrderDishRow key={item.uniqueId}>
          <span className="itemName">{item.name}</span>
          <ItemMeta>
            {item.customize.length !== 0 && <p>{summarizeMealChoices(item)}</p>}
            {item.note && <p className="itemNote">{`" ${item.note} "`}</p>}
          </ItemMeta>

          <Price className="itemPrice">
            $ {item.unitPrice * item.servings}
          </Price>
          <span className="itemServings">{item.servings} 份</span>
          {isEdit && <OrderItemActions item={item} />}
        </OrderDishRow>
      ))}

      <OrderSummary>
        {isEdit && (
          <Button $variant="text" onClick={() => setIsOpen(true)}>
            <Plus />
            新增餐點
          </Button>
        )}
        {isOpen && <MiniMenu onClose={() => setIsOpen(false)} />}
        <div>
          <span>總計：</span>
          <span>共 {totalServings} 份</span>
          <Price>$ {totalPrice}</Price>
        </div>
      </OrderSummary>
    </OrderDishesList>
  );
}

export default OrderDishes;
