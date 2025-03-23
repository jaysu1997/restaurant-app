import styled from "styled-components";
import SwiperBar from "../features/menu/SwiperBar";
import Heading from "../ui/Heading";
import useGetMenus from "../features/menu-manage/useGetMenus";
import LoadingSpinner from "../ui/LoadingSpinner";
import DishCard from "../features/menu/DishCard";
import { useSearchParams } from "react-router-dom";
import ShoppingCart from "../features/menu/ShoppingCart";
import { useEffect } from "react";
import { useOrder } from "../context/OrderContext";
import useGetInventory from "../features/inventory/useGetInventory";
import StyledHotToast from "../ui/StyledHotToast";

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
  padding: 1.6rem;
  height: fit-content;
`;

function Menu() {
  // 取得所有菜單數據
  const { menusData, isPending } = useGetMenus();
  const { dispatch } = useOrder();
  const [searchParams] = useSearchParams();
  const { inventoryData, error, isError, isSuccess } = useGetInventory();

  // 先下載庫存數據，並存入useReducer中
  useEffect(
    function () {
      if (isSuccess) {
        dispatch({
          type: "inventory/remainingQuantity",
          payload: inventoryData,
        });
      }

      if (isError) {
        StyledHotToast({
          type: "error",
          title: "庫存數據獲取失敗",
          content: error,
        });
      }
    },
    [isSuccess, isError, dispatch, inventoryData, error]
  );

  if (isPending)
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
                <DishCard dish={dish} key={dish.id} />
              ))}
            </Menus>
          </>
        )}

        <ShoppingCart inventoryData={inventoryData} />
      </Container>
    </>
  );
}

export default Menu;
