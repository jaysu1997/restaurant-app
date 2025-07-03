import ControlledSelect from "./ControlledSelect";
import { eachMinuteOfInterval, endOfDay, format, startOfDay } from "date-fns";

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
    { label: "24:00", value: "24:00" },
  ];

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
      key="MonStartTime"
    />
  );
}

export default ControlledTimeSelect;
