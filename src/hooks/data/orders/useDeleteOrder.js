import { useMutation, useQueryClient } from "@tanstack/react-query";
import StyledHotToast from "../../../ui/StyledHotToast";
import { deleteOrderApi } from "../../../services/apiOrders";
import { useNavigate } from "react-router";

function useDeleteOrder() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: deleteOrderApi,
    onSuccess: (_, variables) => {
      queryClient.removeQueries({ queryKey: ["order", variables] });
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

  return { mutate, isPending };
}

export default useDeleteOrder;
