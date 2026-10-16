export function generateTableNumbers(zoneName, tableCount) {
  if (!tableCount) return [];

  const prefix = zoneName.trim();

  return Array.from(
    { length: tableCount },
    (_, index) => `${prefix ? `${prefix} - ` : ""}${index + 1}`,
  );
}

export function generateDineInTableOptions(settingsData) {
  const dineInTableConfig = settingsData?.dineInTableConfig ?? [];

  return dineInTableConfig
    .flatMap(({ zoneName, tableCount }) =>
      generateTableNumbers(zoneName, tableCount),
    )
    .map((table) => ({ label: table, value: table }));
}
