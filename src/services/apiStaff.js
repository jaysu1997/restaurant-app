import supabase from "./supabase";
import { handleSupabaseError } from "../utils/handleSupabaseError";

// 註冊新帳號
export async function createStaffApi(userData) {
  const { data, error } = await supabase.functions.invoke("create-staff", {
    body: userData,
  });

  handleSupabaseError(error);

  return data;
}

// 取得所有user數據
export async function getStaffApi() {
  const { data, error } = await supabase.functions.invoke("get-staff");

  handleSupabaseError(error);

  return data;
}

// 更新指定user的role
export async function updateStaffApi(userData) {
  const { userId, role } = userData;
  // 錯誤測試
  const { data, error } = await supabase.functions.invoke("update-staff", {
    body: {
      userId,
      role,
    },
  });

  handleSupabaseError(error);

  return data;
}

// 刪除指定user
export async function deleteStaffApi() {
  const { data, error } = await supabase.functions.invoke("delete-staff");

  handleSupabaseError(error);

  return data;
}
