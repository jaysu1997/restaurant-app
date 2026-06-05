import { useQuery } from "@tanstack/react-query";
import { getIngredientMenusApi } from "../../../services/apiInventory";

// 根據輸入的食材名稱，取得所有備料和選項有使用指定食材的餐點
function useIngredientMenus(id) {
  const relatedMenusQuery = useQuery({
    queryKey: ["relatedMenus", id],
    queryFn: () => getIngredientMenusApi(id),
  });

  return relatedMenusQuery;
}

export default useIngredientMenus;
