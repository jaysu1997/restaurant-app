import ButtonReload from "./ButtonReload";
import WarningIcon from "../assets/warning.svg?react";
import ButtonHome from "./ButtonHome";
import StatusView from "./StatusView";

function ErrorBoundaryFallback({ error, resetErrorBoundary }) {
  console.error("error boundary被觸發", error);
  console.error(error.message);

  return (
    <StatusView
      minHeight="100dvh"
      img={<WarningIcon role="img" aria-label="程式錯誤警告圖示" />}
      heading="發生錯誤"
      caption="程式發生錯誤，請重新整理頁面，或選擇返回首頁。"
      action={
        <>
          <ButtonReload onClick={resetErrorBoundary}>重新整理</ButtonReload>
          <ButtonHome onClick={() => window.location.replace("/")} />
        </>
      }
    />
  );
}

export default ErrorBoundaryFallback;
