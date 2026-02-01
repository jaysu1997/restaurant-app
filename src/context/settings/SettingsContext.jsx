import { createContext, useEffect, useMemo, useRef, useState } from "react";
import useGetSettings from "../../hooks/data/settings/useGetSettings";

import { isToday, startOfTomorrow } from "date-fns";
import {
  generateDineInTableOptions,
  getOpenHoursInfo,
  getOpenStatus,
} from "./settingsHelpers";

// 更新當前營業狀態
function updateCurrentStatus(todayOpenInfo, setStatus, slotsTimerRef) {
  if (slotsTimerRef.current) {
    clearTimeout(slotsTimerRef.current);
  }

  const { isOpenNow, tooltip, nextUpdateTime } = getOpenStatus(todayOpenInfo);
  setStatus({ isOpenNow, tooltip });

  // 計算倒數毫秒
  if (nextUpdateTime) {
    const countdown = nextUpdateTime.getTime() - Date.now();
    slotsTimerRef.current = setTimeout(() => {
      updateCurrentStatus(todayOpenInfo, setStatus, slotsTimerRef);
    }, countdown);
  }
}

const SettingsContext = createContext();

// 這裡有一個小問題需要修正，我設計取餐時間必須要至少在當前時間+20分鐘之後，但是同時這樣的設計也用在購物車的欄位設定中，但是這會有一個問題，那就是在休息之前不到20分鐘(但可能還剩下15分鐘)，就會變成無法點餐的狀態。內用和外帶都不行，或許比較可行的做法是縮短成10分鐘，或是其他邏輯?
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

    updateCurrentStatus(
      derivedSettings.todayOpenInfo,
      setStatus,
      slotsTimerRef,
    );

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

  // 設定settings默認值(因為有些使用settings的地方不適合使用<QueryStatusFallback />的fallback)
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
