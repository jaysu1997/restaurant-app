import supabase from "./supabase";

// 取得stocks中的所有食材數據
export async function getInventoryApi() {
  const { data, error } = await supabase.from("inventory").select();

  if (error) {
    console.log(error);
    throw new Error("庫存數據獲取失敗");
  }

  return data;
}

// 新增食材數據
export async function upsertInventoryApi(stockData) {
  const { error } = await supabase.from("inventory").upsert(stockData).select();

  if (error) {
    console.log(error);
    throw new Error("庫存數據新增失敗");
  }
}
