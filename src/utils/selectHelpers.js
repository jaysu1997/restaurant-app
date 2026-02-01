// 這可能直接刪除，用處不大
export const toOption = (value, label = value) =>
  value != null ? { label, value } : null;
