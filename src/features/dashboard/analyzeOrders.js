import {
  differenceInCalendarDays,
  eachDayOfInterval,
  format,
  getHours,
  isToday,
  parseISO,
  startOfDay,
  subDays,
} from "date-fns";

// 更新近7天的每日訂單總數和營收
function updateLast7DaysStats(
  last7DaysStats,
  createdTime,
  order,
  sevenDaysAgoStart
) {
  const index = differenceInCalendarDays(createdTime, sevenDaysAgoStart);
  last7DaysStats[index].totalRevenue += order.totalPrice;
  last7DaysStats[index].orderCount += 1;
}

// 更新今天每小時的訂單總數
function updateHourlyOrders(hourlyOrderCounts, createdTime) {
  const hour = getHours(createdTime);
  hourlyOrderCounts[hour].totalOrders += 1;
}

// 更新今天的餐點銷售份數和銷售額
function updateDishStats(dishMap, order) {
  order.order.forEach((dish) => {
    const { name, servings, itemTotalPrice } = dish;
    const current = dishMap.get(name) || { totalServings: 0, totalSales: 0 };

    dishMap.set(name, {
      totalServings: current.totalServings + servings,
      totalSales: current.totalSales + itemTotalPrice * servings,
    });
  });
}

// 先轉換今天餐點銷售數據，再排出熱銷餐點
function getTopDishesFromStats(dishesSaleStats) {
  // 熱銷餐點排序方式(先比銷售數量，數量相同筆金額，金額相同比文字順序，取前5名)
  return Array.from(dishesSaleStats, ([dishName, dishStats]) => ({
    name: dishName,
    totalServings: dishStats.totalServings,
    totalSales: dishStats.totalSales,
  }))
    .sort((a, b) => {
      if (b.totalServings !== a.totalServings)
        return b.totalServings - a.totalServings;

      if (b.totalSales !== a.totalSales) return b.totalSales - a.totalSales;

      // 若再相等，比名稱（字典順序）升冪
      return a.name.localeCompare(b.name);
    })
    .slice(0, 4);
}

function analyzeOrders(orders) {
  const now = new Date();
  // 7天之前
  const sevenDaysAgoStart = startOfDay(subDays(now, 6));
  // 近7天營收統計
  const last7DaysStats = eachDayOfInterval({
    start: sevenDaysAgoStart,
    end: now,
  }).map((date) => ({
    date: format(date, "MM/dd"),
    orderCount: 0,
    totalRevenue: 0,
  }));

  // 今日的訂單數據
  const todayOrders = [];

  // 今日每小時訂單總筆數
  const hourlyOrderCounts = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    totalOrders: 0,
  }));

  // 餐點銷售統計
  const dishesSaleStats = new Map();

  for (const order of orders) {
    const createdTime = parseISO(order.createdTime);

    if (createdTime > now || createdTime < sevenDaysAgoStart) continue;

    // 近7天的營收統計
    updateLast7DaysStats(last7DaysStats, createdTime, order, sevenDaysAgoStart);

    // 統計今日訂單數據
    if (!isToday(createdTime)) continue;

    todayOrders.push(order);

    // 今日各小時訂單筆數統計
    updateHourlyOrders(hourlyOrderCounts, createdTime);

    // 今日各餐點銷售份數與金額累計
    updateDishStats(dishesSaleStats, order);
  }

  return {
    todayOrders,
    todayOrderCounts: last7DaysStats.at(-1).orderCount,
    todayRevenue: last7DaysStats.at(-1).totalRevenue,
    todayRevenueTrend:
      last7DaysStats.at(-1).totalRevenue - last7DaysStats.at(-2).totalRevenue,
    todayTopDishes: getTopDishesFromStats(dishesSaleStats),
    hourlyOrderCounts,
    last7DaysStats,
  };
}

export default analyzeOrders;
