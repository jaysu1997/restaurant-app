import { createContext, useContext, useMemo } from "react";
import useGetSettings from "../hooks/data/settings/useGetSettings";
import {
  generateDineInTableOptions,
  generatePickupTimes,
} from "./settingsHelpers";

const SettingsContext = createContext();

function SettingsProvider({ children }) {
  const { data, error, isPending, isSuccess, isError } = useGetSettings();

  const settings = useMemo(() => {
    if (!isSuccess) return;

    const { regularOpenHours, specialOpenHours, dineInTableConfig } = data;

    // 當天是否營業以及營業時段選項
    const todayPickupTimeOptions = generatePickupTimes(
      regularOpenHours,
      specialOpenHours
    );

    // 內用桌號選項
    const dineInTableOption = generateDineInTableOptions(dineInTableConfig);

    return {
      isOpen: todayPickupTimeOptions.isOpen,
      pickupTime: todayPickupTimeOptions.options,
      dineInTable: dineInTableOption,
    };
  }, [data, isSuccess]);

  // 設定settings默認值(因為有些使用settings的地方不適合使用<QueryStatusFallback />的fallback)
  return (
    <SettingsContext.Provider
      value={{
        data,
        settings: settings || {
          isOpen: false,
          pickupTime: [],
          dineInTable: [],
        },
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
