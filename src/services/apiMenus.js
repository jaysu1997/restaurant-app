import { getInventoryApi, upsertInventoryApi } from "./apiInventory.js";
import supabase from "./supabase.js";

// 取得所有menu數據
export async function getMenusApi() {
  const { data, error } = await supabase.from("menus").select();

  if (error) {
    console.log(error);
    throw new Error("Menus數據獲取失敗");
  }

  return data;
}

// 取得指定id的menu數據
export async function getSpecifiedMenuApi(id) {
  const { data, error } = await supabase.from("menus").select().eq("id", id);

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
    .upsert(menuData)
    .select();

  // 重複新增相同名稱餐點的Error(name必須是獨一無二)
  if (error && error.code === "23505") {
    console.log(error);
    throw new Error("Menu數據更新失敗(此餐點名稱已經存在)");
  }

  if (error) {
    console.log(error);
    throw new Error("Menu數據更新失敗");
  }

  // 取得stocks表單中現有的全部食材
  // const existStocksData = await getInventoryApi();

  // 只留下stocks表單中尚未存在的食材
  // const newStockData = menuData.ingredients
  //   .filter(
  //     (ing) => existStocksData.findIndex((e) => e.name === ing.name) === -1
  //   )
  //   .map((ing) => ({
  //     name: ing.name,
  //     dishes: menuData.name,
  //   }));

  // 將輸入的食材新增到stocks表單中
  // await upsertInventoryApi(newStockData);

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
