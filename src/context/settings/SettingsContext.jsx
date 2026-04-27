import { createContext, useMemo } from "react";
import useGetSettings from "../../hooks/data/settings/useGetSettings";
import {
  generateDineInTableOptions,
  getOpenHoursInfo,
} from "./settingsHelpers";
import useOpenStatus from "./useOpenStatus";

const SettingsContext = createContext();

function SettingsProvider({ children }) {
  const { settings, settingsIsLoading, settingsIsError, settingsError } =
    useGetSettings();

  // 生成內用桌號選項
  const dineInTableOptions = generateDineInTableOptions(settings);

  // 取得當天營業設定(是否有營業以及營業時段)
  const todayOpenInfo = useMemo(() => {
    if (!settings) return;

    return getOpenHoursInfo(settings);
  }, [settings]);

  // 當前營業狀態
  const openStatus = useOpenStatus(todayOpenInfo);

  return (
    <SettingsContext.Provider
      value={{
        settings,
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
