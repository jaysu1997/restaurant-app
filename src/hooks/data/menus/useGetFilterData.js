import { useQuery } from "@tanstack/react-query";
import { getFilterDataApi } from "../../../services/apiInventory";

// 根據輸入的食材名稱，取得所有備料和選項有使用指定食材的餐點
function useGetFilterMenuData(name, shouldFetchFilterData = true) {
  const {
    data: filterMenuData,
    isPending,
    error,
    isError,
  } = useQuery({
    queryKey: ["filterMenuData", name],
    queryFn: () => getFilterDataApi(name),
    enabled: shouldFetchFilterData && !!name,
  });

  return { filterMenuData, isPending, error, isError };
}

export default useGetFilterMenuData;
