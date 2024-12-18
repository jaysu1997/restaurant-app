import { useQuery } from "@tanstack/react-query";
import { getFilterDataApi } from "../../services/apiMenus";

function useGetFilterMenuData(name) {
  const {
    data: filterMenuData,
    isPending,
    error,
  } = useQuery({
    queryKey: ["filterMenuData"],
    queryFn: () => getFilterDataApi(name),
  });

  return { filterMenuData, isPending, error };
}

export default useGetFilterMenuData;
