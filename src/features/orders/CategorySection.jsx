import styled from "styled-components";
import DishCard from "../../components/DishCard";

const StyledCategorySection = styled.li`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const CategoryName = styled.h3`
  background-color: #262626;
  color: #fafafa;
  font-size: 1.8rem;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
  font-weight: 400;
`;

const DishList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

function CategorySection({ category, dishes, onSelect }) {
  return (
    <StyledCategorySection>
      <CategoryName>{category}</CategoryName>
      <DishList>
        {dishes.map((dish) => (
          <DishCard dish={dish} onSelect={onSelect} key={dish.id} />
        ))}
      </DishList>
    </StyledCategorySection>
  );
}

export default CategorySection;
