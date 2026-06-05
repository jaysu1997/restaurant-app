// 獲取菜單(所有餐點)數據
import { useQuery } from "@tanstack/react-query";
import { getMenusApi } from "../../../services/apiMenus";

function useGetMenus() {
  const menusQuery = useQuery({
    queryKey: ["menus"],
    queryFn: getMenusApi,
  });

  return menusQuery;
}

export default useGetMenus;
