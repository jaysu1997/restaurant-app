import { useFormContext } from "react-hook-form";
import { generatePickupTimeOptions } from "../../../context/settings/settingsHelpers";
import useSettings from "../../../context/settings/useSettings";
import ControlledSelect from "../../../ui/ControlledSelect";

function ensureOptionExists(options, option = null) {
  if (!option) return options;

  const exists = options.some((current) => current.value === option.value);

  if (exists) return options;

  return [option, ...options];
}

function DiningInfoField({ isTakeout, disabled }) {
  const { todayOpenInfo, dineInTableOptions } = useSettings();
  const { getValues } = useFormContext();
  const selectedPickupTime = getValues("pickupTime");

  const pickupTimeOptions = ensureOptionExists(
    generatePickupTimeOptions(todayOpenInfo),
    selectedPickupTime,
  );

  return (
    <ControlledSelect
      options={isTakeout ? pickupTimeOptions : dineInTableOptions}
      name={isTakeout ? "pickupTime" : "tableNumber"}
      creatable={false}
      placeholder={isTakeout ? "選擇取餐時間" : "選擇桌號"}
      disabled={disabled}
      rules={{
        required: isTakeout ? "請選擇取餐時間" : "請選擇內用桌號",
      }}
      key={isTakeout ? "pickupTime" : "tableNumber"}
    />
  );
}

export default DiningInfoField;
