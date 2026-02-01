import { useContext } from "react";
import { OrderContext } from "./OrderContext";

function useOrder() {
  const context = useContext(OrderContext);

  if (context === undefined)
    throw new Error("useOrder 必須在 OrderProvider 中使用");

  return context;
}

export default useOrder;
