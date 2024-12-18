import { upsertInventoryApi } from "./apiInventory.js";
import supabase from "./supabase.js";

// 取得所有menu數據
export async function getMenusApi() {
  const { data, error } = await supabase.from("menus").select();

  if (error) {
    console.log(error);
    throw new Error("Menus數據獲取失敗");
  }

  // console.log(data);

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
    throw new Error("餐點設定失敗(此餐點名稱已經存在)");
  }

  if (error) {
    console.log(error);
    throw new Error("餐點設定失敗");
  }

  // 將輸入的食材新增到stocks表單中
  await upsertInventoryApi(menuData.newIngredients);

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

export async function getFilterDataApi(ingredientName) {
  const { data, error } = await supabase.rpc("filter_menus_by_ingredient", {
    ingredient_name: `${ingredientName}`,
  });

  if (error) {
    console.error("Error:", error);
  }

  return data;
}

// 試看看
export async function deleteFilterDataApi(ingredientName) {
  const { data, error } = await supabase.rpc("remove_ingredient_from_menus", {
    ingredient_name: `${ingredientName}`,
  });

  if (error) {
    console.error("Error:", error);
  }

  console.log(data);

  return data;
}

// 這個還沒有測試過
export async function updateIngredientApi(ingredientName, newIngredientName) {
  // 呼叫自定義的 SQL 函數來更新食材名稱
  const { data, error } = await supabase.rpc("update_ingredient_in_menus", {
    ingredient_name: ingredientName,
    new_ingredient_name: newIngredientName,
  });

  if (error) {
    console.error("Error updating ingredient:", error.message);
    return null; // 返回 null 表示更新失敗
  }

  console.log("Ingredient updated successfully:", data);
  return data; // 返回更新後的數據
}
