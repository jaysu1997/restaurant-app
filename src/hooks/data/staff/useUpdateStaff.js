import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStaffApi } from "../../../services/apiStaff";
import StyledHotToast from "../../../ui/StyledHotToast";

function useUpdateStaff() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: updateStaffApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      StyledHotToast({ type: "success", title: "職位更新成功" });
    },
    onError: (error) =>
      StyledHotToast({
        type: "error",
        title: "職位更新失敗",
        content: error.message,
      }),
  });

  return { mutate, isPending };
}

export default useUpdateStaff;
