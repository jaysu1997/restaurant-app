// ok
import styled from "styled-components";
import PageHeader from "../components/PageHeader";
import QueryStatusFallback from "../components/QueryStatusFallback";
import useGetMenus from "../hooks/data/menus/useGetMenus";
import PageContainer from "../components/PageContainer";
import useSettings from "../context/settings/useSettings";
import MenuList from "../features/menu/components/MenuList";
import ShoppingCart from "../features/menu/components/ShoppingCart";
import CategoryBar from "../features/menu/components/CategoryBar";
import useOrderInventory from "../features/orders/hooks/useOrderInventory";
import StoreClosedNotice from "../features/orders/components/StoreClosedNotice";
import { canCreateOrder } from "../context/settings/settingsHelpers";

const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 91.2rem) 26rem;
  gap: 2.8rem;
  width: 100%;

  @media (max-width: 50em) {
    grid-template-columns: 1fr;
    padding-bottom: 3.6rem;
  }
`;

function Menu() {
  const { menusQuery, categories } = useGetMenus();
  const { data: menus = [] } = menusQuery;
  // 取得庫存數據
  const inventoryQuery = useOrderInventory();
  // 當前是否可以建立訂單
  const { todayOpenInfo, settingsQuery } = useSettings();
  const canPlaceOrder = canCreateOrder(todayOpenInfo);

  return (
    <PageContainer>
      <PageHeader title="點餐系統" />

      <QueryStatusFallback
        queries={[menusQuery, settingsQuery, inventoryQuery]}
        hasNoData={menus.length === 0}
        noDataFallback={{
          message: "目前沒有任何餐點數據，請前往菜單設定頁面新增餐點",
          actionLabel: "新增餐點",
          redirectTo: "/menu-manage",
        }}
      >
        <MenuContainer>
          {!canPlaceOrder && (
            <StoreClosedNotice>
              目前為非營業時段，暫時無法建立新訂單。
            </StoreClosedNotice>
          )}

          <CategoryBar categories={categories} />
          <MenuList
            menus={menus}
            categories={categories}
            inventoryObj={inventoryQuery.inventoryObj}
            canPlaceOrder={canPlaceOrder}
          />
          <ShoppingCart canPlaceOrder={canPlaceOrder} />
        </MenuContainer>
      </QueryStatusFallback>
    </PageContainer>
  );
}

export default Menu;
