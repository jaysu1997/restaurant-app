export function filterInventoryData(inventoryData, filterState) {
  let displayData = inventoryData;

  const nameSearchValue = filterState.name.value;
  const quantitySearchValue = filterState.quantity.value;

  if (nameSearchValue) {
    displayData = inventoryData.filter((inventory) =>
      inventory.name.includes(nameSearchValue),
    );
  }

  if (quantitySearchValue) {
    displayData = displayData.filter(
      (inventory) => inventory.remainingQuantity <= Number(quantitySearchValue),
    );
  }

  return displayData;
}
