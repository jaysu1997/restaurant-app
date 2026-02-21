import { createContext, useEffect, useMemo, useRef, useState } from "react";
import useGetSettings from "../../hooks/data/settings/useGetSettings";
import { isToday, startOfTomorrow } from "date-fns";
import {
  generateDineInTableOptions,
  getOpenHoursInfo,
  startOpenStatusTimer,
} from "./settingsHelpers";

const SettingsContext = createContext();

function SettingsProvider({ children }) {
  const { settings, settingsIsLoading, settingsIsError, settingsError } =
    useGetSettings();

  const slotsTimerRef = useRef(null);

  const [today, setToday] = useState(new Date());
  const [status, setStatus] = useState({
    isOpenNow: false,
    tooltip: "今日公休",
  });

  // 先使用useMemo處理好來自遠端的數據
  const derivedSettings = useMemo(() => {
    if (!settings) return;

    // 生成內用桌號選項
    const dineInTableOptions = generateDineInTableOptions(settings);

    // 取得當天營業設定(是否營業以及營業時段)
    const todayOpenInfo = getOpenHoursInfo(settings, today);

    return {
      dineInTableOptions,
      todayOpenInfo,
    };
  }, [settings, today]);

  // 設定一個會自動更新當前營業狀態的函式
  useEffect(() => {
    if (!derivedSettings?.todayOpenInfo) return;

    startOpenStatusTimer({
      todayOpenInfo: derivedSettings.todayOpenInfo,
      setStatus,
      timerRef: slotsTimerRef,
    });

    // setTimeout需要放在函式中遞迴執行才能夠自動執行，為了確保cleanup可以清除最新的timer，需要使用useRef幫忙紀錄
    return () => {
      // 不是修改dom，不用理會警告
      clearTimeout(slotsTimerRef.current);
    };
  }, [derivedSettings?.todayOpenInfo]);

  // 跨夜(新的一天)timer
  useEffect(() => {
    const now = new Date();
    const nextUpdateTime = startOfTomorrow();

    // 用來取得新的一天的營業時段
    const midnightTimerId = setTimeout(() => {
      if (!isToday(today)) {
        setToday(new Date());
        console.log("又是新的一天", new Date());
      }
    }, nextUpdateTime.getTime() - now.getTime());

    return () => {
      clearTimeout(midnightTimerId);
    };
  }, [today]);

  return (
    <SettingsContext.Provider
      value={{
        settings,
        derivedSettings,
        status,
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
