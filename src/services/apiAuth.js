import supabase from "./supabase";
import handleSupabaseApiError from "./handleSupabaseApiError";

// 登入
export async function loginApi({ email, password }) {
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
export async function logoutApi() {
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

// export async function getCurrentUserApi() {
//   const requestId = crypto.randomUUID();
//   const startTime = performance.now();

//   const logPrefix = `[getCurrentUserApi][${requestId}]`;

//   console.group(`========== ${logPrefix} START ==========`);

//   try {
//     // =========================================================
//     // ① 基本資訊
//     // =========================================================

//     console.log(`${logPrefix} [INIT] 開始執行`);

//     console.log(`${logPrefix} [INIT] current time:`, new Date().toISOString());

//     console.log(`${logPrefix} [INIT] performance time:`, startTime);

//     // =========================================================
//     // ② getSession()
//     // =========================================================

//     console.log(`${logPrefix} [1] 開始執行 getSession()`);

//     const sessionStart = performance.now();

//     let sessionData;
//     let sessionError;

//     try {
//       const result = await supabase.auth.getSession();

//       sessionData = result.data;
//       sessionError = result.error;
//     } catch (error) {
//       console.error(
//         `${logPrefix} [1-EXCEPTION] getSession() 發生 exception:`,
//         error,
//       );

//       console.error(`${logPrefix} [1-EXCEPTION] name:`, error?.name);
//       console.error(`${logPrefix} [1-EXCEPTION] message:`, error?.message);
//       console.error(`${logPrefix} [1-EXCEPTION] stack:`, error?.stack);

//       console.groupEnd();

//       throw error;
//     }

//     const sessionDuration = performance.now() - sessionStart;

//     console.log(
//       `${logPrefix} [2] getSession() 完成`,
//       `耗時 ${sessionDuration.toFixed(2)} ms`,
//     );

//     // =========================================================
//     // ③ getSession() Error
//     // =========================================================

//     console.log(`${logPrefix} [2] sessionError:`, sessionError);

//     if (sessionError) {
//       console.error(`${logPrefix} ❌ getSession() ERROR`);

//       console.error(`${logPrefix} error.name:`, sessionError?.name);
//       console.error(`${logPrefix} error.message:`, sessionError?.message);
//       console.error(`${logPrefix} error.status:`, sessionError?.status);
//       console.error(`${logPrefix} error.code:`, sessionError?.code);
//       console.error(`${logPrefix} error.stack:`, sessionError?.stack);

//       console.error(`${logPrefix} error完整物件:`, sessionError);

//       handleSupabaseApiError(sessionError);
//     }

//     // =========================================================
//     // ④ Session 基本狀態
//     // =========================================================

//     const session = sessionData?.session;

//     console.log(`${logPrefix} [2] sessionData:`, sessionData);

//     console.log(`${logPrefix} [2] hasSession:`, !!session);

//     console.log(
//       `${logPrefix} [2] session object:`,
//       session
//         ? {
//             hasAccessToken: !!session.access_token,
//             hasRefreshToken: !!session.refresh_token,
//             tokenType: session.token_type,
//             expiresAt: session.expires_at,
//             expiresAtDate: session.expires_at
//               ? new Date(session.expires_at * 1000).toISOString()
//               : null,
//           }
//         : null,
//     );

//     // =========================================================
//     // ⑤ Access Token 過期狀態
//     // =========================================================

//     if (session) {
//       const now = Math.floor(Date.now() / 1000);

//       const expiresAt = session.expires_at;

//       const secondsUntilExpiry = expiresAt ? expiresAt - now : null;

//       console.log(`${logPrefix} [SESSION] now:`, now);

//       console.log(`${logPrefix} [SESSION] expires_at:`, expiresAt);

//       console.log(
//         `${logPrefix} [SESSION] expires_at date:`,
//         expiresAt ? new Date(expiresAt * 1000).toISOString() : null,
//       );

//       console.log(
//         `${logPrefix} [SESSION] secondsUntilExpiry:`,
//         secondsUntilExpiry,
//       );

//       console.log(
//         `${logPrefix} [SESSION] minutesUntilExpiry:`,
//         secondsUntilExpiry !== null
//           ? (secondsUntilExpiry / 60).toFixed(2)
//           : null,
//       );

//       console.log(
//         `${logPrefix} [SESSION] accessTokenExpired:`,
//         expiresAt ? expiresAt <= now : "unknown",
//       );

//       console.log(
//         `${logPrefix} [SESSION] accessTokenExpiringSoon(<5min):`,
//         expiresAt ? expiresAt - now <= 300 : "unknown",
//       );
//     }

//     // =========================================================
//     // ⑥ 沒有 Session
//     // =========================================================

//     if (!session) {
//       console.warn(`${logPrefix} ⚠️ NO SESSION`);

//       console.warn(`${logPrefix} getSession() 沒有取得有效 session`);

//       console.warn(`${logPrefix} sessionData:`, sessionData);

//       console.warn(`${logPrefix} sessionError:`, sessionError);

//       console.warn(`${logPrefix} 這次不會執行 getUser()`);

//       console.groupEnd();

//       return null;
//     }

//     // =========================================================
//     // ⑦ Session 存在 → getUser()
//     // =========================================================

//     console.log(`${logPrefix} [3] getSession 成功`);

//     console.log(`${logPrefix} [3] 準備執行 getUser()`);

//     console.log(`${logPrefix} [3] session identity:`, {
//       hasAccessToken: !!session.access_token,
//       hasRefreshToken: !!session.refresh_token,
//       expiresAt: session.expires_at,
//     });

//     // =========================================================
//     // ⑧ getUser()
//     // =========================================================

//     const userStart = performance.now();

//     let userData;
//     let userError;

//     try {
//       const result = await supabase.auth.getUser();

//       userData = result.data;
//       userError = result.error;
//     } catch (error) {
//       console.error(
//         `${logPrefix} [4-EXCEPTION] getUser() 發生 exception:`,
//         error,
//       );

//       console.error(`${logPrefix} [4-EXCEPTION] name:`, error?.name);

//       console.error(`${logPrefix} [4-EXCEPTION] message:`, error?.message);

//       console.error(`${logPrefix} [4-EXCEPTION] stack:`, error?.stack);

//       console.groupEnd();

//       throw error;
//     }

//     const userDuration = performance.now() - userStart;

//     console.log(
//       `${logPrefix} [4] getUser() 完成`,
//       `耗時 ${userDuration.toFixed(2)} ms`,
//     );

//     // =========================================================
//     // ⑨ getUser() 結果
//     // =========================================================

//     console.log(`${logPrefix} [4] userData:`, userData);

//     console.log(`${logPrefix} [4] userError:`, userError);

//     // =========================================================
//     // ⑩ getUser() Error
//     // =========================================================

//     if (userError) {
//       console.error(`${logPrefix} ❌ getUser() ERROR`);

//       console.error(`${logPrefix} error.name:`, userError?.name);

//       console.error(`${logPrefix} error.message:`, userError?.message);

//       console.error(`${logPrefix} error.status:`, userError?.status);

//       console.error(`${logPrefix} error.code:`, userError?.code);

//       console.error(`${logPrefix} error.stack:`, userError?.stack);

//       console.error(`${logPrefix} error完整物件:`, userError);

//       // -------------------------------------------------------
//       // 特別檢查：
//       // getSession() 有 session
//       // 但 getUser() 卻說 AuthSessionMissingError
//       // -------------------------------------------------------

//       if (
//         userError?.name === "AuthSessionMissingError" ||
//         userError?.message === "Auth session missing!"
//       ) {
//         console.error(`${logPrefix} 🚨🚨🚨 AUTH SESSION INCONSISTENCY 🚨🚨🚨`);

//         console.error(`${logPrefix} getSession() 顯示：有 Session`);

//         console.error(`${logPrefix} 但 getUser() 顯示：Auth session missing`);

//         console.error(`${logPrefix} 這是目前最值得調查的異常點`);

//         console.error(`${logPrefix} session snapshot:`, {
//           hasAccessToken: !!session?.access_token,
//           hasRefreshToken: !!session?.refresh_token,
//           expiresAt: session?.expires_at,
//           expiresAtDate: session?.expires_at
//             ? new Date(session.expires_at * 1000).toISOString()
//             : null,
//         });
//       }

//       handleSupabaseApiError(userError);

//       console.groupEnd();

//       return null;
//     }

//     // =========================================================
//     // ⑪ User 狀態
//     // =========================================================

//     const user = userData?.user;

//     console.log(`${logPrefix} [5] user exists:`, !!user);

//     if (user) {
//       console.log(`${logPrefix} [5] user summary:`, {
//         id: user.id,
//         email: user.email,
//         role: user.role,
//         aud: user.aud,
//         createdAt: user.created_at,
//         updatedAt: user.updated_at,
//         lastSignInAt: user.last_sign_in_at,
//       });
//     } else {
//       console.warn(`${logPrefix} ⚠️ getUser() 沒有 error，但 user 是 null`);
//     }

//     // =========================================================
//     // ⑫ 完整成功
//     // =========================================================

//     const totalDuration = performance.now() - startTime;

//     console.log(`${logPrefix} ✅ SUCCESS`);

//     console.log(
//       `${logPrefix} total duration:`,
//       `${totalDuration.toFixed(2)} ms`,
//     );

//     console.log(`${logPrefix} final result:`, user);

//     console.groupEnd();

//     return user;
//   } catch (error) {
//     // =========================================================
//     // ⑬ 最外層未預期 Exception
//     // =========================================================

//     const totalDuration = performance.now() - startTime;

//     console.error(`${logPrefix} 💥 UNEXPECTED EXCEPTION`);

//     console.error(`${logPrefix} error:`, error);

//     console.error(`${logPrefix} error.name:`, error?.name);

//     console.error(`${logPrefix} error.message:`, error?.message);

//     console.error(`${logPrefix} error.status:`, error?.status);

//     console.error(`${logPrefix} error.code:`, error?.code);

//     console.error(`${logPrefix} error.stack:`, error?.stack);

//     console.error(
//       `${logPrefix} total duration:`,
//       `${totalDuration.toFixed(2)} ms`,
//     );

//     console.groupEnd();

//     throw error;
//   }
// }

// 更新用戶的頭像
export async function updateAvatarFileApi(updateAvatarPayload) {
  const { oldPath, newPath, newFile } = updateAvatarPayload;

  const { data, error } = await supabase.storage
    .from("avatar")
    .upload(newPath, newFile);

  handleSupabaseApiError(error);

  const { error: userMetaDataError } = await supabase.auth.updateUser({
    data: { avatarFile: newPath },
  });

  handleSupabaseApiError(userMetaDataError);

  if (oldPath) {
    const { error } = await supabase.storage.from("avatar").remove([oldPath]);

    // 舊頭像刪除失敗不影響更新功能，所以不做throw error，只需要簡單通知
    if (error) {
      console.log("舊頭像刪除失敗");
      console.warn(error);
    }
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
    invalid_credentials: "目前密碼不正確",
  });

  // 確認帳號密碼都正確之後才能正式更改為新密碼
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });

  handleSupabaseApiError(error, { weak_password: "密碼長度至少要8碼" });

  return data;
}
