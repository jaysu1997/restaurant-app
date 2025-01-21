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

// 刪除全部有使用指定食材的備料和選項
export async function deleteFilterDataApi(ingredientName) {
  const { data, error } = await supabase.rpc("remove_ingredient_from_menus", {
    ingredient_name: `${ingredientName}`,
  });

  if (error) {
    console.error("Error:", error);
  }

  return data;
}

// 更新所有有使用指定食材的備料和選項
export async function updateFilterDataApi(ingredientName, newIngredientName) {
  // 呼叫自定義的 SQL 函數來更新食材名稱
  const { data, error } = await supabase.rpc("update_ingredient_in_menus", {
    old_ingredient_name: ingredientName,
    new_ingredient_name: newIngredientName,
  });

  if (error) {
    console.error("Error updating ingredient:", error.message);
    return null; // 返回 null 表示更新失敗
  }

  return data; // 返回更新後的數據
}

// 新增or更新食材數據
export async function upsertInventoryApi(inventoryData) {
  const { data, error } = await supabase
    .from("inventory")
    .upsert(inventoryData.ingredientData)
    .select();

  // 重複新增相同名稱食材的Error(name必須是獨一無二)
  if (error && error.code === "23505") {
    console.log(error);
    throw new Error(
      `${inventoryData.ingredientData.label}已存在庫存數據庫中。`
    );
  }

  if (error) {
    console.log(error);
    throw new Error("庫存食材設定失敗");
  }

  // 所有使用此食材的備料和選項也會同步更新名稱
  if (inventoryData.edit) {
    await updateFilterDataApi(inventoryData.edit.old, inventoryData.edit.new);
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

// 用來檢查庫存是否能夠滿足訂單需求的函式
export async function comparisonInventoryApi(consumption) {
  // 食材列表
  const ingredientsList = [...consumption.keys()];

  const { data, error } = await supabase
    .from("inventory")
    .select("value,remainingQuantity")
    .in("value", ingredientsList);

  if (error) {
    console.log(error);
    throw new Error("Inventory指定數據獲取失敗");
  }

  // 檢查庫存結果
  const compareResult = data.reduce((acc, cur) => {
    if (cur.remainingQuantity < consumption.get(cur.value).total) {
      // 剩餘食材數量所能提供的最多份數
      const maxCapacity = Math.floor(
        cur.remainingQuantity / consumption.get(cur.value).perServing
      );

      acc.push({
        ingredientName: cur.value,
        maxCapacity,
      });
    }

    return acc;
  }, []);

  return compareResult;
}
