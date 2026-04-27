// 把table數據轉換成表單格式
export function toMenuForm(menu, inventoryObj) {
  // 無menu數據(新增餐點)
  if (!menu) {
    return {
      name: "",
      category: "",
      basePrice: "",
      discount: "",
      ingredients: [{ ingredient: "", quantity: "" }],
      customizations: [],
    };
  }

  const { ingredients, customizations } = menu;

  const idToOption = (item) => {
    const { ingredient: uuid } = item;

    // 無額外消耗食材的選項
    if (uuid === null) {
      return { ...item, ingredient: { label: "無", value: "" } };
    }

    const inventoryItem = inventoryObj[uuid];

    return {
      ...item,
      ingredient: inventoryItem
        ? { label: inventoryItem.name, value: uuid }
        : "",
    };
  };

  const newIngredients = ingredients.map((item) => idToOption(item));
  const newCustomizations = customizations.map((customization) => ({
    ...customization,
    options: customization.options.map((option) => idToOption(option)),
  }));

  return {
    ...menu,
    ingredients: newIngredients,
    customizations: newCustomizations,
  };
}

// 整理成上傳到table的格式(食材格式調整、整理出新食材、調整項目順序)
export function toMenuPayload(data) {
  const { ingredients, customizations } = data;
  const newIngredientsMap = new Map();

  // 轉換成存放到table的食材數據格式+記錄新增食材選項
  const optionToId = (item) => {
    const { ingredient } = item;
    const name = ingredient?.label?.trim();

    // 新的食材選項
    if (ingredient?.__isNew__ && name) {
      // 避免大小寫差異問題
      const key = name.toLowerCase();
      // 檢查新增選項中是否已經紀錄
      let existing = newIngredientsMap.get(key);

      if (!existing) {
        // 以第一個新增的name作為儲存值
        existing = {
          uuid: crypto.randomUUID(),
          name,
        };
        newIngredientsMap.set(key, existing);
      }

      return {
        ...item,
        ingredient: existing.uuid,
      };
    }

    return {
      ...item,
      ingredient: ingredient?.value || null,
    };
  };

  const newIngredientsList = ingredients.map(optionToId);

  const sortedCustomizations = [...customizations]
    .map((c) => ({
      ...c,
      options: c.options.map(optionToId),
    }))
    .sort((a, b) => (a.required === b.required ? 0 : a.required ? -1 : 1));

  return {
    menuData: {
      ...data,
      ingredients: newIngredientsList,
      customizations: sortedCustomizations,
    },
    newIngredients: [...newIngredientsMap.values()],
  };
}
