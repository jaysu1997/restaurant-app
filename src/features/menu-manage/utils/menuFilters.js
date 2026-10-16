export function filterMenuData(menusData, filterState) {
  let displayData = menusData;

  const nameSearchValue = filterState.name.value;
  const categorySearchValue = filterState.category.value;

  if (nameSearchValue) {
    displayData = displayData.filter((menu) =>
      menu.name.includes(nameSearchValue),
    );
  }

  if (categorySearchValue) {
    displayData = displayData.filter(
      (menu) => menu.category === categorySearchValue,
    );
  }

  return displayData;
}
