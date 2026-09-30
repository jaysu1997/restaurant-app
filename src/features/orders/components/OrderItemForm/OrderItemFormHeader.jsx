import styled from "styled-components";
import Price from "../../../../components/Price";
import DishImage from "../../../../components/DishImage";

const Container = styled.div`
  display: flex;
  gap: 1.6rem;
  padding: 1.2rem 0;
`;

const ImageWrapper = styled.div`
  flex-shrink: 0;
  width: 8rem;
  height: 8rem;
  border-radius: 12px;
  overflow: hidden;
  background-color: #f3f4f6;
`;

const Meta = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
`;

const Category = styled.span`
  font-size: 1.3rem;
  font-weight: 500;
  line-height: 1;
  color: #6b7280;
`;

const DishName = styled.h3`
  font-size: 2rem;
  font-weight: 700;
  color: #111827;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const DishPrice = styled(Price)`
  font-weight: 700;
  font-size: 1.8rem;
  margin-top: auto;
  color: #dc2626;
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
