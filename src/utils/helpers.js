// 這個應該是整理過後的helpers

export function parsePositiveInt(
  value,
  { min = 0, max = Infinity, fallback = null }
) {
  const trimmed = String(value).trim();

  if (trimmed === "") {
    return fallback;
  }

  const n = Number(trimmed);

  if (!Number.isFinite(n) || !Number.isInteger(n)) {
    return fallback;
  }

  if (n < min || n > max) {
    return fallback;
  }

  return n;
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
