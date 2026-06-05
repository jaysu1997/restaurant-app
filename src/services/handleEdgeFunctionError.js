import {
  FunctionsHttpError,
  FunctionsRelayError,
  FunctionsFetchError,
} from "@supabase/supabase-js";

// 專門處理edge function所產生的error
export default async function handleEdgeFunctionError(error) {
  if (!error) return;

  console.error(error);

  // Edge Function 有執行，但是執行過程中有錯誤發生
  if (error instanceof FunctionsHttpError) {
    const body = await error.context.json();
    error.message = body?.message ?? "請求失敗";
  }

  // edge function 調用失敗(沒有連上supabase、或找不到對應function都算)
  if (error instanceof FunctionsFetchError) {
    error.message = "服務暫時無法使用，請稍後再試";
  }

  // supabase本身系統異常所造成的error
  if (error instanceof FunctionsRelayError) {
    error.message = "系統暫時異常，請稍後再試";
  }

  // 其他未知錯誤
  throw error;
}
