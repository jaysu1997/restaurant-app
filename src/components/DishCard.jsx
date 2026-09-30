// ok
// 餐點品項卡片
import styled, { css } from "styled-components";
import Price from "./Price";
import { hoverStyles } from "../style/helpers";
import DishImage from "./DishImage";

const StyledDishCard = styled.button`
  width: 100%;
  height: 11.4rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  padding: 1.6rem;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 8px;

  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  ${hoverStyles(css`
    border-color: #d1d5db;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.06);
  `)}

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.6rem;
  min-width: 0;
`;

const DishName = styled.span`
  color: #1f2937;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 0;
  max-width: 100%;
`;

const DishCategory = styled.span`
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 1;
  color: #6b7280;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 0;
  max-width: 100%;
`;

const DishPrice = styled(Price)`
  color: #dc2626;
  margin-top: auto;
`;

const Thumbnail = styled.div`
  flex-shrink: 0;
  height: 8rem;
  width: 8rem;
  border-radius: 8px;
  overflow: hidden;
`;

function DishCard({ dish, onSelect, canPlaceOrder }) {
  const { name, basePrice, discount, image, category } = dish;

  const finalPrice = basePrice - discount;

  return (
    <li>
      <StyledDishCard onClick={onSelect} disabled={!canPlaceOrder}>
        <Content>
          <DishName>{name}</DishName>
          <DishCategory>{category}</DishCategory>
          <DishPrice value={finalPrice} />
        </Content>

        <Thumbnail>
          <DishImage image={image} alt={name} />
        </Thumbnail>
      </StyledDishCard>
    </li>
  );
}

export default DishCard;
