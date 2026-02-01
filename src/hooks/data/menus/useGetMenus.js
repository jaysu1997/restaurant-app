// 獲取菜單(所有餐點)數據
import { useQuery } from "@tanstack/react-query";
import { getMenusApi } from "../../../services/apiMenus";
import { withFallbackRetry } from "../../../utils/helpers";

function useGetMenus() {
  const { data, isPending, error, isError, refetch } = useQuery({
    queryKey: ["menus"],
    queryFn: getMenusApi,
  });

  return {
    menus: data,
    menusIsLoading: isPending,
    menusIsError: isError,
    menusError: withFallbackRetry(error, refetch),
  };
}

export default useGetMenus;
