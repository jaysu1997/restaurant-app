// 餐點品項卡片
import { useState } from "react";
import styled from "styled-components";
import OrderForm from "./OrderForm";

const StyledDishCard = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  gap: 0.2rem;
  padding: 0.6rem;
  border-radius: 5px;
  border: 1px solid #dcdcdc;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #d1fae5;
  }
`;

const Row = styled.div`
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  color: ${(props) => props.$fontColor};
  font-weight: ${(props) => props.$fontWeight || "400"};
`;

function DishCard({ dish, setIsOpenModal }) {
  // 使用食材清單
  const ingredientsList = dish.ingredients
    .map((ing) => ing.ingredientName.label)
    .join(", ");

  return (
    <StyledDishCard
      onClick={() => {
        setIsOpenModal({ type: "OrderForm", data: dish });
      }}
    >
      <Row $fontColor="#1f2937" $fontWeight="500">
        {dish.name}
      </Row>
      <Row $fontColor="#dc2626">
        <span>$ </span>
        {dish.price - dish.discount}
      </Row>
      <Row $fontColor="#6b7280">{ingredientsList}</Row>
    </StyledDishCard>
  );
}

export default DishCard;
