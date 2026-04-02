// ok
import { useQuery } from "@tanstack/react-query";
import { getCurrentUserApi } from "../../../services/apiAuth";

// 查詢當前帳號登入狀態和驗證狀態
export function useUser() {
  const { data, isPending } = useQuery({
    queryFn: getCurrentUserApi,
    queryKey: ["user"],
  });

  return { user: data, userIsLoading: isPending };
}

export default useUser;
