// ok
// 餐點品項卡片
import styled from "styled-components";
import Price from "./Price";

const StyledDishCard = styled.li`
  width: 100%;
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  padding: 0.8rem 1.2rem;
  background-color: #fff;
  border-radius: 6px;
  border: 1px solid #e5e7eb;
  cursor: pointer;

  transition:
    background-color 0.2s,
    box-shadow 0.2s,
    transform 0.2s;

  &:hover {
    background-color: #eff6ff;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
    transform: translateY(-1px);
  }
`;

const Row = styled.div`
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

function DishCard({ dish, onSelect }) {
  // 使用食材清單
  const ingredientsList = dish.ingredients
    .map((ing) => ing.ingredient.label)
    .join(", ");

  const finalPrice = `$ ${dish.price - dish.discount}`;

  return (
    <StyledDishCard onClick={() => onSelect(dish)}>
      <DishName>{dish.name}</DishName>
      <Price>{finalPrice}</Price>
      <DishIngredients>{ingredientsList}</DishIngredients>
    </StyledDishCard>
  );
}

export default DishCard;
