// ok
// 餐點品項卡片
import styled, { css } from "styled-components";
import Price from "../../../components/Price";
import { hoverStyles } from "../../../style/helpers";
import Image from "../../../components/Image";
import ImagePlaceholder from "../../../components/ImagePlaceholder";

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
  justify-content: space-between;
  align-items: start;
  gap: 0.6rem;
  min-width: 0;
`;

const DishName = styled.span`
  color: #1f2937;
  font-weight: 500;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  min-width: 0;
  max-width: 100%;
`;

const Thumbnail = styled.div`
  flex-shrink: 0;
  height: 8rem;
  width: 8rem;
  border-radius: 8px;
  overflow: hidden;
`;

function DishCard({ dish, onSelect, disabled }) {
  const { name, basePrice, discount, image } = dish;

  const finalPrice = `$ ${basePrice - discount}`;

  const imagePath = image
    ? `https://yaoivzqoyuqdmvxnxvwm.supabase.co/storage/v1/object/public/menu/${image}`
    : null;

  return (
    <li>
      <StyledDishCard onClick={() => onSelect(dish)} disabled={disabled}>
        <Content>
          <DishName>{name}</DishName>
          <Price>{finalPrice}</Price>
        </Content>

        <Thumbnail>
          {imagePath ? (
            <Image src={imagePath} lazy={true} alt={name} radius="8px" />
          ) : (
            <ImagePlaceholder />
          )}
        </Thumbnail>
      </StyledDishCard>
    </li>
  );
}

export default DishCard;
