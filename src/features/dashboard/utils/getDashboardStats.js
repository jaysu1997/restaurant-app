import {
  eachDayOfInterval,
  format,
  getHours,
  isToday,
  isYesterday,
  startOfDay,
  subDays,
} from "date-fns";

function createDailyRevenue() {
  const today = new Date();
  const startDate = startOfDay(subDays(today, 6));

  return eachDayOfInterval({
    start: startDate,
    end: today,
  }).map((date) => ({
    date: format(date, "yyyy-MM-dd"),
    revenue: 0,
  }));
}

function createHourlyOrders() {
  return Array.from({ length: 24 }, (_, hour) => ({
    hour,
    label: `${hour}時`,
    totalOrders: 0,
  }));
}

function createOrderStat() {
  return {
    orderCount: 0,
    revenue: 0,
    dineInOrderCount: 0,
  };
}

function accumulateOrder(order, stat) {
  stat.orderCount += 1;
  stat.revenue += order.totalPrice;

  if (order.diningMethod === "內用") {
    stat.dineInOrderCount += 1;
  }
}

function calculateStat(stat) {
  return {
    ...stat,
    dineInRate:
      stat.orderCount > 0 ? (stat.dineInOrderCount / stat.orderCount) * 100 : 0,
    averageOrderRevenue:
      stat.orderCount > 0 ? stat.revenue / stat.orderCount : 0,
  };
}

function calculateGrowth(today, yesterday) {
  return {
    orderCount: today.orderCount - yesterday.orderCount,
    revenue: today.revenue - yesterday.revenue,
    dineInRate: today.dineInRate - yesterday.dineInRate,
    averageOrderRevenue:
      today.averageOrderRevenue - yesterday.averageOrderRevenue,
  };
}

function accumulateSales(item, sales) {
  const { id, name, image, servings } = item;
  const current = sales.items.get(id);

  sales.items.set(id, {
    id,
    name,
    image: image
      ? `https://yaoivzqoyuqdmvxnxvwm.supabase.co/storage/v1/object/public/menu/${image}`
      : null,
    servings: (current?.servings ?? 0) + servings,
  });

  sales.totalServings += servings;
}

function createTopDishes(sales) {
  const dishTypeCount = sales.items.size;

  const topDishes = [...sales.items.values()]
    .sort((a, b) => {
      if (b.servings !== a.servings) {
        return b.servings - a.servings;
      }

      return a.id - b.id;
    })
    .slice(0, 5)
    .map((item) => ({
      ...item,
      salesPercentage:
        sales.totalServings > 0
          ? (item.servings / sales.totalServings) * 100
          : 0,
    }));

  return {
    topDishes,
    totalServings: sales.totalServings,
    dishTypeCount,
  };
}

export function getDashboardStats(recentOrders) {
  if (!recentOrders) return;

  const dailyRevenue = createDailyRevenue();
  const hourlyOrders = createHourlyOrders();

  const todayOrders = [];
  const orderStatus = {
    preparing: 0,
    completed: 0,
  };

  const todayStat = createOrderStat();
  const yesterdayStat = createOrderStat();

  const sales = {
    items: new Map(),
    totalServings: 0,
  };

  for (const order of recentOrders) {
    const orderDate = format(order.createdAt, "yyyy-MM-dd");

    // 近 7 天每日營收
    const dailyItem = dailyRevenue.find((item) => item.date === orderDate);

    if (dailyItem) {
      dailyItem.revenue += order.totalPrice;
    }

    // 昨日
    if (isYesterday(order.createdAt)) {
      accumulateOrder(order, yesterdayStat);
    }

    // 今日
    if (!isToday(order.createdAt)) {
      continue;
    }

    todayOrders.unshift(order);

    // 訂單狀態
    if (order.status === "準備中") {
      orderStatus.preparing += 1;
    }

    if (order.status === "已完成") {
      orderStatus.completed += 1;
    }

    // 今日統計
    accumulateOrder(order, todayStat);

    // 每小時訂單數
    const hour = getHours(order.createdAt);
    hourlyOrders[hour].totalOrders += 1;

    // 今日餐點銷量
    for (const item of order.items) {
      accumulateSales(item, sales);
    }
  }

  const today = calculateStat(todayStat);
  const yesterday = calculateStat(yesterdayStat);
  const growth = calculateGrowth(today, yesterday);
  const todayTopDishes = createTopDishes(sales);

  return {
    dailyRevenue,
    hourlyOrders,
    todayOrders,
    orderStatus,
    todayTopDishes,
    todayStat: today,
    growth,
  };
}
