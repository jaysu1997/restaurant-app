import { createContext, useEffect, useMemo, useState } from "react";
import { format } from "date-fns";
import useGetSettings from "../../hooks/data/settings/useGetSettings";
import {
  generateDineInTableOptions,
  getOpenHoursInfo,
  getOpenStatus,
} from "./settingsHelpers";

const SettingsContext = createContext();

function SettingsProvider({ children }) {
  const { settings, settingsIsLoading, settingsIsError, settingsError } =
    useGetSettings();

  // 目前時間（用來觸發重新計算）
  const [now, setNow] = useState(new Date());
  const dateKey = format(now, "yyyy-MM-dd");

  // 內用桌號選項
  const dineInTableOptions = useMemo(() => {
    return generateDineInTableOptions(settings);
  }, [settings]);

  // 今日營業資訊
  const todayOpenInfo = useMemo(() => {
    if (!settings) return null;

    return getOpenHoursInfo(settings, dateKey);
  }, [settings, dateKey]);

  const openStatus = getOpenStatus(todayOpenInfo);

  // 自動切換狀態 / 換天重算
  useEffect(() => {
    if (!openStatus?.nextUpdateMs) return;

    const delay = Math.max(openStatus.nextUpdateMs, 1000);

    const timer = setTimeout(() => {
      setNow(new Date());
    }, delay);

    return () => clearTimeout(timer);
  }, [openStatus]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        dateKey,
        dineInTableOptions,
        todayOpenInfo,
        openStatus,
        settingsIsLoading,
        settingsIsError,
        settingsError,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

export { SettingsProvider, SettingsContext };
