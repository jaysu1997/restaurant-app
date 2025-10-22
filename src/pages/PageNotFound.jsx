import PageNotFoundIcon from "../assets/page-not-found.svg?react";
import ButtonHome from "../ui/ButtonHome";
import { useNavigate } from "react-router-dom";
import StatusView from "../ui/StatusView";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <StatusView
      minHeight="100dvh"
      img={<PageNotFoundIcon role="img" aria-label="未知路徑警告圖示" />}
      heading="找不到頁面"
      caption="這個網址不存在，請確認路徑是否正確，或返回首頁。"
      action={<ButtonHome onClick={() => navigate("/", { replace: true })} />}
    />
  );
}

export default PageNotFound;
