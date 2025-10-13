import PageNotFoundIcon from "../assets/page-not-found.svg?react";
import HomeButton from "../ui/HomeButton";
import { useNavigate } from "react-router-dom";
import ErrorPageLayout from "../ui/ErrorPageLayout";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <ErrorPageLayout
      icon={<PageNotFoundIcon role="img" aria-label="未知路徑警告圖示" />}
      heading="找不到頁面"
      caption="這個網址不存在，請確認路徑是否正確，或返回首頁。"
      action={
        <HomeButton onClick={() => navigate("/", { replace: true })}>
          返回首頁
        </HomeButton>
      }
    />
  );
}

export default PageNotFound;
