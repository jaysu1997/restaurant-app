import PageHeader from "../ui/PageHeader";
import MenuView from "../features/menu/MenuView";
import QueryStatusFallback from "../ui/QueryStatusFallback";
import useGetInventory from "../hooks/data/inventory/useGetInventory";
import useGetMenus from "../hooks/data/menus/useGetMenus";
import { useSettings } from "../context/SettingsContext";
import { useOrder } from "../context/OrderContext";
import PageWrapper from "../ui/PageWrapper";
import { useEffect } from "react";

function Menu() {
  const {
    settings,
    error: settingsError,
    isPending: settingsIsPending,
    isError: settingsIsError,
  } = useSettings();

  const {
    data: menusData,
    isPending: menusIsPending,
    error: menusError,
    isError: menusIsError,
  } = useGetMenus();

  const { dispatch } = useOrder();

  // 執行此custom hook的目的是取得庫存數據並更新orderReducer
  const {
    data: inventoryData,
    isPending: inventoryIsPending,
    error: inventoryError,
    isError: inventoryIsError,
  } = useGetInventory();

  useEffect(
    function () {
      if (!inventoryData) return;

      dispatch({
        type: "inventory/setAll",
        payload: inventoryData,
      });
    },
    [dispatch, inventoryData],
  );

  const pageQueryStatus = {
    isPending: menusIsPending || inventoryIsPending || settingsIsPending,
    isError: menusIsError || inventoryIsError || settingsIsError,
    hasNoData: menusData?.length === 0,
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
        <MenuView menusData={menusData} settingsData={settings} />
      </QueryStatusFallback>
    </PageWrapper>
  );
}

export default Menu;
