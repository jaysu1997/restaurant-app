import { useQuery } from "@tanstack/react-query";
import { getSettingsApi } from "../../../services/apiSettings";

// 取得所有設定的數據
function useGetSettings() {
  const {
    data = {},
    error: settingsError,
    isPending: settingsIsPending,
    isSuccess: settingsIsSuccess,
    isError: settingsIsError,
  } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettingsApi,
  });

  return {
    data,
    settingsError,
    settingsIsPending,
    settingsIsSuccess,
    settingsIsError,
  };
}

export default useGetSettings;
