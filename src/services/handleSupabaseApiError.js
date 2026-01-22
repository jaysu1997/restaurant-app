// 處理supabase api錯誤
export default function handleSupabaseApiError(error, fallback = {}) {
  // 可能在沒有網路連線的部分要再做處理，因為好像如果沒有接收到supabase回傳response，那麼api內的error也會是undefined
  if (!error) return;

  if (error) {
    console.error(error);

    // error發生之後要回傳的訊息和按鈕設定
    let errorFallback = {
      message: fallback[error?.code] || fallback?.default || error.message,
      actionLabel: undefined,
      action: undefined,
    };

    // 連線異常
    const isNetworkError =
      error.name === "FunctionsFetchError" ||
      error?.name === "AuthRetryableFetchError" ||
      error.message?.toLowerCase().includes("failed to fetch") ||
      error?.message?.toLowerCase().includes("fetch failed");

    // 網路連線有問題
    if (isNetworkError) {
      errorFallback.message =
        "網路連線異常，請檢查網路連線狀態，或稍後重新嘗試。";
      console.log("網路連線異常，請檢查網路連線狀態，或稍後重新嘗試。");
    }

    // 通常表單名稱輸入錯誤會出現的錯誤
    if (error.code === "42P01") {
      errorFallback.message = "找不到相關資料表，請聯絡開發人員處理。";
    }

    // 指定分頁的數據range超過數據總筆數
    if (error.code === "PGRST103") {
      errorFallback.message = "找不到指定的分頁，建議從第一頁開始查看。";
      errorFallback.actionLabel = "跳至第一頁";
      errorFallback.action = () => {
        const url = new URL(window.location.href);
        url.searchParams.set("page", 1);
        window.location.replace(url.toString());
      };
    }

    // 輸入數據型別錯誤的error
    if (error.code === "22P02") {
      errorFallback.message = "資料讀取失敗，請稍後再試。";
    }

    throw errorFallback;
  }
}
