// ok
import styled from "styled-components";
import { useState } from "react";
import { useSearchParams } from "react-router";
import OrderForm from "../../../ui/OrderForm/OrderForm";
import DishCard from "../../../components/DishCard";
import Modal from "../../../ui/Modal";
import { getCategories, getSelectedCategory } from "../utils/menuHelpers";

const StyledMenuList = styled.ul`
  grid-row: 2;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 2.4rem;
`;

function MenuList({ menus }) {
  const [searchParams] = useSearchParams();
  const [selectedDish, setSelectedDish] = useState(null);

  const onClose = () => setSelectedDish(null);

  // 所有分類
  const categories = getCategories(menus);
  // 篩選要呈現的餐點類別
  const selectedCategory = getSelectedCategory(
    searchParams.get("category"),
    categories,
  );
  // 要呈現的餐點
  const filteredDishes =
    selectedCategory === "all"
      ? menus
      : menus.filter((dish) => dish.category === selectedCategory);

  return (
    <>
      <StyledMenuList>
        {filteredDishes.map((dish) => (
          <DishCard dish={dish} onSelect={setSelectedDish} key={dish.id} />
        ))}
      </StyledMenuList>

      {selectedDish && (
        <Modal
          onClose={onClose}
          modalHeader={selectedDish.name}
          scrollBar={false}
        >
          <OrderForm
            orderDish={selectedDish}
            isEdit={false}
            onClose={onClose}
          />
        </Modal>
      )}
    </>
  );
}

export default MenuList;
