export function validatePhoneNumber(value) {
  const isMobile = /^09\d{8}$/.test(value);
  const isLandline = /^0[2-8]\d{7,8}$/.test(value);

  if (!isMobile && !isLandline) {
    return "請輸入正確的市話或手機號碼(純數字)";
  }

  return true;
}

export function isValidEmail(email) {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return isValid || "信箱格式錯誤";
}
