// 訂單相關api
import supabase from "./supabase.js";
import handleSupabaseApiError from "./handleSupabaseApiError";
import { format, startOfDay, subDays } from "date-fns";

// 建立新的餐點訂單api
export async function createOrderApi(orderData) {
  const { data, error } = await supabase.rpc("create_order", {
    order_data: orderData,
  });

  handleSupabaseApiError(error);

  return data;
}

// 獲取指定範圍訂單數據api
export async function getPaginatedOrdersApi(page, createdTime, pickupNumber) {
  // 每一分頁顯示25筆數據
  const itemsPerPage = 25;

  let query = supabase
    .from("orders")
    .select("*", {
      count: "exact",
    })
    .order("createdTime", { ascending: false });

  if (createdTime) {
    const { from, to } = createdTime;
    query = query.gte("createdTime", from).lt("createdTime", to);
  }

  if (pickupNumber !== null) {
    query = query.eq("pickupNumber", pickupNumber);
  }

  const { data, count, error } = await query.range(
    (page - 1) * itemsPerPage,
    page * itemsPerPage - 1,
  );

  handleSupabaseApiError(error);

  // 回傳訂單數據、當前分頁、最大分頁數
  return {
    ordersData: data,
    curPage: page,
    maxPage: Math.ceil(count / itemsPerPage) || 1,
  };
}

// 獲取近7天所有訂單數據
export async function getLast7DaysOrdersApi() {
  const startDate = format(
    startOfDay(subDays(new Date(), 6)),
    "yyyy-MM-dd HH:mm:ss",
  );

  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .gte("createdTime", startDate);

  handleSupabaseApiError(error);

  return data;
}

// 獲取指定單筆訂單數據
export async function getOrderApi(orderId) {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  handleSupabaseApiError(error, {
    PGRST116: "查無此訂單，請確認訂單 ID 是否正確。",
  });

  // 使用single，所以是直接回傳一個物件(不是物件陣列)
  return data;
}

// 刪除指定訂單
export async function deleteOrderApi(orderId) {
  const { data, error } = await supabase.rpc("delete_order", {
    order_id: orderId,
  });

  handleSupabaseApiError(error);

  return data;
}

// 更新指定訂單
export async function updateOrderApi(oderData) {
  const { data, error } = await supabase.rpc("update_order", {
    order_data: oderData,
  });

  handleSupabaseApiError(error);

  return data;
}
