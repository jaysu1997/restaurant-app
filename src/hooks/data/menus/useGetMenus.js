// 獲取菜單(所有餐點)數據
import { useQuery } from "@tanstack/react-query";
import { getMenusApi } from "../../../services/apiMenus";

function useGetMenus() {
  const {
    data: menusData,
    isPending: menusIsPending,
    error: menusError,
    isError: menusIsError,
  } = useQuery({
    queryKey: ["menus"],
    queryFn: getMenusApi,
  });

  return { menusData, menusIsPending, menusError, menusIsError };
}

export default useGetMenus;
