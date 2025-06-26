import { useQuery } from "@tanstack/react-query";
import { getSettingsApi } from "../../../services/apiSettings";

function useGetSettings() {
  const { data, error, isPending, isSuccess, isError } = useQuery({
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
