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
export async function getFilterDataApi(id) {
  const { data, error } = await supabase.rpc("get_menus_using_ingredient", {
    inventory_id: `${id}`,
  });

  handleSupabaseApiError(error);

  return data;
}

// 更新食材(會同步更新餐點中的備料和選項)
export async function updateInventoryApi(inventoryData) {
  const { id, label, value, remainingQuantity } = inventoryData;

  const { data, error } = await supabase.rpc(
    "update_inventory_and_update_menus",
    {
      inventory_id: id,
      new_label: label,
      new_value: value,
      new_remaining_quantity: remainingQuantity,
    },
  );

  handleSupabaseApiError(error, {
    23505: `${inventoryData.label}已存在`,
  });

  return data;
}

// 新增食材
export async function createInventoryApi(newIngredients) {
  const { data, error } = await supabase
    .from("inventory")
    .insert(newIngredients)
    .select();

  handleSupabaseApiError(error, {
    23505: `${newIngredients.label}已存在`,
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
