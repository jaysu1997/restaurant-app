import styled from "styled-components";
import SectionContainer from "../../../components/SectionContainer";
import { Tags, PaperBag, Trophy } from "lucide-react";
import DashboardEmptyState from "./DashboardEmptyState";
import StatsFooter from "./StatsFooter";
import DishImage from "../../../components/DishImage";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 var(--space-6);
  height: 36rem;
`;

const List = styled.ol`
  display: flex;
  flex-direction: column;
  height: 36rem;
`;

const Item = styled.li`
  display: grid;
  grid-template-columns: 2rem 4rem minmax(0, 1fr) 5.2rem 4.4rem;
  align-items: center;
  gap: var(--space-3);
  height: 7.2rem;
  padding: var(--space-2) 0;
  font-size: var(--font-size-sm);
  border-bottom: 1px solid var(--color-surface-subtle);

  &:nth-child(n + 5):last-child {
    border-bottom: none;
  }
`;

const RankNumber = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-bold);
`;

const ImageWrapper = styled.div`
  width: 4rem;
  height: 4rem;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
`;

const Name = styled.span`
  color: var(--color-text-strong);
  font-weight: var(--font-weight-semibold);
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Progress = styled.div`
  width: 100%;
  height: 0.6rem;
  background-color: var(--color-surface-subtle);
  border-radius: var(--radius-full);
  overflow: hidden;
`;

const ProgressValue = styled.div`
  width: ${({ $percentage = 0 }) =>
    `${Math.min(Math.max($percentage, 0), 100)}%`};
  height: 100%;
  background-color: var(--color-text-strong);
  border-radius: var(--radius-full);
`;

const Quantity = styled.span`
  text-align: center;
  color: var(--color-text-strong);
  font-weight: var(--font-weight-bold);
`;

const SalesShare = styled.span`
  text-align: center;
  color: var(--color-text-secondary);
  font-weight: var(--font-weight-semibold);
`;

// 今日熱銷餐點圖表
function TopDishesChart({ todayTopDishes }) {
  const { topDishes, totalServings, dishTypeCount } = todayTopDishes;
  const hasSalesData = topDishes.length > 0;

  return (
    <SectionContainer
      headerPlacement="inside"
      title="今日熱門商品"
      icon={<Trophy />}
    >
      <Content>
        {!hasSalesData && <DashboardEmptyState />}

        {hasSalesData && (
          <List>
            {topDishes.map((item, index) => (
              <Item key={item.name}>
                <RankNumber>{String(index + 1).padStart(2, "0")}</RankNumber>
                <ImageWrapper>
                  <DishImage image={item.image} alt={item.name} />
                </ImageWrapper>

                <Info>
                  <Name>{item.name}</Name>
                  <Progress>
                    <ProgressValue
                      $percentage={
                        (item.servings / topDishes[0].servings) * 100
                      }
                    />
                  </Progress>
                </Info>

                <Quantity>{item.servings} 份</Quantity>
                <SalesShare>{item.salesPercentage.toFixed(1)}%</SalesShare>
              </Item>
            ))}
          </List>
        )}
      </Content>

      <StatsFooter
        stats={[
          {
            icon: <PaperBag />,
            label: "今日售出數量",
            value: `${totalServings} 份`,
          },
          {
            icon: <Tags />,
            label: "今日售出種類",
            value: `${dishTypeCount} 項`,
          },
        ]}
      />
    </SectionContainer>
  );
}

export default TopDishesChart;
