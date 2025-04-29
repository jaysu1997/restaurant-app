import supabase from "./supabase";

// 取得stocks中的所有食材數據
export async function getInventoryApi() {
  const { data, error } = await supabase
    .from("inventory")
    .select()
    .order("remainingQuantity", { ascending: true });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// 根據輸入的食材名稱，取得所有備料和選項有使用指定食材的餐點
export async function getFilterDataApi(ingredientName) {
  // 在supabase中設定的sql(如果餐點中的備料或選項有使用指定食材，就數據獲取範圍內)
  const { data, error } = await supabase.rpc("get_menus_using_ingredient", {
    ingredient_name: `${ingredientName}`,
  });

  if (error) {
    console.error("Error:", error);
  }

  return data;
}

// 更新食材(會同步更新餐點中的備料和選項)
export async function updateInventoryApi(inventoryData) {
  const { id, label, value, remainingQuantity } = inventoryData;

  const { data, error } = await supabase.rpc(
    "upsert_inventory_and_update_menus",
    {
      inventory_id: id,
      new_label: label,
      new_value: value,
      new_remaining_quantity: remainingQuantity,
    }
  );

  // 重複新增相同名稱食材的Error(name必須是獨一無二)
  if (error && error.code === "23505") {
    console.log(error);
    throw new Error(`${inventoryData.label}已存在庫存數據庫中。`);
  }

  if (error) {
    console.log(error);
    throw new Error(error.message);
  }

  return data;
}

// 新增食材
export async function createInventoryApi(newIngredients) {
  const { data, error } = await supabase
    .from("inventory")
    .upsert(newIngredients)
    .select();

  // 重複新增相同名稱食材的Error(name必須是獨一無二)
  if (error && error.code === "23505") {
    console.log(error);
    throw new Error(`${newIngredients.label}已存在庫存數據庫中。`);
  }

  if (error) {
    console.log(error);
    throw new Error("庫存食材新增失敗");
  }

  return data;
}

// 刪除指定的食材(會同步更新餐點中的備料和選項)
export async function deleteInventoryApi(id) {
  const { data, error } = await supabase.rpc(
    "delete_inventory_and_update_menus",
    {
      inventory_id: id,
    }
  );

  if (error) {
    console.error("刪除失敗:", error);
    throw new Error("刪除失敗");
  }

  return data;
}
