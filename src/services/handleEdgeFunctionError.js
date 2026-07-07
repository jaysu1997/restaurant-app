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

    throw Object.assign(new Error(body?.message ?? "請求失敗"), {
      status: error.context.status,
      code: body?.code ?? "UNKNOWN_ERROR",
    });
  }

  // edge function 調用失敗(沒有連上supabase、或找不到對應function都算)
  if (error instanceof FunctionsFetchError) {
    throw Object.assign(new Error("服務暫時無法使用，請稍後再試"), {
      status: 503,
      code: "FUNCTION_FETCH_ERROR",
    });
  }

  // supabase本身系統異常所造成的error
  if (error instanceof FunctionsRelayError) {
    throw Object.assign(new Error("系統暫時異常，請稍後再試"), {
      status: 500,
      code: "FUNCTION_RELAY_ERROR",
    });
  }

  // 其他未知錯誤
  throw Object.assign(new Error(error?.message ?? "未知錯誤"), {
    status: 500,
    code: "UNKNOWN_ERROR",
  });
}
