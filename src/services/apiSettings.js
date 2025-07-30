import { handleSupabaseError } from "../utils/handleSupabaseError";
import supabase from "./supabase";

// 取得所有店鋪設定
export async function getSettingsApi() {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("id", 1)
    .single();

  handleSupabaseError(error);

  return data;
}

// 更新or新增店鋪設定
export async function upsertSettingsApi(settingData) {
  const { data, error } = await supabase
    .from("settings")
    .upsert({ id: 1, ...settingData })
    .select()
    .single();

  handleSupabaseError(error);

  return data;
}
