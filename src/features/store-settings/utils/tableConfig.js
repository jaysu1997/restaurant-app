// 這個可能移出去
export function generateDineInTableOptions(settingsData) {
  const dineInTableConfig = settingsData?.dineInTableConfig;

  if (!dineInTableConfig || dineInTableConfig.length === 0) return [];

  return dineInTableConfig.flatMap(({ zoneName, tableCount }) =>
    Array.from({ length: tableCount }, (_, i) => {
      const table = `${zoneName} - ${i + 1}`;
      return { label: table, value: table };
    }),
  );
}
