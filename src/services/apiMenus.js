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
  const { menuData, newIngredients, imageData } = upsertData;

  if (newIngredients.length > 0) {
    // 將輸入的食材新增到stocks表單中
    const { error: inventoryError } = await supabase
      .from("inventory")
      .insert(newIngredients)
      .select();

    handleSupabaseApiError(inventoryError, {
      default:
        "新食材數據自動建立失敗，可以嘗試再次交表單，或前往庫存管理頁面手動建立。",
    });
  }

  const { newPath, oldPath, file } = imageData;

  if (file) {
    const { error } = await supabase.storage.from("menu").upload(newPath, file);

    handleSupabaseApiError(error);
  }

  // 新增餐點數據
  const { data, error } = await supabase
    .from("menus")
    .upsert(menuData)
    .select();

  handleSupabaseApiError(error, {
    23505: `${menuData.name}已存在。`,
  });

  if (oldPath) {
    const { error } = await supabase.storage.from("menu").remove([oldPath]);

    // 舊圖片刪除失敗不影響更新功能，所以不做throw error，只需要簡單通知
    if (error) {
      console.log("舊圖片刪除失敗");
      console.warn(error);
    }
  }

  return data;
}

// 刪除指定單筆menu數據
export async function deleteMenuApi(id) {
  const { error } = await supabase.from("menus").delete().eq("id", id);

  handleSupabaseApiError(error);

  return null;
}
