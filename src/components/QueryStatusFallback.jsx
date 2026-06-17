// ok
import LoadingBars from "../ui/LoadingBars";
import errorSvg from "../assets/error.svg";
import emptyStateSvg from "../assets/empty-state.svg";
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
        illustration={<img src={errorSvg} alt="數據獲取失敗警告圖示" />}
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
        illustration={<img src={emptyStateSvg} alt="沒有相關數據圖示" />}
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
