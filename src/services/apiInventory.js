import { deleteFilterDataApi, updateIngredientApi } from "./apiMenus";
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

// 新增/更新食材數據
export async function upsertInventoryApi(inventoryData) {
  const { data, error } = await supabase
    .from("inventory")
    .upsert(inventoryData.ingredientData)
    .select();

  if (error) {
    console.log(error);
    throw new Error("庫存數據新增失敗");
  }

  if (inventoryData.edit) {
    await updateIngredientApi(inventoryData.edit.old, inventoryData.edit.new);
  }

  return data;
}

// 刪除指定的食材inventory數據
export async function deleteInventoryApi({ id, name }) {
  const { error } = await supabase.from("inventory").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Inventory數據刪除失敗");
  }
  // 刪除使用此食材的所有餐點備料和選項
  await deleteFilterDataApi(name);

  return null;
}
