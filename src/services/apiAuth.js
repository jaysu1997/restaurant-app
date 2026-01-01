import supabase from "./supabase";
import { handleSupabaseError } from "../utils/handleSupabaseError";

// 登入
export async function signInApi({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  handleSupabaseError(error);

  return data;
}

// 登出
export async function signOutApi() {
  const { error } = await supabase.auth.signOut();

  handleSupabaseError(error);
}

// 查看當前是否有以驗證帳戶登入
export async function getCurrentUserApi() {
  // 先檢查本地是否有帳號登入
  const { data: session, error: sessionError } =
    await supabase.auth.getSession();

  handleSupabaseError(sessionError);

  // 不存在的話回傳null
  if (!session.session) return null;

  // 如果本機存在Session的話，則可以使用getUser功能獲取用戶數據(可用來驗證用戶是否獲得授權)
  const { data: user, error: userError } = await supabase.auth.getUser();

  handleSupabaseError(userError);

  // 回傳用戶數據(其實用戶的數據在session中就可以取得，多使用getUser是為了多一層保險並取得用戶的最新數據)
  return user.user;
}

// 更新用戶的頭像
export async function upsertAvatarFileApi(updateAvatarPayload) {
  const { oldFileName, newFileName, newFile } = updateAvatarPayload;

  const { data, error } = await supabase.storage
    .from("avatar")
    .upload(newFileName, newFile);

  handleSupabaseError(error);

  const { error: userMetaDataError } = await supabase.auth.updateUser({
    data: { avatarFile: newFileName },
  });

  handleSupabaseError(userMetaDataError);

  const { error: removeOlderAvatar } = await supabase.storage
    .from("avatar")
    .remove([oldFileName]);

  handleSupabaseError(removeOlderAvatar);

  return data;
}

// 更新用戶的數據
export async function updateUserProfileApi(userProFileData) {
  const { data, error } = await supabase.auth.updateUser({
    data: userProFileData,
  });

  handleSupabaseError(error);

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

  handleSupabaseError(signInError);

  // 確認帳號密碼都正確之後才能正式更改為新密碼
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  handleSupabaseError(error);

  return data;
}
