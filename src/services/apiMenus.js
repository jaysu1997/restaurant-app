import supabase from "./supabase.js";
import handleSupabaseApiError from "./handleSupabaseApiError";

// 取得所有menu數據
export async function getMenusApi() {
  const { data, error } = await supabase
    .from("menus")
    .select()
    .order("category", { ascending: true })
    .order("id", { ascending: true });

  handleSupabaseApiError(error);

  return data;
  // return [];
}

// 新增or更新單筆menu數據
export async function upsertMenuApi(upsertData) {
  const { menuData, newIngredients } = upsertData;

  if (newIngredients.length > 0) {
    // 將輸入的食材新增到stocks表單中
    const { error: inventoryError } = await supabase
      .from("inventory")
      .insert(newIngredients)
      .select();

    handleSupabaseApiError(inventoryError, {
      default:
        "新食材數據自動建立失敗，可以嘗試嘗試再次交表單，或前往庫存管理頁面手動建立。",
    });
  }

  // 新增餐點數據
  const { data, error } = await supabase
    .from("menus")
    .upsert(menuData)
    .select();

  handleSupabaseApiError(error, {
    23505: `${menuData.name}已存在。`,
  });

  return data;
}

// 刪除指定單筆menu數據
export async function deleteMenuApi(id) {
  const { error } = await supabase.from("menus").delete().eq("id", id);

  handleSupabaseApiError(error);

  return null;
}
