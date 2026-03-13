import PageHeader from "../ui/PageHeader";
import QueryStatusFallback from "../ui/QueryStatusFallback";
import useGetInventory from "../hooks/data/inventory/useGetInventory";
import useGetMenus from "../hooks/data/menus/useGetMenus";
import useOrder from "../context/order/useOrder";
import PageContainer from "../ui/PageContainer";
import { useEffect } from "react";
import useSettings from "../context/settings/useSettings";
import SwiperBar from "../features/menu/SwiperBar";
import styled from "styled-components";
import MenuList from "../features/menu/MenuList";
import ShoppingCart from "../features/menu/ShoppingCart";

const MenuContainer = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 93.2rem) 24rem;
  grid-template-rows: auto 1fr;
  gap: 2.8rem;
  width: 100%;

  @media (max-width: 50em) {
    grid-template-columns: 1fr;
    padding-bottom: 3.6rem;
  }
`;

function Menu() {
  const { derivedSettings, settingsIsLoading, settingsIsError, settingsError } =
    useSettings();

  const { menus, menusIsLoading, menusIsError, menusError } = useGetMenus();

  const { dispatch } = useOrder();

  // 執行此custom hook的目的是取得庫存數據並更新orderReducer
  const { inventory, inventoryIsLoading, inventoryIsError, inventoryError } =
    useGetInventory();

  useEffect(
    function () {
      if (!inventory) return;

      dispatch({
        type: "inventory/setAll",
        payload: inventory,
      });
    },
    [dispatch, inventory],
  );

  const pageQueryStatus = {
    isLoading: menusIsLoading || inventoryIsLoading || settingsIsLoading,
    isError: menusIsError || inventoryIsError || settingsIsError,
    hasNoData: menus?.length === 0,
  };

  return (
    <PageContainer>
      <PageHeader title="點餐系統" />

      <QueryStatusFallback
        status={pageQueryStatus}
        errorFallback={menusError || inventoryError || settingsError}
        noDataFallback={{
          message: "目前沒有任何餐點數據，請前往菜單設定頁面新增餐點",
          actionLabel: "新增餐點",
          redirectTo: "/menu-manage",
        }}
      >
        <MenuContainer>
          <SwiperBar menus={menus} />
          <MenuList menus={menus} />
          <ShoppingCart derivedSettings={derivedSettings} />
        </MenuContainer>
      </QueryStatusFallback>
    </PageContainer>
  );
}

export default Menu;
