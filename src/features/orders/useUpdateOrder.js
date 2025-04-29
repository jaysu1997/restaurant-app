import { useMutation, useQueryClient } from "@tanstack/react-query";
import StyledHotToast from "../../ui/StyledHotToast";
import { updateOrderApi } from "../../services/apiOrder";
import { useNavigate } from "react-router-dom";

function useUpdateOrder() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const {
    mutate: updateOrder,
    isPending: updating,
    error,
  } = useMutation({
    mutationFn: updateOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      navigate("/orders");
    },
    onError: (error) => {
      StyledHotToast({
        type: "error",
        title: "訂單更新失敗",
        content: error.message,
      });
    },
  });

  return { updateOrder, updating, error };
}

export default useUpdateOrder;
