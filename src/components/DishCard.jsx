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
  gap: var(--space-2-5);
  padding: var(--space-4);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);

  transition:
    border-color 0.15s ease,
    box-shadow 0.15s ease;

  ${hoverStyles(css`
    border-color: var(--color-border-strong);
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
  gap: var(--space-1-5);
  min-width: 0;
`;

const DishName = styled.span`
  color: var(--color-text-primary);
  font-weight: var(--font-weight-semibold);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 0;
  max-width: 100%;
`;

const DishCategory = styled.span`
  font-size: 1.3rem;
  font-weight: var(--font-weight-medium);
  line-height: 1;
  color: var(--color-text-muted);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 0;
  max-width: 100%;
`;

const DishPrice = styled(Price)`
  color: var(--color-danger);
  margin-top: auto;
`;

const Thumbnail = styled.div`
  flex-shrink: 0;
  height: 8rem;
  width: 8rem;
  border-radius: var(--radius-lg);
  overflow: hidden;
`;

function DishCard({ dish, onSelect, canPlaceOrder }) {
  const { name, basePrice, discount, image, category } = dish;

  const finalPrice = basePrice - discount;

  return (
    <li>
      <StyledDishCard
        type="button"
        onClick={onSelect}
        disabled={!canPlaceOrder}
      >
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
