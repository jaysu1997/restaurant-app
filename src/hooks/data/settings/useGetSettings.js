import { useQuery } from "@tanstack/react-query";
import { getSettingsApi } from "../../../services/apiSettings";

// 取得所有設定的數據
function useGetSettings() {
  const {
    data = {},
    error,
    isPending,
    isSuccess,
    isError,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettingsApi,
  });

  return {
    data,
    error,
    isPending,
    isSuccess,
    isError,
  };
}

export default useGetSettings;
