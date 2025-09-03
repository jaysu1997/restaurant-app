import { useEffect } from "react";
import useUser from "../hooks/data/auth/useUser";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const navigate = useNavigate();
  const { userIsPending, user } = useUser();

  useEffect(() => {
    // 沒有登入用戶就自動轉跳到登入路由
    if (!userIsPending && !user) {
      navigate("/signin", { replace: true });
    }
  }, [user, userIsPending, navigate]);

  // 已登入則可以顯示內容
  if (user) return children;

  // 正在獲取數據中則先不回傳內容
  return null;
}

export default ProtectedRoute;
