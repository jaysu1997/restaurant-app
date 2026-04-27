import supabase from "./supabase";
import handleSupabaseApiError from "./handleSupabaseApiError";

// 取得inventory中的所有食材數據
export async function getInventoryApi() {
  const { data, error } = await supabase
    .from("inventory")
    .select()
    .order("remainingQuantity", { ascending: true });

  handleSupabaseApiError(error);

  return data;
  // return [];
}

// 根據指定的食材，找出所有有使用此食材當作備料或項目選項的餐點
export async function getIngredientRelatedMenusApi(id) {
  const { data, error } = await supabase.rpc("get_menus_using_ingredient", {
    inventory_id: id,
  });

  handleSupabaseApiError(error);

  return data;
}

// 新增 or 更新食材數據
export async function upsertInventoryApi(inventoryData) {
  const { data, error } = await supabase
    .from("inventory")
    .upsert(inventoryData)
    .select();

  handleSupabaseApiError(error, {
    23505: `${inventoryData.name} 已存在`,
  });

  return data;
}

// 刪除指定的食材(會同步更新餐點中的備料和選項)
export async function deleteInventoryApi(id) {
  const { data, error } = await supabase.rpc(
    "delete_inventory_and_update_menus",
    { inventory_id: id },
  );

  handleSupabaseApiError(error);

  return data;
}
