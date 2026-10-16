export function formatOrderItems(items) {
  return items.map((item) => `${item.name} x${item.servings}`).join("、");
}
