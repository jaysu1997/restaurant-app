// 訂單詳情頁面中的訂購餐點列表
import { calculateOrderSummary } from "../../../utils/orderData.js";
import styled from "styled-components";
import { useState } from "react";
import Price from "../../../components/Price";
import TextButton from "../../../components/button/TextButton";
import MiniMenu from "./MiniMenu";
import OrderItem from "./OrderItem";
import OrderDishesTableRow from "./OrderDishesTableRow";
import OrderItemForm from "./OrderItemForm/OrderItemForm";

const StyledOrderDishes = styled.div`
  padding-top: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
`;

const Title = styled.h3`
  font-weight: var(--font-weight-semibold);
  font-size: 1.8rem;
`;

const OrderDishesTable = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid var(--color-border);
  border-radius: var(--radius-xl);
  overflow: hidden;

  @media (max-width: 50em) {
    display: none;
  }
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns:
    minmax(0, 1fr) repeat(2, 8rem)
    ${({ $isEdit }) => ($isEdit ? "8rem" : "")};
  justify-items: center;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-3) var(--space-5);
  background-color: var(--color-surface-subtle);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);

  span:first-child {
    justify-self: start;
  }
`;

const MobileDishList = styled.ul`
  display: none;

  @media (max-width: 50em) {
    display: block;
    padding: 0 var(--space-4);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-xl);
  }
`;

const Footer = styled.div`
  min-height: 5.6rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  gap: var(--space-1);
`;

const Summary = styled.div`
  display: inline-flex;
  align-items: center;
  gap: var(--space-3-5);
  padding: var(--space-1) var(--space-2);
  margin-left: auto;
  font-weight: var(--font-weight-semibold);
`;

const TotalLabel = styled.span`
  color: var(--color-text-slate);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
`;

const TotalAmount = styled(Price)`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
`;

function OrderDishes({ orderItems, isEdit, canModifyItems }) {
  const [activeForm, setActiveForm] = useState(null);
  const [isMiniMenuOpen, setIsMiniMenuOpen] = useState(false);
  const { totalAmount } = calculateOrderSummary(orderItems);

  function openCreateForm(dish) {
    setActiveForm({ mode: "create", dish });
  }

  function openEditForm(dish) {
    setActiveForm({ mode: "edit", dish });
  }

  return (
    <>
      <StyledOrderDishes>
        <Title>訂購餐點</Title>

        <OrderDishesTable>
          <TableHeader $isEdit={isEdit}>
            <span>餐點內容</span>
            <span>金額</span>
            <span>數量</span>
            {isEdit && <span>操作</span>}
          </TableHeader>

          {orderItems.map((item) => (
            <OrderDishesTableRow
              item={item}
              isEdit={isEdit}
              onEditDish={openEditForm}
              canModifyItems={canModifyItems}
              key={item.uniqueId}
            />
          ))}
        </OrderDishesTable>

        <MobileDishList>
          {orderItems.map((item) => (
            <OrderItem
              item={item}
              isEdit={isEdit}
              canModifyItems={canModifyItems}
              onEditDish={openEditForm}
              key={item.uniqueId}
            />
          ))}
        </MobileDishList>

        {isMiniMenuOpen && (
          <MiniMenu
            onCreateDish={openCreateForm}
            onClose={() => setIsMiniMenuOpen(false)}
          />
        )}

        <Footer>
          {isEdit && !isMiniMenuOpen && (
            <TextButton
              onClick={() => setIsMiniMenuOpen(true)}
              disabled={!canModifyItems}
            >
              新增餐點
            </TextButton>
          )}

          <Summary>
            <TotalLabel>訂單總計</TotalLabel>
            <TotalAmount value={totalAmount} />
          </Summary>
        </Footer>
      </StyledOrderDishes>

      {activeForm && (
        <OrderItemForm
          orderDish={activeForm.dish}
          onClose={() => setActiveForm(null)}
          isEdit={activeForm.mode === "edit"}
        />
      )}
    </>
  );
}

export default OrderDishes;
