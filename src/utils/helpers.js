// 這個應該是整理過後的helpers

// 驗證輸入值為正整數(最小可以是0或是1)
export function ensurePositiveInt(
  value,
  fallback = "請輸入 0 以上的整數",
  min = 0
) {
  const trimmed = String(value).trim();

  if (/^[0-9]+$/.test(trimmed) && Number(trimmed) >= min) {
    return Number(trimmed);
  }

  return fallback;
}

// 驗證輸入值為市話或電話號碼
export function validatePhoneNumber(value) {
  const trimmed = value.trim();

  const isMobile = /^09\d{8}$/.test(trimmed);
  const isLandline = /^0[2-8]\d{7,8}$/.test(trimmed);

  if (!isMobile && !isLandline) {
    return "請輸入正確的市話或手機號碼(純數字)";
  }

  return true;
}
