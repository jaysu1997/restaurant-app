import styled from "styled-components";
import {
  LuReceiptText,
  LuBanknote,
  LuTrendingUpDown,
  LuFlame,
} from "react-icons/lu";
import {
  TbArrowBigUpLinesFilled,
  TbArrowBigDownLinesFilled,
} from "react-icons/tb";
import { isToday, isYesterday, parseISO } from "date-fns";

const StyledStatsCardRow = styled.section`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 2.8rem;
`;

const StatCard = styled.article`
  border-radius: 6px;
  padding: 2rem;
  display: grid;
  grid-template-areas:
    "icon heading"
    "icon value";
  grid-template-columns: 6rem 1fr;
  column-gap: 1.4rem;
  background-color: ${(props) => props.$bgColor};
`;

const StatIcon = styled.span`
  grid-area: icon;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  aspect-ratio: 1 / 1;
  border-radius: 50%;
  color: #fff;
  background-color: ${(props) => props.$bgColor};
`;

const StatHeading = styled.h6`
  grid-area: heading;
  color: #6b7280;
  font-size: 1.3rem;
  font-weight: 600;
  align-self: end;
`;

const StatData = styled.div`
  grid-area: value;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  max-width: 16.5rem;

  span {
    font-size: 2.2rem;
    font-weight: 700;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  svg {
    flex-shrink: 0;
  }
`;

const example = {
  createdTime: "2025-05-05T13:54:08.740935",
  order: [
    {
      id: 223,
      name: "柳橙汁",
      note: "",
      price: 25,
      category: "飲料",
      discount: 0,
      servings: 1,
      uniqueId: "z4nfhmo1p",
      customize: [
        {
          title: "份量",
          choice: "單選",
          options: [
            {
              optionId: 0,
              quantity: 0,
              extraPrice: 5,
              optionLabel: "大杯",
              ingredientName: {
                label: "無",
                value: "",
              },
            },
            {
              optionId: 1,
              quantity: 0,
              extraPrice: 0,
              optionLabel: "中杯",
              ingredientName: {
                label: "無",
                value: "",
              },
            },
          ],
          required: "必填",
          customizeId: 0,
        },
      ],
      ingredients: [
        {
          quantity: 1,
          ingredientName: {
            label: "柳橙汁",
            value: "柳橙汁",
          },
        },
      ],
      customizeField: {
        required: [["0-1-中杯"]],
      },
      itemTotalPrice: 25,
      customizeDetail: [
        {
          detail: [
            {
              optionId: 1,
              quantity: 0,
              extraPrice: 0,
              customizeId: 0,
              optionLabel: "中杯",
              ingredientName: "",
            },
          ],
          customizeId: 0,
          customizeTitle: "份量",
        },
      ],
      ingredientsUsage: {
        柳橙汁: 1,
      },
    },
  ],
  orderType: "內用",
  tableNumber: "1",
  pickupTime: null,
  totalIngredientsUsage: {
    柳橙汁: 1,
  },
  note: "",
  pickupNumber: 18,
  id: 278,
  status: "準備中",
  orderUUID: "0d751f15-b3ad-40cc-a0b1-91cdc29e949f",
  paid: "未付款",
};

function StatsCards({ ordersData }) {
  const { todayOrders, yesterdayOrders } = ordersData.reduce(
    (acc, order) => {
      const dateObj = parseISO(order.createdTime);

      if (isToday(dateObj)) acc.todayOrders.push(order);
      if (isYesterday(dateObj)) acc.yesterdayOrders.push(order);

      return acc;
    },
    { todayOrders: [], yesterdayOrders: [] }
  );

  const { ordersCount, revenue, topDishes } = todayOrders.reduce(
    (acc, order) => {
      return acc;
    },
    { ordersCount: 0, revenue: 0, topDishes: [] }
  );

  const statCardItems = [
    {
      heading: "今日訂單總數",
      value: 10000,
      cardColor: "#dbeafe",
      iconColor: "#2563eb",
      icon: LuReceiptText,
      iconSize: 24,
    },
    {
      heading: "今日營收金額",
      value: "$10000000",
      cardColor: "#dcfce7",
      iconColor: "#16a34a",
      icon: LuBanknote,
      iconSize: 28,
    },
    {
      heading: "今日營收變化",
      value: "無變化",
      cardColor: "#f3e8ff",
      iconColor: "#9333ea",
      icon: LuTrendingUpDown,
      iconSize: 24,
      extraIcon: "",
    },
    {
      heading: "今日熱銷分類",
      value: "花生熔岩卡拉雞腿堡",
      cardColor: "#ffedd5",
      iconColor: "#ea580c",
      icon: LuFlame,
      iconSize: 24,
    },
  ];

  return (
    <StyledStatsCardRow>
      {statCardItems.map((item, index) => {
        const Icon = item.icon;
        const ExtraIcon = item?.extraIcon;

        return (
          <StatCard $bgColor={item.cardColor} key={index}>
            <StatIcon $bgColor={item.iconColor}>
              <Icon size={item.iconSize} />
            </StatIcon>
            <StatHeading>{item.heading}</StatHeading>
            <StatData>
              <span>{item.value}</span>
              {item?.extraIcon && <ExtraIcon size={24} />}
            </StatData>
          </StatCard>
        );
      })}
    </StyledStatsCardRow>
  );
}

export default StatsCards;

// import { parseISO, isAfter, isBefore, subDays, startOfDay, endOfDay } from 'date-fns';

// const today = new Date(); // 預設是現在（含時間）
// const start = startOfDay(subDays(today, 6)); // 7 天內的開始日（6 天前的 00:00）
// const end = endOfDay(today);                 // 今天的結束（23:59:59.999）

// const recentOrders = orders.filter(order => {
//   const orderDate = parseISO(order.date); // 假設 order.date 是 ISO 字串
//   return orderDate >= start && orderDate <= end;
// });
