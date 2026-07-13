// ok
// 餐點品項卡片
import styled, { css } from "styled-components";
import Price from "../../../components/Price";
import { hoverStyles } from "../../../style/helpers";

const StyledDishCard = styled.button`
  width: 100%;
  height: 9.4rem;
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 0.8rem 1.2rem;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 6px;

  transition:
    background-color 0.15s ease,
    box-shadow 0.15s ease,
    transform 0.1s ease;

  ${hoverStyles(css`
    background-color: #eff6ff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
    transform: translateY(-1px);
  `)}

  &:not(:disabled):active {
    transform: translateY(0);
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Row = styled.div`
  width: 100%;
  min-width: 0;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const DishName = styled(Row)`
  color: #1f2937;
  font-weight: 500;
`;

const DishIngredients = styled(Row)`
  color: #6b7280;
  font-weight: 400;
`;

function DishCard({ dish, onSelect, inventoryObj, disabled }) {
  const { name, ingredients, basePrice, discount } = dish;
  // 使用食材清單
  const ingredientsList = ingredients
    .map((item) => inventoryObj[item.ingredient]?.name ?? "未知")
    .join(", ");

  const finalPrice = `$ ${basePrice - discount}`;

  return (
    <li>
      <StyledDishCard onClick={() => onSelect(dish)} disabled={disabled}>
        <DishName>{name}</DishName>
        <Price>{finalPrice}</Price>
        <DishIngredients>{ingredientsList}</DishIngredients>
      </StyledDishCard>
    </li>
  );
}

export default DishCard;
