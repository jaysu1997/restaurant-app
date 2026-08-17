// 測試取得所有用戶數據
import { useQuery } from "@tanstack/react-query";
import { getStaffApi } from "../../../services/apiStaff";
import { toUser } from "../../../utils/toUser";

function useGetStaff() {
  const staffQuery = useQuery({
    queryFn: getStaffApi,
    queryKey: ["staff"],
    select: (data) => data.users.map(toUser),
  });

  return staffQuery;
}

export default useGetStaff;
