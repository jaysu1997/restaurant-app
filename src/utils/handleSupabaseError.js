// 處理supabase api錯誤
function handleSupabaseError(error, fallbackMessage = "") {
  if (error) {
    console.error(error);
    throw new Error(
      error.message?.includes("Failed to fetch")
        ? "網路連線異常"
        : fallbackMessage || error.message
    );
  }
}

export { handleSupabaseError };
