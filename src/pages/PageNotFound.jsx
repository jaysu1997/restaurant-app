// ok
import PageNotFoundIcon from "../assets/page-not-found.svg?react";
import { useNavigate } from "react-router";
import StatusView from "../ui/StatusView";
import Button from "../ui/Button";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <StatusView
      minHeight="100dvh"
      img={<PageNotFoundIcon role="img" aria-label="未知路徑警告圖示" />}
      heading="找不到頁面"
      description="這個網址不存在，請確認路徑是否正確，或返回首頁。"
    >
      <Button onClick={() => navigate("/", { replace: true })}>返回首頁</Button>
    </StatusView>
  );
}

export default PageNotFound;
