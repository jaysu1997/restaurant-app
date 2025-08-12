import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import useGetSettings from "../hooks/data/settings/useGetSettings";
import {
  generateDineInTableOptions,
  getOpenHoursInfo,
  getOpenStatus,
} from "./settingsHelpers";
import { isToday, startOfTomorrow } from "date-fns";

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

function SettingsProvider({ children }) {
  const { data, error, isPending, isSuccess, isError } = useGetSettings();
  const slotsTimerRef = useRef(null);
  const [today, setToday] = useState(new Date());
  const [status, setStatus] = useState({
    isOpenNow: false,
    tooltip: "今日公休",
  });

  // 先使用useMemo處理好來自遠端的數據
  const settings = useMemo(() => {
    if (!isSuccess) return;

    // 生成內用桌號選項
    const dineInTableOptions = generateDineInTableOptions(data);

    // 取得當天營業設定(是否營業以及營業時段選項)
    const todayOpenInfo = getOpenHoursInfo(data, today);

    return {
      dineInTableOptions,
      todayOpenInfo,
    };
  }, [data, isSuccess, today]);

  // 設定一個會自動更新當前營業狀態的函式
  useEffect(() => {
    if (!settings?.todayOpenInfo) return;

    updateCurrentStatus(settings.todayOpenInfo, setStatus, slotsTimerRef);

    // setTimeout需要放在函式中遞迴執行才能夠自動執行，為了確保cleanup可以清除最新的timer，需要使用useRef幫忙紀錄
    return () => {
      clearTimeout(slotsTimerRef.current);
    };
  }, [settings?.todayOpenInfo]);

  useEffect(() => {
    const now = new Date();
    const nextUpdateTime = startOfTomorrow();

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
        data,
        settings,
        status,
        error,
        isPending,
        isSuccess,
        isError,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
}

function useSettings() {
  const context = useContext(SettingsContext);

  if (context === undefined)
    throw new Error("useSettings 必須在 SettingsProvider 中使用");

  return context;
}

export { SettingsProvider, useSettings };
