// 獲取菜單(所有餐點)數據
import { useQuery } from "@tanstack/react-query";
import { getMenusApi } from "../../services/apiMenus";

function useGetMenus() {
  const {
    data: menusData,
    isPending: menusDataFetching,
    error,
    isError: menusDataFetchingError,
  } = useQuery({
    queryKey: ["menus"],
    queryFn: getMenusApi,
  });

  return { menusData, menusDataFetching, menusDataFetchingError };
}

export default useGetMenus;
