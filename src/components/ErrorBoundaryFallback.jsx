// ok
import warningIcon from "../assets/warning.svg";
import FeedbackState from "./FeedbackState";

function ErrorBoundaryFallback({ error, resetErrorBoundary }) {
  console.error("error boundary被觸發", error);

  return (
    <FeedbackState
      minHeight="100dvh"
      illustration={<img src={warningIcon} alt="程式錯誤警告圖示" />}
      heading="發生錯誤"
      description={error.message}
      action={{
        label: "返回首頁",
        onClick: () => resetErrorBoundary(),
      }}
    />
  );
}

export default ErrorBoundaryFallback;
