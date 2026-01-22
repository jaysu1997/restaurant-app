import LoadingBars from "./LoadingBars";
import ErrorSvg from "../assets/error.svg?react";
import EmptyState from "../assets/empty-state.svg?react";
import { useNavigate } from "react-router";
import StatusView from "../ui/StatusView";
import Button from "../ui/Button";

// 根據數據獲取狀態和結果回傳不同的ui
function QueryStatusFallback({
  status,
  errorFallback,
  noDataFallback,
  children,
}) {
  const navigate = useNavigate();
  const { isPending, isError, hasNoData } = status;

  if (isPending) return <LoadingBars />;

  let statusConfig = null;

  if (isError) {
    statusConfig = {
      img: <ErrorSvg role="img" aria-label="數據獲取失敗警告圖示" />,
      heading: "數據獲取失敗",
      description: errorFallback?.message,
      actionLabel: errorFallback?.actionLabel,
      onAction: errorFallback?.action,
    };
  }

  if (hasNoData) {
    statusConfig = {
      img: <EmptyState role="img" aria-label="沒有相關數據圖示" />,
      heading: "沒有相關數據",
      description: noDataFallback?.message,
      actionLabel: noDataFallback?.actionLabel,
      onAction: () => navigate(noDataFallback?.redirectTo),
    };
  }

  if (statusConfig) {
    return (
      <StatusView
        img={statusConfig.img}
        heading={statusConfig.heading}
        description={statusConfig.description}
      >
        {statusConfig.actionLabel && (
          <Button onClick={statusConfig.onAction}>
            {statusConfig.actionLabel}
          </Button>
        )}
      </StatusView>
    );
  }

  return children;
}

export default QueryStatusFallback;
