import { createInventoryApi } from "./apiInventory.js";
import supabase from "./supabase.js";

// 取得所有menu數據
export async function getMenusApi() {
  const { data, error } = await supabase
    .from("menus")
    .select()
    .order("category", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// 取得指定id的menu數據
export async function getSpecifiedMenuApi(id) {
  console.log(id);

  const { data, error } = await supabase.from("menus").select("*").eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Menu數據獲取失敗");
  }

  return data;
}

// 新增or更新單筆menu數據
export async function upsertMenuApi(menuData) {
  const { data, error } = await supabase
    .from("menus")
    .upsert(menuData.data)
    .select();

  // 重複新增相同名稱餐點的Error(name必須是獨一無二)
  if (error && error.code === "23505") {
    console.log(error);
    throw new Error(`${menuData.data.name}已存在。`);
  }

  if (error) {
    console.log(error);
    throw new Error("餐點設定失敗");
  }

  try {
    // 將輸入的食材新增到stocks表單中
    await createInventoryApi(menuData.newIngredients);
  } catch (inventoryError) {
    console.log(inventoryError);
    throw new Error("餐點已建立，但食材新增失敗", inventoryError);
  }

  return data;
}

// 刪除指定單筆menu數據
export async function deleteMenuApi(id) {
  const { error } = await supabase.from("menus").delete().eq("id", id);

  if (error) {
    console.log(error);
    throw new Error("Menu數據刪除失敗");
  }

  return null;
}
