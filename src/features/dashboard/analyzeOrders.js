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

function analyzeOrders(orders) {
  const now = new Date();
  const sevenDaysAgoStart = startOfDay(subDays(now, 6));

  const sevenDays = eachDayOfInterval({
    start: sevenDaysAgoStart,
    end: now,
  }).map((date) => ({
    date: format(date, "MM/dd"),
    totalRevenue: 0,
  }));

  let todayOrderCounts = 0;

  const hourlyOrderCounts = Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    totalOrders: 0,
  }));

  const dishesSaleStats = new Map();

  for (const order of orders) {
    const createdTime = parseISO(order.createdTime);

    // 近7天的營收統計
    if (createdTime > now || createdTime < sevenDaysAgoStart) continue;

    // 計算天數差距(可以根據差值快速確定要把數據放到sevenDays的哪個index中)
    const diff = differenceInCalendarDays(order.createdTime, sevenDaysAgoStart);
    sevenDays[diff].totalRevenue += order.totalPrice;

    // 統計今日訂單數據
    if (!isToday(createdTime)) continue;

    // 今日訂單總筆數累計
    todayOrderCounts++;

    // 今日各小時訂單筆數統計
    const createdHour = getHours(createdTime);
    hourlyOrderCounts[createdHour].totalOrders += 1;

    // 今日個餐點銷售份數與金額累計
    order.order.forEach((dish) => {
      const { name, servings, itemTotalPrice } = dish;

      if (dishesSaleStats.has(name)) {
        let { totalServings, totalSales } = dishesSaleStats.get(name);

        dishesSaleStats.set(name, {
          totalServings: totalServings + servings,
          totalSales: totalSales + itemTotalPrice * servings,
        });
      } else {
        dishesSaleStats.set(name, {
          totalServings: servings,
          totalSales: itemTotalPrice * servings,
        });
      }
    });
  }

  // console.log(todayOrderCounts);
  // console.log(sevenDays);
  // console.log(hourlyOrderCounts);
  // console.log(dishesSaleStats);
  console.log(
    Array.from(dishesSaleStats, ([dishName, dishStats]) => ({
      name: dishName,
      totalServings: dishStats.totalServings,
      totalSales: dishStats.totalSales,
    }))
  );
}

export default analyzeOrders;

const sorted = [].sort((a, b) => {
  // 比 servings 多的排前面
  if (b.servings !== a.servings) return b.servings - a.servings;

  // 若 servings 相等，比 sales 金額大的排前面
  if (b.sales !== a.sales) return b.sales - a.sales;

  // 若再相等，比名稱（字典順序）升冪
  return a.name.localeCompare(b.name);
});
