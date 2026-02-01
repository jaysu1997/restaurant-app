// 將新食材記錄下來，同時轉換數據格式
function normalize(obj, newIngrendientsMap) {
  const { ingredient } = obj;
  if (ingredient.__isNew__) {
    const name = ingredient.label;
    const record = newIngrendientsMap.get(name);
    const uuid = record?.uuid || crypto.randomUUID();

    obj.ingredient = { uuid, label: name, value: name };

    if (!record) {
      newIngrendientsMap.set(name, { uuid, label: name, value: name });
    }
  }
}

function normalizeNewIngredients(data) {
  const { ingredients, customize } = data;
  const newIngrendientsMap = new Map();

  // 備料
  for (const ingredient of ingredients) {
    normalize(ingredient, newIngrendientsMap);
  }

  // 自訂項目選項
  for (const { options } of customize) {
    for (let option of options) {
      normalize(option, newIngrendientsMap);
    }
  }

  return [...newIngrendientsMap.values()];
}

// 重新整理要上傳的數據
function prepareMenuSubmitData(data) {
  let menuData = { ...data };
  // 新增食材
  const newIngredients = normalizeNewIngredients(menuData);

  // 排序餐點自訂項目(以便點餐時，必填項目的ui在前面)
  menuData.customize.sort((a, b) => {
    if (a.isRequired === b.isRequired) return 0;
    return a.isRequired === "required" ? -1 : 1;
  });

  return { menuData, newIngredients };
}

export default prepareMenuSubmitData;
