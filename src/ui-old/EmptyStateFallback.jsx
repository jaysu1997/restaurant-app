import EmptyState from "../assets/empty-state.svg?react";
import { useNavigate } from "react-router-dom";
import ButtonReload from "../ui/ButtonReload";
import StatusView from "../ui/StatusView";

// 數據獲取結果為無的fallback ui
function EmptyStateFallback({
  message = "",
  buttonText = "",
  redirectTo = "",
}) {
  const navigate = useNavigate();

  function handleClick() {
    navigate(redirectTo);
  }

  // 這裡的ButtonReload可能是錯誤使用，需要另外設計樣式?
  // 而且有很多需要食材的頁面，似乎沒設計好，即便缺乏食材也可以使用，或許修正
  return (
    <StatusView
      img={<EmptyState role="img" aria-label="沒有相關數據圖示" />}
      heading="沒有相關數據"
      caption={message}
      action={
        buttonText && (
          <ButtonReload onClick={handleClick}>{buttonText}</ButtonReload>
        )
      }
    />
  );
}

export default EmptyStateFallback;
