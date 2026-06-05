import { useQuery } from "@tanstack/react-query";
import { getSettingsApi } from "../../../services/apiSettings";

// 取得所有設定的數據
function useGetSettings() {
  const settingsQuery = useQuery({
    queryKey: ["settings"],
    queryFn: getSettingsApi,
  });

  return settingsQuery;
}

export default useGetSettings;
