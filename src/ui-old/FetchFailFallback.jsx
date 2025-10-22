import ErrorSvg from "../assets/error.svg?react";
import { useNavigate } from "react-router-dom";
import ButtonHome from "../ui/ButtonHome";
import ButtonReload from "../ui/ButtonReload";
import StatusView from "../ui/StatusView";

// 數據獲取失敗fallback ui
function FetchFailFallback({ error }) {
  const navigate = useNavigate();

  return (
    <StatusView
      img={<ErrorSvg role="img" aria-label="數據獲取失敗警告圖示" />}
      heading="數據獲取失敗"
      caption={error?.message}
      action={
        <>
          <ButtonReload onClick={error?.action}>
            {error?.actionLabel}
          </ButtonReload>
          <ButtonHome onClick={() => navigate("/")} />
        </>
      }
    />
  );
}

export default FetchFailFallback;
