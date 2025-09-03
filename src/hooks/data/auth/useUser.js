import { useQuery } from "@tanstack/react-query";
import { getCurrentUserApi } from "../../../services/apiAuth";

// 查詢當前帳號登入狀態和驗證狀態
function useUser() {
  const { isPending: userIsPending, data: user } = useQuery({
    queryFn: getCurrentUserApi,
    queryKey: ["user"],
  });

  return { userIsPending, user };
}

export default useUser;
