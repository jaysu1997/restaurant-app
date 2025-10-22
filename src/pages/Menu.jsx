import PageHeader from "../ui/PageHeader";
import MenuView from "../features/menu/MenuView";
import QueryStatusFallback from "../ui-old/QueryStatusFallback";
import useGetInventory from "../hooks/data/inventory/useGetInventory";
import useGetMenus from "../hooks/data/menus/useGetMenus";
import { useSettings } from "../context/SettingsContext";
import { useOrder } from "../context/OrderContext";

function Menu() {
  const { settings, settingsError, settingsIsPending, settingsIsError } =
    useSettings();
  const { menusData, menusIsPending, menusError, menusIsError } = useGetMenus();

  const { dispatch } = useOrder();

  // 執行此custom hook的目的是取得庫存數據並更新orderReducer
  const {
    inventoryData,
    inventoryIsPending,
    inventoryError,
    inventoryIsError,
  } = useGetInventory(dispatch);

  return (
    <>
      <PageHeader title="點餐系統" />
      <QueryStatusFallback
        isPending={menusIsPending || inventoryIsPending || settingsIsPending}
        isError={menusIsError || inventoryIsError || settingsIsError}
        error={menusError || inventoryError || settingsError}
        isEmpty={
          (Array.isArray(menusData) && menusData?.length === 0) ||
          (Array.isArray(inventoryData) && inventoryData?.length === 0)
        }
        emptyState={{
          message: "目前沒有任何餐點數據，請前往菜單設定頁面新增餐點",
          buttonText: "新增餐點",
          redirectTo: "/menu-manage",
        }}
        render={() => (
          <MenuView menusData={menusData} settingsData={settings} />
        )}
      />
    </>
  );
}

export default Menu;
