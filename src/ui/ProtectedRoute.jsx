import { useEffect } from "react";
import useUser from "../hooks/data/auth/useUser";
import { useNavigate } from "react-router";

function ProtectedRoute({ children, roles }) {
  const navigate = useNavigate();
  const { userIsPending, user } = useUser();
  const userRole = user?.user_metadata?.role;

  const isAuthorized = user && (!roles || roles.includes(userRole));

  useEffect(() => {
    if (userIsPending) return;

    // 未登入 → Login
    if (!user) {
      navigate("/signin", { replace: true });
      return;
    }

    // 已登入但沒權限 → Home
    if (!isAuthorized) {
      navigate("/", { replace: true });
      return;
    }
  }, [userIsPending, user, isAuthorized, navigate]);

  // 🛑 user 還沒載入完成 → 不要渲染任何東西
  if (userIsPending) return null;

  // 🛑 user 已載入，但沒有權限 → 也不要渲染 children
  if (!isAuthorized) return null;

  // ✅ user 有權限 → render children
  return children;
}

export default ProtectedRoute;
