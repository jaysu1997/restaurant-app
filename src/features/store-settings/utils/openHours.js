import {
  addDays,
  addMinutes,
  endOfDay,
  endOfToday,
  getDay,
  getTime,
  isWithinInterval,
  max,
  set,
  startOfDay,
} from "date-fns";
import {
  formatPickupStr,
  minutesToDate,
  parseYMD,
} from "../../../utils/dateTime.js";

export function matchOpenHours(settingsData, date) {
  const { regularOpenHours, specialOpenHours } = settingsData;

  return (
    specialOpenHours.find((special) =>
      isWithinInterval(date, {
        start: startOfDay(parseYMD(special.dateRange.from)),
        end: endOfDay(parseYMD(special.dateRange.to)),
      }),
    ) || regularOpenHours.at(getDay(date) - 1)
  );
}

export function getOpenHoursInfo(settingsData, dateKey) {
  const date = parseYMD(dateKey);
  const today = matchOpenHours(settingsData, date);
  const lastTimeSlot = today.timeSlots.at(-1);

  const todayOpenInfo = {
    ...today,
    timeSlots: today.timeSlots.map((slot) => {
      const open = minutesToDate(date, slot.openTime.value);
      const close = minutesToDate(date, slot.closeTime.value);

      return {
        ...slot,
        openTime: {
          label: formatPickupStr(open, date),
          value: open,
        },
        closeTime: {
          label: formatPickupStr(close, date),
          value: close,
        },
      };
    }),
  };

  if (today.isBusinessDay && lastTimeSlot?.closeTime.value === 1440) {
    const tomorrow = matchOpenHours(settingsData, addDays(date, 1));
    const firstTimeSlot = tomorrow.timeSlots?.[0];

    if (tomorrow.isBusinessDay && firstTimeSlot?.openTime.value === 0) {
      const nextCloseValue = minutesToDate(
        date,
        firstTimeSlot.closeTime.value + 1440,
      );

      todayOpenInfo.timeSlots.at(-1).closeTime = {
        ...todayOpenInfo.timeSlots.at(-1).closeTime,
        label: formatPickupStr(nextCloseValue, date),
        value: nextCloseValue,
      };
    }
  }

  return todayOpenInfo;
}

export function getOpenStatus(todayOpenInfo) {
  const nowMs = getTime(new Date());
  const endMs = getTime(endOfToday());
  const midnightUpdateMs = endMs - nowMs + 1000;

  if (!todayOpenInfo) {
    return {
      status: "unknown",
      detail: "",
      nextUpdateMs: midnightUpdateMs,
    };
  }

  if (!todayOpenInfo.isBusinessDay) {
    return {
      status: "break",
      detail: "今日公休",
      nextUpdateMs: midnightUpdateMs,
    };
  }

  const slots = todayOpenInfo.timeSlots || [];

  for (const slot of slots) {
    const openMs = getTime(slot.openTime.value);
    const closeMs = getTime(slot.closeTime.value);

    if (nowMs < openMs) {
      return {
        status: "break",
        detail: `${slot.openTime.label} 開始`,
        nextUpdateMs: openMs - nowMs,
      };
    }

    if (nowMs >= openMs && nowMs <= closeMs) {
      return {
        status: "open",
        detail: `至 ${slot.closeTime.label}`,
        nextUpdateMs: Math.min(closeMs - nowMs, midnightUpdateMs),
      };
    }
  }

  return {
    status: "break",
    detail: "今日已打烊",
    nextUpdateMs: midnightUpdateMs,
  };
}

export function generatePickupTimeOptions(todayOpenInfo) {
  if (!todayOpenInfo?.isBusinessDay) return [];

  const now = new Date();
  const earliestPickupTime = getEarliestPickupTime(now);
  const pickupTimeOptions = [];

  for (const slot of todayOpenInfo.timeSlots) {
    const openAt = slot.openTime.value;
    const closeAt = slot.closeTime.value;

    if (earliestPickupTime > closeAt) continue;

    const start = max([openAt, earliestPickupTime]);

    for (
      let current = start;
      current <= closeAt;
      current = addMinutes(current, 5)
    ) {
      pickupTimeOptions.push({
        label: formatPickupStr(current, now),
        value: current.toISOString(),
      });
    }
  }

  return pickupTimeOptions;
}

export function canCreateOrder(todayOpenInfo, now = new Date()) {
  const earliestPickupTime = getEarliestPickupTime(now);

  if (!todayOpenInfo || !todayOpenInfo?.isBusinessDay) return false;

  return todayOpenInfo.timeSlots.some(
    (slot) => earliestPickupTime <= slot.closeTime.value,
  );
}

function getEarliestPickupTime(now = new Date()) {
  const pickupBaseTime = addMinutes(now, 15);

  return set(pickupBaseTime, {
    minutes: Math.ceil(pickupBaseTime.getMinutes() / 5) * 5,
    seconds: 0,
    milliseconds: 0,
  });
}
