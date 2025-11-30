// 生成訂單餐點uniqueId
function generateDishItemId(dishes) {
  const newId = Math.random().toString(36).slice(2, -1);
  // 檢查ID是否會重複
  const idExists = dishes.some((dish) => dish.uniqueId === newId);

  if (idExists) {
    return generateDishItemId(dishes);
  }

  return newId;
}

// 統計餐點需要消耗的食材數量(1份)
function calcIngredientsUsage(ingredients, curDishCustomizeOption) {
  // 總食材消耗數據
  const ingredientsUsage = new Map();

  function setingredientsUsage(name, quantity) {
    ingredientsUsage.set(name, ingredientsUsage.get(name) || 0 + quantity);
  }

  // 餐點本身的消耗
  ingredients.forEach((ing) => {
    const name = ing.ingredientName.value;
    const quantity = ing.quantity;

    setingredientsUsage(name, quantity);
  });

  // 額外項目增加的消耗
  curDishCustomizeOption.forEach((obj) => {
    if (obj.length === 0 || obj.detail.length === 0) return;

    obj.detail.forEach((option) => {
      const name = option.ingredientName;
      const quantity = option.quantity;

      // 空字串代表此項目無額外食材消耗
      if (name === "") return;
      setingredientsUsage(name, quantity);
    });
  });

  return ingredientsUsage;
}

export { generateDishItemId, calcIngredientsUsage };
