// 處理supabase api錯誤
function handleSupabaseError(error, fallback = "") {
  if (!error) return;

  if (error) {
    console.error(error);
    console.log("error.code:", error.code);
    console.log("error.name:", error.name);
    console.log("error.status:", error.status);

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

    // 通常表單名稱輸入錯誤會出現的錯誤
    if (error.code === "42P01") {
      errorFallback.message = "找不到相關資料表，請聯絡開發人員處理。";
    }

    // 網路連線有問題
    if (error.name === "AuthRetryableFetchError") {
      errorFallback.message =
        "網路連線異常，請檢查網路連線狀態，或稍後重新嘗試。";
      console.log("網路連線異常，請檢查網路連線狀態，或稍後重新嘗試。");
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

    // 註冊的密碼無法滿足要求規範(長度和種類都要符合)
    if (
      error.name === "AuthWeakPasswordError" ||
      error.code === "weak_password"
    ) {
      errorFallback.message = "密碼不符合安全規範";
      console.log("密碼不符合安全規範");
    }

    // 授權驗證相關的錯誤
    if (error.name === "AuthApiError") {
      // 註冊的email格式不正確
      if (error.code === "validation_failed") {
        errorFallback.message = "Email 格式不正確";
        console.log("Email 格式不正確");
      }

      // 重複註冊一個已經註冊並且是經過信箱驗證的email
      if (error.code === "user_already_exists") {
        errorFallback.message = "此 Email 已註冊";
        console.log("此 Email 已註冊");
      }

      // 短時間內發送太多驗證信件到相同email信箱中
      if (error.code === "over_email_send_rate_limit") {
        const match = error.message.match(/after (\d+) seconds/);
        const waitSec = match ? parseInt(match[1], 10) : null;
        errorFallback.message = waitSec
          ? `請稍候 ${waitSec} 秒後再試。`
          : `請稍候一段時間再試。`;

        console.log(
          waitSec ? `請稍候 ${waitSec} 秒後再試。` : `請稍候一段時間再試。`
        );
      }

      // email還沒完成驗證就登入
      if (error.code === "email_not_confirmed") {
        errorFallback.message = "Email 驗證未完成，請至信箱確認。";
        console.log("Email 驗證未完成，請至信箱確認。");
      }

      if (error.code === "invalid_credentials") {
        errorFallback.message = "登入失敗，請檢查信箱和密碼是否正確。";
        console.log("登入失敗，請檢查信箱和密碼是否正確。");
      }
    }

    throw errorFallback;
  }
}

export { handleSupabaseError };
