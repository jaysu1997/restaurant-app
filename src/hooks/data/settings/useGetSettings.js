import { useQuery } from "@tanstack/react-query";
import { withFallbackRetry } from "../../../utils/helpers";
import { getSettingsApi } from "../../../services/apiSettings";

// 取得所有設定的數據
function useGetSettings() {
  const { data, error, isPending, isSuccess, isError, refetch } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettingsApi,
  });

  return {
    settings: data,
    settingsIsLoading: isPending,
    settingsIsError: isError,
    settingsError: withFallbackRetry(error, refetch),
    isSuccess,
  };
}

export default useGetSettings;
