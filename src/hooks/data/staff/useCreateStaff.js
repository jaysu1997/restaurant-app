import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStaffApi } from "../../../services/apiStaff";
import StyledHotToast from "../../../ui/StyledHotToast";

// 註冊新帳號
function useCreateStaff() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createStaffApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      StyledHotToast({ type: "success", title: "註冊成功" });
    },
    onError: (error) => {
      StyledHotToast({
        type: "error",
        title: "註冊失敗",
        content: error.message,
      });
    },
  });

  return { createStaff: mutate, isCreatingStaff: isPending };
}

export default useCreateStaff;
