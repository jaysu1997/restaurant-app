// 餐點品項卡片
import styled from "styled-components";

const StyledDishCard = styled.li`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  gap: 0.2rem;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  border: 2px solid #dcdcdc;
  transition: all 0.3s;
  cursor: pointer;

  &:hover {
    background-color: #f0f9ff;
    border: 2px solid #93c5fd;
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
