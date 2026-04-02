// 取得所有餐點分類
export function getCategories(menus = []) {
  return Array.from(new Set(menus.map((m) => m.category)));
}

// 檢查searchParams值是否存在(合法)
export function getSelectedCategory(param, categories, fallback = "all") {
  const isValidCategory = param && categories.includes(param);
  return isValidCategory ? param : fallback;
}
