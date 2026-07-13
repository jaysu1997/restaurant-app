import { useMutation, useQueryClient } from "@tanstack/react-query";
import showToast from "../../../utils/showToast";
import { updateOrderApi } from "../../../services/apiOrders";
import { useNavigate } from "react-router";

function useUpdateOrder() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: updateOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      navigate("/orders");
      showToast({
        type: "success",
        title: "訂單更新成功",
      });
    },
    onError: (error) => {
      showToast({
        type: "error",
        title: "訂單更新失敗",
        content: error.message,
      });
    },
  });

  return { updateOrder: mutate, isUpdatingOrder: isPending };
}

export default useUpdateOrder;
