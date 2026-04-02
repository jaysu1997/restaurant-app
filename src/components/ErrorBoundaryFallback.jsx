// ok
import warningIcon from "../assets/warning.svg";
import Button from "../ui/Button";
import FeedbackState from "./FeedbackState";

function ErrorBoundaryFallback({ error, resetErrorBoundary }) {
  console.error("error boundary被觸發", error);

  return (
    <FeedbackState
      minHeight="100dvh"
      illustration={<img src={warningIcon} alt="程式錯誤警告圖示" />}
      heading="發生錯誤"
      description={error.message}
    >
      <Button onClick={() => resetErrorBoundary()}>返回首頁</Button>
    </FeedbackState>
  );
}

export default ErrorBoundaryFallback;
