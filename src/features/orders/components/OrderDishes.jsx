// 訂單詳情頁面中的訂購餐點列表
import { calculateOrderSummary } from "../../../utils/orderHelpers";
import styled from "styled-components";
import { useState } from "react";
import Price from "../../../components/Price";
import TextButton from "../../../components/button/TextButton";
import MiniMenu from "./MiniMenu";
import OrderItem from "./OrderItem";
import OrderDishesTableRow from "./OrderDishesTableRow";
import OrderItemForm from "./OrderItemForm/OrderItemForm";

const StyledOrderDishes = styled.div`
  padding-top: 1.6rem;
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const Title = styled.h3`
  font-weight: 600;
  font-size: 1.8rem;
`;

const OrderDishesTable = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
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
  gap: 1.6rem;
  padding: 1.2rem 2rem;
  background-color: #f3f4f6;
  font-size: 1.4rem;
  font-weight: 500;

  span:first-child {
    justify-self: start;
  }
`;

const MobileDishList = styled.ul`
  display: none;

  @media (max-width: 50em) {
    display: block;
    padding: 0 1.6rem;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
  }
`;

const Footer = styled.div`
  min-height: 5.6rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.4rem;
`;

const Summary = styled.div`
  display: inline-flex;
  align-items: center;
  gap: 1.4rem;
  padding: 0.4rem 0.8rem;
  margin-left: auto;
  font-weight: 600;
`;

const TotalLabel = styled.span`
  color: #475569;
  font-size: 1.4rem;
  font-weight: 600;
`;

const TotalAmount = styled(Price)`
  font-size: 2rem;
  font-weight: 700;
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

        <Footer>
          {isEdit && (
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

      {isMiniMenuOpen && (
        <MiniMenu
          onCreateDish={openCreateForm}
          onClose={() => setIsMiniMenuOpen(false)}
        />
      )}

      {activeForm && (
        <OrderItemForm
          orderDish={activeForm.dish}
          onClose={() => {
            if (activeForm.mode === "create") setIsMiniMenuOpen(true);
            setActiveForm(null);
          }}
          isEdit={activeForm.mode === "edit"}
        />
      )}
    </>
  );
}

export default OrderDishes;
