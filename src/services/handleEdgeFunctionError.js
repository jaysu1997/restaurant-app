import {
  FunctionsHttpError,
  FunctionsRelayError,
  FunctionsFetchError,
} from "@supabase/supabase-js";

// 專門處理edge function所產生的error
export default async function handleEdgeFunctionError(error) {
  if (!error) return;

  console.error(error);

  let errorFallback = {
    message: error.message,
    actionLabel: undefined,
    action: undefined,
  };

  // Edge Function 有執行，但是執行過程中有錯誤發生
  if (error instanceof FunctionsHttpError) {
    const body = await error.context.json();
    errorFallback.message = body?.message ?? "請求失敗";
  }

  // edge function 調用失敗(沒有連上supabase、或找不到對應function都算)
  if (error instanceof FunctionsFetchError) {
    errorFallback.message = "服務暫時無法使用，請稍後再試";
  }

  // supabase本身系統異常所造成的error
  if (error instanceof FunctionsRelayError) {
    errorFallback.message = "系統暫時異常，請稍後再試";
  }

  // 其他未知錯誤
  throw errorFallback;
}
