import { useQuery } from "@tanstack/react-query";
import { getIngredientRelatedMenusApi } from "../../../services/apiInventory";

// 根據輸入的食材名稱，取得所有備料和選項有使用指定食材的餐點
function useIngredientRelatedMenus(id, showRelatedData) {
  const { data, isPending, error, isError } = useQuery({
    queryKey: ["filterMenuData", id],
    queryFn: () => getIngredientRelatedMenusApi(id),
    enabled: showRelatedData,
  });

  return {
    relatedMenus: data,
    relatedMenusIsLoading: isPending,
    relatedMenusIsError: isError,
    relatedMenusError: error,
  };
}

export default useIngredientRelatedMenus;
