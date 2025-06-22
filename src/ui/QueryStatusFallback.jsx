import EmptyStateFallback from "./EmptyStateFallback";
import FetchFailFallback from "./FetchFailFallback";
import LoadingSpinner from "./LoadingSpinner";

// 根據數據獲取狀態和結果回傳不同的ui
function QueryStatusFallback({
  isPending,
  isError,
  error,
  isEmpty,
  emptyState,
  render,
  children,
}) {
  if (isError) return <FetchFailFallback error={error} />;
  if (isPending) return <LoadingSpinner />;
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
