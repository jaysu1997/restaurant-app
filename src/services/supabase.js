import { createClient } from "@supabase/supabase-js";
const supabaseURL = "https://yaoivzqoyuqdmvxnxvwm.supabase.co";
const supabaseKey = "sb_publishable_qI0FwzK7BF1jSwYvNmOREw_d3ux85PG";
const supabase = createClient(supabaseURL, supabaseKey);

export function getStoragePublicUrl(bucket, filePath) {
  if (!filePath) return null;

  const { data } = supabase.storage.from(bucket).getPublicUrl(filePath);
  return data.publicUrl;
}

export default supabase;
