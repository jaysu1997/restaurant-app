import styled from "styled-components";
import TodayOrderList from "./TodayOrderList";
import RevenueTrendChart from "./RevenueTrendChart";
import PeakHoursChart from "./PeakHoursChart";
import TopDishesChart from "./TopDishesChart";
import SectionContainer from "../../ui/SectionContainer";

const StatsChartRow = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 42rem;
  gap: 2.8rem;

  @media (max-width: 48em) {
    grid-template-columns: 1fr;
  }
`;

// 圖表
function StatsCharts({ analyzedData }) {
  const statChartItems = [
    {
      heading: "今日訂單列表",
      chart: TodayOrderList,
    },
    {
      heading: "今日熱銷排名",
      chart: TopDishesChart,
    },
    {
      heading: "今日熱門時段",
      chart: PeakHoursChart,
    },
    {
      heading: "一週營收變化",
      chart: RevenueTrendChart,
    },
  ];

  return (
    <StatsChartRow>
      {statChartItems.map((item, index) => {
        const Chart = item.chart;

        return (
          <SectionContainer title={item.heading} key={index}>
            <Chart analyzedData={analyzedData} />
          </SectionContainer>
        );
      })}
    </StatsChartRow>
  );
}

export default StatsCharts;
