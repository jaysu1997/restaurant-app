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
`;

const StatsChart = styled.article`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  width: 100%;
  height: 100%;
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
            <StatsChart>
              <Chart analyzedData={analyzedData} />
            </StatsChart>
          </SectionContainer>
        );
      })}
    </StatsChartRow>
  );
}

export default StatsCharts;
