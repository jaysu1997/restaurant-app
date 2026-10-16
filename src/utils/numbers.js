export function parsePositiveInt(
  value,
  { min = 0, max = Infinity, fallback = null } = {},
) {
  const trimmed = String(value).trim();

  if (trimmed === "") return fallback;

  const number = Number(trimmed);

  if (!Number.isFinite(number) || !Number.isInteger(number)) return fallback;
  if (number < min || number > max) return fallback;

  return number;
}
