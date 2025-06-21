import { handleSupabaseError } from "../utils/handleSupabaseError";
import supabase from "./supabase";

export async function getSettingsApi() {
  const { data, error } = await supabase.from("settings").select("*").single();

  handleSupabaseError(error);

  return data;
}
