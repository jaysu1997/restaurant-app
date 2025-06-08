import { useState } from "react";
import styled from "styled-components";
import { useSearchParams } from "react-router-dom";
import SwiperBar from "./SwiperBar";
import DishCard from "../../ui/DishCard";
import ShoppingCart from "./ShoppingCart";
import OrderForm from "../../ui/OrderForm/OrderForm";

const Container = styled.div`
  max-width: 120rem;
  display: grid;
  grid-template-columns: minmax(0, 96rem) 21.6rem;
  grid-template-rows: 3.2rem 1fr;
  gap: 2.4rem;
  width: 100%;
`;

const Menus = styled.ul`
  grid-column: 1 / 2;
  grid-row: 2 / -1;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 1.6rem;
  height: fit-content;
  padding: 1.6rem 0;
`;

function MenuView({ menusData, inventoryData }) {
  // 取得所有菜單數據
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [searchParams] = useSearchParams();

  // 使用Set()過濾重複的分類
  const categories = [...new Set(menusData.map((menu) => menu.category))];
  // 篩選要呈現的餐點類別
  const filter = searchParams.get("category") || "all";
  // 要呈現的餐點
  const dishes =
    filter === "all"
      ? menusData.toSorted((a, b) => a.category.localeCompare(b.category))
      : menusData.filter((menu) => menu.category === filter);

  return (
    <>
      <Container>
        <SwiperBar categories={categories} />
        <Menus>
          {dishes.map((dish) => (
            <DishCard
              dish={dish}
              setIsOpenModal={setIsOpenModal}
              key={dish.id}
            />
          ))}
        </Menus>
        <ShoppingCart inventoryData={inventoryData} />
      </Container>

      {isOpenModal.type === "OrderForm" && (
        <OrderForm
          dishData={isOpenModal.data}
          isEdit={false}
          onCloseModal={() => setIsOpenModal(false)}
        />
      )}
    </>
  );
}

export default MenuView;
