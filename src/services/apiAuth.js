import supabase from "./supabase";
import handleSupabaseApiError from "./handleSupabaseApiError";

// 登入
export async function signInApi({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  handleSupabaseApiError(error, {
    default: "登入失敗，請檢查信箱和密碼是否正確。",
  });

  return data;
}

// 登出
export async function signOutApi() {
  const { error } = await supabase.auth.signOut();

  handleSupabaseApiError(error);
}

// 查看當前是否有已驗證帳戶登入
export async function getCurrentUserApi() {
  // 先檢查本地是否有帳號登入
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();

  handleSupabaseApiError(sessionError);

  // 不存在的話回傳null
  if (!session.session) return null;

  // 如果本機存在Session的話，則可以使用getUser功能獲取用戶數據(可用來驗證用戶是否獲得授權)
  const { data: user, error: userError } = await supabase.auth.getUser();

  handleSupabaseApiError(userError);

  // 回傳用戶數據(其實用戶的數據在session中就可以取得，多使用getUser是為了多一層保險並取得用戶的最新數據)
  return user.user;
}

// 更新用戶的頭像
export async function upsertAvatarFileApi(updateAvatarPayload) {
  const { oldFileName, newFileName, newFile } = updateAvatarPayload;

  const { data, error } = await supabase.storage
    .from("avatar")
    .upload(newFileName, newFile);

  handleSupabaseApiError(error);

  const { error: userMetaDataError } = await supabase.auth.updateUser({
    data: { avatarFile: newFileName },
  });

  handleSupabaseApiError(userMetaDataError);

  const { error: removeOlderAvatar } = await supabase.storage
    .from("avatar")
    .remove([oldFileName]);

  // 舊頭像刪除失敗不影響更新功能，所以不做throw error，只需要簡單通知
  if (removeOlderAvatar) {
    console.log("舊頭像刪除失敗");
    console.warn(removeOlderAvatar);
  }

  return data;
}

// 更新用戶的數據
export async function updateUserProfileApi(userProFileData) {
  const { data, error } = await supabase.auth.updateUser({
    data: userProFileData,
  });

  handleSupabaseApiError(error);

  return data;
}

// 更新用戶密碼
export async function updateUserPasswordApi(userCredentials) {
  const { email, currentPassword, newPassword } = userCredentials;

  // 先驗證輸入的當前密碼是否正確，避免被他人惡意串改密碼
  const { error: signInError } = await supabase.auth.signInWithPassword({
    email,
    password: currentPassword,
  });

  handleSupabaseApiError(signInError, {
    invalid_credentials: "舊密碼錯誤，請重新嘗試。",
  });

  // 確認帳號密碼都正確之後才能正式更改為新密碼
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  handleSupabaseApiError(error, { weak_password: "密碼長度至少要8碼" });

  return data;
}
