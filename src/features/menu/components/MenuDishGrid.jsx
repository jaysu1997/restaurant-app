// ok
import styled from "styled-components";
import DishCard from "../../../components/DishCard";

const Container = styled.ul`
  grid-column: 1;
  display: grid;
  align-items: start;
  grid-template-columns: repeat(auto-fill, minmax(26rem, 1fr));
  gap: var(--space-7);
  overflow: hidden;
  padding: var(--space-1);
`;

function MenuDishGrid({
  menus,
  selectedCategory,
  canPlaceOrder,
  onCreateDish,
}) {
  // 要呈現的餐點
  const filteredDishes =
    selectedCategory === "全部"
      ? menus
      : menus.filter((dish) => dish.category === selectedCategory);

  return (
    <Container>
      {filteredDishes.map((dish) => (
        <DishCard
          dish={dish}
          onSelect={() => onCreateDish(dish)}
          canPlaceOrder={canPlaceOrder}
          key={dish.id}
        />
      ))}
    </Container>
  );
}

export default MenuDishGrid;
