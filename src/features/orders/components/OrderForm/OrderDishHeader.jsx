import styled from "styled-components";
import Image from "../../../../components/Image";
import ImagePlaceholder from "../../../../components/ImagePlaceholder";
import Price from "../../../../components/Price";

const DishHeader = styled.div`
  display: flex;
  gap: 1.6rem;
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
  font-size: 2rem;
  margin-top: auto;
`;

function OrderDishHeader({ orderDish }) {
  const { image, name, category, basePrice, discount } = orderDish;
  const salePrice = basePrice - discount;

  const imagePath = image
    ? `https://yaoivzqoyuqdmvxnxvwm.supabase.co/storage/v1/object/public/menu/${image}`
    : null;

  return (
    <DishHeader>
      <ImageWrapper>
        {imagePath ? (
          <Image src={imagePath} lazy={false} alt={name} radius="8px" />
        ) : (
          <ImagePlaceholder />
        )}
      </ImageWrapper>

      <Meta>
        <Category>{category}</Category>
        <DishName>{name}</DishName>
        <DishPrice>$ {salePrice}</DishPrice>
      </Meta>
    </DishHeader>
  );
}

export default OrderDishHeader;
