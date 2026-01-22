import handleSupabaseApiError from "./handleSupabaseApiError";
import supabase from "./supabase";

// 取得所有店鋪設定
export async function getSettingsApi() {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("id", 1)
    .single();

  handleSupabaseApiError(error);

  return data;
}

// 更新or新增店鋪設定
export async function upsertSettingsApi(settingData) {
  const { data, error } = await supabase
    .from("settings")
    .upsert({ id: 1, ...settingData })
    .select()
    .single();

  handleSupabaseApiError(error);

  return data;
}
