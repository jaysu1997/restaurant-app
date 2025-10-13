import HomeButton from "./HomeButton";
import ReloadButton from "./ReloadButton";
import WarningIcon from "../assets/warning.svg?react";
import ErrorPageLayout from "./ErrorPageLayout";

function ErrorBoundaryFallback({ error, resetErrorBoundary }) {
  console.error("error boundary被觸發", error);
  console.error(error.message);

  return (
    <ErrorPageLayout
      icon={<WarningIcon role="img" aria-label="程式錯誤警告圖示" />}
      heading="發生錯誤"
      caption="程式發生錯誤，請重新整理頁面，或選擇返回首頁。"
      action={
        <>
          <ReloadButton onClick={resetErrorBoundary}>重新整理</ReloadButton>
          <HomeButton onClick={() => window.location.replace("/")}>
            返回首頁
          </HomeButton>
        </>
      }
    />
  );
}

export default ErrorBoundaryFallback;
