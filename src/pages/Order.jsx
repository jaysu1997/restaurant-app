import styled from "styled-components";
import SwiperBar from "../features/order/SwiperBar";
import Heading from "../ui/Heading";
import useGetMenus from "../features/menu/useGetMenus";
import LoadingSpinner from "../ui/LoadingSpinner";
import DishCard from "../features/order/DishCard";
import { useSearchParams } from "react-router-dom";
import ShoppingList from "../features/order/ShoppingList";
import StyledOverlayScrollbars from "../ui/StyledOverlayScrollbars";
import { useEffect } from "react";
import { useOrder } from "../context/OrderContext";
import useGetInventory from "../features/inventory/useGetInventory";
import StyledHotToast from "../ui/StyledHotToast";

const Container = styled.div`
  max-width: 120rem;
  display: grid;
  grid-template-columns: minmax(0, 96rem) 1fr;
  grid-template-rows: 3.2rem 1fr;
  gap: 2.4rem;
  height: 100dvh;
`;

const Menus = styled.div`
  max-width: 100%;
  max-height: 100%;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1.6rem;
  padding: 1.6rem;
`;

function Order() {
  // 取得所有菜單數據
  const { menusData, isPending } = useGetMenus();
  const { state, dispatch } = useOrder();
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

  if (isPending) return <LoadingSpinner />;

  // 這裡還需要再做修改(如果沒有任何數據)
  if (!menusData || menusData.length === 0)
    return <span>請到餐點設定頁面新增餐點</span>;

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
      <Heading>點餐</Heading>

      <Container>
        <SwiperBar categorys={categorys} />
        <StyledOverlayScrollbars
          autoHide="scroll"
          style={{
            maxHeight: "100dvh",
            gridRow: "2 / -1",
            gridColumn: "1 / 2",
          }}
        >
          <Menus>
            {dishes.map((dish) => (
              <DishCard dish={dish} key={dish.id} />
            ))}
          </Menus>
        </StyledOverlayScrollbars>

        <ShoppingList />
      </Container>
    </>
  );
}

export default Order;
