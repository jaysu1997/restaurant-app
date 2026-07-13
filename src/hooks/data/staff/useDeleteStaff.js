import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStaffApi } from "../../../services/apiStaff";
import showToast from "../../../utils/showToast";

function useDeleteStaff() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteStaffApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      showToast({ type: "success", title: "刪除成功" });
    },
    onError: (error) => {
      showToast({
        type: "error",
        title: "刪除失敗",
        content: error.message,
      });
    },
  });

  return { mutate, isPending };
}

export default useDeleteStaff;
