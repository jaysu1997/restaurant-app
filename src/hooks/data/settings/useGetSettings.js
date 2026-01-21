import { useQuery } from "@tanstack/react-query";
import { getSettingsApi } from "../../../services/apiSettings";
import { withFallbackRetry } from "../../../utils/helpers";

// 取得所有設定的數據
function useGetSettings() {
  const {
    data = {},
    error,
    isPending,
    isSuccess,
    isError,
    refetch,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettingsApi,
  });

  return {
    data,
    error: withFallbackRetry(error, refetch),
    isPending,
    isSuccess,
    isError,
  };
}

export default useGetSettings;
