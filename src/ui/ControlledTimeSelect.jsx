import ControlledSelect from "./ControlledSelect";
import { eachMinuteOfInterval, endOfDay, format, startOfDay } from "date-fns";

// 這個應該還需要再修改
function ControlledTimeSelect({ control, name }) {
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

  // 這個應該還需要再修改
  return (
    <ControlledSelect
      options={times}
      control={control}
      name={name}
      creatable={false}
      placeholder="開始時間"
      rules={{
        required: true,
      }}
    />
  );
}

export default ControlledTimeSelect;
