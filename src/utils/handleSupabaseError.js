// 處理supabase api錯誤
function handleSupabaseError(error, fallback = "") {
  if (!error) return;

  if (error) {
    console.error(error);

    let errorFallback = {
      ...error,
      message: fallback.for === "default" ? fallback.message : error.message,
      actionLabel: "重新嘗試",
      action: () => window.location.reload(),
    };

    // 指定error，提供指定message
    if (error.code === fallback.for) {
      errorFallback.message = fallback.message;
    }

    if (error.code === "42P01") {
      errorFallback.message = "找不到相關資料表，請聯絡開發人員處理。";
    }

    if (error.message?.includes("Failed to fetch")) {
      errorFallback.message =
        "網路連線異常，請檢查網路連線狀態，或稍後重新嘗試。";
    }

    // 當取得的數據無法滿足.range的指定範圍需求時，就會跳出此error。不論是完全沒有數據符合條件，或是符合條件的數據不到25筆(自訂的每個分頁最大展示數據筆數)都會跳出這個錯誤，而且第一時間回傳的error、data、count都完全相同，無法區分。
    if (error.code === "PGRST103") {
      // errorFallback.message = "找不到指定的分頁，建議從第一頁開始查看。";
      errorFallback.actionLabel = "跳至第一頁";
      errorFallback.action = () => {
        const url = new URL(window.location.href);
        url.searchParams.set("page", 1);
        window.location.assign(url);
      };
    }

    throw errorFallback;
  }
}

export { handleSupabaseError };
