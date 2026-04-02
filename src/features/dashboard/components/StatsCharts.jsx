// ok
import styled from "styled-components";
import TodayOrderList from "./TodayOrderList";
import RevenueTrendChart from "./RevenueTrendChart";
import PeakHoursChart from "./PeakHoursChart";
import TopDishesChart from "./TopDishesChart";

const StyledStatsCharts = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 2.8rem;

  @media (max-width: 48em) {
    grid-template-columns: 1fr;
  }
`;

// 圖表
function StatsCharts({ analyzedData }) {
  const { todayOrders, todayTopDishes, hourlyOrderCounts, last7DaysStats } =
    analyzedData;

  return (
    <StyledStatsCharts>
      <TodayOrderList data={todayOrders} />
      <TopDishesChart data={todayTopDishes} />
      <PeakHoursChart data={hourlyOrderCounts} />
      <RevenueTrendChart data={last7DaysStats} />
    </StyledStatsCharts>
  );
}

export default StatsCharts;
