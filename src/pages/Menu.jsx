import PageHeader from "../ui/PageHeader";
import MenuView from "../features/menu/MenuView";
import QueryStatusFallback from "../ui/QueryStatusFallback";
import useGetInventory from "../hooks/data/inventory/useGetInventory";
import useGetMenus from "../hooks/data/menus/useGetMenus";
import useOrder from "../context/order/useOrder";
import PageWrapper from "../ui/PageWrapper";
import { useEffect } from "react";
import useSettings from "../context/settings/useSettings";

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
    <PageWrapper>
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
        <MenuView menusData={menus} settingsData={derivedSettings} />
      </QueryStatusFallback>
    </PageWrapper>
  );
}

export default Menu;
