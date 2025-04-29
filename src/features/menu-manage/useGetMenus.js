// 獲取菜單(所有餐點)數據
import { useQuery } from "@tanstack/react-query";
import { getMenusApi } from "../../services/apiMenus";
import StyledHotToast from "../../ui/StyledHotToast";

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

  if (menusDataFetchingError) {
    StyledHotToast({
      type: "error",
      title: "菜單數據獲取失敗",
      content: error.message,
    });
  }

  return { menusData, menusDataFetching, menusDataFetchingError };
}

export default useGetMenus;
