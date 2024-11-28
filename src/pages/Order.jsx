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

const Container = styled.div`
  max-width: 120rem;
  display: flex;
  gap: 3.2rem;
  height: 100dvh;
  overflow: auto;
`;

const Menus = styled.div`
  max-width: 96rem;
  width: 100%;

  display: flex;
  flex-direction: column;
  gap: 1.2rem;
  max-height: 100dvh;

  padding: 1rem 2rem;
`;

function Order() {
  // React Router提供的searchParams功能
  const [searchParams] = useSearchParams();

  const shoppingCart = useSelector((state) => state.order.shoppingCart);

  console.log(shoppingCart);

  // 取得所有菜單數據
  const { menusData, isPending } = useGetMenus();

  if (isPending) return <LoadingSpinner />;

  // 這裡還需要再做修改(如果沒有任何數據)
  if (!menusData || menusData.length === 0) return <span>請建立</span>;

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
        <Menus>
          <SwiperBar categorys={categorys} />
          <MacScrollbar>
            <DishesList dishes={dishes} />
          </MacScrollbar>
        </Menus>

        <MacScrollbar>
          <ShoppingList shoppingCart={shoppingCart} />
        </MacScrollbar>
      </Container>
    </>
  );
}

export default Order;
