import styled from "styled-components";
import TodayOrderList from "./TodayOrderList";
import RevenueTrendChart from "./RevenueTrendChart";
import PeakHoursChart from "./PeakHoursChart";
import TopDishesChart from "./TopDishesChart";

const StatsChartRow = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: 40rem;
  gap: 2.8rem;
`;

const StatsChart = styled.article`
  border-radius: 6px;
  display: inline-flex;
  flex-direction: column;
  padding: 2.4rem;
  gap: 2rem;
  background-color: #fff;
  border: 1px solid #dfdfdf;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
`;

const ChartHeading = styled.h3`
  font-size: 2rem;
  font-weight: 600;
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
          <StatsChart key={index}>
            <ChartHeading>{item.heading}</ChartHeading>
            <Chart analyzedData={analyzedData} />
          </StatsChart>
        );
      })}
    </StatsChartRow>
  );
}

export default StatsCharts;
