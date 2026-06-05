export default function handleSupabaseApiError(error, fallback = {}) {
  if (!error) return;

  console.error(error);

  let message = fallback[error?.code] || fallback?.default || error.message;

  const isNetworkError =
    error.name === "FunctionsFetchError" ||
    error.name === "AuthRetryableFetchError" ||
    error.message?.toLowerCase().includes("failed to fetch") ||
    error.message?.toLowerCase().includes("fetch failed");

  if (isNetworkError) {
    message = "網路連線異常，請檢查網路連線狀態，或稍後重新嘗試。";
  }

  if (error.code === "42P01") {
    message = "找不到相關資料表，請聯絡開發人員處理。";
  }

  if (error.code === "22P02") {
    message = "資料讀取失敗，請稍後再試。";
  }

  error.message = message;

  throw error;
}
