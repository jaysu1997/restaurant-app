export function isValidEmail(email) {
  const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  return isValid || "信箱格式錯誤";
}
