import { handleSupabaseError } from "../utils/handleSupabaseError";
import supabase from "./supabase";

export async function getSettingsApi() {
  const { data, error } = await supabase
    .from("settings")
    .select("*")
    .eq("id", 1)
    .single();

  handleSupabaseError(error);

  return data;
}

export async function upsertSettingApi(settingData) {
  const { data, error } = await supabase
    .from("settings")
    .upsert({ id: 1, ...settingData })
    .select()
    .single();

  handleSupabaseError(error);

  return data;
}
