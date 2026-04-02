import { useContext } from "react";
import { SettingsContext } from "./SettingsContext";

// 搭配SettingsContext使用
function useSettings() {
  const context = useContext(SettingsContext);

  if (context === undefined)
    throw new Error("useSettings 必須在 SettingsProvider 中使用");

  return context;
}

export default useSettings;
