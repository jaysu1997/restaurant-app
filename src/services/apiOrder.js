// 訂單相關api
import supabase from "./supabase.js";

export async function createOrderApi(orderListData) {
  const { data, error } = await supabase.rpc("create_order", {
    order_data: orderListData,
  });

  if (error) {
    console.log(error);
    throw new Error("訂單建立失敗");
  }

  return data;
}
