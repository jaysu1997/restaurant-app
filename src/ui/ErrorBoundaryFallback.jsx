import WarningIcon from "../assets/warning.svg?react";
import StatusView from "./StatusView";

function ErrorBoundaryFallback({ error, resetErrorBoundary }) {
  console.error("error boundary被觸發", error);

  return (
    <StatusView
      minHeight="100dvh"
      img={<WarningIcon role="img" aria-label="程式錯誤警告圖示" />}
      heading="發生錯誤"
      description={error.message}
      actionFn={resetErrorBoundary}
      actionLabel="返回首頁"
    />
  );
}

export default ErrorBoundaryFallback;
