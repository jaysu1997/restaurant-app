// 訂單詳情頁面中的訂購餐點列表
import {
  summarizeMealChoices,
  calculateOrderSummary,
} from "../../../utils/orderHelpers";
import styled from "styled-components";
import OrderItemActions from "./OrderItemActions";
import { useState } from "react";
import { Plus } from "lucide-react";
import Price from "../../../components/Price";
import TextButton from "../../../components/button/TextButton";
import MiniMenu from "./MiniMenu";

const OrderDishesList = styled.ul`
  display: flex;
  flex-direction: column;
`;

const DishHeader = styled.div`
  display: grid;
  grid-template-columns: 1.2fr repeat(2, minmax(5.4rem, 0.4fr)) 5.6rem;
  gap: 0.6rem;
  padding: 1rem;
  background-color: #e7e5e4;
  border-radius: 6px;
  font-weight: 500;

  @media (max-width: 35em) {
    grid-template-columns: minmax(0, 1fr) auto;

    span:not(:first-child) {
      display: none;
    }
  }
`;

const OrderDishRow = styled.li`
  display: grid;
  grid-template-columns: 1.2fr repeat(2, minmax(5.4rem, 0.4fr)) 5.6rem;
  grid-template-areas:
    "name price servings actions"
    "meta price servings actions";

  gap: 0.6rem;
  padding: 1rem;
  font-weight: 600;
  overflow-wrap: anywhere;
  border-bottom: 1px solid #dcdcdc;
  min-height: 10rem;

  @media (max-width: 35em) {
    grid-template-columns: minmax(0, 1fr) auto;

    grid-template-areas:
      "name actions"
      "meta meta"
      "price servings";
  }
`;

const ItemName = styled.span`
  grid-area: name;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const ItemDetails = styled.div`
  grid-area: meta;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  font-size: 1.4rem;
  font-weight: 400;

  .itemNote {
    color: #6b7280;
  }
`;

const ItemPrice = styled(Price)`
  grid-area: price;
  font-weight: 600;
`;

const ItemServings = styled.span`
  grid-area: servings;

  @media (max-width: 35em) {
    justify-self: end;
  }
`;

const ItemActions = styled.div`
  grid-area: actions;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  font-size: 1.8rem;
  padding: 1rem 0;
`;

const Summary = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 1rem;
  font-weight: 600;
  margin-left: auto;
`;

function OrderDishes({ items, isEdit, canModifyItems }) {
  const [isMiniMenuOpen, setIsMiniMenuOpen] = useState(false);
  const { totalPrice } = calculateOrderSummary(items);

  return (
    <>
      <DishHeader>
        <span>訂購餐點</span>
        <span>金額</span>
        <span>數量</span>
      </DishHeader>

      <OrderDishesList>
        {items.map((item) => (
          <OrderDishRow key={item.uniqueId}>
            <ItemName>{item.name}</ItemName>

            <ItemDetails>
              {item.customizations.length !== 0 && (
                <p>{summarizeMealChoices(item)}</p>
              )}

              {item.note && <p className="itemNote">{`"${item.note}"`}</p>}
            </ItemDetails>

            <ItemPrice>$ {item.unitPrice * item.servings}</ItemPrice>

            <ItemServings>{item.servings} 份</ItemServings>

            {isEdit && (
              <ItemActions>
                <OrderItemActions item={item} canModifyItems={canModifyItems} />
              </ItemActions>
            )}
          </OrderDishRow>
        ))}

        <Footer>
          {isEdit && (
            <TextButton
              onClick={() => setIsMiniMenuOpen(true)}
              disabled={!canModifyItems}
            >
              <Plus />
              新增餐點
            </TextButton>
          )}

          <Summary>
            <span>總計：</span>
            <Price>$ {totalPrice}</Price>
          </Summary>
        </Footer>
      </OrderDishesList>

      {isMiniMenuOpen && <MiniMenu onClose={() => setIsMiniMenuOpen(false)} />}
    </>
  );
}

export default OrderDishes;
