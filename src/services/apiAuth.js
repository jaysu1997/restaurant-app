import { handleSupabaseError } from "../utils/handleSupabaseError";
import supabase from "./supabase";

export async function signUp({ email, password }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  handleSupabaseError(error);

  return data;
}

export async function signIn({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  handleSupabaseError(error);

  return data;
}
