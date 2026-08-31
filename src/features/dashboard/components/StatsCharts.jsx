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

  @media (max-width: 50em) {
    grid-template-columns: 1fr;
  }
`;

// 圖表
function StatsCharts({ analyzedData }) {
  const {
    dailyRevenue,
    hourlyOrders,
    todayOrders,
    orderStatus,
    todayTopDishes,
  } = analyzedData;

  return (
    <StyledStatsCharts>
      <TodayOrderList todayOrders={todayOrders} orderStatus={orderStatus} />
      <TopDishesChart todayTopDishes={todayTopDishes} />
      <PeakHoursChart hourlyOrders={hourlyOrders} />
      <RevenueTrendChart dailyRevenue={dailyRevenue} />
    </StyledStatsCharts>
  );
}

export default StatsCharts;
