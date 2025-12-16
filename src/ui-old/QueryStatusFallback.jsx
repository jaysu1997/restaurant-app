import { useNavigate } from "react-router-dom";
import EmptyStateFallback from "./EmptyStateFallback";
import FetchFailFallback from "./FetchFailFallback";
import LoadingBars from "./LoadingBars";

// 根據數據獲取狀態和結果回傳不同的ui
function QueryStatusFallback({
  isPending,
  isError,
  error,
  isEmpty,
  emptyState,
  render = () => null,
  children,
}) {
  // 這裡後續或許需要整理的更統一，且動態
  // 目前出現的問題是：非重整功能也使用ReloadButton、或許不需要HomeButton時也使用
  if (isPending) return <LoadingBars />;
  if (isError) return <FetchFailFallback error={error} />;
  if (isEmpty) {
    const { message, buttonText, redirectTo } = emptyState;

    return (
      <EmptyStateFallback
        message={message}
        buttonText={buttonText}
        redirectTo={redirectTo}
      />
    );
  }

  // 如果沒有異常且有數據就顯示正常的ui(有些ui會因為沒有第一時間取得數據而造成error，所以選擇改成使用render prop延後渲染)
  return children || render();
}

export default QueryStatusFallback;
