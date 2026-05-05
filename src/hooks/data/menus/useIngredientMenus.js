import { useQuery } from "@tanstack/react-query";
import { getIngredientMenusApi } from "../../../services/apiInventory";

// 根據輸入的食材名稱，取得所有備料和選項有使用指定食材的餐點
function useIngredientMenus(id) {
  const { data, isPending, error, isError } = useQuery({
    queryKey: ["filterMenuData", id],
    queryFn: () => getIngredientMenusApi(id),
  });

  return {
    relatedMenus: data,
    relatedMenusIsLoading: isPending,
    relatedMenusIsError: isError,
    relatedMenusError: error,
  };
}

export default useIngredientMenus;
