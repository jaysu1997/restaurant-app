export function ensureOptionExists(options, option = null) {
  if (!option) return options;

  const exists = options.some((current) => current.value === option.value);

  return exists ? options : [option, ...options];
}
