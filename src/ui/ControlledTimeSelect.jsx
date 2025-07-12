import ControlledSelect from "./ControlledSelect";
import { eachMinuteOfInterval, endOfDay, format, startOfDay } from "date-fns";

// 這個應該還需要再修改
function ControlledTimeSelect({ control, name, placeholder, disabled }) {
  // 一天的時段(每5分鐘)
  const times = [
    ...eachMinuteOfInterval(
      {
        start: startOfDay(new Date()),
        end: endOfDay(new Date()),
      },
      { step: 5 }
    ).map((time) => ({
      label: format(time, "HH:mm"),
      value: format(time, "HH:mm"),
    })),
    { label: "23:59", value: "23:59" },
  ];

  // 這個應該還需要再修改(填寫規則很重要)
  return (
    <ControlledSelect
      options={times}
      control={control}
      name={name}
      creatable={false}
      placeholder={placeholder}
      disabled={disabled}
      rules={
        {
          // required: true,
        }
      }
    />
  );
}

export default ControlledTimeSelect;
