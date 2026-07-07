import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStaffApi } from "../../../services/apiStaff";
import showToast from "../../../ui/showToast";

function useUpdateStaff() {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: updateStaffApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      showToast({ type: "success", title: "職位更新成功" });
    },
    onError: (error) => {
      showToast({
        type: "error",
        title: "職位更新失敗",
        content: error.message,
      });
    },
  });

  return { updateStaff: mutate };
}

export default useUpdateStaff;
