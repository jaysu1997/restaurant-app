// ok
// 餐點品項卡片
import styled from "styled-components";

const StyledDishCard = styled.li`
  width: 100%;
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
  color: ${(props) => props.$fontColor};
  font-weight: ${(props) => props.$fontWeight || "400"};
`;

function DishCard({ dish, setIsOpenModal }) {
  // 使用食材清單
  const ingredientsList = dish.ingredients
    .map((ing) => ing.ingredient.label)
    .join(", ");

  const finalPrice = `$ ${dish.price - dish.discount}`;

  return (
    <StyledDishCard
      onClick={() => setIsOpenModal({ type: "OrderForm", data: dish })}
    >
      <Row $fontColor="#1f2937" $fontWeight="500">
        {dish.name}
      </Row>
      <Row $fontColor="#dc2626">{finalPrice}</Row>
      <Row $fontColor="#6b7280">{ingredientsList}</Row>
    </StyledDishCard>
  );
}

export default DishCard;
