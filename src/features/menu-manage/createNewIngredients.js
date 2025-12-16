// 整合所有使用到的新食材(要順便新增到inventory中)
function createNewIngredients({ newIngredientsMap, getValues }) {
  const newIngredientSet = new Set();
  const newIngredientsArr = [];

  // 之所以使用Map存放數據，是為了檢察這個新食材是否真的有使用，而不是在新增食材食輸入錯誤但被記錄儲存的
  newIngredientsMap.forEach((newIngredientsName, fieldName) => {
    const fieldValue = getValues(fieldName).value;

    if (
      fieldValue === newIngredientsName &&
      !newIngredientSet.has(newIngredientsName)
    ) {
      newIngredientSet.add(newIngredientsName);
      newIngredientsArr.push({
        label: newIngredientsName,
        value: newIngredientsName,
      });
    }
  });

  return newIngredientsArr;
}

export { createNewIngredients };
