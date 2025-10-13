import styled from "styled-components";
import TodayOrderList from "./TodayOrderList";
import RevenueTrendChart from "./RevenueTrendChart";
import PeakHoursChart from "./PeakHoursChart";
import TopDishesChart from "./TopDishesChart";
import ContentContainer from "../../ui/ContentContainer";

const StatsChartRow = styled.section`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: 40rem;
  gap: 2.8rem;
`;

const StatsChart = styled.article`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  height: 100%;
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
          <ContentContainer key={index}>
            <StatsChart>
              <ChartHeading>{item.heading}</ChartHeading>
              <Chart analyzedData={analyzedData} />
            </StatsChart>
          </ContentContainer>
        );
      })}
    </StatsChartRow>
  );
}

export default StatsCharts;
