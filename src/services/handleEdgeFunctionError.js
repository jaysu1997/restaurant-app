import {
  FunctionsHttpError,
  FunctionsRelayError,
  FunctionsFetchError,
} from "@supabase/supabase-js";

// 專門處理edge function所產生的error
export default async function handleEdgeFunctionError(error) {
  if (!error) return;

  // Edge Function 有執行，但是執行過程中有錯誤發生
  if (error instanceof FunctionsHttpError) {
    const body = await error.context.json();
    throw new Error(body?.message ?? "請求失敗");
  }

  // 因網路連線問題所造成的異常(沒有連上supabase)
  if (error instanceof FunctionsFetchError) {
    throw new Error("網路連線異常，請檢查網路狀態");
  }

  // supabase本身系統異常所造成的error
  if (error instanceof FunctionsRelayError) {
    throw new Error("系統暫時異常，請稍後再試");
  }

  // 其他未知錯誤
  throw error;
}
