// ok
import WarningIcon from "../assets/warning.svg?react";
import FeedbackState from "./FeedbackState";

function ErrorBoundaryFallback({ error, resetErrorBoundary }) {
  console.error("error boundary被觸發", error);

  return (
    <FeedbackState
      minHeight="100dvh"
      illustration={<WarningIcon aria-hidden="true" />}
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
