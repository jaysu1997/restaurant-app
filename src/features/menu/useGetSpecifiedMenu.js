// 取得指定id的menu數據(這個好像根本沒用到)
import { useQuery } from "@tanstack/react-query";
import { getSpecifiedMenuApi } from "../../services/apiMenus";

function useGetSpecifiedMenu() {
  const {
    data: specifiedMenusData,
    isPending,
    error,
  } = useQuery({
    queryKey: ["specifiedmenu"],
    queryFn: getSpecifiedMenuApi,
  });

  return { specifiedMenusData, isPending, error };
}

export default useGetSpecifiedMenu;
