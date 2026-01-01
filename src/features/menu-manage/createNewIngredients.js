// 整合所有使用到的新食材(要順便新增到inventory中)
function createNewIngredients(data, newIngredientRef) {
  const newIngrendientsMap = new Map();

  data.ingredients?.forEach((i) => {
    const ing = i.ingredient;
    if (newIngredientRef.has(ing.label)) {
      newIngrendientsMap.set(ing.label, ing);
    }
  });

  data.customize?.forEach((c) => {
    c.options?.forEach((o) => {
      const ing = o.ingredient;
      if (newIngredientRef.has(ing.label)) {
        newIngrendientsMap.set(ing.label, ing);
      }
    });
  });

  return [...newIngrendientsMap.values()];
}

export { createNewIngredients };
