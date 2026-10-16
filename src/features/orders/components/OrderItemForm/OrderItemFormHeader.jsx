import styled from "styled-components";
import Price from "../../../../components/Price";
import DishImage from "../../../../components/DishImage";

const Container = styled.div`
  display: flex;
  gap: var(--space-4);
  padding: var(--space-3) 0;
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
  width: 8rem;
  height: 8rem;
  border-radius: var(--radius-xl);
  overflow: hidden;
  background-color: var(--color-surface-subtle);
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const Category = styled.span`
  font-size: 1.3rem;
  font-weight: var(--font-weight-medium);
  line-height: 1;
  color: var(--color-text-muted);
`;

const DishName = styled.h3`
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-strong);
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const DishPrice = styled(Price)`
  font-weight: var(--font-weight-bold);
  font-size: 1.8rem;
  margin-top: auto;
  color: var(--color-danger);
`;

function OrderFormHeader({ orderDish }) {
  const { image, name, category, basePrice, discount } = orderDish;
  const salePrice = basePrice - discount;

  return (
    <Container>
      <ImageWrapper>
        <DishImage image={image} alt={name} />
      </ImageWrapper>

      <Meta>
        <Category>{category}</Category>
        <DishName>{name}</DishName>
        <DishPrice value={salePrice} />
      </Meta>
    </Container>
  );
}

export default OrderFormHeader;
