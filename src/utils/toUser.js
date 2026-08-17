const ROLE_OPTIONS = [
  { value: "manager", label: "店長" },
  { value: "staff", label: "員工" },
];

// 把前端需要用到的數據整理出來
export function toUser(user) {
  const { id, email } = user;
  const { avatarFile, name, personalPhone } = user.user_metadata ?? {};
  const { role } = user.app_metadata ?? {};

  return {
    id,
    email,
    name,
    avatarFile,
    personalPhone,
    userRole: ROLE_OPTIONS.find((option) => option.value === role),
  };
}
