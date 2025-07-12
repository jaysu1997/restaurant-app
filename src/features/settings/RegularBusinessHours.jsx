import styled from "styled-components";
import ControlledSwitch from "../../ui/ControlledSwitch";
import SettingFormSection from "../../ui/SettingFormSection";
import { useFieldArray, useForm } from "react-hook-form";
import TimeRange from "./TimeRange";

const Content = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  li {
    display: grid;
    grid-template-columns: 25rem 8.2rem 1fr auto;
    row-gap: 1rem;
    column-gap: 2rem;
    align-items: center;
  }
`;

const daysOfWeek = [
  {
    isOpen: true,
    dayOfWeek: "Mon",
    label: "星期一",
    timeSlots: [
      {
        openTime: { label: "08:00", value: "08:00" },
        closeTime: { label: "14:00", value: "14:00" },
      },
    ],
  },
  {
    isOpen: false,
    dayOfWeek: "Tue",
    label: "星期二",
    timeSlots: [
      {
        openTime: { label: "08:00", value: "08:00" },
        closeTime: { label: "14:00", value: "14:00" },
      },
    ],
  },
  {
    isOpen: false,
    dayOfWeek: "Wed",
    label: "星期三",
    timeSlots: [
      {
        openTime: { label: "08:00", value: "08:00" },
        closeTime: { label: "14:00", value: "14:00" },
      },
    ],
  },
  {
    isOpen: false,
    dayOfWeek: "Thu",
    label: "星期四",
    timeSlots: [
      {
        openTime: { label: "08:00", value: "08:00" },
        closeTime: { label: "14:00", value: "14:00" },
      },
    ],
  },
  {
    isOpen: false,
    dayOfWeek: "Fri",
    label: "星期五",
    timeSlots: [
      {
        openTime: { label: "08:00", value: "08:00" },
        closeTime: { label: "14:00", value: "14:00" },
      },
    ],
  },
  {
    isOpen: false,
    dayOfWeek: "Sat",
    label: "星期六",
    timeSlots: [
      {
        openTime: { label: "08:00", value: "08:00" },
        closeTime: { label: "14:00", value: "14:00" },
      },
    ],
  },
  {
    isOpen: false,
    dayOfWeek: "Sun",
    label: "星期日",
    timeSlots: [
      {
        openTime: { label: "08:00", value: "08:00" },
        closeTime: { label: "14:00", value: "14:00" },
      },
    ],
  },
];

function RegularBusinessHours() {
  const { register, handleSubmit, reset, control, setValue, watch } = useForm({
    defaultValues: { regularOpenHours: daysOfWeek },
  });

  const { fields: dayFields } = useFieldArray({
    control,
    name: "regularOpenHours",
  });

  function onSubmit(data) {
    console.log(data);
  }

  function onError(error) {
    console.log(error);
  }

  return (
    <SettingFormSection
      title="一般營業時間"
      description="設定在非國定假日期間的每週固定營業時間，系統將依此顯示店鋪的營業狀態。"
      handleSubmit={handleSubmit(onSubmit, onError)}
    >
      <Content>
        {dayFields.map((day, dayIndex) => (
          <li key={day.id}>
            <label htmlFor="dayOfWeek">{day.label}</label>
            <input
              id="dayOfWeek"
              type="text"
              hidden
              {...register(`regularOpenHours.${dayIndex}.dayOfWeek`)}
              value={day.dayOfWeek}
            />

            <ControlledSwitch
              control={control}
              items={[
                {
                  name: `regularOpenHours.${dayIndex}.isOpen`,
                  option1: { label: "公休", value: false },
                  option2: { label: "營業", value: true },
                },
              ]}
            />

            <TimeRange
              control={control}
              dayIndex={dayIndex}
              setValue={setValue}
              variant="regular"
            />
          </li>
        ))}
      </Content>
    </SettingFormSection>
  );
}

export default RegularBusinessHours;
