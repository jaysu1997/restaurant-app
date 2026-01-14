import ErrorSvg from "../assets/error.svg?react";
import { useNavigate } from "react-router-dom";
import StatusView from "../ui/StatusView";

// 數據獲取失敗fallback ui
// 可能要改成放react query的retry功能進來使用
function FetchFailFallback({ error }) {
  const navigate = useNavigate();

  return (
    <StatusView
      img={<ErrorSvg role="img" aria-label="數據獲取失敗警告圖示" />}
      heading="數據獲取失敗"
      description={error?.message}
      actionFn={error?.action}
      actionLabel={error?.actionLabel}
    />
  );
}

export default FetchFailFallback;
