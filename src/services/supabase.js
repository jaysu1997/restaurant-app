import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://yaoivzqoyuqdmvxnxvwm.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlhb2l2enFveXVxZG12eG54dndtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjk1ODUxNTIsImV4cCI6MjA0NTE2MTE1Mn0.ezRC9mxrkcu8064qLHYVFx8a2bXbofsJoOlABZy-zaM";
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
