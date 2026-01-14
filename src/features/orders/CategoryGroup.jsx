import styled from "styled-components";
import DishCard from "../../ui-old/DishCard";

const CategoryName = styled.li`
  background-color: #262626;
  color: #fafafa;
  font-size: 1.8rem;
  padding: 0.6rem 1.2rem;
  border-radius: 6px;
`;

function CategoryGroup({ category, dishes, onSelect }) {
  return (
    <>
      <CategoryName>{category}</CategoryName>
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} setIsOpenModal={onSelect} />
      ))}
    </>
  );
}

export default CategoryGroup;
