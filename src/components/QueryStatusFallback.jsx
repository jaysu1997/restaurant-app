// ok
import LoadingBars from "../components/LoadingBars";
import ErrorSvg from "../assets/error.svg?react";
import EmptyStateSvg from "../assets/empty-state.svg?react";
import { useNavigate } from "react-router";
import FeedbackState from "./FeedbackState";

// 根據數據獲取狀態和結果回傳不同的ui
function QueryStatusFallback({ queries, hasNoData, noDataFallback, children }) {
  const navigate = useNavigate();

  const isLoading = queries.some((query) => query.isPending);

  if (isLoading) return <LoadingBars />;

  const error = queries.find((query) => query.isError);

  if (error)
    return (
      <FeedbackState
        minHeight="100%"
        illustration={<ErrorSvg aria-hidden="true" />}
        heading="數據獲取失敗"
        description={error?.error?.message}
        action={{
          label: "重新嘗試",
          onClick: error?.refetch,
        }}
      />
    );

  if (hasNoData)
    return (
      <FeedbackState
        minHeight="100%"
        illustration={<EmptyStateSvg aria-hidden="true" />}
        heading="沒有相關數據"
        description={noDataFallback?.message}
        action={{
          label: noDataFallback?.actionLabel,
          onClick: () => navigate(noDataFallback?.redirectTo),
        }}
      />
    );

  return children;
}

export default QueryStatusFallback;
