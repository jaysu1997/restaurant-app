import { useEffect, useRef, useState } from "react";
import { formatToHourMinute } from "./settingsHelpers";
import { isTomorrow, isWithinInterval, startOfTomorrow } from "date-fns";

// 取得當前是否營業中的狀態（保留純 function 👍）
function getOpenStatus(todayOpenInfo) {
  const now = new Date();
  let nextUpdateTime;
  let status = "closed";
  let tooltip = "今日公休";

  const { isBusinessDay, timeSlots } = todayOpenInfo;

  // 公休日
  if (!isBusinessDay) return { status, tooltip, nextUpdateTime };

  // 營業日
  for (const slot of timeSlots) {
    const openTime = slot.openTime.value;
    const closeTime = slot.closeTime.value;

    if (openTime > now) {
      nextUpdateTime = openTime;
      tooltip = `${formatToHourMinute(openTime)} 開始營業`;
      break;
    } else if (isWithinInterval(now, { start: openTime, end: closeTime })) {
      status = "open";
      nextUpdateTime = closeTime;
      const tomorrow = isTomorrow(closeTime);
      tooltip = `營業至${tomorrow ? "明日" : ""} ${formatToHourMinute(closeTime)}`;
      break;
    }

    // 是營業日，但已經超過營業時間
    tooltip = "今日已打烊";
  }

  return { status, tooltip, nextUpdateTime };
}

// 營業狀態ui控制
function useOpenStatus(todayOpenInfo) {
  const slotsTimerRef = useRef(null);

  const [openStatus, setOpenStatus] = useState({
    status: "unknown",
    tooltip: "暫時無法取得營業狀態",
  });

  const [today, setToday] = useState(new Date());

  // 🟡 營業狀態 timer（遞迴）
  useEffect(() => {
    if (!todayOpenInfo) return;

    function schedule() {
      // 清掉舊 timer
      if (slotsTimerRef.current) {
        clearTimeout(slotsTimerRef.current);
      }

      const { status, tooltip, nextUpdateTime } = getOpenStatus(todayOpenInfo);
      setOpenStatus({ status, tooltip });

      if (!nextUpdateTime) return;

      const delay = Math.max(0, nextUpdateTime.getTime() - Date.now());
      slotsTimerRef.current = setTimeout(schedule, delay);
    }

    schedule();

    return () => {
      clearTimeout(slotsTimerRef.current);
    };
  }, [todayOpenInfo]);

  // 🔵 跨日 timer（單次）
  useEffect(() => {
    const now = new Date();
    const next = startOfTomorrow();

    const timer = setTimeout(() => {
      setToday(new Date());
      console.log("又是新的一天", new Date());
    }, next.getTime() - now.getTime());

    return () => clearTimeout(timer);
  }, [today]);

  return openStatus;
}

export default useOpenStatus;
