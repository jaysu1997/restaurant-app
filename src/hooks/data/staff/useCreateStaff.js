import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createStaffApi } from "../../../services/apiStaff";
import showToast from "../../../ui/showToast";

// 註冊新帳號
function useCreateStaff() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: createStaffApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["staff"] });
      showToast({ type: "success", title: "註冊成功" });
    },
  });

  return { createStaff: mutate, isCreatingStaff: isPending };
}

export default useCreateStaff;
