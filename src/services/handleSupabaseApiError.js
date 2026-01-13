// 處理supabase api錯誤
export default function handleSupabaseApiError(error, fallback = "") {
  // 可能在沒有網路連線的部分要再做處理，因為好像如果沒有接收到supabase回傳response，那麼api內的error也會是undefined
  if (!error) return;

  if (error) {
    console.error(error);
    console.log("error.code:", error.code);
    console.log("error.name:", error.name);
    console.log("error.status:", error.status);
    console.log("error.message", error.message);

    // error發生之後要回傳的訊息和按鈕設定
    let errorFallback = {
      ...error,
      message: fallback.for === "default" ? fallback.message : error.message,
      actionLabel: "重新嘗試",
      action: () => window.location.reload(),
    };

    // 可以根據輸入的指定error，提供指定message
    if (error.code === fallback.for) {
      errorFallback.message = fallback.message;
    }

    // 連線異常
    const isNetworkError =
      error.name === "FunctionsFetchError" ||
      error.message.includes("Failed to fetch");

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
      // errorFallback.message = "找不到指定的分頁，建議從第一頁開始查看。";
      errorFallback.actionLabel = "跳至第一頁";
      errorFallback.action = () => {
        const url = new URL(window.location.href);
        url.searchParams.set("page", 1);
        window.location.assign(url);
      };
    }

    // 授權驗證相關的錯誤
    if (error.name === "AuthApiError") {
      // 重複註冊一個已經註冊並且是經過信箱驗證的email

      // 登入失敗fallback
      if (error.code === "invalid_credentials") {
        errorFallback.message = "登入失敗，請檢查信箱和密碼是否正確。";
        console.log("登入失敗，請檢查信箱和密碼是否正確。");
      }
    }

    throw errorFallback;
  }
}
