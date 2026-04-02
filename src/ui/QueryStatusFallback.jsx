// ok
import LoadingBars from "./LoadingBars";
import errorSvg from "../assets/error.svg";
import emptyStateSvg from "../assets/empty-state.svg";
import { useNavigate } from "react-router";
import FeedbackState from "../components/FeedbackState";
import Button from "../ui/Button";

// 根據數據獲取狀態和結果回傳不同的ui
function QueryStatusFallback({
  status,
  errorFallback,
  noDataFallback,
  children,
}) {
  const navigate = useNavigate();
  const { isLoading, isError, hasNoData } = status;

  if (isLoading) return <LoadingBars />;

  let statusConfig = null;

  if (isError) {
    statusConfig = {
      img: <img src={errorSvg} alt="數據獲取失敗警告圖示" />,
      heading: "數據獲取失敗",
      description: errorFallback?.message,
      actionLabel: errorFallback?.actionLabel,
      onAction: errorFallback?.action,
    };
  }

  if (hasNoData) {
    statusConfig = {
      img: <img src={emptyStateSvg} alt="沒有相關數據圖示" />,
      heading: "沒有相關數據",
      description: noDataFallback?.message,
      actionLabel: noDataFallback?.actionLabel,
      onAction: () => navigate(noDataFallback?.redirectTo),
    };
  }

  if (statusConfig) {
    return (
      <FeedbackState
        illustration={statusConfig.img}
        heading={statusConfig.heading}
        description={statusConfig.description}
      >
        {statusConfig.actionLabel && (
          <Button onClick={statusConfig.onAction}>
            {statusConfig.actionLabel}
          </Button>
        )}
      </FeedbackState>
    );
  }

  return children;
}

export default QueryStatusFallback;
