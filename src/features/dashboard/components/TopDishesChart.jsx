// ok
import styled from "styled-components";
import SectionContainer from "../../../components/SectionContainer";
import { Flame, Layers3, Package, BarChart3 } from "lucide-react";
import Image from "../../../components/Image";

const PopularProductsCard = styled.section`
  width: 100%;
  min-width: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background-color: #fff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
`;

const PopularProductsHeader = styled.header`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  height: 6.4rem;
  padding: 1.6rem 2rem;
  border-bottom: 1px solid #f3f4f6;
`;

const PopularProductsTitleText = styled.h2`
  color: #111827;
  font-size: 1.6rem;
`;

const PopularProductsContent = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2rem;
`;

const PopularProductList = styled.ol`
  display: flex;
  flex-direction: column;
  height: 36rem;
`;

const PopularProductItem = styled.li`
  display: grid;
  grid-template-columns: 2rem 4rem minmax(0, 1fr) 5.2rem 4.4rem;
  align-items: center;
  gap: 1.2rem;
  height: 7.2rem;
  padding: 0.8rem 0;
  font-size: 1.4rem;

  border-bottom: 1px solid #f3f4f6;
  &:nth-child(5) {
    border: none;
  }
`;

const PopularProductRank = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: #374151;
  font-weight: 700;
`;

const PopularProductImageWrapper = styled.div`
  width: 4rem;
  height: 4rem;
`;

const PopularProductInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

const PopularProductName = styled.span`
  color: #111827;
  font-weight: 600;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const PopularProductProgress = styled.div`
  width: 100%;
  height: 0.5rem;
  background-color: #f3f4f6;
  border-radius: 999px;
  overflow: hidden;
`;

const PopularProductProgressValue = styled.div`
  width: ${({ $percentage = 0 }) =>
    `${Math.min(Math.max($percentage, 0), 100)}%`};
  height: 100%;
  background-color: #111827;
  border-radius: 999px;
`;

const PopularProductQuantity = styled.span`
  text-align: center;
  color: #111827;
  font-weight: 700;
`;

const PopularProductRevenue = styled.span`
  text-align: center;
  color: #374151;
  font-weight: 600;
`;

const PopularProductsEmpty = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 36rem;
  padding: 2.4rem;
  gap: 0.8rem;
`;

const PopularProductsEmptyIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 4rem;
  height: 4rem;
  color: #9ca3af;
  background-color: #f9fafb;
  border-radius: 8px;

  svg {
    width: 2rem;
    height: 2rem;
  }
`;

const PopularProductsEmptyTitle = styled.p`
  color: #374151;
  font-size: 1.4rem;
  font-weight: 600;
`;

const PopularProductsEmptyDescription = styled.p`
  max-width: 28rem;
  color: #9ca3af;
  font-size: 1.2rem;
  font-weight: 400;
`;

const PopularProductsFooter = styled.footer`
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  height: 7.2rem;
  border-top: 1px solid #f3f4f6;
`;

const PopularProductsFooterStat = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1.2rem 2rem;

  &:first-child {
    border-right: 1px solid #f1f2f4;
  }
`;

const PopularProductsFooterTitle = styled.span`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  color: #6b7280;
  /* color: #22c55e; */
  font-size: 1.2rem;
  font-weight: 500;

  svg {
    width: 1.6rem;
    height: 1.6rem;
  }
`;

const PopularProductsFooterValue = styled.strong`
  color: #111827;
  font-size: 1.6rem;
  font-weight: 700;
`;

// 今日熱銷餐點圖表
function TopDishesChart({
  totalDishTypes,
  totalDishServings,
  todayDishSalesStats,
}) {
  if (todayDishSalesStats.length === 0)
    return (
      <PopularProductsCard>
        <PopularProductsHeader>
          <Flame size={20} />

          <PopularProductsTitleText>今日熱門商品</PopularProductsTitleText>
        </PopularProductsHeader>

        <PopularProductsEmpty>
          <PopularProductsEmptyIcon>
            <BarChart3 />
          </PopularProductsEmptyIcon>

          <PopularProductsEmptyTitle>
            今日尚無銷售資料
          </PopularProductsEmptyTitle>

          <PopularProductsEmptyDescription>
            完成第一筆訂單後，熱門餐點排行將會顯示在這裡。
          </PopularProductsEmptyDescription>
        </PopularProductsEmpty>

        <PopularProductsFooter>
          <PopularProductsFooterStat>
            <PopularProductsFooterTitle>
              <Package />
              今日售出數量
            </PopularProductsFooterTitle>

            <PopularProductsFooterValue>
              {totalDishServings} 份
            </PopularProductsFooterValue>
          </PopularProductsFooterStat>

          <PopularProductsFooterStat>
            <PopularProductsFooterTitle>
              <Layers3 />
              今日售出品項
            </PopularProductsFooterTitle>

            <PopularProductsFooterValue>
              {totalDishTypes} 項
            </PopularProductsFooterValue>
          </PopularProductsFooterStat>
        </PopularProductsFooter>
      </PopularProductsCard>
    );

  return (
    <PopularProductsCard>
      <PopularProductsHeader>
        <Flame size={20} />

        <PopularProductsTitleText>今日熱門商品</PopularProductsTitleText>
      </PopularProductsHeader>

      <PopularProductsContent>
        <PopularProductList>
          {todayDishSalesStats.slice(0, 5).map((item, index) => (
            <PopularProductItem key={item.name}>
              <PopularProductRank>
                {String(index + 1).padStart(2, "0")}
              </PopularProductRank>

              <PopularProductImageWrapper>
                <Image src={item.image} alt={item.name} radius="8px" />
              </PopularProductImageWrapper>

              <PopularProductInfo>
                <PopularProductName>{item.name}</PopularProductName>

                <PopularProductProgress>
                  <PopularProductProgressValue
                    $percentage={
                      (item.totalServings /
                        todayDishSalesStats[0].totalServings) *
                      100
                    }
                  />
                </PopularProductProgress>
              </PopularProductInfo>

              <PopularProductQuantity>
                {item.totalServings} 份
              </PopularProductQuantity>

              <PopularProductRevenue>{item.salesShare}%</PopularProductRevenue>
            </PopularProductItem>
          ))}
        </PopularProductList>
      </PopularProductsContent>

      <PopularProductsFooter>
        <PopularProductsFooterStat>
          <PopularProductsFooterTitle>
            <Package size={15} strokeWidth={1.8} />
            今日售出數量
          </PopularProductsFooterTitle>

          <PopularProductsFooterValue>
            {totalDishServings} 份
          </PopularProductsFooterValue>
        </PopularProductsFooterStat>

        <PopularProductsFooterStat>
          <PopularProductsFooterTitle>
            <Layers3 size={15} strokeWidth={1.8} />
            今日售出品項
          </PopularProductsFooterTitle>

          <PopularProductsFooterValue>
            {totalDishTypes} 項
          </PopularProductsFooterValue>
        </PopularProductsFooterStat>
      </PopularProductsFooter>
    </PopularProductsCard>
  );
}

export default TopDishesChart;
