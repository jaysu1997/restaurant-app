// ok
import styled from "styled-components";
import { useSearchParams } from "react-router";
import DishCard from "../../../components/DishCard";
import { getValidParam } from "../../../utils/filterHelpers";

const Container = styled.ul`
  grid-column: 1;
  display: grid;
  align-items: start;
  grid-template-columns: repeat(auto-fill, minmax(26rem, 1fr));
  gap: 2.8rem;
  overflow: hidden;
`;

function MenuDishGrid({ menus, categories, canPlaceOrder, onCreateDish }) {
  const [searchParams] = useSearchParams();

  // 篩選要呈現的餐點類別
  const selectedCategory = getValidParam(
    searchParams.get("category"),
    categories,
    "all",
  );
  // 要呈現的餐點
  const filteredDishes =
    selectedCategory === "all"
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
