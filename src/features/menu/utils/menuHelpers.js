// 檢查searchParams值是否存在(合法)
export function getSelectedCategory(param, categories, fallback = "all") {
  const isValidCategory = param && categories.includes(param);
  return isValidCategory ? param : fallback;
}
