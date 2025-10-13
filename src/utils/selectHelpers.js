export const toOption = (value, label = value) =>
  value != null ? { label, value } : null;
