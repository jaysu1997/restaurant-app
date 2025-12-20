import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteStaffApi } from "../../../services/apiStaff";
import StyledHotToast from "../../../ui-old/StyledHotToast";

function useDeleteStaff() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteStaffApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      StyledHotToast({ type: "success", title: "刪除成功" });
    },
    onError: (error) => {
      StyledHotToast({
        type: "error",
        title: "刪除失敗",
        content: error.message,
      });
    },
  });

  return { mutate, isPending };
}

export default useDeleteStaff;
