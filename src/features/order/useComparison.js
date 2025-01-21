// 對比庫存剩餘量是否充足

import { useMutation } from "@tanstack/react-query";
import { comparisonInventoryApi } from "../../services/apiInventory";

function useComparison() {
  const {
    mutate: compare,
    isPending: isComparing,
    error,
  } = useMutation({
    mutationFn: comparisonInventoryApi,
  });

  return { compare, isComparing, error };
}

export default useComparison;
