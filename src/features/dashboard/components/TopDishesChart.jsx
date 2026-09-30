// ok
import styled from "styled-components";
import SectionContainer from "../../../components/SectionContainer";
import { Tags, PaperBag, Trophy } from "lucide-react";
import EmptyState from "./EmptyState";
import StatsFooter from "./StatsFooter";
import DishImage from "../../../components/DishImage";

const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2.4rem;
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
  gap: 1.2rem;
  height: 7.2rem;
  padding: 0.8rem 0;
  font-size: 1.4rem;
  border-bottom: 1px solid #f3f4f6;

  &:nth-child(n + 5):last-child {
    border-bottom: none;
  }
`;

const RankNumber = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #374151;
  font-weight: 700;
`;

const ImageWrapper = styled.div`
  width: 4rem;
  height: 4rem;
`;

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const Name = styled.span`
  color: #111827;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const Progress = styled.div`
  width: 100%;
  height: 0.6rem;
  background-color: #f3f4f6;
  border-radius: 999px;
  overflow: hidden;
`;

const ProgressValue = styled.div`
  width: ${({ $percentage = 0 }) =>
    `${Math.min(Math.max($percentage, 0), 100)}%`};
  height: 100%;
  background-color: #111827;
  border-radius: 999px;
`;

const Quantity = styled.span`
  text-align: center;
  color: #111827;
  font-weight: 700;
`;

const SalesShare = styled.span`
  text-align: center;
  color: #374151;
  font-weight: 600;
`;

// 今日熱銷餐點圖表
function TopDishesChart({ todayTopDishes }) {
  const { topDishes, totalServings, dishTypeCount } = todayTopDishes;
  const hasSalesData = topDishes.length > 0;

  return (
    <SectionContainer icon={<Trophy />} header="今日熱門商品">
      <Content>
        {!hasSalesData && <EmptyState />}

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
