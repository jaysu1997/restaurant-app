// 把 table 數據轉換成表單格式
export function toMenuForm(menu, inventoryObj) {
  // 新增餐點
  if (!menu) {
    return {
      name: "",
      category: "",
      basePrice: "",
      discount: "",
      image: null,
      selectedImage: null,
      ingredients: [{ ingredient: "", quantity: "" }],
      customizations: [],
    };
  }

  const { ingredients, customizations } = menu;

  const idToOption = (item) => {
    const uuid = item.ingredient;

    // 無額外消耗食材
    if (uuid === null) {
      return {
        ...item,
        ingredient: { label: "無", value: "" },
      };
    }

    const inventoryItem = inventoryObj[uuid];

    return {
      ...item,
      ingredient: inventoryItem
        ? {
            label: inventoryItem.name,
            value: uuid,
          }
        : "",
    };
  };

  return {
    ...menu,
    category: {
      label: menu.category,
      value: menu.category,
    },
    selectedImage: menu.image,
    ingredients: ingredients.map(idToOption),
    customizations: customizations.map((customization) => ({
      ...customization,
      options: customization.options.map(idToOption),
    })),
  };
}

/* -------------------------------------------------------------------------- */
/*                                  Payload                                   */
/* -------------------------------------------------------------------------- */

function transformIngredients(ingredients, customizations) {
  const newIngredientsMap = new Map();

  const optionToId = (item) => {
    const ingredient = item.ingredient;
    const name = ingredient?.label?.trim();

    // 新增食材
    if (ingredient?.__isNew__ && name) {
      const key = name.toLowerCase();

      let existing = newIngredientsMap.get(key);

      if (!existing) {
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

  return {
    ingredients: ingredients.map(optionToId),
    customizations: [...customizations]
      .map((customization) => ({
        ...customization,
        options: customization.options.map(optionToId),
      }))
      .sort((a, b) => (a.required === b.required ? 0 : a.required ? -1 : 1)),
    newIngredients: [...newIngredientsMap.values()],
  };
}

function transformImageData(originalImage, selectedImage) {
  const imageChanged = originalImage !== selectedImage;
  const hasNewImage = selectedImage instanceof Blob;
  const newPath = hasNewImage ? `${crypto.randomUUID()}.webp` : selectedImage;

  return {
    file: hasNewImage ? selectedImage : null,
    newPath,
    oldPath: imageChanged ? originalImage : null,
  };
}

/* -------------------------------------------------------------------------- */
/*                               Payload Builder                              */
/* -------------------------------------------------------------------------- */

export function toMenuPayload(data) {
  const {
    id,
    name,
    category,
    basePrice,
    discount,
    image,
    selectedImage,
    ingredients,
    customizations,
  } = data;

  const ingredientData = transformIngredients(ingredients, customizations);

  const imageData = transformImageData(image, selectedImage);

  return {
    menuData: {
      id,
      name,
      category: category?.value,
      basePrice,
      discount,
      image: imageData.newPath,
      ingredients: ingredientData.ingredients,
      customizations: ingredientData.customizations,
    },
    newIngredients: ingredientData.newIngredients,
    imageData,
  };
}
