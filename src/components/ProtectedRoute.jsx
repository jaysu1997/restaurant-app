import { useEffect } from "react";
import { useNavigate } from "react-router";
import useUser from "../hooks/data/auth/useUser";
import FeedbackState from "./FeedbackState";
import ErrorSvg from "../assets/error.svg?react";

function ProtectedRoute({ children, roles }) {
  const navigate = useNavigate();
  const { user, userIsLoading, userIsError, userRefetch } = useUser();
  const userRole = user?.userRole?.value;

  // 已授權
  const isAuthorized = !!user && (!roles || roles.includes(userRole));

  useEffect(() => {
    if (userIsLoading || userIsError) return;

    // 未登入 → Login
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }

    // 已登入但沒權限 → Home
    if (!isAuthorized) {
      navigate("/", { replace: true });
      return;
    }
  }, [userIsLoading, userIsError, user, isAuthorized, navigate]);

  // 🛑 user 還沒載入完成 → 不要渲染任何東西
  if (userIsLoading) return null;

  // 沒有 user 且驗證失敗：無法判定登入身分
  if (userIsError && !user)
    return (
      <FeedbackState
        minHeight="100dvh"
        illustration={<ErrorSvg aria-hidden="true" />}
        heading="無法確認登入狀態"
        description="目前無法確認您的登入狀態，請重新嘗試。"
        action={{
          label: "重新嘗試",
          onClick: () => userRefetch(),
        }}
      />
    );

  // 🛑 user 已載入，但沒有權限 → 也不要渲染 children
  if (!isAuthorized) return null;

  // ✅ user 有權限 → render children
  return children;
}

export default ProtectedRoute;
