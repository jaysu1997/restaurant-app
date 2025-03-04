// 訂單相關api
import supabase from "./supabase.js";

export async function createOrderApi(orderData) {
  const { data, error } = await supabase.rpc("create_order", {
    order_data: orderData,
  });

  if (error) {
    console.log(error);
    throw new Error("訂單建立失敗");
  }

  return data;
}

export async function getOrdersApi() {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("id", { ascending: false });

  if (error) {
    console.log(error);
    throw new Error("取得所有訂單數據失敗");
  }

  return data;
}
