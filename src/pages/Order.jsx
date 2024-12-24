import styled from "styled-components";
import SwiperBar from "../features/order/SwiperBar";
import Heading from "../ui/Heading";
import useGetMenus from "../features/menu/useGetMenus";
import LoadingSpinner from "../ui/LoadingSpinner";
import DishesList from "../features/order/DishesList";
import { MacScrollbar } from "mac-scrollbar";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import ShoppingList from "../features/order/ShoppingList";
import StyledOverlayScrollbars from "../ui/StyledOverlayScrollbars";

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

// MacScrollbar需要移除
function Order() {
  // 取得所有菜單數據
  const { menusData, isPending } = useGetMenus();
  const [searchParams] = useSearchParams();
  const shoppingCart = useSelector((state) => state.order.shoppingCart);

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
        <StyledOverlayScrollbars autoHide="scroll" style={{ height: "100%" }}>
          <Menus>
            {dishes.map((dish) => (
              <DishesList dish={dish} key={dish.id} />
            ))}
          </Menus>
        </StyledOverlayScrollbars>

        <StyledOverlayScrollbars
          autoHide="scroll"
          style={{ gridRow: "1 / -1", gridColumn: "2 / 3" }}
        >
          <ShoppingList shoppingCart={shoppingCart} />
        </StyledOverlayScrollbars>
      </Container>
    </>
  );
}

export default Order;
