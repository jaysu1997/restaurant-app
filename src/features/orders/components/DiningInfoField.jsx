import { useFormContext, useWatch } from "react-hook-form";
import { generatePickupTimeOptions } from "../../../context/settings/settingsHelpers";
import useSettings from "../../../context/settings/useSettings";
import FormSelectField from "../../../components/FormSelectField";

function ensureOptionExists(options, option = null) {
  if (!option) return options;

  const exists = options.some((current) => current.value === option.value);

  if (exists) return options;

  return [option, ...options];
}

function DiningInfoField({ disabled }) {
  const { todayOpenInfo, dineInTableOptions } = useSettings();
  const { getValues, control } = useFormContext();

  const diningMethod = useWatch({
    control,
    name: "diningMethod",
  });
  const isTakeout = diningMethod === "外帶";

  const selectedPickupTime = getValues("pickupTime");
  const pickupTimeOptions = ensureOptionExists(
    generatePickupTimeOptions(todayOpenInfo),
    selectedPickupTime,
  );

  return (
    <FormSelectField
      label={isTakeout ? "取餐時間" : "內用桌號"}
      name={isTakeout ? "pickupTime" : "tableNumber"}
      options={isTakeout ? pickupTimeOptions : dineInTableOptions}
      placeholder={isTakeout ? "請選擇取餐時間" : "請選擇內用桌號"}
      disabled={disabled}
      rules={{
        required: isTakeout ? "請選擇取餐時間" : "請選擇內用桌號",
      }}
      key={isTakeout ? "pickupTime" : "tableNumber"}
    />
  );
}

export default DiningInfoField;
