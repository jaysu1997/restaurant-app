// ok
import { useQuery } from "@tanstack/react-query";
import { getCurrentUserApi } from "../../../services/apiAuth";
import { toUser } from "../../../utils/toUser";

// 查詢當前帳號登入狀態和驗證狀態
export function useUser() {
  const { data, isPending, isError, error } = useQuery({
    queryFn: getCurrentUserApi,
    queryKey: ["user"],
    select: (data) => toUser(data),
  });

  return {
    user: data,
    userIsLoading: isPending,
    userIsError: isError,
    userError: error,
  };
}

export default useUser;
