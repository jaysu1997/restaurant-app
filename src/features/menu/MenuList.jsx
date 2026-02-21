// ok
import { useSearchParams } from "react-router";
import styled from "styled-components";
import DishCard from "../../ui/DishCard";
import { useState } from "react";
import OrderForm from "../../ui/OrderForm/OrderForm";

const StyledMenuList = styled.ul`
  grid-row: 2;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 2.4rem;
`;

function MenuList({ menus }) {
  const [isOpenModal, setIsOpenModal] = useState(false);

  const [searchParams] = useSearchParams();
  // 篩選要呈現的餐點類別
  const filter = searchParams.get("category") || "all";
  // 要呈現的餐點
  const dishes =
    filter === "all" ? menus : menus.filter((menu) => menu.category === filter);

  return (
    <>
      <StyledMenuList>
        {dishes.map((dish) => (
          <DishCard dish={dish} setIsOpenModal={setIsOpenModal} key={dish.id} />
        ))}
      </StyledMenuList>

      {isOpenModal.type === "OrderForm" && (
        <OrderForm
          orderDish={isOpenModal.data}
          isEdit={false}
          onCloseModal={() => setIsOpenModal(false)}
        />
      )}
    </>
  );
}

export default MenuList;
