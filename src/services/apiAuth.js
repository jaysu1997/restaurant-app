import supabase from "./supabase";

export async function signup() {
  const { data, error } = await supabase.auth.signUp({
    email: "example@email.com",
    password: "example-password",
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
