// 訂單相關api
import supabase from "./supabase.js";

// 建立新的餐點訂單api
export async function createOrderApi(orderData) {
  const { data, error } = await supabase.rpc("create_order", {
    order_data: orderData,
  });

  if (error) {
    throw new Error("訂單建立失敗");
  }

  return data;
}

// 獲取指定範圍訂單數據api
export async function getOrdersApi(page, itemsPerPage) {
  // 訂單數據總筆數
  const { count, error: countError } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true });

  if (countError) {
    console.log(countError);
    throw new Error("訂單數據總筆數獲取失敗");
  }

  // 最大分頁數以及當前分頁
  const maxPage = Math.ceil(count / itemsPerPage);
  const curPage = page > maxPage ? maxPage : page;
  // 取得指定範圍內的數據
  const { data: ordersData, error } = await supabase
    .from("orders")
    .select("*")
    .order("id", { ascending: true })
    .range((curPage - 1) * itemsPerPage, curPage * itemsPerPage - 1);

  if (error) {
    console.log(error);
    throw new Error("取得所有訂單數據失敗");
  }

  // 回傳訂單數據、當前分頁、最大分頁數
  return { ordersData, curPage, maxPage };
}

export async function getOrderApi(orderId) {
  const { data, error } = await supabase
    .from("orders")
    .select()
    .eq("id", orderId);

  if (error) {
    console.log(error);
    throw new Error("取得訂單數據失敗");
  }

  // 回傳訂單數據、當前分頁、最大分頁數
  return data[0];
}

// 刪除指定訂單
export async function deleteOrderApi(orderId) {
  const { data, error } = await supabase.rpc("delete_order", {
    order_id: orderId,
  });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data;
}

export async function updateOrderApi(oderData) {
  const { data, error } = await supabase.rpc("update_order", {
    order_data: oderData,
  });

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data;
}
