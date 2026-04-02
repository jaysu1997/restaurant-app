// ok
import { useNavigate } from "react-router";
import Button from "../ui/Button";
import FeedbackState from "../components/FeedbackState";
import pageNotFoundIcon from "../assets/page-not-found.svg";

function PageNotFound() {
  const navigate = useNavigate();

  return (
    <FeedbackState
      minHeight="100dvh"
      illustration={<img src={pageNotFoundIcon} alt="未知路徑警告圖示" />}
      heading="找不到頁面"
      description="這個網址不存在，請確認路徑是否正確，或返回首頁。"
    >
      <Button onClick={() => navigate("/", { replace: true })}>返回首頁</Button>
    </FeedbackState>
  );
}

export default PageNotFound;
