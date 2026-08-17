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

// 更新近 7 天的每日訂單總數和營收
function updateLast7DaysStats(
  last7DaysStats,
  createdAt,
  order,
  sevenDaysAgoStart,
) {
  const index = differenceInCalendarDays(createdAt, sevenDaysAgoStart);

  // 只統計近 7 天範圍內的訂單
  if (index < 0 || index >= last7DaysStats.length) {
    return;
  }

  last7DaysStats[index].orderCount += 1;
  last7DaysStats[index].totalRevenue += order.totalPrice;
}

// 更新今天每小時的訂單總數
function updateHourlyOrderCounts(hourlyOrderCounts, createdAt) {
  const hour = getHours(createdAt);

  hourlyOrderCounts[hour].totalOrders += 1;
}

// 更新今天的餐點銷售份數和銷售額
function updateDishSalesStats(itemSalesStats, order) {
  order.items.forEach((item) => {
    const { name, servings, unitPrice, image } = item;

    const current = itemSalesStats.get(name);

    if (current) {
      current.totalServings += servings;
      current.totalSales += unitPrice * servings;
    } else {
      itemSalesStats.set(name, {
        image: `https://yaoivzqoyuqdmvxnxvwm.supabase.co/storage/v1/object/public/menu/${image}`,
        totalServings: servings,
        totalSales: unitPrice * servings,
      });
    }
  });
}

// 將餐點銷售統計轉換成 Dashboard 使用的資料
// 包含銷售佔比與熱銷排序，但不限制資料筆數
function getDishSalesStats(itemSalesStats) {
  // 今日所有餐點的總銷售份數
  const totalDishServings = Array.from(itemSalesStats.values()).reduce(
    (total, dish) => total + dish.totalServings,
    0,
  );

  return Array.from(itemSalesStats, ([name, data]) => ({
    name,
    image: data.image,
    totalServings: data.totalServings,
    totalSales: data.totalSales,

    // 銷售佔比 = 該餐點銷售份數 / 今日所有餐點總銷售份數
    salesShare:
      totalDishServings > 0
        ? Number(((data.totalServings / totalDishServings) * 100).toFixed(1))
        : 0,
  })).sort((a, b) => {
    // 先比銷售數量
    if (b.totalServings !== a.totalServings) {
      return b.totalServings - a.totalServings;
    }

    // 數量相同比銷售金額
    if (b.totalSales !== a.totalSales) {
      return b.totalSales - a.totalSales;
    }

    // 金額也相同比名稱字典順序升冪
    return a.name.localeCompare(b.name);
  });
}

// 分析 Dashboard 所需的訂單數據
export function getDashboardStats(orders) {
  if (!orders) return;

  const now = new Date();

  // -------------------------
  // 初始化近 7 天統計
  // -------------------------

  const sevenDaysAgoStart = startOfDay(subDays(now, 6));

  const last7DaysStats = eachDayOfInterval({
    start: sevenDaysAgoStart,
    end: now,
  }).map((date) => ({
    date: format(date, "yyyy-MM-dd"),
    orderCount: 0,
    totalRevenue: 0,
  }));

  // -------------------------
  // 初始化今日統計
  // -------------------------

  // 今日訂單
  const todayOrders = [];

  // 今日每小時訂單總數
  const hourlyOrderCounts = Array.from({ length: 24 }, (_, hour) => ({
    hour: `${hour}時`,
    totalOrders: 0,
  }));

  // 今日餐點銷售統計
  const itemSalesStats = new Map();

  // -------------------------
  // 處理所有訂單
  // -------------------------

  for (const order of orders) {
    const createdAt = parseISO(order.createdAt);

    // -------------------------
    // 今日統計
    // -------------------------

    if (isToday(createdAt)) {
      // 最新訂單放在最前面
      todayOrders.unshift(order);

      // 今日各小時訂單數
      updateHourlyOrderCounts(hourlyOrderCounts, createdAt);

      // 今日各餐點銷售統計
      updateDishSalesStats(itemSalesStats, order);
    }

    // -------------------------
    // 近 7 天統計
    // -------------------------

    updateLast7DaysStats(last7DaysStats, createdAt, order, sevenDaysAgoStart);
  }

  // -------------------------
  // 今日 / 昨日統計
  // -------------------------

  const todayStats = last7DaysStats.at(-1);
  const yesterdayStats = last7DaysStats.at(-2);

  const todayOrderCount = todayStats.orderCount;
  const todayRevenue = todayStats.totalRevenue;
  const yesterdayRevenue = yesterdayStats.totalRevenue;

  // 今日平均每筆訂單營收
  const averageOrderValue =
    todayOrderCount > 0 ? todayRevenue / todayOrderCount : 0;

  // -------------------------
  // 今日營收趨勢
  // -------------------------

  const todayRevenueDifference = todayRevenue - yesterdayRevenue;

  let todayRevenueTrend = 0;

  if (yesterdayRevenue === 0 && todayRevenue === 0) {
    todayRevenueTrend = 0;
  } else if (yesterdayRevenue === 0 && todayRevenue > 0) {
    todayRevenueTrend = 100;
  } else {
    todayRevenueTrend = (todayRevenueDifference / yesterdayRevenue) * 100;
  }

  // -------------------------
  // 今日餐點統計
  // -------------------------

  const todayDishSalesStats = getDishSalesStats(itemSalesStats);

  // 今日販售的不同餐點種類數
  const totalDishTypes = todayDishSalesStats.length;

  // 今日所有餐點的總銷售份數
  const totalDishServings = todayDishSalesStats.reduce(
    (total, dish) => total + dish.totalServings,
    0,
  );

  // -------------------------
  // 回傳 Dashboard 所需資料
  // -------------------------

  return {
    // 今日訂單
    todayOrders,

    // 今日 KPI
    todayOrderCount,
    todayRevenue,
    todayRevenueTrend,
    averageOrderValue,

    // 今日餐點統計
    totalDishTypes,
    totalDishServings,
    todayDishSalesStats,

    // 其他圖表資料
    hourlyOrderCounts,
    last7DaysStats,
  };
}
