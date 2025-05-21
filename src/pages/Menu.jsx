import PageHeader from "../ui/PageHeader";
import MenuView from "../features/menu/MenuView";
import QueryStatusFallback from "../ui/QueryStatusFallback";
import useGetInventory from "../hooks/data/inventory/useGetInventory";
import useGetMenus from "../hooks/data/menus/useGetMenus";

function Menu() {
  const { menusData, menusDataFetching, menusDataFetchingError } =
    useGetMenus();
  const { inventoryData, inventoryDataFetching, inventoryDataFetchingError } =
    useGetInventory(true);

  return (
    <>
      <PageHeader title="點餐系統" />
      <QueryStatusFallback
        isPending={menusDataFetching || inventoryDataFetching}
        isError={menusDataFetchingError || inventoryDataFetchingError}
        isEmpty={Array.isArray(menusData) && menusData?.length === 0}
        emptyState={{
          message: "目前沒有任何餐點數據，請前往菜單設定頁面新增餐點",
          buttonText: "新增餐點",
          redirectTo: "/menu-manage",
        }}
      >
        <MenuView menusData={menusData} inventoryData={inventoryData} />
      </QueryStatusFallback>
    </>
  );
}

export default Menu;
