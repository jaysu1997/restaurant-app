import { useMutation, useQueryClient } from "@tanstack/react-query";
import StyledHotToast from "../../../ui/StyledHotToast";
import { deleteOrderApi } from "../../../services/apiOrder";
import { useNavigate } from "react-router-dom";

function useDeleteOrder() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending, error } = useMutation({
    mutationFn: deleteOrderApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      StyledHotToast({
        type: "success",
        title: "訂單刪除成功",
      });
      navigate("/orders");
    },
    onError: (error) => {
      StyledHotToast({
        type: "error",
        title: "訂單刪除失敗",
        content: error.message,
      });
    },
  });

  return { mutate, isPending, error };
}

export default useDeleteOrder;
