import { useQuery } from "@tanstack/react-query";
import { getMenusApi } from "../../services/apiMenus";

function useGetMenus() {
  const {
    data: menusData,
    isPending,
    error,
  } = useQuery({
    queryKey: ["menus"],
    queryFn: getMenusApi,
  });

  return { menusData, isPending, error };
}

export default useGetMenus;
