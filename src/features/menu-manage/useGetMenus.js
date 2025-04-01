// 獲取所有餐點數據
import { useQuery } from "@tanstack/react-query";
import { getMenusApi } from "../../services/apiMenus";

function useGetMenus() {
  const {
    data: menusData,
    isPending: menusDataFetching,
    error,
  } = useQuery({
    queryKey: ["menus"],
    queryFn: getMenusApi,
  });

  return { menusData, menusDataFetching, error };
}

export default useGetMenus;
