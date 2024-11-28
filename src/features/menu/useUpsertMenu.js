// 新增or更新單筆menu數據
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertMenuApi } from "../../services/apiMenus";
import toast from "react-hot-toast";

function useUpsertMenu() {
  const queryClient = useQueryClient();

  const {
    mutate: upsert,
    isPending: isUpserting,
    error: upsertError,
  } = useMutation({
    mutationFn: upsertMenuApi,
    onSuccess: () => {
      toast.success("餐點數據新增成功");
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { upsert, isUpserting, upsertError };
}

export default useUpsertMenu;
