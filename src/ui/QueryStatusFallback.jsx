import EmptyState from "./EmptyState";
import FetchFailFallback from "./FetchFailFallback";
import LoadingSpinner from "./LoadingSpinner";

// 根據數據獲取狀態和結果回傳不同的ui
function QueryStatusFallback({
  isPending,
  isError,
  isEmpty,
  emptyState,
  children,
}) {
  if (isPending) return <LoadingSpinner />;
  if (isError) return <FetchFailFallback />;
  if (isEmpty) {
    const { message, buttonText, redirectTo } = emptyState;

    return (
      <EmptyState
        message={message}
        buttonText={buttonText}
        redirectTo={redirectTo}
      />
    );
  }

  // 如果沒有異常且有數據就顯示正常的ui
  return children;
}

export default QueryStatusFallback;
