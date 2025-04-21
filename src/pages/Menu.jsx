import styled from "styled-components";
import SwiperBar from "../features/menu/SwiperBar";
import Heading from "../ui/Heading";
import useGetMenus from "../features/menu-manage/useGetMenus";
import LoadingSpinner from "../ui/LoadingSpinner";
import DishCard from "../features/menu/DishCard";
import { useSearchParams } from "react-router-dom";
import ShoppingCart from "../features/menu/ShoppingCart";
import useGetInventory from "../features/inventory/useGetInventory";
import { useState } from "react";
import Modal from "../ui/Modal";
import OrderForm from "../features/menu/OrderForm";

const Container = styled.div`
  max-width: 120rem;
  display: grid;
  grid-template-columns: minmax(0, 96rem) 21.6rem;
  grid-template-rows: 3.2rem 1fr;
  gap: 2.4rem;
  width: 100%;
`;

const Menus = styled.ul`
  grid-column: 1 /2;
  grid-row: 2 / -1;
  max-width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(16rem, 1fr));
  gap: 1.6rem;
  height: fit-content;
  padding: 1.6rem 0;
`;

function Menu() {
  // 取得所有菜單數據
  const { menusData, menusDataFetching } = useGetMenus();
  const { inventoryData, inventoryDataFetching } = useGetInventory(true);
  const [searchParams] = useSearchParams();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [selectedDish, setSelectedDish] = useState(null);

  if (menusDataFetching || inventoryDataFetching)
    return (
      <>
        <Heading>點餐系統</Heading>
        <LoadingSpinner />
      </>
    );

  // 使用Set()過濾重複的分類
  const categorys = [...new Set(menusData.map((menu) => menu.category))];
  // 篩選要呈現的餐點類別
  const filter = searchParams.get("category") || "all";
  // 要呈現的餐點
  const dishes =
    filter === "all"
      ? menusData.toSorted((a, b) => a.category.localeCompare(b.category))
      : menusData.filter((menu) => menu.category === filter);

  return (
    <>
      <Heading>點餐系統</Heading>

      <Container>
        {!menusData || menusData.length === 0 ? (
          <span>請到餐點設定頁面新增餐點</span>
        ) : (
          <>
            <SwiperBar categorys={categorys} />
            <Menus>
              {dishes.map((dish) => (
                <DishCard
                  dish={dish}
                  setIsOpenModal={setIsOpenModal}
                  setSelectedDish={setSelectedDish}
                  key={dish.id}
                />
              ))}
            </Menus>
          </>
        )}

        <ShoppingCart inventoryData={inventoryData} />
      </Container>

      {isOpenModal && (
        <Modal
          modalHeader={selectedDish.name}
          maxWidth={36}
          onCloseModal={() => setIsOpenModal(false)}
          overlayScrollbar={false}
        >
          <OrderForm
            dishData={selectedDish}
            isEdit={false}
            onCloseModal={() => setIsOpenModal(false)}
          />
        </Modal>
      )}
    </>
  );
}

export default Menu;
