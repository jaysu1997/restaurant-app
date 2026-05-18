import { generatePickupTimeOptions } from "../../../context/settings/settingsHelpers";
import useSettings from "../../../context/settings/useSettings";
import ControlledSelect from "../../../ui/ControlledSelect";

function ensureOptionExists(options, option = null) {
  if (!option) return options;

  const exists = options.some((current) => current.value === option.value);

  if (exists) return options;

  return [option, ...options];
}

function DiningField({ takeOut, selectedOption, disabled }) {
  const { todayOpenInfo, dineInTableOptions } = useSettings();

  const pickupTimeOptions = ensureOptionExists(
    generatePickupTimeOptions(todayOpenInfo),
    selectedOption,
  );

  return (
    <ControlledSelect
      options={takeOut ? pickupTimeOptions : dineInTableOptions}
      name={takeOut ? "pickupTime" : "tableNumber"}
      creatable={false}
      placeholder={takeOut ? "選擇取餐時間" : "選擇桌號"}
      disabled={disabled}
      rules={{
        required: takeOut ? "請選擇取餐時間" : "請選擇內用桌號",
      }}
      key={takeOut ? "pickupTime" : "tableNumber"}
    />
  );
}

export default DiningField;
