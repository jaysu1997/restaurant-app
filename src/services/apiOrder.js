// 訂單相關api
import supabase from "./supabase.js";
import { handleSupabaseError } from "../utils/handleSupabaseError";

// 建立新的餐點訂單api
export async function createOrderApi(orderData) {
  const { data, error } = await supabase.rpc("create_order", {
    order_data: orderData,
  });

  handleSupabaseError(error);

  return data;
}

// 獲取指定範圍訂單數據api
export async function getOrdersApi(page, createdTime, pickupNumber) {
  // 每一分頁顯示25筆數據
  const itemsPerPage = 25;

  let query = supabase
    .from("orders")
    .select("*", {
      count: "exact",
    })
    .order("id", { ascending: true });

  if (createdTime) {
    const { from, to } = createdTime;
    query = query.gte("createdTime", from).lt("createdTime", to);
  }

  if (pickupNumber) {
    query = query.eq("pickupNumber", pickupNumber);
  }

  const { data, count, error } = await query.range(
    (page - 1) * itemsPerPage,
    page * itemsPerPage - 1
  );

  handleSupabaseError(error, {
    for: "PGRST103",
    message: "找不到指定的分頁，建議從第一頁開始查看。",
  });

  // 回傳訂單數據、當前分頁、最大分頁數
  return {
    ordersData: data,
    curPage: page,
    maxPage: Math.ceil(count / itemsPerPage) || 1,
  };
}

export async function getOrderApi(orderId) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  handleSupabaseError(error, {
    for: "PGRST116",
    message: "查無此訂單，請確認訂單 ID 是否正確。",
  });

  // 使用single，所以是直接回傳一個物件(不是物件陣列)
  return data;
}

// 刪除指定訂單
export async function deleteOrderApi(orderId) {
  const { data, error } = await supabase.rpc("delete_order", {
    order_id: orderId,
  });

  handleSupabaseError(error);

  return data;
}

export async function updateOrderApi(oderData) {
  const { data, error } = await supabase.rpc("update_order", {
    order_data: oderData,
  });

  handleSupabaseError(error);

  return data;
}
