// 處理supabase api錯誤
function handleSupabaseError(error, fallbackMessage = "") {
  if (!error) return;

  if (error) {
    console.error(error);

    let errorFallback = fallbackMessage || error.message;

    if (error.message?.includes("Failed to fetch")) {
      errorFallback = "網路連線異常";
    }

    // 該筆數據在數據庫中已經存在
    if (error.code === "23505") {
      errorFallback = fallbackMessage;
    }

    throw new Error(errorFallback);
  }
}

export { handleSupabaseError };
