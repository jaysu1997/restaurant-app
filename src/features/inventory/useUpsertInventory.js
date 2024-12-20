// 新增or更新庫存食材

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { upsertInventoryApi } from "../../services/apiInventory";
import toast from "react-hot-toast";

function useUpsertInventory() {
  const queryClient = useQueryClient();

  const {
    mutate: upsert,
    isPending: isUpserting,
    error: upsertError,
  } = useMutation({
    mutationFn: upsertInventoryApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inventory"],
      });
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return { upsert, isUpserting, upsertError };
}

export default useUpsertInventory;
