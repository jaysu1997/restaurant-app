import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteFilterDataApi } from "../../services/apiMenus";
import toast from "react-hot-toast";

function useDeleteFilterDate() {
  const queryClient = useQueryClient();

  const {
    mutate: deleteFilterData,
    isPending: filterDataDeleting,
    error: deleteError,
  } = useMutation({
    mutationFn: (name) => deleteFilterDataApi(name),
    onSuccess: () => {
      toast.success("數據刪除成功");
      queryClient.invalidateQueries({ queryKey: ["menus"] });
    },
    onError: () => {
      toast.error("數據刪除失敗");
    },
  });

  return { deleteFilterData, filterDataDeleting, deleteError };
}

export default useDeleteFilterDate;
